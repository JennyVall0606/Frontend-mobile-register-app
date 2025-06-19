import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import Layout from "../components/simple_layout";
import styles from "../styles/login_styles";
import { login } from "../services/api";  
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const API_URL = "http://172.20.10.2:3000";



export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await login(username, password);
  
        if (response.success && response.data.token) {
          await AsyncStorage.setItem("token", response.data.token);
          navigation.navigate("Home");
        } else {
          Alert.alert(
            "Error",
          "Error al iniciar sesión. Verifica tus credenciales.",
          [{ text: "OK" }]
            
          );
        }
      } catch (error) {
        Alert.alert(
          "🚫Advertencia",
            "Usuario o contraseña incorrectos.",
            [{ text: "OK" }]
        );
        console.error(error);
      }
    } else {
      Alert.alert(
        "⚠️Atención",
        "Por favor ingresa usuario y contraseña.",
        [{ text: "OK" }]
      );
    }
  };
  
  return (
    <Layout>
      <View style={styles.container}>

         <Image 
        source={require('../assets/Logo_Negativo.png')} // Ruta a tu imagen
        style={styles.logo} // Aquí puedes agregar un estilo para la imagen
      />

     <View style={styles.inputContainer}>
      <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="AgroGestor@gmail.com" // Ejemplo de correo
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="rgba(128, 128, 128, 0.5)" // Color gris para el texto del placeholder
        />
      </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>   
        <TextInput
          style={styles.input}
          placeholder="********************" // Ejemplo de la contraseña
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Esto oculta la contraseña como asteriscos
          placeholderTextColor="rgba(128, 128, 128, 0.5)" // Color gris para el texto del placeholder
        />
      </View>

        
       

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
