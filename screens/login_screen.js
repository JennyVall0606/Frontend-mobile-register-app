// screens/login_screen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';

import styles from "../styles/login_styles";
import AuthManager from '../services/AuthManager';

export default function LoginScreen() {
  const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("screen");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Monitorear conexión
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log('📶 Estado de red:', state.isConnected ? 'Online' : 'Offline');
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("⚠️Atención", "Por favor ingresa usuario y contraseña.", [{ text: "OK" }]);
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Iniciando proceso de login...');
      
      // Usar el nuevo AuthManager híbrido
      const result = await AuthManager.login(username, password);

      if (result.success) {
        const mode = result.mode === 'online' ? 'en línea ✅' : 'sin conexión 📵';
        
        Alert.alert(
          '✅ Inicio de sesión exitoso',
          `Has iniciado sesión ${mode}`,
          [
            {
              text: 'Continuar',
              onPress: () => navigation.navigate("Home")
            }
          ]
        );
      } else {
        // Login fallido
        let mensaje = result.message || 'Credenciales incorrectas';
        
        if (!isConnected && mensaje.includes('guardadas')) {
          mensaje = 'No tienes conexión a internet y no has iniciado sesión anteriormente.\n\nPara usar el modo offline, debes iniciar sesión online al menos una vez.';
        }
        
        Alert.alert("❌ Error", mensaje, [{ text: "OK" }]);
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      
      let mensaje = 'Error al iniciar sesión';
      
      if (error.message.includes('Network') || error.code === 'ERR_NETWORK') {
        mensaje = 'No se pudo conectar con el servidor.\n\nVerifica tu conexión a internet o intenta más tarde.';
      } else if (error.response?.status === 401) {
        mensaje = 'Usuario o contraseña incorrectos';
      } else if (error.response?.status === 404) {
        mensaje = 'Usuario no encontrado';
      }
      
      Alert.alert("🚫 Error de conexión", mensaje, [{ text: "OK" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      {/* Fondo fijo */}
      <ImageBackground
        source={require("../assets/acuarela.png")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SCREEN_W,
          height: SCREEN_H,
        }}
        resizeMode="cover"
        pointerEvents="none"
      />

      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? Math.max(insets.top, 0) : 0,
        }}
      >
        {/* Header con logo */}
        <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 }}>
          <Image
            source={require("../assets/Logo_Negativo.png")}
            style={[styles.logo]}
            resizeMode="contain"
          />
        </View>

        {/* 🆕 Indicador de conexión */}
        <View style={{
          position: 'absolute',
          top: 60,
          right: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isConnected ? '#4CAF50' : '#FF5722',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          zIndex: 10,
        }}>
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#fff',
            marginRight: 6,
          }} />
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
            {isConnected ? 'En línea' : 'Sin conexión'}
          </Text>
        </View>

        {/* Formulario con scroll */}
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={24}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 24,
            flexGrow: 1,
          }}
        >
          <View>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="AgroGestor@gmail.com"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(128,128,128,0.5)"
                  returnKeyType="next"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="********************"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="rgba(128,128,128,0.5)"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  editable={!loading}
                />
              </View>

              <TouchableOpacity 
                style={[styles.button, loading && { opacity: 0.6 }]} 
                onPress={handleLogin} 
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>ENTRAR</Text>
                )}
              </TouchableOpacity>

              {/* 🆕 Mensaje informativo offline */}
              {!isConnected && (
                <View style={{
                  marginTop: 20,
                  padding: 12,
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#FF9800',
                }}>
                  <Text style={{
                    color: '#E65100',
                    fontSize: 13,
                    textAlign: 'center',
                    lineHeight: 18,
                  }}>
                    📵 Modo sin conexión
                    {'\n'}
                    Solo puedes iniciar sesión si ya lo has hecho anteriormente con conexión a internet.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}