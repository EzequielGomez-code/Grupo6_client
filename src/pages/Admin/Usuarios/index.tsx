import { type FC, useState, type FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Usuarios.css';
import { register } from '../../../services/auth/auth';
import { registerMotorcycle } from '../../../services/RegisterMotorcicle/RegisterMotorcycle';
import type { AuthData, FormDataCredenciales, FormRegisterMotorcycle } from '../../../types';
import PreciosPreview from '../../../components/PreciosPreview';


const AdminUsuarios: FC = () => {
  // Estados para datos de formularios
  const [formDataPersonal, setFormDataPersonal] = useState<FormRegisterMotorcycle>({
    cedula: '',
    nombreCompleto: '',
    telefono: '',
    email: '',
    tipoDeMoto: '',
    placaMoto: '',
    modeloMoto: '',
    descripcionServicio: ''
  });
  
  // Otros estados
  const [formDataCredenciales, setFormDataCredenciales] = useState<FormDataCredenciales>({
    usuario: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  
  // Estados para mensajes 
  const [mensajePersonal, setMensajePersonal] = useState<{texto: string, tipo: 'success' | 'error'} | null>(null);
  const [mensajeCredenciales, setMensajeCredenciales] = useState<{texto: string, tipo: 'success' | 'error'} | null>(null);
  
  // Estados para secciones colapsables en móvil
  const [personalColapsado, setPersonalColapsado] = useState<boolean>(false);
  const [motoColapsada, setMotoColapsada] = useState<boolean>(false);
  
  // Estados para carga
  const [cargando, setCargando] = useState<boolean>(false);
  const [cargandoPersonal, setCargandoPersonal] = useState<boolean>(false);
  
  // Detectar si es móvil para colapsar automáticamente en dispositivos pequeños
  useEffect(() => {
    const comprobarTamanoPantalla = () => {
      if (window.innerWidth < 768) {
        // No colapsamos nada por defecto
      } else {
        setPersonalColapsado(false);
        setMotoColapsada(false);
      }
    };
    
    comprobarTamanoPantalla();
    window.addEventListener('resize', comprobarTamanoPantalla);
    
    return () => {
      window.removeEventListener('resize', comprobarTamanoPantalla);
    };
  }, []);

  // Manejar cambios en los campos de formulario
  const handleChangePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataPersonal(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar mensajes de éxito/error al hacer cambios
    setMensajePersonal(null);
  };

  // Manejo de cambios en el formulario de credenciales
  const handleChangeCredenciales = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataCredenciales(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validación del formulario de información personal
  const validarFormularioPersonal = (): boolean => {
    if (!formDataPersonal.cedula || !formDataPersonal.nombreCompleto || !formDataPersonal.telefono || !formDataPersonal.tipoDeMoto || !formDataPersonal.placaMoto) {
      setMensajePersonal({
        texto: 'Por favor complete todos los campos obligatorios',
        tipo: 'error'
      });
      return false;
    }
    return true;
  };

  // Validación del formulario de credenciales
  const validarFormularioCredenciales = (): boolean => {
    if (!formDataCredenciales.usuario || !formDataCredenciales.contrasena) {
      setMensajeCredenciales({
        texto: 'Por favor ingrese un nombre de usuario y contraseña',
        tipo: 'error'
      });
      return false;
    }

    if (formDataCredenciales.contrasena !== formDataCredenciales.confirmarContrasena) {
      setMensajeCredenciales({
        texto: 'Las contraseñas no coinciden',
        tipo: 'error'
      });
      return false;
    }
    
    return true;
  };

  // Manejo de envío del formulario de información personal
  const handleSubmitPersonal = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validaciones del formulario personal
    if (!validarFormularioPersonal()) {
      return;
    }
    
    // Preparar datos para la API
    const datosRegistroMoto: FormRegisterMotorcycle = {
      cedula: formDataPersonal.cedula,
      nombreCompleto: formDataPersonal.nombreCompleto,
      telefono: formDataPersonal.telefono,
      email: formDataPersonal.email,
      tipoDeMoto: formDataPersonal.tipoDeMoto,
      placaMoto: formDataPersonal.placaMoto,
      modeloMoto: formDataPersonal.modeloMoto,
      descripcionServicio: formDataPersonal.descripcionServicio
    };
    
    setCargandoPersonal(true);
    
    try {
      // Enviar datos a la API (el backend calculará el total basado en la descripción)
      const respuesta = await registerMotorcycle(datosRegistroMoto);
      
      // Mostrar mensaje de éxito 
      setMensajePersonal({
        texto: 'Servicio registrado exitosamente',
        tipo: 'success'
      });
      
      // Limpiar formulario
      setFormDataPersonal({
        cedula: '',
        nombreCompleto: '',
        telefono: '',
        email: '',
        tipoDeMoto: '',
        placaMoto: '',
        modeloMoto: '',
        descripcionServicio: ''
      });
      
      console.log('Motocicleta registrada:', respuesta);
    } catch (error) {
      console.error('Error al registrar motocicleta:', error);
      
      // Mostrar mensaje de error
      setMensajePersonal({
        texto: 'Error al registrar la motocicleta. Por favor intente nuevamente.',
        tipo: 'error'
      });
    } finally {
      setCargandoPersonal(false);
    }
  };

  // Manejo de envío del formulario de credenciales
  const handleSubmitCredenciales = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validar formulario de credenciales
    if (!validarFormularioCredenciales()) {
      return;
    }
    
    // Preparar datos para el registro
    const datosRegistro: AuthData = {
      username: formDataCredenciales.usuario,
      password: formDataCredenciales.contrasena,
    };
    
    setCargando(true);
    
    try {
      // Enviar datos al servicio de autenticación
      const respuesta = await register(datosRegistro);
      
      // Mostrar mensaje de éxito
      setMensajeCredenciales({
        texto: 'Usuario registrado exitosamente en el sistema',
        tipo: 'success'
      });
      
      // Limpiar formulario
      setFormDataCredenciales({
        usuario: '',
        contrasena: '',
        confirmarContrasena: ''
      });
      
      console.log('Respuesta del servidor:', respuesta);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      
      // Mostrar mensaje de error
      setMensajeCredenciales({
        texto: 'Error al registrar usuario. Puede que el nombre de usuario ya exista.',
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <h2>Gestión de Usuarios</h2>
        <div className="admin-nav">
          <Link to="/admin/solicitudes" className="admin-nav-link">Solicitudes</Link>
          <Link to="/admin/usuarios" className="admin-nav-link active">Gestión de Usuarios</Link>
        </div>
      </div>
      
      <div className="usuarios-container">
        {/* Formulario de Credenciales de Acceso */}
        <div className="registro-usuario-container">
          <h3>Credenciales de Acceso</h3>
          
          {mensajeCredenciales && (
            <div className={`mensaje-${mensajeCredenciales.tipo}`}>
              {mensajeCredenciales.texto}
              <button 
                className="cerrar-mensaje" 
                onClick={() => setMensajeCredenciales(null)}
              >
                ×
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmitCredenciales} className="registro-form">
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="usuario">Nombre de Usuario*</label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    value={formDataCredenciales.usuario}
                    onChange={handleChangeCredenciales}
                    required
                    disabled={cargando}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="contrasena">Contraseña*</label>
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={formDataCredenciales.contrasena}
                    onChange={handleChangeCredenciales}
                    required
                    disabled={cargando}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="confirmarContrasena">Confirmar Contraseña*</label>
                  <input
                    type="password"
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    value={formDataCredenciales.confirmarContrasena}
                    onChange={handleChangeCredenciales}
                    required
                    disabled={cargando}
                  />
                </div>
                <div className="form-group">
                  {/* Espacio en blanco para mantener el diseño */}
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn primary" 
                disabled={cargando}
              >
                {cargando ? 'Registrando...' : 'Registrar Credenciales'}
              </button>
              <button 
                type="reset" 
                className="btn secondary"
                disabled={cargando}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
        
        {/* Formulario de Información Personal */}
        <div className="registro-usuario-container">
          <h3>Información del Cliente</h3>
          
          {mensajePersonal && (
            <div className={`mensaje-${mensajePersonal.tipo}`}>
              {mensajePersonal.texto}
              <button 
                className="cerrar-mensaje" 
                onClick={() => setMensajePersonal(null)}
              >
                ×
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmitPersonal} className="registro-form">
            <div className="form-section">
              <h4 
                className="section-title-collapsible"
                onClick={() => setPersonalColapsado(!personalColapsado)}
              >
                Datos Personales
                <span className={`toggle-icon ${personalColapsado ? 'collapsed' : ''}`}>
                  {personalColapsado ? '+' : '−'}
                </span>
              </h4>
              <div className={`section-content ${personalColapsado ? 'collapsed' : ''}`}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cedula">Cédula*</label>
                    <input
                      type="text"
                      id="cedula"
                      name="cedula"
                      value={formDataPersonal.cedula}
                      onChange={handleChangePersonal}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="nombreCompleto">Nombre Completo*</label>
                    <input
                      type="text"
                      id="nombreCompleto"
                      name="nombreCompleto"
                      value={formDataPersonal.nombreCompleto}
                      onChange={handleChangePersonal}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono*</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formDataPersonal.telefono}
                      onChange={handleChangePersonal}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formDataPersonal.email}
                      onChange={handleChangePersonal}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h4 
                className="section-title-collapsible"
                onClick={() => setMotoColapsada(!motoColapsada)}
              >
                Datos de la Moto
                <span className={`toggle-icon ${motoColapsada ? 'collapsed' : ''}`}>
                  {motoColapsada ? '+' : '−'}
                </span>
              </h4>
              <div className={`section-content ${motoColapsada ? 'collapsed' : ''}`}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tipoMoto">Tipo de Moto*</label>
                    <input
                      type="text"
                      id="tipoMoto"
                      name="tipoMoto"
                      value={formDataPersonal.tipoDeMoto}
                      onChange={handleChangePersonal}
                      placeholder="Ej: Honda CBR 600"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="placaMoto">Placa*</label>
                    <input
                      type="text"
                      id="placaMoto"
                      name="placaMoto"
                      value={formDataPersonal.placaMoto}
                      onChange={handleChangePersonal}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="modeloMoto">Modelo/Año</label>
                    <input
                      type="text"
                      id="modeloMoto"
                      name="modeloMoto"
                      value={formDataPersonal.modeloMoto}
                      onChange={handleChangePersonal}
                      placeholder="Ej: 2020"
                    />
                  </div>
                  <div className="form-group">
                    {/* Espacio en blanco para mantener el diseño */}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="descripcionServicio">Descripción del Servicio</label>
                    <textarea
                      id="descripcionServicio"
                      name="descripcionServicio"
                      value={formDataPersonal.descripcionServicio}
                      onChange={handleChangePersonal}
                      placeholder="Describa el servicio requerido para la moto"
                      rows={4}
                      className="descripcion-servicio"
                    ></textarea>
                    
                    <small className="descripcion-nota">
                      Describa detalladamente las piezas o repuestos necesarios.
                      El sistema calculará automáticamente el costo estimado basado en precios actuales.
                    </small>
                    
                    {/* Componente de previsualización de precios */}
                    <PreciosPreview descripcion={formDataPersonal.descripcionServicio} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn primary"
                disabled={cargandoPersonal}
              >
                {cargandoPersonal ? 'Registrando...' : 'Registrar Servicio'}
              </button>
              <button 
                type="reset" 
                className="btn secondary"
                disabled={cargandoPersonal}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios; 
