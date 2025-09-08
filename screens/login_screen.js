import React, { useState } from "react";
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
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/login_styles";
import { login } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://webmobileregister-production.up.railway.app";

export default function LoginScreen() {
  const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("screen");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("⚠️Atención", "Por favor ingresa usuario y contraseña.", [{ text: "OK" }]);
      return;
    }
    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.success && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        // @ts-ignore
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Error al iniciar sesión. Verifica tus credenciales.", [{ text: "OK" }]);
      }
    } catch (error) {
      Alert.alert("🚫Advertencia", "Usuario o contraseña incorrectos.", [{ text: "OK" }]);
      console.error(error);
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
    height: SCREEN_H,     // ⬅️ altura fija de pantalla
  }}
  resizeMode="cover"
  pointerEvents="none"     // no interfiere con toques/scroll
/>

      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? Math.max(insets.top, 0) : 0,
        }}
      >
        {/* Header fijo con logo */}
        <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 }}>
          <Image
            source={require("../assets/Logo_Negativo.png")}
            style={[styles.logo]}
            resizeMode="contain"
          />
        </View>

       {/* Solo el formulario hace scroll */}
<KeyboardAwareScrollView
  enableOnAndroid
  keyboardShouldPersistTaps="handled"
  extraScrollHeight={24}              // empuja un poco más cuando enfocas inputs
  contentContainerStyle={{
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexGrow: 1,                      // permite crecer y scrollear si hace falta
  }}
>
  {/* ⚠️ QUITA justifyContent:"center" para no bloquear el scroll */}
  <View style={{ /* no justifyContent aquí */ }}>
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
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>ENTRAR</Text>}
      </TouchableOpacity>
    </View>
  </View>
</KeyboardAwareScrollView>

      </SafeAreaView>
    </View>
  );
}
