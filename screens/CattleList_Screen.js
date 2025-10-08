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
import NetInfo from '@react-native-community/netinfo';
import AuthManager from '../services/AuthManager';

export default function CattleScreen({ navigation }) {
  const [ganado, setGanado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [razasMap, setRazasMap] = useState({});
  const API_URL = "https://webmobileregister-production.up.railway.app";

  const insets = useSafeAreaInsets();
  const BOTTOM_BAR_MIN_HEIGHT = 56;

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

  // Monitorear conexión
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // Cargar razas primero
  useEffect(() => {
    loadRazas();
  }, []);

  // Cargar animales después de cargar razas
  useEffect(() => {
    if (Object.keys(razasMap).length > 0) {
      fetchAnimalsHybrid();
    }
  }, [razasMap]);

  // Re-cargar cuando cambia la conexión
  useEffect(() => {
    if (isConnected && Object.keys(razasMap).length > 0) {
      console.log('🌐 Conexión detectada, actualizando datos...');
      fetchAnimalsHybrid();
    }
  }, [isConnected]);

  /**
   * CARGAR RAZAS (para mapear IDs a nombres)
   */
  const loadRazas = async () => {
    try {
      const localRazas = await AsyncStorage.getItem('local_razas');
      
      if (localRazas) {
        const razas = JSON.parse(localRazas);
        const map = {};
        razas.forEach(raza => {
          map[raza.value] = raza.label;
        });
        setRazasMap(map);
        console.log('✅ Razas cargadas:', Object.keys(map).length);
      } else {
        console.log('⚠️ No hay razas en local');
      }
    } catch (error) {
      console.error('❌ Error cargando razas:', error);
    }
  };

  /**
   * FUNCIÓN HÍBRIDA: Carga datos online + offline
   */
  const fetchAnimalsHybrid = async () => {
    try {
      setLoading(true);
      console.log('🔄 Iniciando carga híbrida de animales...');

      let onlineAnimals = [];
      
      if (isConnected) {
        onlineAnimals = await fetchAnimalsOnline();
      } else {
        console.log('📵 Sin conexión, usando solo datos locales');
      }

      const localAnimals = await fetchAnimalsOffline();
      const combinedAnimals = mergeAnimals(onlineAnimals, localAnimals);

      console.log(`📊 RESUMEN FINAL:`);
      console.log(`   - Online: ${onlineAnimals.length}`);
      console.log(`   - Local: ${localAnimals.length}`);
      console.log(`   - Total combinado: ${combinedAnimals.length}`);

      setGanado(combinedAnimals);

    } catch (error) {
      console.error('❌ Error al cargar animales:', error);
      const localAnimals = await fetchAnimalsOffline();
      setGanado(localAnimals);
    } finally {
      setLoading(false);
    }
  };

  /**
   * CARGAR DESDE SERVIDOR
   */
  const fetchAnimalsOnline = async () => {
    try {
      const token = AuthManager.getAuthToken() || await AsyncStorage.getItem("token");
      
      if (!token) {
        console.log('⚠️ No hay token disponible');
        return [];
      }

      console.log('🔑 Token encontrado:', token.substring(0, 30) + '...');
      console.log('🌐 Descargando animales del servidor...');

      const response = await axios.get(`${API_URL}/api/mis-animales`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 15000,
      });

      console.log('✅ Respuesta del servidor:', response.status);
      console.log('📊 Animales recibidos:', response.data?.length || 0);

      const animals = response.data || [];
      
      if (animals.length > 0) {
        await AsyncStorage.setItem('cached_animals', JSON.stringify(animals));
        console.log(`✅ ${animals.length} animales guardados en caché`);
      }

      return animals.map(animal => ({
        ...animal,
        raza: razasMap[animal.raza_id_raza] || animal.raza || 'Desconocido',
        synced: true,
        isLocal: false,
      }));

    } catch (error) {
      console.error('❌ Error descargando animales:', error.message);
      
      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Data:', error.response.data);
      }
      
      if (error.response?.status === 401) {
        console.log('🔄 Token inválido, intentando refrescar...');
        const refreshed = await AuthManager.refreshToken();
        
        if (refreshed) {
          console.log('✅ Token refrescado, reintentando...');
          return await fetchAnimalsOnline();
        } else {
          console.log('❌ No se pudo refrescar el token');
          Alert.alert(
            'Sesión expirada',
            'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
            [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
          );
        }
      }
      
      return [];
    }
  };

  /**
   * CARGAR DESDE ALMACENAMIENTO LOCAL
   */
  const fetchAnimalsOffline = async () => {
    try {
      console.log('📦 Cargando animales locales...');

      const cachedData = await AsyncStorage.getItem('cached_animals');
      let cachedAnimals = cachedData ? JSON.parse(cachedData) : [];
      
      cachedAnimals = cachedAnimals.map(animal => ({
        ...animal,
        raza: razasMap[animal.raza_id_raza] || animal.raza || 'Desconocido',
        synced: true,
        isLocal: false,
      }));

      const localData = await AsyncStorage.getItem('local_registro_animal');
      let localAnimals = localData ? JSON.parse(localData) : [];

      console.log(`   - Cacheados: ${cachedAnimals.length}`);
      console.log(`   - Pendientes: ${localAnimals.length}`);

      const markedLocalAnimals = localAnimals.map(animal => ({
        ...animal,
        raza: razasMap[animal.raza_id_raza] || 'Desconocido',
        foto: animal.foto || null,
        synced: false,
        isLocal: true,
      }));

      return [...cachedAnimals, ...markedLocalAnimals];

    } catch (error) {
      console.error('❌ Error cargando animales offline:', error);
      return [];
    }
  };

  /**
   * COMBINAR Y ELIMINAR DUPLICADOS
   */
  const mergeAnimals = (onlineAnimals, localAnimals) => {
    const animalMap = new Map();

    onlineAnimals.forEach(animal => {
      animalMap.set(animal.chip_animal, animal);
    });

    localAnimals.forEach(animal => {
      if (!animalMap.has(animal.chip_animal)) {
        animalMap.set(animal.chip_animal, animal);
      } else {
        const existing = animalMap.get(animal.chip_animal);
        if (animal.isLocal && !animal.synced) {
          console.log(`⚠️ Duplicado encontrado: ${animal.chip_animal} (manteniendo pendiente)`);
        }
      }
    });

    const result = Array.from(animalMap.values());
    
    // 🆕 ORDENAR del más reciente al más antiguo
    result.sort((a, b) => {
      const dateA = new Date(a.fecha_nacimiento || a.created_at || 0);
      const dateB = new Date(b.fecha_nacimiento || b.created_at || 0);
      return dateB - dateA; // Orden descendente (más reciente primero)
    });
    
    console.log('🔀 Animales después de merge y ordenar:', result.length);
    
    return result;
  };

  if (loading) {
    return (
      <View style={styles.containerloading}>
        <ActivityIndicator size="large" color="rgb(52, 112, 24)" />
        <Text style={styles.loadingText}>Cargando ganado...</Text>
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

        {/* Indicador de conexión */}
        <View style={{
          position: 'absolute',
          top: 70,
          right: 65,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isConnected ? '#4CAF50' : '#FF9800',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 15,
          zIndex: 10,
        }}>
          <View style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#fff',
            marginRight: 5,
          }} />
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>
            {isConnected ? 'Online' : 'Offline'}
          </Text>
        </View>

        {/* Menús */}
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

        {ganado.length === 0 ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
              {isConnected 
                ? 'No hay animales registrados.' 
                : 'Sin conexión. Los datos se mostrarán cuando te conectes a internet.'}
            </Text>
          </View>
        ) : (
          ganado.map((animal, index) => (
            <View key={`${animal.chip_animal}-${index}`} style={styles.card}>
              {/* Badge de estado */}
              {animal.isLocal && !animal.synced && (
                <View style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: '#FF9800',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  zIndex: 1,
                }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                    ⏳ PENDIENTE
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.cardContent}
                onPress={() =>
                  navigation.navigate("ControlScreen", { chip: animal.chip_animal })
                }
              >
                <Image
                  source={{
                    uri: animal.foto
                      ? (animal.foto.startsWith('data:') 
                          ? animal.foto
                          : `${API_URL}/uploads/${animal.foto}`)
                      : "https://via.placeholder.com/100",
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.column}>
                  <View style={styles.row}>
                    <Image source={require("../assets/Chip.png")} style={styles.iconStyle} />
                    <Text style={styles.chipText}>Chip: </Text>
                    <Text style={styles.DatosTextChip}>
                      {animal.chip_animal || "Sin chip"}
                    </Text>
                  </View>

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

                  <View style={styles.row}>
                    <Image source={require("../assets/Peso.png")} style={styles.iconStyle} />
                    <Text style={styles.chipText}>Peso: </Text>
                    <Text style={styles.DatosTextPeso}>
                      {animal.peso_nacimiento ? `${animal.peso_nacimiento} kg` : "Sin dato"}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Image source={require("../assets/Raza.png")} style={styles.iconStyle} />
                    <Text style={styles.chipText}>Raza: </Text>
                    <Text style={styles.DatosTextEstado}>{animal.raza}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Barra inferior */}
      <View
        style={[
          styles.greenBar,
          {
            paddingBottom: insets.bottom,
            minHeight: BOTTOM_BAR_MIN_HEIGHT,
            paddingTop: 8,
          },
        ]}
      >
        <View style={styles.bottomImageContainer}>
          <TouchableOpacity onPress={navigateToHome}>
            <View style={styles.imageContainer}>
              <Image source={require("../assets/Inicio.png")} style={styles.imageStyleG} />
              <Text style={styles.imageText}>Inicio</Text>
            </View>
          </TouchableOpacity>

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