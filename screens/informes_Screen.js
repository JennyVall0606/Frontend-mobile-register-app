import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/informes_Styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InformesScreen({ route }) {
  const API_URL = "https://webmobileregister-production.up.railway.app";
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  // Estados originales
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const menuAnim = useState(new Animated.Value(-250))[0];
  const userMenuAnim = useState(new Animated.Value(-250))[0];
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Estados para filtros
  const [filters, setFilters] = useState({
    categoria: "",
    ubicacion: "",
    hierro: "",
    raza: ""
  });

  // Estados para menús de filtros
  const [filterMenus, setFilterMenus] = useState({
    categoria: false,
    ubicacion: false,
    hierro: false,
    raza: false
  });

  // Estados para opciones únicas de cada columna
  const [uniqueOptions, setUniqueOptions] = useState({
    categoria: [],
    ubicacion: [],
    hierro: [],
    raza: []
  });

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "❌ Error",
          "Token no encontrado. Inicia sesión nuevamente."
        );
        return;
      }

      const response = await axios.get(`${API_URL}/api/mis-animales`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Procesar los datos recibidos para usarlos en la tabla
      const animals = response.data.map((animal) => ({
        chip: animal.chip_animal,
        categoria: animal.categoria,
        ubicacion: animal.ubicacion,
        hierro: animal.hierro,
        raza: animal.raza,
      }));

      setReportData(animals);
      generateUniqueOptions(animals);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los chips:", error);
      setIsLoading(false);
      Alert.alert(
        "❌ Error",
        "Hubo un problema al obtener los datos de los chips."
      );
    }
  };

  // Generar opciones únicas para cada columna
  const generateUniqueOptions = (data) => {
    const options = {
      categoria: [...new Set(data.map(item => item.categoria).filter(Boolean))],
      ubicacion: [...new Set(data.map(item => item.ubicacion).filter(Boolean))],
      hierro: [...new Set(data.map(item => item.hierro).filter(Boolean))],
      raza: [...new Set(data.map(item => item.raza).filter(Boolean))]
    };
    setUniqueOptions(options);
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: prev[column] === value ? "" : value // Toggle: si ya está seleccionado, lo deselecciona
    }));
    
    // Cerrar el menú después de seleccionar
    setFilterMenus(prev => ({
      ...prev,
      [column]: false
    }));
  };

  // Función para alternar la visibilidad del menú de filtros
  const toggleFilterMenu = (column) => {
    setFilterMenus(prev => ({
      categoria: false,
      ubicacion: false,
      hierro: false,
      raza: false,
      [column]: !prev[column]
    }));
  };

  // Filtrar los datos según los filtros aplicados
  const getFilteredData = () => {
    return reportData.filter((item) => {
      const categoriaMatch = filters.categoria ? item.categoria === filters.categoria : true;
      const ubicacionMatch = filters.ubicacion ? item.ubicacion === filters.ubicacion : true;
      const hierroMatch = filters.hierro ? item.hierro === filters.hierro : true;
      const razaMatch = filters.raza ? item.raza === filters.raza : true;

      return categoriaMatch && ubicacionMatch && hierroMatch && razaMatch;
    });
  };

  // Función para limpiar todos los filtros
  const clearAllFilters = () => {
    setFilters({
      categoria: "",
      ubicacion: "",
      hierro: "",
      raza: ""
    });
    setFilterMenus({
      categoria: false,
      ubicacion: false,
      hierro: false,
      raza: false
    });
  };

  // Componente para renderizar el ícono de filtro con menú
  const FilterIcon = ({ column, title }) => (
  
    <View style={styles.headerColumnContainer}>
      <Text style={styles.tableHeaderText}>{title}</Text>
      <TouchableOpacity
        style={styles.filterIconContainer}
        onPress={() => toggleFilterMenu(column)}
      >
        <Text style={[
          styles.filterIcon, 
          filters[column] && styles.filterIconActive
        ]}>
          🔽
        </Text>
      </TouchableOpacity>

      {/* Menú desplegable de filtros */}
      {filterMenus[column] && (
        <View style={styles.filterDropdown}>
          <TouchableOpacity
            style={[styles.filterOption, !filters[column] && styles.filterOptionActive]}
            onPress={() => handleFilterChange(column, "")}
          >
            <Text style={styles.filterOptionText}>Todos</Text>
          </TouchableOpacity>
          
          {uniqueOptions[column].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterOption,
                filters[column] === option && styles.filterOptionActive
              ]}
              onPress={() => handleFilterChange(column, option)}
            >
              <Text style={styles.filterOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
   
  );

  // Funciones originales para menús
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
    setShowUserMenu(false);
  };

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
    setShowMenu(false);
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const scrollViewRef = useRef(null);
  const filteredData = getFilteredData();

  if (isLoading) {
    return (
      <View style={styles.containerloading}>
        <ActivityIndicator size="large" color="rgb(52, 112, 24)" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/acuarela.Home.png")}
      style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
    >
      <View>
        {/* Header */}
        <View style={[styles.topBar, styles.topBarContainer]}>
          <View style={styles.topBarGreen}>
            <TouchableOpacity onPress={toggleMenu}>
              <Image
                source={require("../assets/Menu.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleUserMenu}>
              <Image
                source={require("../assets/user.png")}
                style={styles.iconUser}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menú lateral */}
        {showMenu && (
          <Animated.View
            style={[
              styles.dropdownMenuLeft,
              { transform: [{ translateX: menuAnim }] },
              { zIndex: 1 },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.dropdownItem}>Inicio</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Menú de usuario */}
        {showUserMenu && (
          <Animated.View
            style={[
              styles.dropdownMenuLeftuser,
              { transform: [{ translateX: userMenuAnim }] },
              { zIndex: 1 },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.dropdownItem}>Cerrar sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>










      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Image
          source={require("../assets/informes.png")}
          style={styles.image}
        />

        <Text style={styles.title1}>Informes</Text>

        

        {/* Indicadores de filtros activos */}
        <View style={styles.activeFiltersContainer}>
          {Object.entries(filters).map(([key, value]) => 
            value ? (
              <View key={key} style={styles.activeFilterTag}>
                <Text style={styles.activeFilterText}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </Text>
                <TouchableOpacity onPress={() => handleFilterChange(key, "")}>
                  <Text style={styles.removeFilterText}> ✕</Text>
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </View>

        <View style={styles.tableContainer}>
          {/* Cabecera de la tabla con filtros */}
          <View style={styles.tableHeader}>
              <View style={styles.headerColumnContainer}>
              <Text style={styles.tableHeaderText}>Chip</Text>
            </View>
            <FilterIcon column="categoria" title="Categoría" />
             <FilterIcon column="hierro" title="Hierro" />
            <FilterIcon column="ubicacion" title="Ubicación" />
           
            <FilterIcon column="raza" title="Raza" />
          
          </View>

          {/* Filas de datos */}
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableText}>{item.chip || "-"}</Text>
                <Text style={styles.tableText}>{item.categoria || "-"}</Text>
                  <Text style={styles.tableText}>{item.hierro || "-"}</Text>
                <Text style={styles.tableText}>{item.ubicacion || "-"}</Text>
                <Text style={styles.tableText}>{item.raza || "-"}</Text>
                
              </View>
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                No se encontraron datos para los filtros seleccionados.
              </Text>
            </View>
          )}
        </View>

        {/* Información de resultados */}
        <Text style={styles.resultInfo}>
          Mostrando {filteredData.length} de {reportData.length} registros
        </Text>

        {/* Botón para limpiar filtros */}
        {(filters.categoria || filters.ubicacion || filters.hierro || filters.raza) && (
          <TouchableOpacity style={styles.clearFiltersButton} onPress={clearAllFilters}>
            <Text style={styles.clearFiltersText}>Limpiar Filtros</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

























      {/* Barra inferior */}
      <View style={styles.greenBar}>
        <View style={styles.bottomImageContainer}>
          <TouchableOpacity onPress={navigateToHome}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/Inicio.png")}
                style={styles.imageStyleG}
              />
              <Text style={styles.imageText}>Inicio</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoBack}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/Regresar.png")}
                style={styles.imageStyleG}
              />
              <Text style={styles.imageText}>Regresar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}