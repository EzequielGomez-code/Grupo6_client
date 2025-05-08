import { type FC } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="container">
          <h2 style={{color: 'white'}}>El mejor taller de motos de la ciudad</h2>
          <p style={{color: 'white'}}>Servicio profesional para tu motocicleta con técnicos certificados</p>
          <div className="hero-buttons">
            <Link to="/consultar" className="hero-btn primary-btn">Consultar Moto</Link>
            <a href="#contacto" className="hero-btn secondary-btn">Contáctanos</a>
          </div>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero; 