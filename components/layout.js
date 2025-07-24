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

  // Función para manejar la navegación de regreso
  const handleGoBack = () => {
    const currentScreen = route.name || ''; // Aseguramos que route.name no sea undefined

    console.log("Pantalla actual:", currentScreen); // Log para verificar qué pantalla estamos obteniendo

    // Lógica de navegación dependiendo de la pantalla actual
    if (currentScreen === "FormScreen") {
      navigation.navigate("ControlScreen");
    } else if (currentScreen === "ControlScreen") {
      navigation.navigate("CattleScreen");
    } else if (currentScreen === "CattleScreen") {
      navigation.navigate("Home");
    } else {
      console.log("Pantalla no identificada para el botón regresar");
    }
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
      source={require("../assets/acuarela.Home.png")}
      style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={[globalStyles.topBar, globalStyles.topBarContainer]}>
          <View style={globalStyles.topBarGreen}>
            <TouchableOpacity onPress={toggleMenu}>
              <Image
                source={require("../assets/Menu.png")}
                style={globalStyles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleUserMenu}>
              <Image
                source={require("../assets/user.png")}
                style={globalStyles.iconUser}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menú lateral */}
        {showMenu && (
          <Animated.View
            style={[
              globalStyles.dropdownMenuLeft,
              { transform: [{ translateX: menuAnim }] },
              { zIndex: 1 }, // Asegura que el menú esté encima
            ]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={globalStyles.dropdownItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("RegisterCattleScreen")}>
              <Text style={globalStyles.dropdownItem}>Registro</Text>
            </TouchableOpacity>
            {/* Agregar otros ítems aquí */}
          </Animated.View>
        )}

        {/* Menú de usuario */}
        {showUserMenu && (
          <Animated.View
            style={[
              globalStyles.dropdownMenuLeftuser,
              { transform: [{ translateX: userMenuAnim }] },
              { zIndex: 1 }, // Asegura que el menú esté encima
            ]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={globalStyles.dropdownItem}>Cerrar sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Contenido principal */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </View>

      {/* Barra inferior */}
      <View style={globalStyles.greenBar}>
        <View style={globalStyles.bottomImageContainer}>
          {/* Imagen Inicio */}
          <TouchableOpacity onPress={navigateToHome}>
            <View style={globalStyles.imageContainer}>
              <Image
                source={require("../assets/Inicio.png")}
                style={globalStyles.imageStyle}
              />
              <Text style={globalStyles.imageText}>Inicio</Text>
            </View>
          </TouchableOpacity>

          {/* Imagen Regresar */}
          <TouchableOpacity onPress={handleGoBack}>
            <View style={globalStyles.imageContainer}>
              <Image
                source={require("../assets/Regresar.png")}
                style={globalStyles.imageStyle}
              />
              <Text style={globalStyles.imageText}>Regresar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
