import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "../styles/global_styles";

export default function Layout({ children }) {
  const navigation = useNavigation();
  const route = useRoute(); // Obtener el nombre de la pantalla actual

  // -------------------- Estados --------------------
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // -------------------- Animaciones --------------------
  const menuAnim = useState(new Animated.Value(-250))[0]; // Para el menú lateral
  const userMenuAnim = useState(new Animated.Value(-250))[0]; // Para el menú de usuario

const handleGoBack = () => {
  const currentScreen = route.name || ''; // Aseguramos que route.name no sea undefined

  console.log("Pantalla actual:", currentScreen); // Log para verificar qué pantalla estamos obteniendo

  // Usamos navigation.goBack() para regresar a la pantalla anterior en la pila de navegación
  navigation.goBack();
};


  // Función para abrir el menú
  const toggleMenu = () => {
    if (showMenu) {
      Animated.spring(menuAnim, {
        toValue: -250,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(menuAnim, {
        toValue: 0,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    }
    setShowMenu(!showMenu);
    setShowUserMenu(false); // Cerrar el menú de usuario si se abre el otro
  };

  // Función para abrir el menú de usuario
  const toggleUserMenu = () => {
    if (showUserMenu) {
      Animated.spring(userMenuAnim, {
        toValue: -250,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(userMenuAnim, {
        toValue: 0,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    }
    setShowUserMenu(!showUserMenu);
    setShowMenu(false); // Cerrar el menú lateral si se abre el de usuario
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../assets/lupa.png")}
      style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1 }}>


        {/* Contenido principal */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </View>

    
    </ImageBackground>
  );
}
