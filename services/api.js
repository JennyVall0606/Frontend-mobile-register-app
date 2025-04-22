import axios from 'axios';

// Configura la URL base de tu API
const API_URL = 'http://192.168.1.4:3000'; // 👈 sin /api



// Función para obtener productos desde el backend
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/login`, {
            correo: username,
            contraseña: password,
          });
          
      // Si el login es exitoso, la respuesta debería incluir un token o algún dato para autenticar al usuario
      if (response.status === 200) {
        return { success: true, data: response.data }; // Aquí puedes manejar los datos de respuesta como un token
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

// Si tienes otras funciones como POST, PUT, DELETE, puedes agregarlas aquí

