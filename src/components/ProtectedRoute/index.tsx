import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth/auth';
import AccessDenied from '../AccessDenied';

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const userData = getCurrentUser();
      console.log('AdminRoute - Datos de usuario:', userData);
      
      if (userData && userData.role === 'Admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #ff6b00',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <p>Verificando permisos...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Si no es admin, mostrar acceso denegado
  if (!isAdmin) {
    return <AccessDenied />;
  }

  // Si es admin, permitir acceso a la ruta protegida
  return <Outlet />;
};

export default AdminRoute; 