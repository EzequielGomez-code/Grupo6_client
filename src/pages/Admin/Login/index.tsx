import { type FC, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../../services/auth/auth';
import type { AuthData } from '../../../types';

const AdminLogin: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Verificar si ya hay una sesión activa
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Si ya hay un usuario logueado, redirigir al home
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar mensajes de error cuando el usuario empieza a escribir
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.usuario || !formData.password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Preparar datos para la autenticación
      const authData: AuthData = {
        username: formData.usuario,
        password: formData.password
      };
      
      // Llamar al servicio de autenticación
      const response = await login(authData);
      
      // La función login ya guarda el usuario en localStorage
      
      // Redirigir a la página principal (home)
      navigate('/');
      
      console.log('Inicio de sesión exitoso:', response);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>Acceso Administrativo</h2>
          <p>Ingrese sus credenciales para continuar al panel de administración</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Ingrese su nombre de usuario"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              disabled={loading}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default AdminLogin; 