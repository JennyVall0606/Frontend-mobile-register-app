import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global_styles";

export default function Layout({ children }) {
  // -------------------- Estados --------------------
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [noResultsVisible, setNoResultsVisible] = useState(false);

  const navigation = useNavigation();

  const appContent = [
    { id: "1", label: "Registro", screen: "RegisterCattle" },
    { id: "2", label: "Historiales", screen: "ControlScreen" },
    { id: "3", label: "Formulario", screen: "FormScreen" },
    { id: "4", label: "Inicio", screen: "Home" },
    { id: "5", label: "VerGanado", screen: "CattleScreen" },
  ];

  // Animaciones para el menú
  const menuAnim = useState(new Animated.Value(-250))[0];
  const userMenuAnim = useState(new Animated.Value(-250))[0];

  const handleNavigate = (screenName) => {
    console.log("Navigating to:", screenName);
    if (screenName) {
      setSearchQuery("");
      setSearchResults([]);
      setHasSearched(false);
      setNoResultsVisible(false);
      setTimeout(() => {
        navigation.navigate(screenName);
      }, 100);
    } else {
      console.error("No screenName provided");
    }
  };

  const handleSearch = () => {
    console.log("Search triggered");
    const query = (searchQuery || "").toLowerCase();
    console.log("searchQuery:", query);

    if (!query) {
      setSearchResults([]);
      setHasSearched(false);
      setNoResultsVisible(true);
      setTimeout(() => setNoResultsVisible(false), 3000);
      return;
    }

    // Redirección por palabra clave
    if (query.includes("registro")) return handleNavigate("RegisterCattleScreen");
    if (query.includes("historiales")) return handleNavigate("ControlScreen");
    if (query.includes("VerGanado")) return handleNavigate("CattleScreen");
    if (query.includes("formulario")) return handleNavigate("FormScreen");

    // Búsqueda general
    const results = appContent.filter(
      (item) => item.label && item.label.toLowerCase().includes(query)
    );

    setSearchResults(results);
    setHasSearched(true);
    setNoResultsVisible(results.length === 0);

    setTimeout(() => {
      setHasSearched(false);
      setNoResultsVisible(false);
    }, 4000);
  };



  
  // Función para abrir el menú
  const toggleMenu = () => {
    if (showMenu) {
      // Reiniciar la animación al valor inicial cada vez que se abra el menú
      menuAnim.setValue(-250);

      // Animar el menú fuera de la vista con un efecto suave
      Animated.spring(menuAnim, {
        toValue: 0,
        bounciness: 10, // Efecto de rebote
        useNativeDriver: true,
      }).start();
    } else {
      // Reiniciar la animación al valor inicial cada vez que se abra el menú
      menuAnim.setValue(-250);

      // Animar el menú entrando desde la izquierda con un rebote
      Animated.spring(menuAnim, {
        toValue: 0,
        bounciness: 10, // Efecto de rebote
        useNativeDriver: true,
      }).start();
    }
    setShowMenu(!showMenu);
    setShowUserMenu(false); // Cerrar el menú de usuario si se abre el otro
  };

  // Función para abrir el menú de usuario
  const toggleUserMenu = () => {
    if (showUserMenu) {
      // Animar el menú de usuario fuera de la vista
      Animated.spring(userMenuAnim, {
        toValue: -250,
        bounciness: 10, // Efecto de rebote
        useNativeDriver: true,
      }).start();
    } else {
      // Animar el menú de usuario entrando desde la derecha
      Animated.spring(userMenuAnim, {
        toValue: 0,
        bounciness: 10, // Efecto de rebote
        useNativeDriver: true,
      }).start();
    }
    setShowUserMenu(!showUserMenu);
    setShowMenu(false); // Cerrar el menú lateral si se abre el de usuario
  };

  // Función para cerrar cualquier menú si se toca fuera de ellos
  const closeMenus = () => {
    setShowMenu(false);
    setShowUserMenu(false);
  };

  return (
    <ImageBackground
      source={require("../assets/acuarela.Home.png")}
      style={globalStyles.background}
    >
      {/* Agregar TouchableWithoutFeedback para capturar toques en cualquier parte */}
      <TouchableWithoutFeedback onPress={closeMenus}>
        <View style={{ flex: 1 }}>
          {/* Header con barra verde */}
          <View style={[globalStyles.topBar, globalStyles.topBarContainer]}>
            <View style={globalStyles.topBarGreen}>
              <TouchableOpacity
                onPress={toggleMenu}
                accessible={true}
                accessibilityLabel="Abrir menú"
              >
                <Image
                  source={require("../assets/Menu.png")}
                  style={globalStyles.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleUserMenu}
                accessible={true}
                accessibilityLabel="Abrir menú de usuario"
              >
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
              style={[globalStyles.dropdownMenuLeft, { transform: [{ translateX: menuAnim }] }]}
            >
              <TouchableOpacity onPress={() => handleNavigate("Home")}>
                <Text style={globalStyles.dropdownItem}>Inicio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigate("RegisterCattle")}>
                <Text style={globalStyles.dropdownItem}>Registro</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigate("CattleScreen")}>
                <Text style={globalStyles.dropdownItem}>Ver ganado</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Menú de usuario */}
          {showUserMenu && (
            <Animated.View
              style={[globalStyles.dropdownMenuRight, { transform: [{ translateX: userMenuAnim }] }]}
            >
              <TouchableOpacity onPress={() => handleNavigate("Login")}>
                <Text style={globalStyles.dropdownItem}>Cerrar sesión</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Contenido principal */}
          <ScrollView contentContainerStyle={globalStyles.content}>
            {children}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

