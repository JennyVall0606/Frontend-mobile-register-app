import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
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

  // -------------------- Funciones --------------------

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

   return (
    <ImageBackground
      source={require("../assets/acuarela.Home.png")}
      style={globalStyles.background}
    >
{/* Header con barra verde */}
<View style={[globalStyles.topBar, globalStyles.topBarContainer]}>
   <View style={globalStyles.topBarGreen}>
    <TouchableOpacity
      onPress={() => {
        setShowMenu(!showMenu);
        setShowUserMenu(false);
      }}
      accessible={true}
      accessibilityLabel="Abrir menú"
    >
      <Image
        source={require("../assets/Menu.png")}
        style={globalStyles.icon}
      />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        setShowUserMenu(!showUserMenu);
        setShowMenu(false);
      }}
      accessible={true}
      accessibilityLabel="Abrir menú de usuario"
    >
      <Image
        source={require("../assets/user.png")}
        style={globalStyles.icon}
      />
    </TouchableOpacity>
  </View>
</View>


      {/* Menú lateral */}
      {showMenu && (
        <View style={globalStyles.dropdownMenuLeft}>
          <TouchableOpacity onPress={() => handleNavigate("Home")}>
            <Text style={globalStyles.dropdownItem}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("RegisterCattle")}>
            <Text style={globalStyles.dropdownItem}>Registro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("CattleScreen")}>
            <Text style={globalStyles.dropdownItem}>Ver ganado</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Menú de usuario */}
      {showUserMenu && (
        <View style={globalStyles.dropdownMenuRight}>
          <TouchableOpacity onPress={() => handleNavigate("Login")}>
            <Text style={globalStyles.dropdownItem}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={globalStyles.content}>
        {children}
      </ScrollView>

     
      
    </ImageBackground>
  );
}
