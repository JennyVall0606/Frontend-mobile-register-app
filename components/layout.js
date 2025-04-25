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
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [fechaHoraActual, setFechaHoraActual] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [noResultsVisible, setNoResultsVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const actualizarFechaHora = () => {
      const fecha = new Date();
      const opcionesFecha = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const fechaFormateada = fecha.toLocaleDateString("es-CO", opcionesFecha);
      const horaFormateada = fecha.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setFechaHoraActual(`${fechaFormateada} ${horaFormateada}`);
    };

    actualizarFechaHora();
    const intervalo = setInterval(actualizarFechaHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const appContent = [
    { id: "1", label: "Registro", screen: "RegisterCattle" },
    { id: "2", label: "Historiales", screen: "ControlScreen" },
    { id: "3", label: "Formulario", screen: "FormScreen" },
    { id: "4", label: "Inicio", screen: "Home" },
  ];

  const handleSearch = () => {
    console.log("Search triggered");
    // Aseguramos que searchQuery no sea undefined ni null
    const query = (searchQuery || "").toLowerCase();

    // Verificación de lo que contiene searchQuery para debugging
    console.log("searchQuery:", query); // Imprimimos el valor de query

    // Si no hay query o es una cadena vacía, no ejecutamos la búsqueda
    if (!query) {
      setSearchResults([]); // Limpiar los resultados
      setHasSearched(false); // Establecer que no ha buscado
      setNoResultsVisible(true); // Mostrar el mensaje de "sin resultados"

      setTimeout(() => setNoResultsVisible(false), 3000); // Ocultar el mensaje después de 3 segundos
      return;
    }

    // Redirección personalizada por palabra clave
    if (query.includes("registro")) {
      handleNavigate("RegisterCattleScreen");
      return;
    }
    if (query.includes("historiales")) {
      handleNavigate("ControlScreen");
      return;
    }
    if (query.includes("formulario")) {
      handleNavigate("FormScreen");
      return;
    }

 
    const results = appContent.filter(
      (item) => item.label && item.label.toLowerCase().includes(query) // Verifica que item.label exista antes de usar toLowerCase()
    );

    // Actualizamos el estado con los resultados encontrados
    setSearchResults(results);
    setHasSearched(true);
    setNoResultsVisible(results.length === 0);

    // Después de 3 segundos, limpiamos los estados de búsqueda
    setTimeout(() => {
      setHasSearched(false);
      setNoResultsVisible(false);
    }, 4000);
  };

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

  return (
    <ImageBackground
      source={require("../assets/acuarela.jpg")}
      style={globalStyles.background}
    >
      <View style={[globalStyles.topBar, globalStyles.topBarContainer]}>
        <TouchableOpacity
          onPress={() => {
            setShowMenu(!showMenu);
            setShowUserMenu(false);
          }}
          accessible={true}
          accessibilityLabel="Abrir menú"
        >
          <Image
            source={require("../assets/menu.png")}
            style={globalStyles.icon}
          />
        </TouchableOpacity>

        <View
          style={[
            globalStyles.searchContainerCustom,
          ]}
        >
          <TextInput
            placeholder="Buscar..."
            placeholderTextColor={globalStyles.searchInputPlaceholder}
            style={[globalStyles.searchInput]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessible={true}
            accessibilityLabel="Campo de búsqueda"
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require("../assets/search-arrow.png")}
              style={globalStyles.searchIcon}
            />
          </TouchableOpacity>
        </View>

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

      <Text style={globalStyles.fechaTexto}>{fechaHoraActual}</Text>

      {hasSearched && (
        <View style={globalStyles.searchResultsContainer}>
          {searchResults.length > 0 ? (
            <ScrollView>
              {searchResults.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={globalStyles.resultItem}
                  onPress={() => handleNavigate(item.screen)}
                  accessible={true}
                  accessibilityLabel={`Ir a ${item.label}`}
                >
                  <Text style={globalStyles.resultText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            noResultsVisible && (
              <Text style={globalStyles.noResultsText}>No hay resultados</Text>
            )
          )}
        </View>
      )}

      {showMenu && (
        <View style={globalStyles.dropdownMenuLeft}>
          <TouchableOpacity onPress={() => handleNavigate("Home")}>
            <Text style={globalStyles.dropdownItem}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("RegisterCattle")}>
            <Text style={globalStyles.dropdownItem}>Registro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("ControlScreen")}>
            <Text style={globalStyles.dropdownItem}>Historiales</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigate("FormScreen")}>
            <Text style={globalStyles.dropdownItem}>Formulario</Text>
          </TouchableOpacity>
        </View>
      )}

      {showUserMenu && (
        <View style={globalStyles.dropdownMenuRight}>
          <TouchableOpacity onPress={() => handleNavigate("Welcome")}>
            <Text style={globalStyles.dropdownItem}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={globalStyles.content}>
        {children}
      </ScrollView>
    </ImageBackground>
  );
}
