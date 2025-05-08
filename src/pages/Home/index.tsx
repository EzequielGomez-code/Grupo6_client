import { type FC } from 'react';
import Hero from '../../components/Hero';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import imagengrupo from '../../assets/imagengrupo.jpg';
import './Home.css';

const Home: FC = () => {
  return (
    <div className="home">
      <Hero />
      
      <section id="servicios" className="services">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3>Mantenimiento General</h3>
              <p>Servicio completo para mantener tu motocicleta en óptimas condiciones.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>
                </svg>
              </div>
              <h3>Reparación de Motor</h3>
              <p>Diagnosticamos y reparamos problemas de motor con precisión.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </div>
              <h3>Repuestos Originales</h3>
              <p>Trabajamos con las mejores marcas para garantizar calidad.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="about">
        <div className="container">
          <h2>Sobre Taller Del Barrio</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Con más de <strong>15 años de experiencia</strong>, somos el taller de confianza para los motociclistas de la ciudad. Nuestro equipo de técnicos certificados trabaja con pasión y profesionalismo.</p>
              <p>Utilizamos herramientas de última generación y ofrecemos garantía en todos nuestros trabajos. Nuestro compromiso es brindar un servicio rápido, honesto y de calidad que supere sus expectativas.</p>
              <p>En Taller Del Barrio valoramos la confianza de nuestros clientes y trabajamos para construir relaciones duraderas basadas en resultados.</p>
            </div>
            <div className="about-image">
              <img src={imagengrupo} alt="Equipo de Taller Del Barrio" className="about-team-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h2>Nuestro Trabajo</h2>
          <div className="gallery-container">
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={img1} alt="Trabajo en motocicleta" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Reparación Especializada</h3>
                    <p>Diagnósticos precisos y reparaciones de calidad</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={img2} alt="Taller mecánico" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Equipamiento Moderno</h3>
                    <p>Tecnología de punta para el mejor servicio</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-image-wrapper">
                <img src={img3} alt="Motocicleta en servicio" className="gallery-image" />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Atención Personalizada</h3>
                    <p>Cada motocicleta recibe un cuidado único</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="container">
          <h2>Contacto</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Av. Principal #123, Ciudad
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:(123)456-7890">(123) 456-7890</a>
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:info@tallerdelbarrio.com">info@tallerdelbarrio.com</a>
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Lunes a Sábado: 8:00 AM - 6:00 PM
              </p>
            </div>
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.9880680675149!2d-69.8999749305029!3d18.485820970819635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8955d10e998d%3A0x66707eac9b93a7ba!2sC.%20Arzobispo%20Valera%20142%2C%20Santo%20Domingo%2010308!5e0!3m2!1ses-419!2sdo!4v1746585223669!5m2!1ses-419!2sdo" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del taller"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 