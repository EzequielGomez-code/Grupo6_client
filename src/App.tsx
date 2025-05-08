import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import AdminSolicitudes from './pages/Admin/Solicitudes';
import AdminServicios from './pages/Admin/Usuarios';
import AdminLogin from './pages/Admin/Login';
import ConsultarEstado from './pages/CrearSolicitud';
import Navbar from './components/Navbar';
import AdminRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [showNavbar] = useState(true);

  return (
    <div className="App">
      <Router>
        {showNavbar && <Navbar />}
        <main>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/consultar" element={<ConsultarEstado />} />
            
            {/* Rutas protegidas para administradores */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Navigate to="/admin/solicitudes" replace />} />
              <Route path="/admin/solicitudes" element={<AdminSolicitudes />} />
              <Route path="/admin/usuarios" element={<AdminServicios />} />
            </Route>
            
            {/* Ruta por defecto - redirige al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
      </div>
  );
}

export default App;
