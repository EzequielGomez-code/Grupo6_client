import type { AuthData } from "../../types";
import api from "../config/api";

export const register = async (data: AuthData) => {

  try {
    const url = "api/users";
    const response = await api.post(url, data);
    console.log("DESDE EL REGISTER" + url)

    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const login = async (data: AuthData) => {
  try {
    const url = "api/users/login";
    const response = await api.post(url, data);
    console.log("DESDE EL LOGIN", url, response.data);

    // Comprobar si la respuesta es satisfactoria
    if (response.data) {
      // Si la respuesta es directamente el objeto usuario
      if (response.data.username) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        console.log('Guardado en localStorage (directo):', response.data);
      } 
      // Si el usuario está dentro de la propiedad 'user'
      else if (response.data.user && response.data.user.username) {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        console.log('Guardado en localStorage (anidado):', response.data.user);
      } 
      // Respuesta incompleta
      else {
        console.warn("La respuesta del servidor no contiene un objeto 'user' válido:", response.data);
        // Intentar guardar de todas formas
        localStorage.setItem('userData', JSON.stringify(response.data));
      }
    }
    
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario eliminando los datos de localStorage
 * @returns {boolean} - true si la sesión se cerró correctamente
 */
export const logout = (): boolean => {
  try {
    localStorage.removeItem('userData');
    console.log('Sesión cerrada correctamente');
    return true;
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
    return false;
  }
};

/**
 * Verifica si hay un usuario autenticado
 * @returns {boolean} - true si hay un usuario autenticado
 */
export const isAuthenticated = (): boolean => {
  try {
    const userData = localStorage.getItem('userData');
    return !!userData; // Convierte a booleano
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
};

/**
 * Obtiene los datos del usuario actual
 * @returns {Object|null} - Datos del usuario o null si no hay usuario autenticado
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return null;
  }
};



