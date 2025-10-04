import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

class AuthManager {
  constructor() {
    this.API_BASE_URL = 'https://webmobileregister-production.up.railway.app';
    this.currentUser = null;
    this.authToken = null;
  }

  /**
   * Método de prueba para verificar que todo funciona
   */
  async testConnection() {
    try {
      console.log('🧪 Probando conexión...');
      
      await AsyncStorage.setItem('test_key', 'test_value');
      const testValue = await AsyncStorage.getItem('test_key');
      console.log('✅ AsyncStorage funciona:', testValue);
      
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
        
        // 🆕 Guardar credenciales para poder refrescar token después
        await AsyncStorage.setItem('saved_email', email);
        await AsyncStorage.setItem('saved_password', password);
        
        this.currentUser = userData;
        this.authToken = fakeToken;
        
        console.log('✅ Login exitoso, credenciales guardadas');
        
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
   * 🆕 Refrescar token automáticamente
   */
  async refreshToken() {
    try {
      console.log('🔄 Refrescando token...');
      
      // Obtener credenciales guardadas
      const email = await AsyncStorage.getItem('saved_email');
      const password = await AsyncStorage.getItem('saved_password');
      
      if (!email || !password) {
        console.log('❌ No hay credenciales guardadas para refrescar');
        return false;
      }

      console.log('📧 Refrescando token para:', email);
      
      // Verificar conexión
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        console.log('📵 Sin conexión, no se puede refrescar token');
        return false;
      }

      // Hacer login nuevamente (simulado o real según tu backend)
      const loginResult = await this.simpleLogin(email, password);
      
      if (loginResult.success) {
        console.log('✅ Token refrescado exitosamente');
        return true;
      } else {
        console.log('❌ Error al refrescar token:', loginResult.error);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error en refreshToken:', error);
      return false;
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
        
        console.log('✅ Token restaurado:', savedToken.substring(0, 20) + '...');
        
        return { user: userData, token: savedToken };
      }
      
      console.log('⚠️ No hay sesión guardada');
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
      
      this.currentUser = null;
      this.authToken = null;
      
      // Limpiar AsyncStorage (incluyendo credenciales guardadas)
      await AsyncStorage.removeItem('current_user');
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('saved_email');
      await AsyncStorage.removeItem('saved_password');
      
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