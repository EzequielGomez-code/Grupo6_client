import { type FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

// Interfaz para los datos de usuario en localStorage
interface UserData {
  id?: number;
  username: string;
  role?: string;
}

const Navbar: FC = () => {
  const navigate = useNavigate();
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState<UserData | null>(null);
  // Estado para controlar el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = () => {
      const storedUserData = localStorage.getItem('userData');
      console.log('Datos en localStorage:', storedUserData);
      
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          console.log('Datos parseados:', parsedUserData);
          
          // Si la respuesta es directamente el objeto de usuario
          if (parsedUserData.username) {
            setUserData(parsedUserData);
            setIsAuthenticated(true);
            console.log('Usuario autenticado (directo):', parsedUserData);
          } 
          // Si el usuario está dentro de un objeto 'user'
          else if (parsedUserData.user && parsedUserData.user.username) {
            setUserData(parsedUserData.user);
            setIsAuthenticated(true);
            console.log('Usuario autenticado (anidado):', parsedUserData.user);
          }
          // Si no tiene el formato esperado
          else {
            console.error('Formato de datos de usuario inesperado:', parsedUserData);
            setIsAuthenticated(false);
            setUserData(null);
          }
        } catch (error) {
          console.error('Error al parsear los datos del usuario:', error);
          setIsAuthenticated(false);
          setUserData(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };
    
    // Verificar al inicio
    checkAuth();
    
    // Configurar un listener para cambios en localStorage (útil si tienes múltiples tabs)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Verificar cada segundo (para asegurar actualización de UI)
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Agregar o quitar overflow hidden al body cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Limpiar el efecto al desmontar
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar directamente de localStorage para garantizar que se elimine
    localStorage.removeItem('userData');
    
    // Actualizar el estado
    setIsAuthenticated(false);
    setUserData(null);
    
    // Redirigir al inicio
    navigate('/');
    
    // Cerrar el menú móvil si está abierto
    setMobileMenuOpen(false);
    
    console.log('Sesión cerrada correctamente, localStorage limpio');
  };

  // Función para smooth scroll a las secciones
  const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 90, // 90px de compensación por la barra de navegación
        behavior: 'smooth'
      });
      // Cerrar el menú móvil después de hacer clic en un enlace
      setMobileMenuOpen(false);
    }
  };

  // Alternar el menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Cerrar el menú al hacer click en el overlay
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          {/* Sección del nombre de usuario y botón de cerrar sesión - a la izquierda */}
          <div className="user-section">
            {isAuthenticated && userData ? (
              <>
                {/* Mostrar información del usuario */}
                <div className="user-info">
                  <span className="user-name">
                    {userData.username}
                  </span>
                </div>
                
                {/* Botón de cerrar sesión */}
                <button 
                  onClick={handleLogout} 
                  className="admin-link"
                  aria-label="Cerrar sesión"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    style={{marginRight: '6px', verticalAlign: 'middle'}}
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              /* Icono de admin para login */
              <Link to="/admin/login" className="admin-icon-link" title="Acceso Administrativo" onClick={() => setMobileMenuOpen(false)}>
                <svg className="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            )}
          </div>
          
          {/* Menú de navegación - al centro */}
          <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <a href="/#servicios" className="nav-link" onClick={scrollToSection('servicios')}>Servicios</a>
            <a href="/#nosotros" className="nav-link" onClick={scrollToSection('nosotros')}>Nosotros</a>
            <a href="/#contacto" className="nav-link" onClick={scrollToSection('contacto')}>Contacto</a>
            <Link to="/consultar" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Consultar Moto</Link>
            
            {/* Panel Admin link solo si es admin */}
            {isAuthenticated && userData && userData.role === 'Admin' && (
              <Link to="/admin/solicitudes" className="nav-link admin-link" onClick={() => setMobileMenuOpen(false)}>
                Panel Admin
              </Link>
            )}
          </div>
          
          {/* Logo de la página - a la derecha */}
          <div className="navbar-logo">
            <Link to="/">
              <h1>Taller Del Barrio</h1>
            </Link>
          </div>
          
          {/* Menú hamburguesa para móvil */}
          <div 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      
      {/* Overlay para el fondo cuando el menú está abierto */}
      <div 
        className={`menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>
    </>
  );
};

export default Navbar; 