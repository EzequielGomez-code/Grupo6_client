import { type FC, useState  } from 'react';
import './CrearSolicitud.css';
import { getRegisterByCedula } from '../../services/RegisterMotorcicle/RegisterMotorcycle';
import type { ResultadoBusqueda } from '../../types';

const ConsultarEstado: FC = () => {
  // Estado para el formulario de búsqueda
  const [busqueda, setBusqueda] = useState({
    cedula: '',
    codigoMoto: ''
  });
  
  // Estado para el resultado de la búsqueda
  const [resultado, setResultado] = useState<ResultadoBusqueda | null>(null);
  
  // Estado para mostrar mensaje cuando no se encuentran resultados
  const [noResultados, setNoResultados] = useState(false);

  // Estado para controlar el estado de carga
  const [cargando, setCargando] = useState(false);
  
  // Estado para mostrar mensajes de error
  const [error, setError] = useState<string | null>(null);
  
  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusqueda(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Resetear los estados de resultados cuando el usuario cambia su búsqueda
    setResultado(null);
    setNoResultados(false);
    setError(null);
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar que al menos uno de los campos tenga valor
    if (!busqueda.cedula.trim() && !busqueda.codigoMoto.trim()) {
      setError('Debes ingresar al menos la cédula o el código de moto');
      return;
    }
    
    setCargando(true);
    setError(null);
    setResultado(null);
    setNoResultados(false);

    try {
      // Preparar los datos de búsqueda exactamente como los espera el servidor
      const datosBusqueda = {
        cedula: busqueda.cedula.trim(),
        codigoMoto: busqueda.codigoMoto.trim()
      };
      
      console.log('Enviando datos:', datosBusqueda);
      
      // Enviar el objeto completo a la API
      const respuesta = await getRegisterByCedula(datosBusqueda);
      
      console.log('Respuesta de API:', respuesta);
      
      if (!respuesta) {
        // No se encontraron resultados
        setNoResultados(true);
      } else if (Array.isArray(respuesta)) {
        // Si recibimos un array de resultados, mostrar solo el primero por ahora
        if (respuesta.length > 0) {
          setResultado(formatearResultado(respuesta[0]));
        } else {
          setNoResultados(true);
        }
      } else {
        // Un solo resultado
        setResultado(formatearResultado(respuesta));
      }
    } catch (error) {
      console.error("Error al consultar:", error);
      setError('Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.');
    } finally {
      setCargando(false);
    }
  };
  
  // Función para formatear el resultado de la API
  const formatearResultado = (registroEncontrado: any): ResultadoBusqueda => {
    return {
      id: registroEncontrado.id || 'No disponible',
      cliente: registroEncontrado.nombreCompleto || 'No disponible',
      cedula: registroEncontrado.cedula || 'No disponible',
      moto: `${registroEncontrado.tipoDeMoto || 'No disponible'} ${registroEncontrado.placaMoto || ''}`,
      servicio: registroEncontrado.descripcionServicio || 'Servicio general',
      fechaIngreso: registroEncontrado.createdAt || new Date().toISOString().split('T')[0],
      estado: registroEncontrado.estado || 'Recibido',
      detalles: registroEncontrado.descripcionServicio || 'No hay detalles disponibles',
      // Calcular fecha estimada (3 días después del ingreso)
      fechaEstimada: calcularFechaEstimada(registroEncontrado.createdAt),
      precioTotalDOP: registroEncontrado.totalDOP || 9000000 // Usar el total en DOP del backend
    };
  };
  
  // Función para calcular fecha estimada (3 días después del ingreso)
  const calcularFechaEstimada = (fechaStr?: string): string => {
    if (!fechaStr) return new Date().toISOString().split('T')[0];
    
    const fecha = new Date(fechaStr);
    fecha.setDate(fecha.getDate() + 3); // Añadir 3 días
    return fecha.toISOString().split('T')[0];
  };
  
  return (
    <div className="consultar-estado-page">
      <div className="consulta-hero">
        <div className="overlay"></div>
        <div className="content">
          <h1>Consulta el Estado de tu Moto</h1>
          <p>Ingresa tu cédula y código de moto para verificar el estado de tu servicio</p>
        </div>
      </div>
      
      <div className="container">
        <div className="consulta-container">
          <div className="consulta-form-container">
            <form onSubmit={handleSubmit} className="consulta-form">
              <p className="campos-info">Ingresa al menos uno de los siguientes campos para consultar tu servicio</p>
              <div className="form-group">
                <label htmlFor="cedula">Cédula</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  value={busqueda.cedula}
                  onChange={handleChange}
                  placeholder="Ej: 40208716077"
                  disabled={cargando}
                />
              </div>
              <div className="form-group">
                <label htmlFor="codigoMoto">Código de Moto</label>
                <input
                  type="text"
                  id="codigoMoto"
                  name="codigoMoto"
                  value={busqueda.codigoMoto}
                  onChange={handleChange}
                  placeholder="Ej: MOTO-MVNUL6Y4"
                  disabled={cargando}
                />
                <small className="formato-ayuda">El código debe tener el formato MOTO-XXXXXXXX</small>
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="btn-consultar" disabled={cargando}>
                {cargando ? "Consultando..." : "Consultar"}
              </button>
            </form>
          </div>
          
          {cargando && (
            <div className="cargando-container">
              <div className="spinner"></div>
              <p>Consultando, por favor espera...</p>
            </div>
          )}
          
          {noResultados && !cargando && (
            <div className="no-resultados">
              <div className="icono">🔎</div>
              <h3>No se encontraron resultados</h3>
              <p>No hemos encontrado servicios asociados a los datos ingresados. Verifica la información o contacta con nuestro taller.</p>
            </div>
          )}
          
          {resultado && !cargando && (
            <div className="resultado-consulta">
              <h3>Información del Servicio</h3>
              <div className="servicio-info">
                <div className="estado-badge-container">
                  <span className={`estado-badge ${resultado.estado.toLowerCase().replace(' ', '-')}`}>
                    {resultado.estado}
                  </span>
                </div>
                
                <div className="info-grid">
                  <div className="info-row">
                    <div className="info-label">ID de Servicio:</div>
                    <div className="info-value">{resultado.id}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Cliente:</div>
                    <div className="info-value">{resultado.cliente}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Cédula:</div>
                    <div className="info-value">{resultado.cedula}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Modelo de Moto:</div>
                    <div className="info-value">{resultado.moto}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Tipo de Servicio:</div>
                    <div className="info-value">{resultado.servicio}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Fecha de Ingreso:</div>
                    <div className="info-value">{new Date(resultado.fechaIngreso).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}</div>
                  </div>
                  {resultado.fechaEstimada && (
                    <div className="info-row">
                      <div className="info-label">Fecha Estimada de Entrega:</div>
                      <div className="info-value">{new Date(resultado.fechaEstimada).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}</div>
                    </div>
                  )}
                </div>
                
                {resultado.detalles && (
                  <div className="detalles-servicio">
                    <h4>Detalles del Servicio</h4>
                    <p>{resultado.detalles}</p>
                  </div>
                )}
                
                <div className="progreso-servicio">
                  <h4>Estado del Servicio</h4>
                  <div className="barra-progreso">
                    <div className={`paso ${resultado.estado === 'Recibido' || resultado.estado === 'En proceso' || resultado.estado === 'Listo' ? 'activo' : ''}`}>Recibido</div>
                    <div className={`paso ${resultado.estado === 'En proceso' || resultado.estado === 'Listo' ? 'activo' : ''}`}>En Proceso</div>
                    <div className={`paso ${resultado.estado === 'Listo' ? 'activo' : ''}`}>Listo para retirar</div>
                  </div>
                </div>
                
                {resultado.precioTotalDOP && (
                  <div className="precio-total">
                    <div className="info-label">Precio Total:</div>
                    <div className="info-value">
                      <span className="precio-destacado">RD${resultado.precioTotalDOP?.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      <small className="precio-nota">* Incluye piezas y mano de obra</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultarEstado; 