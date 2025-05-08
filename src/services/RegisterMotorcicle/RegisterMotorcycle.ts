import type { FormRegisterMotorcycle } from "../../types";
import api from "../config/api";


export const registerMotorcycle = async (formData: FormRegisterMotorcycle) => {
  try {
    // Obtener el ID del usuario desde localStorage
    const userData = localStorage.getItem('userData');
    let userId = '1'; // Valor por defecto en caso de error
    
    if (userData) {
      const user = JSON.parse(userData);
      // Verificar si el ID está disponible en diferentes propiedades posibles
      userId = user.id || user._id || user.userId ;
    }
    
    const url = `api/users/createRegister/${userId}`;
    const response = await api.post(url, formData);
    
    console.log("Motocicleta registrada exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar la motocicleta:", error);
    throw error;
  }
};

export const getRegisters = async () => {
  try {

    const url = `api/users/getRegisters`;
    const response = await api.get(url);
    
    console.log("Registros obtenidos exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    throw error;
  }
};

export const updateRegisterStatus = async (registerId: number, estado: string) => {
  try {
    const url = `api/users/updateRegister/${registerId}`;
    const response = await api.put(url, { estado });
    
    console.log("Estado de registro actualizado exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado del registro:", error);
    throw error;
  }
};

export const getRegisterByCedula = async (datos: { cedula: string, codigoMoto: string }) => {
  try {
    const url = `api/users/getRegisterByCedula`;
    
    // Enviar los datos directamente en el formato requerido
    const response = await api.post(url, datos);
    
    console.log("Registros obtenidos exitosamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    throw error;
  }
};


