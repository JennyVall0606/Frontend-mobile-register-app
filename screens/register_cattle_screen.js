import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Layout from "../components/layout";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Asegúrate de importarlo
import styles from "../styles/register_cattle_styles";
import axios from "axios";

export default function RegisterCattleScreen() {
  const navigation = useNavigation();
  
  const [imagenes, setImagenes] = useState([]);
  
  const [image, setImage] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [chip, setChip] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [disease, setDisease] = useState([]); 

  const [observations, setObservations] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [openRaza, setOpenRaza] = useState(false);
  const [itemsRaza, setItemsRaza] = useState([]);
  const [breed, setBreed] = useState("");
  const [openEnfermedad, setOpenEnfermedad] = useState(false);
  const [itemsEnfermedad, setItemsEnfermedad] = useState([
    { label: "Brucelosis", value: "brucelosis" },
    { label: "Fiebre aftosa", value: "fiebre aftosa" },
    { label: "Tuberculosis bovina", value: "tuberculosis bovina" },
    { label: "Anaplasmosis", value: "anaplasmosis" },
    { label: "Leucosis bovina", value: "leucosis bovina" },
    { label: "Diarrea viral bovina (BVD)", value: "diarrea viral bovina" },
    { label: "Paratuberculosis (Johne)", value: "paratuberculosis" },
    { label: "Neosporosis", value: "neosporosis" },
    { label: "Enfermedad respiratoria bovina", value: "enfermedad respiratoria bovina" },
    { label: "Fiebre del transporte", value: "fiebre del transporte" },
    { label: "Dermatitis digital", value: "dermatitis digital" },
    { label: "Rabia", value: "rabia" },
    { label: "Salmonelosis", value: "salmonelosis" },
    { label: "Acetonemia (cetosis)", value: "acetonemia" },
    { label: "Mastitis", value: "mastitis" },
    { label: "Ninguna", value: "Ninguna" },
    { label: "OTRA", value: "OTRA" },
  ]);

  useEffect(() => {
    const fetchRazas = async () => {
      try {
        const response = await axios.get("http://192.168.1.4:3000/register/razas");
        const razaItems = response.data.map((raza) => ({
          label: raza.nombre_raza,
          value: raza.id_raza,
        }));
        console.log("Razas:", razaItems);
        setItemsRaza(razaItems);
      } catch (error) {
        console.error("Error al obtener las razas:", error);
      }
    };
    fetchRazas();
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    const formattedDate = date.toISOString().split("T")[0];
    if (currentDateType === "fechaNacimiento") {
      setBirthDate(formattedDate);
    } else {
      setWeight(formattedDate);
    }
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
    setDisease(null);
    setObservations("");
  };

  const handleRegister = async () => {
    if (!chip || !breed || !birthDate || !weight) {
      Alert.alert("⚠️ Datos incompletos", "Por favor completa los campos obligatorios.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      // Agregar solo la imagen principal
      if (image) {
        formData.append('foto', {
          uri: image,
          type: 'image/jpeg',
          name: 'foto.jpg',
        });
      
      } else {
        Alert.alert("⚠️ Error", "Por favor sube una imagen");
        return;
      }
  
      formData.append('chip_animal', chip);
      formData.append('raza_id_raza', parseInt(breed) || 25);
      formData.append('fecha_nacimiento', birthDate);
      formData.append('peso_nacimiento', parseFloat(weight));
      formData.append('id_padre', father || null);
      formData.append('id_madre', mother || null);
      formData.append('enfermedades', disease || null);
      formData.append('observaciones', observations || "");
  
      const response = await axios.post("http://192.168.1.4:3000/register/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      Alert.alert("✅ Registro exitoso", "El ganado ha sido registrado correctamente");
      resetForm();
    } catch (error) {
      console.error("Error al registrar:", error);
      if (error.response) {
        console.log("Detalles del error:", error.response.data);
      }
      Alert.alert("❌ Error", "No se pudo registrar el ganado.");
    }
  };



  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Formulario de Registro de Ganado</Text>

            {/* Muestra la imagen si se ha seleccionado */}
            {!image ? (
              <TouchableOpacity
                onPress={handleImagePick}
                style={styles.imagePicker}
              >
                <Text style={styles.imagePickerText}>🐄 Subir imagen 📸</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  style={styles.deleteButton}
                >
                  <Ionicons
                    name="trash-bin"
                    size={20}
                    style={styles.deleteButtonIcon}
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Selección de raza */}
            <DropDownPicker
              open={openRaza}
              setOpen={setOpenRaza}
              items={itemsRaza}
              setItems={setItemsRaza}
              value={breed}
              setValue={setBreed}
              placeholder="Selecciona una raza"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              listMode="SCROLLVIEW"
            />

            {/* Botón para seleccionar la fecha de nacimiento */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setCurrentDateType("fechaNacimiento");
                setDatePickerVisibility(true);
              }}
            >
              <View style={styles.rowContainer}>
                <Ionicons name="calendar" style={styles.iconStyle} />
                <Text style={styles.dateButtonText}>
                  {birthDate ? birthDate : "Fecha de nacimiento"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* DateTimePickerModal */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              themeVariant="light"
              onCancel={() => setDatePickerVisibility(false)}
            />

<View style={styles.weightContainer}>
  <TextInput
    style={styles.weightInput}
    placeholder="Peso"
    keyboardType="numeric"
    value={weight}
    onChangeText={setWeight}
  />
  <Text style={styles.weightUnit}>kg</Text>
</View>

            <TextInput
              style={styles.input}
              placeholder="Chip de registro vacuno"
              value={chip}
              onChangeText={setChip}
            />

            <TextInput
              style={styles.input}
              placeholder="Registro del padre"
              value={father}
              onChangeText={setFather}
            />

            <TextInput
              style={styles.input}
              placeholder="Registro de la madre"
              value={mother}
              onChangeText={setMother}
            />

<DropDownPicker
  multiple={true}
  min={0}
  max={20}
  open={openEnfermedad}
  setOpen={setOpenEnfermedad}
  items={itemsEnfermedad}
  setItems={setItemsEnfermedad}
  value={disease}
  setValue={setDisease}
  placeholder="Selecciona una o más enfermedades"
  style={styles.dropdown}
  textStyle={styles.dropdownText}
  listMode="SCROLLVIEW"
  multipleText={`${disease.length} enfermedad${disease.length === 1 ? '' : 'es'} seleccionada${disease.length === 1 ? '' : 's'}`}
/>

<Text style={styles.selectedDiseases}>
  {disease.length > 0 ? `Enfermedades seleccionadas: ${disease.join(', ')}` : 'Selecciona las enfermedades'}
</Text>



<View style={styles.inputWrapper}>
  <TextInput
    style={styles.inputobs}
    placeholder="Observaciones"
    value={observations}
    onChangeText={setObservations}
    multiline
    textAlignVertical="top"
    maxLength={500} // Puedes ajustar el límite según necesidad
  />
</View>


            <TouchableOpacity
              onPress={handleRegister}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>Registrar Ganado</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );
}

