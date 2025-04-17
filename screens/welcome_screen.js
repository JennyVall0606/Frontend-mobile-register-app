import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/simple_layout";
import styles from "../styles/welcome_styles";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login"); // Asegúrate que este nombre coincida con tu AppNavigator
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
        <Text style={styles.title}>CONTROL DE GANADO</Text>

        <View style={styles.imageRow}>
          <Image
            source={require("../assets/ganado.png")}
            style={styles.image}
          />
          <Image
            source={require("../assets/vacunas.png")}
            style={styles.image}
          />
          <Image source={require("../assets/peso.png")} style={styles.image} />
        </View>

        <Text style={styles.subtitle}>
          Gestiona inventarios, control sanitario y productividad desde
          cualquier lugar.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
