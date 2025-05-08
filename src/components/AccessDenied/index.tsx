import { type FC } from 'react';
import { Link } from 'react-router-dom';
import './AccessDenied.css';

const AccessDenied: FC = () => {
  return (
    <div className="access-denied-container">
      <div className="access-denied-content">
        <div className="access-denied-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="#f44336" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta sección. Esta área está reservada para administradores.</p>
        <div className="access-denied-actions">
          <Link to="/" className="btn-primary">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied; 