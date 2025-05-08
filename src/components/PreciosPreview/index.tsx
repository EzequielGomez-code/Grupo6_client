import { useEffect, useState } from 'react';
import { analizarDescripcion } from '../../services/api/preciosService';
import type { PreciosPreviewProps, PiezaDetectada } from '../../types';
import './PreciosPreview.css';

const PreciosPreview = ({ descripcion }: PreciosPreviewProps) => {
  // Estados para almacenar datos
  const [piezasDetectadas, setPiezasDetectadas] = useState<PiezaDetectada[]>([]);
  const [totalDOP, setTotalDOP] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Costo fijo de mano de obra en pesos dominicanos
  const costoManoDeObra = 2100.00;
  
  // Calcular el subtotal de las piezas (sin mano de obra)
  const calcularSubtotalPiezas = () => {
    let subtotal = 0;
    piezasDetectadas.forEach(pieza => {
      subtotal += pieza.precioDOP || 0;
    });
    return parseFloat(subtotal.toFixed(2));
  };
  
  // El subtotal de solo las piezas
  const subtotalPiezas = calcularSubtotalPiezas();
  
  // Verificar que la suma sea correcta
  const verificarTotal = () => {
    const totalCalculado = subtotalPiezas + costoManoDeObra;
    
    // Si hay una diferencia significativa, mostrar advertencia
    if (Math.abs(totalCalculado - totalDOP) > 1) {
      console.warn('Diferencia en totales:', {
        subtotalPiezas,
        costoManoDeObra,
        suma: totalCalculado,
        totalDOP
      });
    }
    
    // Retornar el valor más confiable
    return parseFloat(totalCalculado.toFixed(2));
  };
  
  const totalVerificado = verificarTotal();
  
  useEffect(() => {
    // Función para analizar la descripción con el backend
    const consultarAnalisis = async () => {
      // No hacer nada si la descripción está vacía o es muy corta
      if (!descripcion || descripcion.length < 3) {
        setPiezasDetectadas([]);
        setTotalDOP(0);
        return;
      }
      
      setCargando(true);
      setError(null);
      
      try {
        // Llamar al servicio que se comunica con el backend
        const resultado = await analizarDescripcion(descripcion);
        
        // Actualizar estados con los resultados
        setPiezasDetectadas(resultado.piezasDetectadas);
        setTotalDOP(resultado.totalDOP);
      } catch (err) {
        console.error('Error al analizar la descripción:', err);
        setError('No se pudieron calcular los precios. Inténtelo más tarde.');
      } finally {
        setCargando(false);
      }
    };
    
    // Usar un debounce para no hacer llamadas con cada letra
    const timeoutId = setTimeout(() => {
      consultarAnalisis();
    }, 800);
    
    // Limpiar el timeout si el componente se desmonta o la descripción cambia
    return () => clearTimeout(timeoutId);
  }, [descripcion]);
  
  // No mostrar nada si no hay datos o está cargando y sin resultados previos
  if ((cargando && piezasDetectadas.length === 0) || piezasDetectadas.length === 0) {
    return null;
  }
  
  return (
    <div className="precios-preview">
      <h4 className="precios-titulo">
        {cargando ? 'Calculando precios...' : 'Piezas detectadas y precios estimados'}
      </h4>
      
      {error ? (
        <p className="precios-error">{error}</p>
      ) : (
        <>
          <div className="piezas-lista">
            {piezasDetectadas.map((pieza, index) => (
              <div key={index} className="pieza-card">
                <div className="pieza-nombre">{pieza.nombre}</div>
                <div className="pieza-precios">
                  <div className="precio">
                    <span className="etiqueta">Precio:</span>
                    <span className="valor">RD${pieza.precioDOP ? pieza.precioDOP.toFixed(2) : '0.00'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="totales-section">
            <div className="total-row">
              <div className="total-label">Subtotal piezas:</div>
              <div className="total-value">RD${subtotalPiezas.toFixed(2)}</div>
            </div>
            <div className="total-row">
              <div className="total-label">Mano de obra:</div>
              <div className="total-value">RD${costoManoDeObra.toFixed(2)}</div>
            </div>
            <div className="total-row grand-total">
              <div className="total-label">Total estimado:</div>
              <div className="total-value">
                <span className="currency-dop">RD${totalVerificado.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <small className="preview-nota">
            * Estos precios son estimados y pueden variar. El total final será calculado por el sistema.
          </small>
        </>
      )}
    </div>
  );
};

export default PreciosPreview; 