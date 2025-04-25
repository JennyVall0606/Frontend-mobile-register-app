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
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de importar Icon
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "../styles/register_cattle_styles";
import axios from "axios";



export default function RegisterCattleScreen() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

 const [birthDate, setBirthDate] = useState("");
  const [weight, setWeight] = useState("");
  const [chip, setChip] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [disease, setDisease] = useState(null);
  const [observations, setObservations] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");

  const [openRaza, setOpenRaza] = useState(false);

  const [itemsRaza, setItemsRaza] = useState([]);
  const [breed, setBreed] = useState("");
  const [openEnfermedad, setOpenEnfermedad] = useState(false);

  const [itemsEnfermedad, setItemsEnfermedad] = useState([
    { label: "Brucelosis", value: "brucelosis" },
    { label: "Fiebre aftosa", value: "fiebre_aftosa" },
    { label: "Tuberculosis bovina", value: "tuberculosis_bovina" },
    { label: "Anaplasmosis", value: "anaplasmosis" },
    { label: "Leucosis bovina", value: "leucosis_bovina" },
    { label: "Diarrea viral bovina (BVD)", value: "diarrea_viral_bovina" },
    { label: "Paratuberculosis (Johne)", value: "paratuberculosis" },
    { label: "Neosporosis", value: "neosporosis" },
    { label: "Enfermedad respiratoria bovina", value: "enfermedad_respiratoria_bovina" },
    { label: "Fiebre del transporte", value: "fiebre_del_transporte" },
    { label: "Dermatitis digital", value: "dermatitis_digital" },
    { label: "Rabia", value: "rabia" },
    { label: "Salmonelosis", value: "salmonelosis" },
    { label: "Acetonemia (cetosis)", value: "acetonemia" },
    { label: "Mastitis", value: "mastitis" },
    { label: "OTRA", value: "OTRA" }
  ]);
  
  useEffect(() => {
    const fetchRazas = async () => {
      try {
        const response = await axios.get('http://192.168.1.4:3000/register/razas'); // Asegúrate de cambiar esta URL al de tu backend
        const razaItems = response.data.map(raza => ({
          label: raza.nombre_raza, // Ajusta según el campo que tenga tu tabla para el nombre
          value: raza.id_raza // Asegúrate de usar el identificador correcto
        }));
        console.log("Razas:", razaItems);
        setItemsRaza(razaItems);

      } catch (error) {
        console.error('Error al obtener las razas:', error);
      }
    };

    fetchRazas();
  }, []);

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
    const formattedDate = date.toISOString().split('T')[0]; // Esto da '2025-04-23'
    if (currentDateType === "peso") {
      setWeight(formattedDate);
    } else {
      setBirthDate(formattedDate);
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
      const formData = {
        chip_animal: chip,
        raza_id_raza: parseInt(breed) || 25,
        fecha_nacimiento: birthDate,
        peso_nacimiento: parseFloat(weight),
        id_padre: father || null,
        id_madre: mother || null,
        enfermedades: disease || null,
        observaciones: observations || "", // Asegura que siempre esté presente
      };
      
  
      await axios.post("http://192.168.1.4:3000/register/add", formData);
  
      Alert.alert("✅ Registro exitoso", "El ganado ha sido registrado correctamente");
      resetForm();
    } catch (error) {
      console.error("Error al registrar:", error);
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

<View >
  
  <DropDownPicker
    open={openRaza}
    setOpen={setOpenRaza}
    items={itemsRaza}
    setItems={setItemsRaza}
    value={disease}
    setValue={setDisease}
    placeholder="Selecciona una raza"
    zIndex={1000}
    style={styles.dropdown}
    textStyle={styles.dropdownText}
    listMode="SCROLLVIEW"
  />
</View>


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

            <TextInput
              style={styles.input}
              placeholder="Peso"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />

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

            <View>
            <DropDownPicker
  open={openEnfermedad}
  setOpen={setOpenEnfermedad}
  items={itemsEnfermedad}
  setItems={setItemsEnfermedad}
  value={disease}
  setValue={setDisease}
  placeholder="Selecciona una enfermedad"
  zIndex={1000}
  style={styles.dropdown}
  textStyle={styles.dropdownText}
  listMode="SCROLLVIEW"
/>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Observaciones"
              value={observations}
              onChangeText={setObservations}
              multiline
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Registrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        themeVariant="light"
        onCancel={() => setDatePickerVisibility(false)}
      />
    </Layout>
  );
}
