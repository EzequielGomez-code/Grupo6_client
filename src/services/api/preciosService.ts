import api from '../config/api';
import type { PrecioEstimadoResponse, AnalisisDescripcionResponse } from '../../types';

/**
 * Obtiene un precio estimado para una pieza consultando al backend
 * @param consulta - Nombre de la pieza a consultar
 * @returns Objeto con precio en pesos dominicanos (DOP)
 */
export const obtenerPrecioEstimado = async (consulta: string): Promise<PrecioEstimadoResponse> => {
  try {
    const url = 'api/precios/estimacion';
    const response = await api.post(url, { consulta });
    
    return {
      precioDOP: response.data.precioDOP
    };
  } catch (error) {
    console.error('Error al obtener precio estimado:', error);
    // Devolver valores por defecto en caso de error
    return {
      precioDOP: 2100.00 // Valor por defecto igual al costo de mano de obra
    };
  }
};

/**
 * Analiza una descripción completa para detectar piezas mencionadas y sus precios
 * @param descripcion - Texto de la descripción a analizar
 * @returns Objeto con piezas detectadas y total en pesos dominicanos
 */
export const analizarDescripcion = async (descripcion: string): Promise<AnalisisDescripcionResponse> => {
  try {
    const url = 'api/precios/analisis';
    const response = await api.post(url, { descripcion });
    
    return {
      piezasDetectadas: response.data.piezasDetectadas,
      totalDOP: response.data.totalDOP
    };
  } catch (error) {
    console.error('Error al analizar descripción:', error);
    // Devolver objeto vacío en caso de error
    return {
      piezasDetectadas: [],
      totalDOP: 0
    };
  }
}; 