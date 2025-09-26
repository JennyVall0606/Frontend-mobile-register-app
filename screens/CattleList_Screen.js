import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  ImageBackground,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { styles } from "../styles/CattleList_Styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CattleScreen({ navigation }) {
  const [ganado, setGanado] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://webmobileregister-production.up.railway.app";

  // Insets para barra inferior segura
  const insets = useSafeAreaInsets();
  const BOTTOM_BAR_MIN_HEIGHT = 56;

  // Menús
  const menuAnim = useState(new Animated.Value(-250))[0];
  const userMenuAnim = useState(new Animated.Value(-250))[0];
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    Animated.spring(menuAnim, {
      toValue: showMenu ? -250 : 0,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
    setShowMenu(!showMenu);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    Animated.spring(userMenuAnim, {
      toValue: showUserMenu ? -250 : 0,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
    setShowUserMenu(!showUserMenu);
    setShowMenu(false);
  };

  const navigateToHome = () => navigation.navigate("Home");
  const handleGoBack = () => navigation.navigate("Home");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("❌ Error", "Token no encontrado. Inicia sesión nuevamente.");
          return;
        }

        const response = await axios.get(`${API_URL}/api/mis-animales`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setGanado(response.data);
      } catch (error) {
        console.error("Error al obtener el ganado:", error);
        Alert.alert("❌ Error", "Hubo un problema al obtener los datos del ganado.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
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
              <Image source={require("../assets/Menu.png")} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleUserMenu}>
              <Image source={require("../assets/user.png")} style={styles.iconUser} />
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
        style={{ flex: 1 }}
        contentContainerStyle={{
          // deja espacio para que el último item no quede detrás de la barra
          paddingBottom: insets.bottom + BOTTOM_BAR_MIN_HEIGHT + 12,
        }}
      >
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/Imagen_Resumen_Ganado.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.title}>RESUMEN</Text>
          <Text style={styles.title1}>DE GANADO</Text>
        </View>

        <View style={styles.totalCountContainer}>
          <Image source={require("../assets/TotalRegistros.png")} style={styles.logoStyle} />
          <Text style={styles.totalCount}>
            Total de registros: <Text style={styles.counter}>{ganado.length}</Text>
          </Text>
        </View>

        {ganado.map((animal) => (
          <View key={animal.id} style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() =>
                navigation.navigate("ControlScreen", { chip: animal.chip_animal })
              }
            >
              <Image
                source={{
                  uri: animal.foto
                    ? `${API_URL}/uploads/${animal.foto}`
                    : "https://via.placeholder.com/100",
                }}
                style={styles.cardImage}
              />
              <View style={styles.column}>
                {/* Chip */}
                <View style={styles.row}>
                  <Image source={require("../assets/Chip.png")} style={styles.iconStyle} />
                  <Text style={styles.chipText}>Chip: </Text>
                  <Text style={styles.DatosTextChip}>
                    {animal.chip_animal || "Sin chip"}
                  </Text>
                </View>

                {/* Nacimiento (protegido si viene null) */}
                <View style={styles.row}>
                  <Image
                    source={require("../assets/Nacimiento.png")}
                    style={styles.iconStyleNacimiento}
                  />
                  <Text style={styles.chipText}>Nacimiento: </Text>
                  <Text style={styles.DatosTextNacimiento}>
                    {animal.fecha_nacimiento
                      ? new Date(animal.fecha_nacimiento).toLocaleDateString()
                      : "Sin dato"}
                  </Text>
                </View>

                {/* Peso */}
                <View style={styles.row}>
                  <Image source={require("../assets/Peso.png")} style={styles.iconStyle} />
                  <Text style={styles.chipText}>Peso: </Text>
                  <Text style={styles.DatosTextPeso}>
                    {animal.peso_nacimiento ? `${animal.peso_nacimiento} kg` : "Sin dato"}
                  </Text>
                </View>

                {/* Raza */}
                <View style={styles.row}>
                  <Image source={require("../assets/Raza.png")} style={styles.iconStyle} />
                  <Text style={styles.chipText}>Raza: </Text>
                  <Text style={styles.DatosTextEstado}>{animal.raza || "Desconocido"}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Barra inferior SEGURA */}
      <View
        style={[
          styles.greenBar,
          {
            paddingBottom: insets.bottom, // respeta área segura (gestos/botones)
            minHeight: BOTTOM_BAR_MIN_HEIGHT,
            paddingTop: 8,
          },
        ]}
      >
        <View style={styles.bottomImageContainer}>
          {/* Inicio */}
          <TouchableOpacity onPress={navigateToHome}>
            <View style={styles.imageContainer}>
              <Image source={require("../assets/Inicio.png")} style={styles.imageStyleG} />
              <Text style={styles.imageText}>Inicio</Text>
            </View>
          </TouchableOpacity>

          {/* Regresar */}
          <TouchableOpacity onPress={handleGoBack}>
            <View style={styles.imageContainer}>
              <Image source={require("../assets/Regresar.png")} style={styles.imageStyleG} />
              <Text style={styles.imageText}>Regresar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}