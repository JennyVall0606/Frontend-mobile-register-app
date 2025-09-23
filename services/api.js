import axios from 'axios';

const API_URL = "https://webmobileregister-production.up.railway.app";

// Guardar el token de acceso y refresh token
const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Recuperar el token de acceso
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Recuperar el refresh token
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Función para renovar el token usando el refresh token
const renovarToken = async () => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token no disponible");
    }

    const response = await axios.post(`${API_URL}/api/renovar-token`, { refreshToken });

    if (response.status === 200) {
      const { accessToken } = response.data;
      saveTokens(accessToken, refreshToken); // Guarda el nuevo access token
      return accessToken;
    } else {
      throw new Error("Error al renovar el token");
    }
  } catch (error) {
    console.error("Error al renovar el token:", error);
    throw error;
  }
};

// Configuración de Axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor de Axios para manejar la renovación automática del token
api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    // Si el token ha expirado, renueva el token
    if (token && isTokenExpired(token)) {
      token = await renovarToken();
    }

    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
  const decodedToken = jwt.decode(token);
  if (!decodedToken) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

// Función de login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      correo: username,
      contraseña: password,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken); // Guardamos ambos tokens
      return { success: true, data: response.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
};

export default api;


