import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

class AuthManager {
  constructor() {
    // 🚨 CAMBIA ESTA URL POR LA DE TU SERVIDOR
    this.API_BASE_URL = 'https://tu-servidor.com/api';
    this.currentUser = null;
    this.authToken = null;
  }

  /**
   * Método de prueba para verificar que todo funciona
   */
  async testConnection() {
    try {
      console.log('🧪 Probando conexión...');
      
      // Probar AsyncStorage
      await AsyncStorage.setItem('test_key', 'test_value');
      const testValue = await AsyncStorage.getItem('test_key');
      console.log('✅ AsyncStorage funciona:', testValue);
      
      // Probar NetInfo
      const networkState = await NetInfo.fetch();
      console.log('✅ NetInfo funciona:', networkState.isConnected ? 'Online' : 'Offline');
      
      return true;
    } catch (error) {
      console.error('❌ Error en pruebas:', error);
      return false;
    }
  }

  /**
   * Login simple para probar (SIN bcrypt por ahora)
   */
  async simpleLogin(email, password) {
    try {
      console.log('🔐 Login simple para:', email);
      
      // Verificar conexión
      const networkState = await NetInfo.fetch();
      const isConnected = networkState.isConnected;
      
      console.log('📶 Estado de conexión:', isConnected ? 'Online' : 'Offline');
      
      // Simular usuario válido (para pruebas)
      if (email === 'test@test.com' && password === '123456') {
        const userData = {
          id: 1,
          correo: email,
          rol: 'user',
          nombre: 'Usuario de Prueba'
        };
        
        const fakeToken = 'fake-token-' + Date.now();
        
        // Guardar en AsyncStorage
        await AsyncStorage.setItem('current_user', JSON.stringify(userData));
        await AsyncStorage.setItem('auth_token', fakeToken);
        
        this.currentUser = userData;
        this.authToken = fakeToken;
        
        return {
          success: true,
          user: userData,
          token: fakeToken,
          source: isConnected ? 'online' : 'offline'
        };
      } else {
        return {
          success: false,
          error: 'Credenciales incorrectas. Usa test@test.com / 123456'
        };
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      return {
        success: false,
        error: 'Error de autenticación'
      };
    }
  }

  /**
   * Verificar sesión guardada
   */
  async checkSavedSession() {
    try {
      const savedUser = await AsyncStorage.getItem('current_user');
      const savedToken = await AsyncStorage.getItem('auth_token');
      
      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);
        this.currentUser = userData;
        this.authToken = savedToken;
        
        return {
          user: userData,
          token: savedToken
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error verificando sesión:', error);
      return null;
    }
  }

  /**
   * Logout
   */
  async logout() {
    try {
      console.log('🚪 Cerrando sesión...');
      
      // Limpiar memoria
      this.currentUser = null;
      this.authToken = null;
      
      // Limpiar AsyncStorage
      await AsyncStorage.removeItem('current_user');
      await AsyncStorage.removeItem('auth_token');
      
      console.log('✅ Sesión cerrada');
      return true;
    } catch (error) {
      console.error('❌ Error en logout:', error);
      return false;
    }
  }

  // Getters
  getCurrentUser() {
    return this.currentUser;
  }

  getAuthToken() {
    return this.authToken;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }
}

export default new AuthManager();