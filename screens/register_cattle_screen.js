import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import AuthManager from '../services/AuthManager';
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "../styles/register_cattle_styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from "expo-navigation-bar";
import NetInfo from '@react-native-community/netinfo';
import SyncQueue from '../services/SyncQueue';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';


export default function RegisterCattleScreen({ route }) {

// Reemplaza la función convertImageToBase64 que tienes al inicio del componente
const convertImageToBase64 = async (imageUri) => {
  try {
    if (!imageUri || !imageUri.startsWith('file://')) {
      return imageUri;
    }

    console.log('🖼️ Comprimiendo y convirtiendo imagen...');
    
    // 1. COMPRIMIR la imagen ANTES de convertir a base64
    const compressedImage = await manipulateAsync(
      imageUri,
      [{ resize: { width: 800 } }], // Redimensionar a máximo 800px de ancho
      {
        compress: 0.7, // Comprimir al 70%
        format: SaveFormat.JPEG
      }
    );
    
    console.log('✅ Imagen comprimida desde:', imageUri);
    console.log('✅ Nueva URI:', compressedImage.uri);
    
    // 2. Convertir la imagen comprimida a base64
    const base64 = await FileSystem.readAsStringAsync(compressedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    const base64Image = `data:image/jpeg;base64,${base64}`;
    
    console.log('✅ Imagen convertida a base64, tamaño final:', base64Image.length);
    console.log('📏 Tamaño en MB:', (base64Image.length * 0.75 / 1024 / 1024).toFixed(2));
    
    // 3. Validar que no sea demasiado grande (máximo 2MB)
    const sizeInMB = (base64Image.length * 0.75) / (1024 * 1024);
    if (sizeInMB > 2) {
      console.warn('⚠️ Imagen aún muy grande, comprimiendo más...');
      
      // Comprimir más agresivamente
      const moreCompressed = await manipulateAsync(
        imageUri,
        [{ resize: { width: 600 } }],
        {
          compress: 0.5,
          format: SaveFormat.JPEG
        }
      );
      
      const smallerBase64 = await FileSystem.readAsStringAsync(moreCompressed.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      return `data:image/jpeg;base64,${smallerBase64}`;
    }
    
    return base64Image;
    
  } catch (error) {
    console.error('❌ Error convirtiendo imagen:', error);
    return imageUri;
  }
};
  const { chip: chipFromParams, razaId, isEditing } = route.params || {};
  const [chip, setChip] = useState(chipFromParams || "");
  const [animalData, setAnimalData] = useState(null);
  const [loading, setLoading] = useState(!!chipFromParams);
  const [image, setImage] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");

  const [observations, setObservations] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [openRaza, setOpenRaza] = useState(false);
  const [itemsRaza, setItemsRaza] = useState([]);
  const [breed, setBreed] = useState("");
  const [openEnfermedad, setOpenEnfermedad] = useState(false);
  const [pendingBreedId, setPendingBreedId] = useState(null);
  const [disease, setDisease] = useState([]);
  const [itemsEnfermedad, setItemsEnfermedad] = useState([
    { label: "Brucelosis", value: "brucelosis" },
    { label: "Fiebre aftosa", value: "fiebre aftosa" },
    { label: "Tuberculosis bovina", value: "tuberculosis bovina" },
    { label: "Anaplasmosis", value: "anaplasmosis" },
    { label: "Leucosis bovina", value: "leucosis bovina" },
    { label: "Diarrea viral bovina (BVD)", value: "diarrea viral bovina" },
    { label: "Paratuberculosis (Johne)", value: "paratuberculosis" },
    { label: "Neosporosis", value: "neosporosis" },
    {
      label: "Enfermedad respiratoria bovina",
      value: "enfermedad respiratoria bovina",
    },
    { label: "Fiebre del transporte", value: "fiebre del transporte" },
    { label: "Dermatitis digital", value: "dermatitis digital" },
    { label: "Rabia", value: "rabia" },
    { label: "Salmonelosis", value: "salmonelosis" },
    { label: "Acetonemia (cetosis)", value: "acetonemia" },
    { label: "Mastitis", value: "mastitis" },
    { label: "Ninguna", value: "Ninguna" },
    { label: "OTRA", value: "OTRA" },
  ]);
  const [criadero, setCriadero] = useState("");
  const [hierro, setHierro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [openCategoria, setOpenCategoria] = useState(false);

  // Definir los ítems de la categoría
  const categoriaItems = [
    { label: "Cria", value: "cria" },
    { label: "Levante", value: "levante" },
    { label: "Ceba", value: "ceba" },
  ];

  const [parto, setParto] = useState(""); // Número de parto
  const [precocidad, setPrecocidad] = useState(""); // Precocidad
  const [tipoMonta, setTipoMonta] = useState(""); // Definir el estado tipoMonta

  const [openTipoMonta, setOpenTipoMonta] = useState(false); // Nuevo estado para "Tipo de Monta"

  //============================================================================
  const menuAnim = useState(new Animated.Value(-250))[0];
  const userMenuAnim = useState(new Animated.Value(-250))[0];

  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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
    setShowMenu(false);
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const handleGoBack = () => {
    navigation.navigate("Home");
  };
  //========================================================================

  const [errors, setErrors] = useState({
    photo: false,
    chip: false,
    breed: false,
    birthDate: false,
    weight: false,
  });

  const API_URL = "https://webmobileregister-production.up.railway.app";

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const screenWidth = Dimensions.get("window").width;

  const renderTitle = (title) => {
    if (isEditing) {
      return <Text style={styles.fieldTitle}>{title}</Text>;
    }
    return null;
  };

useEffect(() => {
  const fetchRazas = async () => {
    try {
      // 1. Intentar cargar desde AsyncStorage local primero
      const localRazas = await AsyncStorage.getItem('local_razas');
      
      if (localRazas) {
        const razaItems = JSON.parse(localRazas);
        setItemsRaza(razaItems);
        console.log('✅ Razas cargadas desde local:', razaItems.length);
      }

      // 2. Verificar conexión
      const networkState = await NetInfo.fetch();
      
      if (networkState.isConnected) {
        // 3. Si hay conexión, actualizar desde servidor
        console.log('🌐 Actualizando razas desde servidor...');
        const response = await axios.get(`${API_URL}/register/razas`);
        const razaItems = response.data.map((raza) => ({
          label: raza.nombre_raza,
          value: raza.id_raza.toString(),
        }));
        
        // 4. Guardar en local para uso offline
        await AsyncStorage.setItem('local_razas', JSON.stringify(razaItems));
        setItemsRaza(razaItems);
        console.log('✅ Razas actualizadas desde servidor:', razaItems.length);
      } else if (!localRazas) {
        // 5. Si no hay conexión ni datos locales, usar razas predeterminadas
        console.log('⚠️ Sin conexión y sin datos locales, usando razas predeterminadas');
        const razasPredeterminadas = [
          { label: 'Brahman', value: '14' },
          { label: 'Holstein', value: '15' },
          { label: 'Angus', value: '16' },
          { label: 'Hereford', value: '17' },
          { label: 'Charolais', value: '18' },
          { label: 'Jersey', value: '19' },
          { label: 'Simmental', value: '20' },
          { label: 'Limousin', value: '21' },
          { label: 'Pardo Suizo', value: '22' },
          { label: 'Gyr', value: '23' },
          { label: 'Otra Raza', value: '25' },
        ];
        setItemsRaza(razasPredeterminadas);
        await AsyncStorage.setItem('local_razas', JSON.stringify(razasPredeterminadas));
      }
      
    } catch (error) {
      console.error('❌ Error al obtener las razas:', error);
      
      // Intentar cargar desde local como último recurso
      try {
        const localRazas = await AsyncStorage.getItem('local_razas');
        if (localRazas) {
          setItemsRaza(JSON.parse(localRazas));
          console.log('✅ Razas cargadas desde caché local después de error');
        }
      } catch (localError) {
        console.error('❌ Error cargando razas locales:', localError);
      }
    }
  };

  fetchRazas();
}, []);

useEffect(() => {
  if (razaId) {
    const razaExistente = itemsRaza.find((item) => item.label === razaId);
    if (razaExistente) {
      setBreed(razaExistente.value);
    }
  }
}, [itemsRaza, razaId]);

  useEffect(() => {
    const fetchAnimalData = async () => {
      if (!chipFromParams || itemsRaza.length === 0) return;

      try {
        const response = await axios.get(
          `${API_URL}/register/animal/${chipFromParams}`
        );
        setAnimalData(response.data);
        console.log(response.data);
        if (response.data) {
          const fechaBD = response.data.fecha_nacimiento;
          let fechaFormateada = fechaBD;

          if (fechaBD && fechaBD.includes("T")) {
            fechaFormateada = fechaBD.split("T")[0];
          } else if (fechaBD && fechaBD.includes(" ")) {
            fechaFormateada = fechaBD.split(" ")[0];
          }

          setBirthDate(fechaFormateada || "");
          setWeight(response.data.peso_nacimiento?.toString() || "");
          setFather(response.data.id_madre?.toString() || "");
          setMother(response.data.id_padre?.toString() || "");
          setObservations(response.data.observaciones || "");
          setPendingBreedId(response.data.raza_id_raza?.toString() || "");

          setCriadero(response.data.procedencia?.toString() || "");
          setHierro(response.data.hierro || "");
          setCategoria(response.data.categoria || "");
          setUbicacion(response.data.ubicacion || "");

          // si es “cria”, carga estos:
          setParto(response.data.numero_parto?.toString() || "");
          setPrecocidad(response.data.precocidad?.toString() || "");
          setTipoMonta(response.data.tipo_monta || "");

          if (response.data.enfermedades) {
            const enfermedades = response.data.enfermedades.includes(",")
              ? response.data.enfermedades.split(",")
              : [response.data.enfermedades];

            const enfermedadesUnicas = Array.from(new Set(enfermedades));
            setDisease(enfermedadesUnicas);
          }

          if (response.data.foto) {
            setImage(`${API_URL}/uploads/${response.data.foto}`);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos del animal:", error);
        Alert.alert("Error", "No se pudieron cargar los datos del animal");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, [chipFromParams, itemsRaza]);

  useEffect(() => {
    if (animalData && animalData.enfermedades) {
      const enfermedades = animalData.enfermedades.split(",");
      setDisease(enfermedades);
    }
  }, [animalData]);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Se requieren permisos para acceder a la galería de imágenes.");
      }
    };
    requestPermission();
  }, []);


  useEffect(() => {

    NavigationBar.setBehaviorAsync("overlay-swipe");
  
  }, []);


const handleImagePick = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,  // ← Reducir calidad inicial
    allowsEditing: true,
  });

  if (!result.canceled && result.assets?.length > 0) {
    console.log('📸 Imagen seleccionada, comprimiendo...');
    
    // Comprimir la imagen ANTES de guardarla
    const compressedImage = await manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 800 } }],
      {
        compress: 0.7,
        format: SaveFormat.JPEG
      }
    );
    
    console.log('✅ Imagen comprimida');
    setImage(compressedImage.uri);
  } else {
    Alert.alert("⚠️ No se seleccionó ninguna imagen.");
  }
};

  const handleConfirmDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0];

    if (formattedDate > todayFormatted) {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha futura.");
    }

    setBirthDate(formattedDate);
    setDatePickerVisibility(false);
  };

  const resetForm = () => {
    setImage(null);
    setBreed("");
    setBirthDate("");
    setWeight("");
    setChip("");
    setFather("");
    setMother("");
    setDisease([]);
    setObservations("");
    setParto("");
    setPrecocidad("");
    setTipoMonta("");
    setUbicacion("");
    setCriadero("");
    setHierro("");
    setCategoria("");
    setParto("");
    setPrecocidad("");
    setTipoMonta("");
  };

const handleRegister = async () => {
  const newErrors = {
    photo: !image,
    chip: !chip,
    breed: !breed,
    birthDate: !birthDate,
    weight: !weight,
    categoria: !categoria,
    hierro: !hierro,
    ubicacion: !ubicacion,
    parto: categoria === "cria" && !parto,
    precocidad: categoria === "cria" && !precocidad,
    tipoMonta: categoria === "cria" && !tipoMonta,
  };

  setErrors(newErrors);

  if (Object.values(newErrors).includes(true)) {
    Alert.alert(
      "⚠️ Campos obligatorios incompletos",
      "Por favor completa todos los campos obligatorios."
    );
    return;
  }

  try {
    // 🆕 Verificar conexión a internet
    const networkState = await NetInfo.fetch();
    const isConnected = networkState.isConnected;
    
    console.log('🌐 Estado de conexión:', isConnected ? 'Online' : 'Offline');

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert(
        "❌ Error",
        "Token no encontrado. Inicia sesión nuevamente."
      );
      return;
    }

    const fechaFormateada = birthDate.split("T")[0];
    const enfermedadesFormateadas = disease.length > 0 ? disease.join(",") : null;

    // 🆕 Si está OFFLINE, guardar localmente
    if (!isConnected) {
      console.log('📵 Sin conexión - Guardando localmente');
      return await handleOfflineRegister(fechaFormateada, enfermedadesFormateadas);
    }

    // 🆕 Si está ONLINE, intentar enviar al servidor
    console.log('📶 Con conexión - Enviando al servidor');
    return await handleOnlineRegister(fechaFormateada, enfermedadesFormateadas, token);

  } catch (error) {
    console.error("Error general al registrar:", error);
    Alert.alert("❌ Error", "No se pudo completar la operación: " + error.message);
  }
};


const handleOfflineRegister = async (fechaFormateada, enfermedadesFormateadas) => {
  try {
    const token = AuthManager.getAuthToken();
    const currentUser = AuthManager.getCurrentUser();
    
    if (!token || !currentUser) {
      Alert.alert(
        '❌ Error',
        'No hay sesión activa. Debes iniciar sesión para registrar ganado offline.',
        [{ text: 'Ir a Login', onPress: () => navigation.navigate('Login') }]
      );
      return;
    }

    console.log('📵 Guardando offline con token válido');
    const localId = Date.now();
    
    // ✅ COMPRIMIR MÁS AGRESIVAMENTE PARA SYNC
    let photoData = null;
    
    if (image && image.startsWith('file://')) {
      console.log('📸 Comprimiendo imagen agresivamente para sincronización...');
      
      // 1. Comprimir a 400px y 30% calidad
      const ultraCompressed = await manipulateAsync(
        image,
        [{ resize: { width: 400 } }],
        {
          compress: 0.3,
          format: SaveFormat.JPEG
        }
      );
      
      const base64 = await FileSystem.readAsStringAsync(ultraCompressed.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      photoData = `data:image/jpeg;base64,${base64}`;
      
      const sizeInKB = (photoData.length * 0.75) / 1024;
      console.log('📏 Tamaño final foto offline:', sizeInKB.toFixed(2), 'KB');
      
      // 2. Si aún es muy grande (>100KB), comprimir más
      if (sizeInKB > 100) {
        console.warn('⚠️ Foto aún muy grande, comprimiendo a 300px...');
        
        const evenSmaller = await manipulateAsync(
          image,
          [{ resize: { width: 300 } }],
          {
            compress: 0.2,
            format: SaveFormat.JPEG
          }
        );
        
        const smallerBase64 = await FileSystem.readAsStringAsync(evenSmaller.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        photoData = `data:image/jpeg;base64,${smallerBase64}`;
        
        const newSizeKB = (photoData.length * 0.75) / 1024;
        console.log('✅ Foto ultra-comprimida:', newSizeKB.toFixed(2), 'KB');
      }
    }
    
    // Preparar datos del animal
    const animalData = {
      id: localId,
      chip_animal: chip,
      fecha_nacimiento: fechaFormateada,
      peso_nacimiento: parseFloat(weight),
      raza_id_raza: parseInt(breed),
      categoria: categoria,
      hierro: hierro,
      ubicacion: ubicacion,
      procedencia: criadero || null,
      id_madre: father || null,
      id_padre: mother || null,
      enfermedades: enfermedadesFormateadas,
      observaciones: observations || null,
      numero_parto: categoria === "cria" ? parto : null,
      precocidad: categoria === "cria" ? precocidad : null,
      tipo_monta: categoria === "cria" ? tipoMonta : null,
      foto: photoData || 'default.jpg',
      created_at: new Date().toISOString(),
      synced: false,
      user_id: currentUser.id,
      user_email: currentUser.correo,
    };

    console.log('💾 Guardando animal localmente');

    // Guardar en AsyncStorage
    const existingAnimals = await AsyncStorage.getItem('local_registro_animal');
    let animals = existingAnimals ? JSON.parse(existingAnimals) : [];
    animals.push(animalData);
    await AsyncStorage.setItem('local_registro_animal', JSON.stringify(animals));

    // Agregar a cola de sincronización con token
    await SyncQueue.add({
      table: 'registro_animal',
      recordId: localId,
      action: 'INSERT',
      data: animalData,
      token: token,
      user_id: currentUser.id
    });

    console.log('✅ Animal guardado y agregado a cola');

    Alert.alert(
      '📵 Guardado sin conexión',
      'El animal se registró localmente. Se sincronizará automáticamente cuando haya conexión.',
      [
        {
          text: 'OK',
          onPress: () => {
            resetForm();
            navigation.goBack();
          }
        }
      ]
    );

  } catch (error) {
    console.error('❌ Error en registro offline:', error);
    Alert.alert('❌ Error', 'No se pudo guardar localmente: ' + error.message);
  }
};

// 🔧 CORRECCIÓN: Usar token de AuthManager en lugar de AsyncStorage directo
const handleOnlineRegister = async (fechaFormateada, enfermedadesFormateadas) => {
  try {
    // ✅ Obtener token desde AuthManager (ya cargado al iniciar app)
    let token = AuthManager.getAuthToken();
    
    if (!token) {
      // Si no hay token en memoria, intentar cargar desde AsyncStorage
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        token = savedToken;
        AuthManager.authToken = savedToken; // Actualizar AuthManager
      } else {
        Alert.alert(
          "❌ Error",
          "No hay sesión activa. Inicia sesión nuevamente."
        );
        navigation.navigate("Login");
        return;
      }
    }

    console.log('🔑 Token disponible para registro:', token.substring(0, 20) + '...');

    // Preparar FormData
    const formData = new FormData();

    if (image && !image.startsWith("http")) {
      formData.append("foto", {
        uri: image,
        type: "image/jpeg",
        name: "foto.jpg",
      });
    }

    formData.append("chip_animal", chip);
    formData.append("fecha_nacimiento", fechaFormateada);
    formData.append("peso_nacimiento", weight);
    formData.append("raza_id_raza", breed);
    formData.append("categoria", categoria || null);
    formData.append("hierro", hierro || null);
    formData.append("ubicacion", ubicacion || null);
    formData.append("procedencia", criadero || "");

    if (father) formData.append("id_madre", father);
    if (mother) formData.append("id_padre", mother);
    if (enfermedadesFormateadas) formData.append("enfermedades", enfermedadesFormateadas);
    if (observations) formData.append("observaciones", observations);

    if (categoria === "cria") {
      formData.append("numero_parto", parto || "");
      formData.append("precocidad", precocidad || "");
      formData.append("tipo_monta", tipoMonta || "");
    } else {
      formData.append("numero_parto", "");
      formData.append("precocidad", "");
      formData.append("tipo_monta", "");
    }

    const url = animalData
      ? `${API_URL}/register/update/${chip}`
      : `${API_URL}/register/add`;

    const method = animalData ? "put" : "post";

    console.log('🌐 Enviando al servidor:', url);

    const response = await axios({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // ✅ Token de AuthManager
      },
      timeout: 15000,
    });

    if (response.status === 200 || response.status === 201) {
      console.log('✅ Animal registrado en servidor');
      
      Alert.alert(
        "✅ Operación exitosa",
        animalData
          ? "Los datos del animal han sido actualizados correctamente"
          : "El ganado ha sido registrado correctamente"
      );

      navigation.setParams({
        breed: breed,
        disease: disease,
        weight: weight,
        observations: observations,
      });

      navigation.goBack();
    }

  } catch (error) {
    console.error("❌ Error al registrar online:", error);
    
    // 🆕 Detectar si es error de token expirado
    if (error.response?.status === 401) {
      console.log('⚠️ Token expirado o inválido');
      
      // Intentar refrescar token
      const refreshed = await AuthManager.refreshToken();
      
      if (!refreshed) {
        Alert.alert(
          '🔐 Sesión expirada',
          'Tu sesión ha expirado. Inicia sesión nuevamente.',
          [
            {
              text: 'Ir a Login',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
        return;
      }
      
      // Token refrescado, reintentar registro
      console.log('✅ Token refrescado, reintentando registro...');
      return await handleOnlineRegister(fechaFormateada, enfermedadesFormateadas);
    }
    
    // Si falla por red, ofrecer modo offline
    if (error.code === 'ECONNABORTED' || error.message.includes('Network')) {
      console.log('⚠️ Error de red, cambiando a modo offline');
      Alert.alert(
        '⚠️ Sin conexión',
        'No se pudo conectar con el servidor. ¿Deseas guardar localmente?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Guardar Offline',
            onPress: () => handleOfflineRegister(fechaFormateada, enfermedadesFormateadas)
          }
        ]
      );
    } else {
      const mensaje = error.response?.data?.message 
        || error.response?.data?.error 
        || "No se pudo completar la operación.";
      Alert.alert("❌ Error", mensaje);
    }
  }
};


  // === INSETS para barra inferior y scroll ===
  const insets = useSafeAreaInsets();
  const BOTTOM_BAR_MIN_HEIGHT = 56; // altura visual mínima de tu barra

  if (loading && chipFromParams) {
    return (
      <ImageBackground
        source={require("../assets/acuarela.Home.png")}
        style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando datos del animal...</Text>
        </View>
      </ImageBackground>
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
        contentContainerStyle={{
          paddingBottom: insets.bottom + BOTTOM_BAR_MIN_HEIGHT + 12, // clave: deja espacio tras la barra
          paddingTop: 10,
        }}
        style={{ flex: 1 }}
      >
        <Image
          source={
            isEditing
              ? require("../assets/Editar_Chip.png")
              : require("../assets/Imagen_Formulario_Registro_Ganado.png")
          }
          style={isEditing ? styles.editImage : styles.registerImage}
        />

        <Text style={isEditing ? styles.editText : styles.formText}>
          {isEditing ? "EDITAR" : "FORMULARIO DE REGISTRO"}
        </Text>
        <Text style={styles.ganadoText}>
          {isEditing ? "REGISTRO DE GANADO" : "DE GANADO"}
        </Text>
        {renderTitle("Imagen del animal")}
        {!image ? (
          <TouchableOpacity
            onPress={handleImagePick}
            style={[styles.imagePicker, errors.photo && styles.inputError]}
          >
            <View style={styles.rowContainer}>
              <Image
                source={require("../assets/SubirImagen.png")}
                style={styles.logo}
              />
              <Text style={styles.imagePickerText}> Subir imagen*</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={styles.deleteButton}
            >
              <Image
                source={require("../assets/Eliminar.png")}
                style={styles.deleteButtonIcon}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Chip de registro vacuno */}
        {renderTitle("Chip de registro vacuno")}
        <View
          style={[styles.inputWithIconChips, errors.chip && styles.inputError]}
        >
          <Image
            source={require("../assets/Chip.png")}
            style={styles.iconStyleChips}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Chip de registro vacuno*"
            placeholderTextColor="#000"
            value={chip}
            onChangeText={setChip}
            editable={!isEditing}
          />
        </View>
        {renderTitle("Fecha de nacimiento")}
        <TouchableOpacity
          style={[styles.dateButton, errors.birthDate && styles.inputError]}
          onPress={() => setDatePickerVisibility(true)}
        >
          <View style={styles.rowContainer}>
            <Image
              source={require("../assets/FechaDeNacimieto.png")}
              style={styles.iconStyle}
            />
            <Text style={styles.dateButtonText}>
              {birthDate ? birthDate : "Fecha de nacimiento*"}
            </Text>
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          themeVariant="light"
          onCancel={() => setDatePickerVisibility(false)}
          maximumDate={new Date()}
        />
        {renderTitle("Peso al nacimiento")}
        <View
          style={[styles.weightContainer, errors.weight && styles.inputError]}
        >
          <View style={styles.inputWithIcon}>
            <Image
              source={require("../assets/Peso.png")}
              style={styles.iconStylePeso}
            />
            <TextInput
              style={styles.weightInput}
              placeholder="Peso*"
              placeholderTextColor="#000"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Text style={styles.weightUnit}>(Kg)</Text>
          </View>
        </View>
        {renderTitle("Raza del animal")}
        <DropDownPicker
          open={openRaza}
          setOpen={setOpenRaza}
          items={itemsRaza}
          value={breed}
          setValue={setBreed}
          placeholder={breed ? "" : "Selecciona la raza*"}
          style={[
            styles.dropdown,
            errors.breed && styles.inputError,
            { width: screenWidth * 0.9 },
          ]}
          textStyle={styles.dropdownText}
          listMode="SCROLLVIEW"
          maxHeight={200}
          arrowIconStyle={styles.arrowIconStyle}
        />
        {renderTitle("Procedencia del ganado (Criadero)")}
        <View
          style={[
            styles.inputWithIconChips,
            errors.criadero && styles.inputError,
          ]}
        >
          <Image
            source={require("../assets/procedencia.png")}
            style={styles.iconStyleChips}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Procedencia del ganado (Criadero)"
            placeholderTextColor="#000"
            value={criadero}
            onChangeText={setCriadero}
          />
        </View>
        {renderTitle("Hierro del propietario")}
        <View
          style={[
            styles.inputWithIconChips,
            errors.hierro && styles.inputError,
          ]}
        >
          <Image
            source={require("../assets/hierro.png")}
            style={styles.iconStyleChips}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Hierro del propietario*"
            placeholderTextColor="#000"
            value={hierro}
            onChangeText={setHierro}
          />
        </View>
        {renderTitle("Categoría del animal")}
        <DropDownPicker
          open={openCategoria}
          setOpen={setOpenCategoria}
          items={categoriaItems}
          value={categoria}
          setValue={setCategoria}
          placeholder={categoria ? "" : "Selecciona una categoría*"}
          style={[
            styles.dropdown,
            errors.categoria && styles.inputError,
            { width: screenWidth * 0.9 },
          ]}
          textStyle={styles.dropdownText}
          listMode="SCROLLVIEW"
          maxHeight={200}
          arrowIconStyle={styles.arrowIconStyle}
        />

        {categoria === "cria" && (
          <>
            {/* Número de Parto */}
            {renderTitle("Número de parto")}
            <View style={[styles.inputWithIconChips]}>
              <Image
                source={require("../assets/hierro.png")}
                style={styles.iconStyleChips}
              />
              <TextInput
                style={styles.inputChips}
                placeholder="Número de Parto"
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={parto}
                onChangeText={setParto}
              />
            </View>

            {/* Precocidad */}
            {renderTitle("Precocidad")}
            <View style={[styles.inputWithIconChips]}>
              <Image
                source={require("../assets/hierro.png")}
                style={styles.iconStyleChips}
              />
              <TextInput
                style={styles.inputChips}
                placeholder="Precocidad"
                placeholderTextColor="#000"
                value={precocidad}
                onChangeText={setPrecocidad}
              />
            </View>

            {/* Tipo de Monta */}
            {renderTitle("Tipo de monta")}
            <DropDownPicker
              open={openTipoMonta}
              setOpen={setOpenTipoMonta}
              items={[
                { label: "Directa", value: "directa" },
                { label: "Inseminación", value: "inseminacion" },
              ]}
              value={tipoMonta} // Asegúrate de que este valor esté actualizado correctamente
              setValue={setTipoMonta}
              placeholder={tipoMonta ? "" : "Selecciona el tipo de monta"}
              style={[styles.dropdown, { width: screenWidth * 0.9 }]}
              textStyle={styles.dropdownText}
              listMode="SCROLLVIEW"
              maxHeight={200}
              arrowIconStyle={styles.arrowIconStyle}
            />
          </>
        )}
        {renderTitle("Ubicación del ganado")}
        <View
          style={[
            styles.inputWithIconChips,
            errors.ubicacion && styles.inputError,
          ]}
        >
          <Image
            source={require("../assets/ubicacion.png")}
            style={styles.iconStyleChips}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Ubicación del ganado*"
            placeholderTextColor="#000"
            value={ubicacion}
            onChangeText={setUbicacion}
          />
        </View>
        {/* Registro de la madre */}

        {renderTitle("Registro de la madre")}
        <View style={styles.inputWithIconChips}>
          <Image
            source={require("../assets/Id_Madre.png")}
            style={styles.iconStyleChipsP}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Registro del madre"
            placeholderTextColor="#000"
            value={father}
            onChangeText={setFather}
          />
        </View>

        {/* Registro del padre */}
        {renderTitle("Registro del padre")}
        <View style={styles.inputWithIconChips}>
          <Image
            source={require("../assets/Id_Padre.png")}
            style={styles.iconStyleChipsP}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Registro de la padre"
            placeholderTextColor="#000"
            value={mother}
            onChangeText={setMother}
          />
        </View>
        {renderTitle("Enfermedades del animal")}
        <DropDownPicker
          multiple={true}
          min={0}
          max={20}
          open={openEnfermedad}
          setOpen={setOpenEnfermedad}
          items={itemsEnfermedad}
          value={disease}
          setValue={(value) => {
            const newValue = value;
            setDisease(newValue);
          }}
          placeholder="Selecciona una o más enfermedades"
          style={styles.dropdownEnfermedad}
          textStyle={styles.dropdownTextEnfermedad}
          listMode="SCROLLVIEW"
          maxHeight={200}
          multipleText={`${disease.length} enfermedade${
            disease.length === 1 ? "" : "s"
          } seleccionada${disease.length === 1 ? "" : "s"}`}
          arrowIconStyle={styles.arrowIconStyle}
        />

        <Text style={styles.selectedDiseases}>
          {Array.isArray(disease) && disease.length > 0
            ? disease.join("\n")
            : "Selecciona las enfermedades"}
        </Text>
        {renderTitle("Observaciones")}
        <View style={styles.inputWrapper}>
          <Image
            source={require("../assets/Obs.png")}
            style={styles.iconStyleO}
          />
          <TextInput
            style={styles.inputobs}
            placeholder={isFocused ? "" : "Observaciones"}
            value={observations}
            onChangeText={setObservations}
            multiline
            textAlignVertical="top"
            maxLength={500}
            placeholderTextColor="#000"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>
            {isEditing ? "Actualizar Datos" : "Registrar Ganado"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

         {/* Barra inferior SEGURA */}
      <View
        style={[
          styles.greenBar,
          {
            // evita solaparse con la barra del sistema (gestos/botones)
            paddingBottom: insets.bottom,
            // altura visual mínima de tu barra
            minHeight: BOTTOM_BAR_MIN_HEIGHT,
            paddingTop: 8,
          },
        ]}
      >
        <View style={styles.bottomImageContainer}>
          {/* Imagen Inicio */}
          <TouchableOpacity onPress={navigateToHome}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/Inicio.png")}
                style={styles.imageStyle}
              />
              <Text style={styles.imageText}>Inicio</Text>
            </View>
          </TouchableOpacity>

          {/* Imagen Regresar */}
          <TouchableOpacity onPress={handleGoBack}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/Regresar.png")}
                style={styles.imageStyle}
              />
              <Text style={styles.imageText}>Regresar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}