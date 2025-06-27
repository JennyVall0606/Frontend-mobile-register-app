import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../components/layout";
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [openRaza, setOpenRaza] = useState(false);
  const [itemsRaza, setItemsRaza] = useState([]);
  const [breed, setBreed] = useState(""); // Estado para la raza seleccionada
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

  const [errors, setErrors] = useState({
    photo: false,
    chip: false,
    breed: false,
    birthDate: false,
    weight: false,
  });

  const API_URL = "http://192.168.1.10:3000";

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

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

  // Verificamos que la raza seleccionada esté en el listado de razas.
  useEffect(() => {
    if (razaId) {
      const razaExistente = itemsRaza.find((item) => item.label === razaId);
      if (razaExistente) {
        setBreed(razaExistente.value); // Esto asegura que el valor numérico se use en lugar del nombre
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

          // Convertir las enfermedades de un string a un arreglo
          if (response.data.enfermedades) {
            const enfermedades = response.data.enfermedades.includes(",")
              ? response.data.enfermedades.split(",") // Convertir el string a un arreglo
              : [response.data.enfermedades]; // Si es un solo valor, convertirlo en un arreglo

            const enfermedadesUnicas = Array.from(new Set(enfermedades)); // Eliminar duplicados
            setDisease(enfermedadesUnicas); // Actualiza el estado con las enfermedades únicas
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

        // Aquí enviamos la actualización a la pantalla anterior
        navigation.setParams({
          breed: breed, // Actualizamos la raza
          disease: disease, // Actualizamos las enfermedades
          weight: weight, // Actualizamos el peso
          observations: observations, // Actualizamos las observaciones
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
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando datos del animal...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView style={[styles.container, { width, height }]}>
        <Image
          source={
            isEditing
              ? require("../assets/Editar_Chip.png") // Ruta de la imagen para "Editar"
              : require("../assets/Imagen_Formulario_Registro_Ganado.png") // Ruta de la imagen para "Registrar"
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
                style={styles.logo} // Estilo para el logo
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
                source={require("../assets/Eliminar.png")} // Ruta de tu imagen
                style={styles.deleteButtonIcon} // Aplica los estilos a la imagen
              />
            </TouchableOpacity>
          </View>
        )}



<View style={[styles.dropdownContainer, errors.breed && styles.inputError]}>
  <Image 
    source={require("../assets/SeleccionarRaza.png")} // Ajusta la ruta de tu logo
    style={styles.dropdownLogo} 
  />
  <DropDownPicker
    open={openRaza}
    setOpen={setOpenRaza}
    items={itemsRaza}
    value={breed}
    setValue={setBreed}
    placeholder={breed ? "" : "Selecciona una raza*"}
    style={[styles.dropdown, errors.breed && styles.inputError1]} // Aplica el estilo de error al DropDownPicker
    textStyle={styles.dropdownText}
    listMode="SCROLLVIEW"
     arrowIconStyle={styles.arrowIconStyle} // Estilo para la flecha hacia abajo
  />
</View>
































        <TouchableOpacity
          style={[styles.dateButton, errors.birthDate && styles.inputError]}
          onPress={() => setDatePickerVisibility(true)}
        >
          <View style={styles.rowContainer}>
            <Image
              source={require("../assets/FechaDeNacimieto.png")} // Ruta de la imagen local
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
          maximumDate={new Date()} // Establece el día de hoy como la fecha máxima (deshabilita fechas futuras)
        />




        <View
          style={[styles.weightContainer, errors.weight && styles.inputError]}
        >
          <View style={styles.inputWithIcon}>
            <Image
              source={require("../assets/Peso.png")} // Ruta de la imagen local
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

        {/* Registro del padre */}
        <View style={styles.inputWithIconChips}>
          <Image
            source={require("../assets/Id_Padre.png")}
            style={styles.iconStyleChipsP}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Registro del padre"
            placeholderTextColor="#000"
            value={father}
            onChangeText={setFather}
          />
        </View>

        {/* Registro de la madre */}
        <View style={styles.inputWithIconChips}>
          <Image
            source={require("../assets/Id_Madre.png")}
            style={styles.iconStyleChipsP}
          />
          <TextInput
            style={styles.inputChips}
            placeholder="Registro de la madre"
            placeholderTextColor="#000"
            value={mother}
            onChangeText={setMother}
          />
        </View>






<View style={[styles.dropdownContainer]}>
  <Image 
    source={require("../assets/Enfermedades.png")} // Ajusta la ruta de tu logo
    style={styles.dropdownLogo} 
  />


        <DropDownPicker
          multiple={true}
          min={0}
          max={20}
          open={openEnfermedad}
          setOpen={setOpenEnfermedad}
          items={itemsEnfermedad}
          value={disease}
          setValue={(value) => {
            // Si el valor ya existe en el arreglo, lo eliminamos, de lo contrario lo agregamos
            const newValue = value;
            setDisease(newValue);
          }}
          placeholder="Selecciona una o más enfermedades"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          listMode="SCROLLVIEW"
          multipleText={`${disease.length} enfermedade${
            disease.length === 1 ? "" : "s"
          } seleccionada${disease.length === 1 ? "" : "s"}`}
          arrowIconStyle={styles.arrowIconStyle} // Estilo para la flecha hacia abajo
        />


</View>











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
            placeholder="Observaciones"
            value={observations}
            onChangeText={setObservations}
            multiline
            textAlignVertical="top"
            maxLength={500}
            placeholderTextColor="#000"
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
    </Layout>
  );
}
