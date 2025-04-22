import React, { useState } from "react";
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
import { findCattleByChip } from "../services/cattleData";
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
  const [peso, setPeso] = useState("");
  const [fechaPeso, setFechaPeso] = useState("");
  const [cattlePeso, setCattlePeso] = useState(null);

  // Estados para formulario de vacunas
  const [chipVacuna, setChipVacuna] = useState("");
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [dosis, setDosis] = useState("");
  const [observacion, setObservacion] = useState("");
  const [fechaVacuna, setFechaVacuna] = useState("");
  const [cattleVacuna, setCattleVacuna] = useState(null);

  // DropDownPicker estados
  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openVacunaNombre, setOpenVacunaNombre] = useState(false);
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState(tipoVacunas);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState(nombreVacunas);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [filteredCattle, setFilteredCattle] = useState([]);

  const handleConfirmDate = (date) => {
    const today = new Date();
    if (date > today) {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha futura.");
      return;
    }

    const formattedDate = date.toLocaleDateString();
    currentDateType === "peso"
      ? setFechaPeso(formattedDate)
      : setFechaVacuna(formattedDate);
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

  const handleChipPesoChange = (text) => {
    setChipPeso(text);
    if (text.length > 0) {
      const results = findCattleByChip(text.toLowerCase());
      setFilteredCattle(results);

      const exactMatch = results.find((vaca) => vaca.chip === text);
      if (exactMatch) {
        setChipPeso(exactMatch.chip);
        setCattlePeso(exactMatch);
        setPeso(exactMatch.peso?.toString() || "");
        setFechaPeso(exactMatch.fechaNacimiento || "");
        setFilteredCattle([]);
      } else {
        resetPesoFields();
      }
    } else {
      setFilteredCattle([]);
    }
  };

  const handleChipVacunaChange = (text) => {
    setChipVacuna(text);
    if (text.length > 0) {
      const results = findCattleByChip(text.toLowerCase());
      setFilteredCattle(results);

      const exactMatch = results.find((vaca) => vaca.chip === text);
      if (exactMatch) {
        setChipVacuna(exactMatch.chip);
        setCattleVacuna(exactMatch);
        setTipoVacuna(exactMatch.tipoVacuna || null);
        setNombreVacuna(exactMatch.nombreVacuna || null);
        setDosis(exactMatch.dosis || "");
        setObservacion(exactMatch.observacion || "");
        setFechaVacuna(exactMatch.fechaNacimiento || "");
        setFilteredCattle([]);
      } else {
        resetVacunaFields();
      }
    } else {
      setFilteredCattle([]);
    }
  };

  const guardarPeso = () => {
    if (!chipPeso || !peso || !fechaPeso) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (!cattlePeso) {
      Alert.alert("Error", "El chip no existe.");
      return;
    }
    // Guardar datos
    Alert.alert("Éxito", "Datos de peso guardados.");
    // Limpiar formulario
    resetPesoFields();
    setChipPeso("");
  };

  const guardarVacuna = () => {
    if (!chipVacuna || !tipoVacuna || !nombreVacuna || !dosis || !fechaVacuna) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (!cattleVacuna) {
      Alert.alert("Error", "El chip no existe.");
      return;
    }
    // Guardar datos
    Alert.alert("Éxito", "Datos de vacuna guardados.");
    // Limpiar formulario
    resetVacunaFields();
    setChipVacuna("");
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
              setOpen={setOpenTipoVacuna}
              items={itemsTipoVacuna}
              value={tipoVacuna}
              setValue={setTipoVacuna}
              placeholder="Tipo de vacuna"
              containerStyle={[
                styles.dropdown,
                { zIndex: openVacunaNombre ? 0 : 1 },
              ]}
              listMode="SCROLLVIEW"
            />
            <DropDownPicker
              open={openVacunaNombre}
              setOpen={setOpenVacunaNombre}
              items={itemsVacunaNombre}
              value={nombreVacuna}
              setValue={setNombreVacuna}
              placeholder="Nombre de vacuna"
              containerStyle={[
                styles.dropdown,
                { zIndex: openTipoVacuna ? 0 : 1 },
              ]}
              listMode="SCROLLVIEW"
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
