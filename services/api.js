import axios from 'axios';


const API_URL = 'http://172.20.10.2:3000';






export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/login`, {
            correo: username,
            contraseña: password,
          });
          
     
      if (response.status === 200) {
        return { success: true, data: response.data }; 
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };


