import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput,  scrollViewRef, Image, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/layoutlogin";
import styles from "../styles/login_styles";
import { login } from "../services/api";  
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const API_URL = "https://webmobileregister-production.up.railway.app";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    if (username && password) {
      setLoading(true); 
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
      } finally {
        setLoading(false); 
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

         <Image 
              source={require('../assets/Logo_Negativo.png')} 
              style={styles.logo}
            />
            
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
         

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                placeholder="AgroGestor@gmail.com" 
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="rgba(128, 128, 128, 0.5)"
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
                placeholderTextColor="rgba(128, 128, 128, 0.5)"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>ENTRAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
