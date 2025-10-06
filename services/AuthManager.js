// services/AuthManager.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import * as Crypto from 'expo-crypto';

class AuthManager {
  constructor() {
    this.API_BASE_URL = 'https://webmobileregister-production.up.railway.app';
    this.currentUser = null;
    this.authToken = null;
  }

  async login(correo, contraseña) {
    try {
      console.log('🔐 Iniciando login para:', correo);
      
      const networkState = await NetInfo.fetch();
      const isConnected = networkState.isConnected;
      
      console.log('📶 Estado de conexión:', isConnected ? 'Online' : 'Offline');

      if (isConnected) {
        return await this.loginOnline(correo, contraseña);
      } else {
        return await this.loginOffline(correo, contraseña);
      }
      
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      if (error.message.includes('Network') || error.code === 'ERR_NETWORK') {
        console.log('⚠️ Error de red, intentando login offline...');
        return await this.loginOffline(correo, contraseña);
      }
      
      throw error;
    }
  }

  async loginOnline(correo, contraseña) {
    try {
      console.log('🌐 Intentando login online...');
      
      const response = await axios.post(
        `${this.API_BASE_URL}/api/login`,
        { correo: correo, contraseña: contraseña },
        { timeout: 10000 }
      );

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        const userData = response.data.user || { 
          id: response.data.id || 1, 
          correo: correo 
        };

        const passwordHash = await this.hashPassword(contraseña);
        
        // ✅ USAR 'token' (no 'auth_token')
        await AsyncStorage.multiSet([
          ['token', token],
          ['current_user', JSON.stringify(userData)],
          ['saved_email', correo],
          ['saved_password_hash', passwordHash],
          ['last_login', new Date().toISOString()],
        ]);

        this.authToken = token;
        this.currentUser = userData;

        console.log('✅ Login online exitoso');
        console.log('💾 Token guardado como "token":', token.substring(0, 20) + '...');

        return {
          success: true,
          user: userData,
          token: token,
          mode: 'online'
        };
      }

      return { success: false, message: 'Respuesta inválida del servidor' };
      
    } catch (error) {
      console.error('❌ Error en login online:', error.message);
      throw error;
    }
  }

  async loginOffline(correo, contraseña) {
    try {
      console.log('📵 Intentando login offline...');
      
      const savedEmail = await AsyncStorage.getItem('saved_email');
      const savedPasswordHash = await AsyncStorage.getItem('saved_password_hash');
      const savedUser = await AsyncStorage.getItem('current_user');
      const savedToken = await AsyncStorage.getItem('token');  // ✅ CAMBIO AQUÍ

      if (!savedEmail || !savedPasswordHash || !savedUser) {
        console.log('❌ No hay credenciales guardadas');
        return {
          success: false,
          message: 'No hay credenciales guardadas. Debes iniciar sesión online al menos una vez.'
        };
      }

      if (savedEmail !== correo) {
        console.log('❌ Email no coincide');
        return { success: false, message: 'Usuario incorrecto' };
      }

      const passwordHash = await this.hashPassword(contraseña);
      
      if (passwordHash !== savedPasswordHash) {
        console.log('❌ Contraseña incorrecta');
        return { success: false, message: 'Contraseña incorrecta' };
      }

      const userData = JSON.parse(savedUser);
      this.authToken = savedToken;
      this.currentUser = userData;

      console.log('✅ Login offline exitoso');

      return {
        success: true,
        user: userData,
        token: savedToken,
        mode: 'offline'
      };
      
    } catch (error) {
      console.error('❌ Error en login offline:', error);
      return { success: false, message: 'Error al validar credenciales offline' };
    }
  }

  async hashPassword(password) {
    try {
      return await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password + 'AGRO_GESTOR_SALT_2025'
      );
    } catch (error) {
      console.error('❌ Error hasheando contraseña:', error);
      throw error;
    }
  }

  async refreshToken() {
    try {
      console.log('🔄 Refrescando token...');
      
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        console.log('📵 Sin conexión, no se puede refrescar token');
        return false;
      }

      const savedEmail = await AsyncStorage.getItem('saved_email');
      const savedToken = await AsyncStorage.getItem('token');  // ✅ CAMBIO AQUÍ

      if (!savedEmail || !savedToken) {
        console.log('❌ No hay token para refrescar');
        return false;
      }

      try {
        const response = await axios.get(
          `${this.API_BASE_URL}/api/protegida`,
          {
            headers: { Authorization: `Bearer ${savedToken}` },
            timeout: 5000
          }
        );

        if (response.status === 200) {
          console.log('✅ Token aún válido');
          return true;
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('⚠️ Token expirado, necesita login nuevamente');
          return false;
        }
      }

      return false;
      
    } catch (error) {
      console.error('❌ Error refrescando token:', error);
      return false;
    }
  }

  async checkSavedSession() {
    try {
      const savedUser = await AsyncStorage.getItem('current_user');
      const savedToken = await AsyncStorage.getItem('token');  // ✅ CAMBIO AQUÍ
      
      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);
        this.currentUser = userData;
        this.authToken = savedToken;
        
        console.log('✅ Sesión restaurada:', userData.correo);
        console.log('✅ Token cargado:', savedToken.substring(0, 20) + '...');
        
        return { user: userData, token: savedToken };
      }
      
      console.log('⚠️ No hay sesión guardada');
      return null;
    } catch (error) {
      console.error('❌ Error verificando sesión:', error);
      return null;
    }
  }

  async logout() {
    try {
      console.log('🚪 Cerrando sesión...');
      
      this.currentUser = null;
      this.authToken = null;
      
      await AsyncStorage.multiRemove([
        'current_user',
        'token',  // ✅ CAMBIO AQUÍ
        'last_login'
      ]);
      
      console.log('✅ Sesión cerrada');
      return true;
    } catch (error) {
      console.error('❌ Error en logout:', error);
      return false;
    }
  }

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

  getCurrentUser() {
    return this.currentUser;
  }

  getAuthToken() {
    return this.authToken;
  }

  isAuthenticated() {
    return this.currentUser !== null && this.authToken !== null;
  }
}

export default new AuthManager();