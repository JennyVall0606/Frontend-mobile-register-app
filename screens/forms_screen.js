import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/layout";
import styles from "../styles/forms_styles";
import axios from "axios";
import tipoVacunas from "../services/tipoVacunas";
import nombreVacunas from "../services/nombreVacunas";
import DropDownPicker from "react-native-dropdown-picker";
import formsStyles from "../styles/forms_styles"; // Ajusta la ruta según donde esté tu archivo

export default function FormsScreen() {
  const navigation = useNavigation();

  const [pesoChecked, setPesoChecked] = useState(false);
  const [vacunaChecked, setVacunaChecked] = useState(false);

  // Estados para formulario de peso

  const [chipPeso, setChipPeso] = useState("");
  const [cattlePeso, setCattlePeso] = useState(null);
  const [peso, setPeso] = useState("");
  const [fechaPeso, setFechaPeso] = useState("");
  const typingTimeoutRef = useRef(null);

  // Estados para formulario de vacunas
  const [chipVacuna, setChipVacuna] = useState("");
  const [dosis, setDosis] = useState("");
  const [observacion, setObservacion] = useState("");
  const [fechaVacuna, setFechaVacuna] = useState("");
  const [cattleVacuna, setCattleVacuna] = useState(null);

  // DropDownPicker estados
  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openVacunaNombre, setOpenVacunaNombre] = useState(false);
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState([]);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [filteredCattle, setFilteredCattle] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.4:3000/vaccines/tipos-vacuna")
      .then((res) => setItemsTipoVacuna(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://192.168.1.4:3000/vaccines/nombres-vacuna")
      .then((res) => setItemsVacunaNombre(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchCattleData = async (chip) => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:3000/register/animal/${chip}`
      );

      return response.data;
    } catch (error) {
      console.error("Error al buscar el ganado:", error);
      return null;
    }
  };

  const handleConfirmDate = (date) => {
    const today = new Date().toISOString().split("T")[0]; // obtener fecha actual en formato yyyy-mm-dd

    if (date.toISOString().split("T")[0] > today) {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha futura.");
      return;
    }

    // ✅ Formato correcto para MySQL
    const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd

    if (currentDateType === "peso") {
      setFechaPeso(formattedDate);
    } else {
      setFechaVacuna(formattedDate);
    }
    setDatePickerVisibility(false);
  };

  const resetPesoFields = () => {
    setCattlePeso(null);
    setPeso("");
    setFechaPeso("");
  };

  const resetVacunaFields = () => {
    setCattleVacuna(null);
    setTipoVacuna(null);
    setNombreVacuna(null);
    setDosis("");
    setObservacion("");
    setFechaVacuna("");
  };

  const handleChipPesoChange = (chip) => {
    setChipPeso(chip);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const cattleData = await fetchCattleData(chip);
      console.log("Respuesta del backend:", cattleData);

      if (cattleData && cattleData.chip_animal) {
        setCattlePeso(cattleData);
        Alert.alert("encontrado", "El chip  existente.");
      } else {
        Alert.alert("No encontrado", "El chip no existe en la base de datos.");
        setCattlePeso(null);
      }
    }, 5000); // 700 ms después de que el usuario deja de escribir
  };

  const handleChipVacunaChange = (chip) => {
    setChipVacuna(chip);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const cattleData = await fetchCattleData(chip);
      console.log("Respuesta del backend:", cattleData);

      if (cattleData && cattleData.chip_animal) {
        setCattleVacuna(cattleData);
        Alert.alert("encontrado", "El chip  existente.");
      } else {
        Alert.alert("No encontrado", "El chip no existe en la base de datos.");

        setCattleVacuna(null);
      }
    }, 5000); // 700 ms después de que el usuario deja de escribir
  };

  const guardarPeso = async () => {
    if (!chipPeso || !peso || !fechaPeso) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (!cattlePeso) {
      Alert.alert("Error", "El chip no existe.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.4:3000/weighing/add",
        {
          chip_animal: chipPeso,
          fecha_pesaje: fechaPeso,
          peso_kg: peso,
        }
      );

      Alert.alert(
        "Éxito",
        response.data.message || "Pesaje guardado correctamente"
      );
      resetPesoFields();
      setChipPeso("");
    } catch (error) {
      console.error("Error al guardar el pesaje:", error);
      Alert.alert("Error", "No se pudo guardar el pesaje");
    }
  };

  const guardarVacuna = async () => {
    if (
      !chipVacuna ||
      !tipoVacuna ||
      !nombreVacuna ||
      !dosis ||
      !observacion ||
      !fechaVacuna
    ) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (!cattleVacuna) {
      Alert.alert("Error", "El chip no existe.");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.1.4:3000/vaccines/add",
        {
          fecha_vacuna: fechaVacuna,
          tipo_vacunas_id_tipo_vacuna: tipoVacuna,
          chip_animal: chipVacuna,
          nombre_vacunas_id_vacuna: nombreVacuna,
          dosis_administrada: dosis,
          observaciones: observacion,
        }
      );

      Alert.alert(
        "Éxito",
        response.data.message || "vacuna guardada correctamente"
      );
      resetVacunaFields();
      setChipVacuna("");
    } catch (error) {
      console.error("Error al guardar la vacuna:", error);
      Alert.alert("Error", "No se pudo guardar la vacuna");
    }
  };

  const handleSelectCattle = (cattle) => {
    if (pesoChecked) {
      setChipPeso(cattle.chip);
      setCattlePeso(cattle);
      setPeso(cattle.peso?.toString() || "");
      setFechaPeso(cattle.fechaNacimiento || "");
    } else if (vacunaChecked) {
      setChipVacuna(cattle.chip);
      setCattleVacuna(cattle);
      setTipoVacuna(cattle.tipoVacuna || null);
      setNombreVacuna(cattle.nombreVacuna || null);
      setDosis(cattle.dosis || "");
      setObservacion(cattle.observacion || "");
      setFechaVacuna(cattle.fechaNacimiento || "");
    }
    setFilteredCattle([]);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" style={styles.iconFecha} />
        </TouchableOpacity>

        <Text style={styles.title}>Formularios de control</Text>

        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchButton]}
            onPress={() => {
              setPesoChecked(true);
              setVacunaChecked(false);
            }}
          >
            <Ionicons
              name={pesoChecked ? "checkbox" : "square-outline"}
              style={
                pesoChecked
                  ? formsStyles.iconChecked
                  : formsStyles.iconUnchecked
              }
            />
            <Text style={styles.switchText}>Control de Peso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.switchButton]}
            onPress={() => {
              setVacunaChecked(true);
              setPesoChecked(false);
            }}
          >
            <Ionicons
              name={vacunaChecked ? "checkbox" : "square-outline"}
              style={
                vacunaChecked
                  ? formsStyles.iconChecked
                  : formsStyles.iconUnchecked
              }
            />
            <Text style={styles.switchText}>Control de Vacunas</Text>
          </TouchableOpacity>
        </View>

        {/* FORMULARIO DE PESO */}
        {pesoChecked && (
          <View style={styles.formSection}>
            <Text style={styles.subtitle}>Formulario de Control de Peso</Text>
            <TextInput
              style={styles.input}
              placeholder="Chip de la vaca"
              value={chipPeso}
              onChangeText={handleChipPesoChange}
            />
            {filteredCattle.length > 0 && (
              <ScrollView vertical style={styles.cattleList}>
                {filteredCattle.map((item) => (
                  <TouchableOpacity
                    key={item.chip}
                    style={styles.cattleItem}
                    onPress={() => handleSelectCattle(item)}
                  >
                    <Text>{item.nombre}</Text>
                    <Text>{item.chip}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setCurrentDateType("peso");
                setDatePickerVisibility(true);
              }}
            >
              <Ionicons
                name="calendar"
                style={formsStyles.iconCalendar} // Aplicamos el estilo para el ícono de calendario
              />
              <Text style={styles.dateButtonText}>
                {fechaPeso || "Fecha de pesaje"}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Peso en kg"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={guardarPeso}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* FORMULARIO DE VACUNACIÓN */}
        {vacunaChecked && (
          <View style={styles.formSection}>
            <Text style={styles.subtitle}>Formulario de Vacunación</Text>
            <TextInput
              style={styles.input}
              placeholder="Chip de la vaca"
              value={chipVacuna}
              onChangeText={handleChipVacunaChange}
            />
            {filteredCattle.length > 0 && (
              <ScrollView vertical style={styles.cattleList}>
                {filteredCattle.map((item) => (
                  <TouchableOpacity
                    key={item.chip}
                    style={styles.cattleItem}
                    onPress={() => handleSelectCattle(item)}
                  >
                    <Text>{item.nombre}</Text>
                    <Text>{item.chip}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <DropDownPicker
  open={openTipoVacuna}
  setOpen={() => {
    setOpenVacunaNombre(false);
    setOpenTipoVacuna(true);
  }}
  value={tipoVacuna}
  items={itemsTipoVacuna}
  setValue={setTipoVacuna}
  placeholder="Tipo de vacuna"
  containerStyle={[
    styles.dropdownContainer,
    openVacunaNombre && styles.dropdownBelow,
  ]}
  listMode="SCROLLVIEW"
  onChangeValue={() => setOpenTipoVacuna(false)} // Cierra al seleccionar
/>

<DropDownPicker
  open={openVacunaNombre}
  setOpen={() => {
    setOpenTipoVacuna(false);
    setOpenVacunaNombre(true);
  }}
  value={nombreVacuna}
  items={itemsVacunaNombre}
  setValue={setNombreVacuna}
  placeholder="Nombre de vacuna"
  containerStyle={[
    styles.dropdownContainer,
    openTipoVacuna && styles.dropdownBelow,
  ]}
  listMode="SCROLLVIEW"
  onChangeValue={() => setOpenVacunaNombre(false)} // Cierra al seleccionar
/>



            <TextInput
              style={styles.input}
              placeholder="Dosis"
              value={dosis}
              onChangeText={setDosis}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Observaciones"
              value={observacion}
              onChangeText={setObservacion}
            />
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setCurrentDateType("vacuna");
                setDatePickerVisibility(true);
              }}
            >
              <Ionicons
                name="calendar"
                style={formsStyles.iconCalendar} // Aplicamos el estilo para el ícono de calendario
              />
              <Text style={styles.dateButtonText}>
                {fechaVacuna || "Fecha de vacunación"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={guardarVacuna}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* DateTimePicker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          themeVariant="light"
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
    </Layout>
  );
}
