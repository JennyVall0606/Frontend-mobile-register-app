import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Layout from '../components/layout';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles, { getDropdownWrapper } from '../styles/register_cattle_styles';

export default function RegisterCattleScreen() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [weight, setWeight] = useState('');
  const [chip, setChip] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [disease, setDisease] = useState(null);
  const [observations, setObservations] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Brucelosis', value: 'brucelosis' },
    { label: 'Fiebre aftosa', value: 'fiebre_aftosa' },
    { label: 'Tuberculosis', value: 'tuberculosis' },
  ]);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la galería de imágenes.');
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
      Alert.alert('⚠️ No se seleccionó ninguna imagen.');
    }
  };

  const handleConfirmDate = (date) => {
    setBirthDate(date.toLocaleDateString());
    setDatePickerVisibility(false);
  };

  const resetForm = () => {
    setImage(null);
    setBreed('');
    setBirthDate('');
    setWeight('');
    setChip('');
    setFather('');
    setMother('');
    setDisease(null);
    setObservations('');
  };

  const handleRegister = () => {
    if (!chip || !breed || !birthDate || !weight) {
      Alert.alert('⚠️ Datos incompletos', 'Por favor completa los campos obligatorios.');
      return;
    }

    Alert.alert('✅ Registro exitoso', 'El ganado ha sido registrado correctamente');
    resetForm();
  };

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Formulario de Registro de Ganado</Text>

            {!image ? (
              <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
                <Text style={styles.imagePickerText}>🐄 Subir imagen 📸</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity onPress={() => setImage(null)} style={styles.deleteButton}>
                  <Icon name="trash-2" size={20} style={styles.deleteButtonIcon} />
                </TouchableOpacity>
              </View>
            )}

            <TextInput
              style={styles.input}
              placeholder="Raza"
              value={breed}
              onChangeText={setBreed}
            />

<View style={styles.inputContainer}>
  <TextInput
    style={[styles.input, styles.dateInput]} // Asegúrate de que 'styles.input' esté correctamente aplicado
    placeholder="Fecha de nacimiento"
    value={birthDate}
    onFocus={() => setDatePickerVisibility(true)}
    editable={false} // El campo es solo lectura porque se selecciona a través del date picker
  />
  
  <TouchableOpacity
    style={styles.calendarIcon}
    onPress={() => setDatePickerVisibility(true)}
  >
    <Icon name="calendar" style={styles.icon} />
  </TouchableOpacity>

  <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    onConfirm={handleConfirmDate}
    themeVariant="light"
    onCancel={() => setDatePickerVisibility(false)}
  />
</View>


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

            <View style={getDropdownWrapper(open)}>
              <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={items}
                setItems={setItems}
                value={disease}
                setValue={setDisease}
                placeholder="Selecciona una enfermedad"
                zIndex={1000} // Asegura que el modal se dibuje correctamente sobre otros elementos
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                listMode="SCROLLVIEW" // Cambiado a MODAL para que no ocupe toda la pantalla
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Observaciones"
              value={observations}
              onChangeText={setObservations}
              multiline
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Registrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );
}



