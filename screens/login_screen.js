import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/simple_layout";
import styles from "../styles/login_styles";
import { login } from "../services/api";  // Asegúrate de que esta ruta apunte a donde tienes la función de login.
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage


const API_URL = 'http://192.168.1.4:3000'; // 👈 sin /api



export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await login(username, password);
  
        if (response.success && response.data.token) {
          await AsyncStorage.setItem("userToken", response.data.token);
          navigation.navigate("Home");
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      } catch (error) {
        alert("Error al iniciar sesión. Verifica tus credenciales.");
        console.error(error);
      }
    } else {
      alert("Por favor ingresa usuario y contraseña");
    }
  };
  
  return (
    <Layout>
      <View style={styles.container}>
        <Video
          source={require("../assets/video.mp4")}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay
          isMuted
        />
        <Text style={styles.title}>INICIAR SESIÓN</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />

        {/* Campo para la contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Oculta el texto para la contraseña
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
