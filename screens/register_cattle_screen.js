import React, { useState, useEffect, SafeAreaView  } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  scrollViewRef,
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
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "../styles/register_cattle_styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function RegisterCattleScreen({ route }) {
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
  const [currentDateType, setCurrentDateType] = useState("");
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
  const [criadero, setCriadero] = useState(""); // Procedencia del ganado
const [hierro, setHierro] = useState(""); // Hierro del propietario
const [categoria, setCategoria] = useState(""); // Categoría
const [ubicacion, setUbicacion] = useState(""); // Ubicación del ganado
const [openCategoria, setOpenCategoria] = useState(false);  // Asegúrate de definir el estado correctamente

// Definir los ítems de la categoría
const categoriaItems = [
  { label: "Cría", value: "cria" },
  { label: "Levante", value: "levante" },
  { label: "Ceba", value: "ceba" },
];
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
const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    const fetchRazas = async () => {
      try {
        const response = await axios.get(`${API_URL}/register/razas`);
        const razaItems = response.data.map((raza) => ({
          label: raza.nombre_raza,
          value: raza.id_raza.toString(),
        }));
        setItemsRaza(razaItems);
      } catch (error) {
        console.error("Error al obtener las razas:", error);
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

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
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
    setDisease(Array.isArray(value) ? value : []);
    setObservations("");
  };

  const handleRegister = async () => {
    const newErrors = {
      photo: !image,
      chip: !chip,
      breed: !breed,
      birthDate: !birthDate,
      weight: !weight,
       categoria: !categoria,
       hierro: !hierro,  // Validación para "Hierro"
    ubicacion: !ubicacion,  // Validación para "Ubicación"
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
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert(
          "❌ Error",
          "Token no encontrado. Inicia sesión nuevamente."
        );
        return;
      }

      if (!chip || !breed || !birthDate || !weight) {
        Alert.alert(
          "⚠️ Datos incompletos",
          "Por favor completa los campos obligatorios."
        );
        return;
      }


     
        
      const fechaFormateada = birthDate.split("T")[0];
      const enfermedadesFormateadas =
        disease.length > 0 ? disease.join(",") : null;
      const formData = new FormData();

      if (image && !image.startsWith("http")) {
        formData.append("foto", {
          uri: image,
          type: "image/jpeg",
          name: "foto.jpg",
        });
      }
formData.append("hierro", hierro);  
formData.append("ubicacion", ubicacion);  
formData.append("categoria", categoria);  
formData.append("procedencia", criadero); 
      formData.append("chip_animal", chip);
      formData.append("raza_id_raza", breed);
      formData.append("peso_nacimiento", weight);
      formData.append("fecha_nacimiento", fechaFormateada);
      if (father) formData.append("id_madre", father);
      if (mother) formData.append("id_padre", mother);
      if (enfermedadesFormateadas)
        formData.append("enfermedades", enfermedadesFormateadas);
      if (observations) formData.append("observaciones", observations);

      const url = animalData
        ? `${API_URL}/register/update/${chip}`
        : `${API_URL}/register/add`;

      const method = animalData ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      

      if (response.status === 200 || response.status === 201) {
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
      console.error("Error al registrar/actualizar:", error);
      if (error.response && error.response.data) {
        console.log("Detalles del error:", error.response.data);
        const mensaje =
          error.response.data.message ||
          error.response.data.error ||
          "No se pudo completar la operación.";
        Alert.alert("❌ Error", mensaje);
      } else {
        Alert.alert("❌ Error", "No se pudo completar la operación.");
      }
    }
  };

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
  source={require('../assets/acuarela.Home.png')} 
  style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
>

      <View >
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
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }} 
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
    { width: screenWidth * 0.9 } 
  ]}
    textStyle={styles.dropdownText}
    listMode="SCROLLVIEW"
    maxHeight={200} 
    arrowIconStyle={styles.arrowIconStyle} 
    
  />





<View style={[styles.inputWithIconChips, errors.criadero && styles.inputError]}>
  <Image
    source={require("../assets/procedencia.png")} // Coloca una imagen adecuada si es necesario
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

// 3. Agregar el campo de "Hierro del propietario"
<View style={[styles.inputWithIconChips, errors.hierro && styles.inputError]}>
  <Image
    source={require("../assets/hierro.png")} // Coloca una imagen adecuada si es necesario
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

// 4. Agregar el campo de "Categoría" (Lista desplegable)
<DropDownPicker
  open={openCategoria}
  setOpen={setOpenCategoria}
  items={categoriaItems}
  value={categoria}
  setValue={setCategoria}
  placeholder={categoria ? "" : "Selecciona una categoría*"}
  style={[styles.dropdown, errors.categoria && styles.inputError, { width: screenWidth * 0.9 }]}
  textStyle={styles.dropdownText}
  listMode="SCROLLVIEW"
  maxHeight={200}
  arrowIconStyle={styles.arrowIconStyle}
/>

// 5. Agregar el campo de "Ubicación del ganado"
<View style={[styles.inputWithIconChips, errors.ubicacion && styles.inputError]}>
  <Image
    source={require("../assets/ubicacion.png")} // Coloca una imagen adecuada si es necesario
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


  






        





        {/* Registro del padre */}
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

        {/* Registro de la madre */}
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

        {/* Barra inferior */}
      <View style={styles.greenBar}>
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