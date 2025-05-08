import { type FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Solicitudes.css';
import { getRegisters, updateRegisterStatus } from '../../../services/RegisterMotorcicle/RegisterMotorcycle';
import type { Solicitud } from '../../../types';
import type { EstadoSolicitud } from '../../../types';

const estadosIniciales: Record<number, EstadoSolicitud> = {
  1: 'Recibido',
  2: 'En proceso',
  3: 'Listo',
};

const AdminSolicitudes: FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actualizandoEstado, setActualizandoEstado] = useState<number | null>(null);
  
  // Cargar los datos de las solicitudes desde la API al montar el componente
  useEffect(() => {
    const cargarSolicitudes = async () => {
      try {
        setCargando(true);
        setError(null);
        
        // Obtener los datos de la API
        const registrosData = await getRegisters();
        console.log('Datos recibidos de la API:', registrosData);
        
        // Transformar los datos recibidos al formato de nuestro componente
        const solicitudesFormateadas: Solicitud[] = registrosData.map((registro: any, index: number) => ({
          id: registro.id || index + 1,
          cedula: registro.cedula || '',
          nombreCompleto: registro.nombreCompleto || '',
          telefono: registro.telefono || '',
          email: registro.email,
          tipoDeMoto: registro.tipoDeMoto || '',
          placaMoto: registro.placaMoto || '',
          modeloMoto: registro.modeloMoto,
          descripcionServicio: registro.descripcionServicio || '',
          estado: estadosIniciales[index + 1] || 'Recibido', // Estado predeterminado
          fecha: registro.createdAt || new Date().toISOString().split('T')[0]
        }));
        
        setSolicitudes(solicitudesFormateadas);
      } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
        setError('No se pudieron cargar las solicitudes. Por favor, intente nuevamente.');
        
        // Si la API falla, usar datos de ejemplo (en un entorno de producción, esto se manejaría de manera diferente)
        // setSolicitudes(solicitudesMock);
      } finally {
        setCargando(false);
      }
    };
    
    cargarSolicitudes();
  }, []);
  
  const cambiarEstado = async (id: number, nuevoEstado: EstadoSolicitud) => {
    try {
      setActualizandoEstado(id);
      
      // Llamada a la API para actualizar el estado
      await updateRegisterStatus(id, nuevoEstado);
      
      // Actualizar el estado local si la API fue exitosa
      setSolicitudes(prevSolicitudes => 
        prevSolicitudes.map(solicitud => 
          solicitud.id === id ? { ...solicitud, estado: nuevoEstado } : solicitud
        )
      );
      
      console.log(`Solicitud ${id} cambió a estado: ${nuevoEstado}`);
    } catch (error) {
      console.error(`Error al actualizar el estado de la solicitud ${id}:`, error);
      // Se podría mostrar un mensaje de error en la interfaz
    } finally {
      setActualizandoEstado(null);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <h2>Gestión de Solicitudes</h2>
        <div className="admin-nav">
          <Link to="/admin/solicitudes" className="admin-nav-link active">Solicitudes</Link>
          <Link to="/admin/usuarios" className="admin-nav-link">Gestión de Usuarios</Link>
        </div>
      </div>
      
      <div className="solicitudes-container">
        <div className="solicitudes-header">
          <h3>Solicitudes de Servicio</h3>
          <div className="solicitudes-stats">
            <div className="stat-item">
              <span className="stat-count">{solicitudes.filter(s => s.estado === 'Recibido').length}</span>
              <span className="stat-label">Recibidas</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">{solicitudes.filter(s => s.estado === 'En proceso').length}</span>
              <span className="stat-label">En Proceso</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">{solicitudes.filter(s => s.estado === 'Listo').length}</span>
              <span className="stat-label">Completadas</span>
            </div>
          </div>
        </div>
        
        {cargando ? (
          <div className="cargando-container">
            <div className="spinner"></div>
            <p>Cargando solicitudes...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-mensaje">{error}</p>
            <button className="btn primary" onClick={() => window.location.reload()}>
              Intentar de nuevo
            </button>
          </div>
        ) : (
          <div className="solicitudes-table-container">
            {solicitudes.length === 0 ? (
              <div className="sin-solicitudes">
                <p>No hay solicitudes registradas.</p>
              </div>
            ) : (
              <table className="solicitudes-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Teléfono</th>
                    <th>Motocicleta</th>
                    <th>Servicio</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map(solicitud => (
                    <tr key={solicitud.id} className={`estado-${solicitud.estado.toLowerCase().replace(' ', '-')}`}>
                      <td>{solicitud.id}</td>
                      <td>{solicitud.nombreCompleto}</td>
                      <td>{solicitud.telefono}</td>
                      <td>{`${solicitud.tipoDeMoto} ${solicitud.placaMoto}`}</td>
                      <td>{solicitud.descripcionServicio}</td>
                      <td>{solicitud.fecha}</td>
                      <td>
                        <span className={`estado-badge ${solicitud.estado.toLowerCase().replace(' ', '-')}`}>
                          {solicitud.estado}
                        </span>
                      </td>
                      <td>
                        <div className="estado-actions">
                          <button 
                            className={`estado-btn recibido ${solicitud.estado === 'Recibido' ? 'active' : ''}`}
                            onClick={() => cambiarEstado(solicitud.id, 'Recibido')}
                            disabled={solicitud.estado === 'Recibido' || actualizandoEstado === solicitud.id}
                          >
                            {actualizandoEstado === solicitud.id && solicitud.estado !== 'Recibido' ? 'Actualizando...' : 'Recibido'}
                          </button>
                          <button 
                            className={`estado-btn en-proceso ${solicitud.estado === 'En proceso' ? 'active' : ''}`}
                            onClick={() => cambiarEstado(solicitud.id, 'En proceso')}
                            disabled={solicitud.estado === 'En proceso' || actualizandoEstado === solicitud.id}
                          >
                            {actualizandoEstado === solicitud.id && solicitud.estado !== 'En proceso' ? 'Actualizando...' : 'En proceso'}
                          </button>
                          <button 
                            className={`estado-btn listo ${solicitud.estado === 'Listo' ? 'active' : ''}`}
                            onClick={() => cambiarEstado(solicitud.id, 'Listo')}
                            disabled={solicitud.estado === 'Listo' || actualizandoEstado === solicitud.id}
                          >
                            {actualizandoEstado === solicitud.id && solicitud.estado !== 'Listo' ? 'Actualizando...' : 'Listo'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSolicitudes; 