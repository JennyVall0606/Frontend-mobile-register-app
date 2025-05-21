import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/layout";
import styles from "../styles/forms_styles";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import formsStyles from "../styles/forms_styles";

export default function FormsScreen({ route }) {
  const navigation = useNavigation();
  const { chip } = route.params || {};
  const { width, height } = Dimensions.get("window");
  const [pesoChecked, setPesoChecked] = useState(false);
  const [vacunaChecked, setVacunaChecked] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const [dosisFinal, setDosisFinal] = useState("");

  // DropDownPicker estados
  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openVacunaNombre, setOpenVacunaNombre] = useState(false);
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState([]);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState([]);
  const [cattlePeso, setCattlePeso] = useState(null);
  const [cattleVacuna, setCattleVacuna] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");
  const [filteredCattle, setFilteredCattle] = useState([]);
  const [observacion, setObservacion] = useState("");
  const [fechaVacuna, setFechaVacuna] = useState("");
  // Estados para formulario de peso
  const [observations, setObservations] = useState("");
  const [chipPeso, setChipPeso] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaPeso, setFechaPeso] = useState("");
  // Estados para formulario de vacunas
  const [chipVacuna, setChipVacuna] = useState("");
  const API_URL = "https://webmobileregister-production.up.railway.app";
  useEffect(() => {
    axios
      .get(`${API_URL}/vaccines/tipos-vacuna`)
      .then((res) => setItemsTipoVacuna(res.data))
      .catch((err) => console.error(err));

    axios
      .get(`${API_URL}/vaccines/nombres-vacuna`)
      .then((res) => setItemsVacunaNombre(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleConfirmDate = (date) => {
    // Ajustar manualmente a UTC-5 (hora Colombia)
    const colombiaDate = new Date(date.getTime() - 5 * 60 * 60 * 1000);
    const formattedDate = colombiaDate.toISOString().split("T")[0];

    const today = new Date(new Date().getTime() - 5 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    if (formattedDate > today) {
      Alert.alert("Fecha inválida", "No puedes seleccionar una fecha futura.");
      return;
    }

    if (currentDateType === "peso") {
      setFechaPeso(formattedDate);
    } else {
      setFechaVacuna(formattedDate);
    }

    setDatePickerVisibility(false);
  };

  useEffect(() => {
    if (chip) {
      setChipPeso(chip);
      setChipVacuna(chip);
    }
  }, [chip]);

  const resetPesoFields = () => {
    setCattlePeso(null);
    setPeso("");
    setFechaPeso("");
  };

  const guardarPeso = async () => {
    try {
      const response = await axios.post(`${API_URL}/weighing/add`, {
        chip_animal: chipPeso,
        fecha_pesaje: fechaPeso,
        peso_kg: parseFloat(peso),
      });
      Alert.alert("Éxito", "Pesaje guardado");
      resetPesoFields();
      navigation.navigate("ControlScreen", {
        chip,
        shouldRefresh: true,
        nuevoPeso: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const resetVacunaFields = () => {
    setCattleVacuna(null);
    setTipoVacuna(null);
    setNombreVacuna(null);
    setDosisFinal("");
    setObservations("");
    setFechaVacuna("");
    setUnidad("");
    setCantidad("");
  };

  useEffect(() => {
    if (cantidad && unidad) {
      setDosisFinal(`${cantidad} ${unidad}`);
    } else {
      setDosisFinal("");
    }
  }, [cantidad, unidad]);

  const guardarVacuna = async () => {
    try {
      const response = await axios.post(`${API_URL}/vaccines/add`, {
        chip_animal: chipVacuna,
        fecha_vacuna: fechaVacuna,
        tipo_vacunas_id_tipo_vacuna: tipoVacuna,
        nombre_vacunas_id_vacuna: nombreVacuna,
        dosis_administrada: dosisFinal,
        observaciones: observations,
      });
      Alert.alert("Éxito", "Vacuna guardada");
      resetVacunaFields();
      navigation.navigate("ControlScreen", {
        chip,
        shouldRefresh: true,
        nuevaVacuna: response.data,
      });
    } catch (error) {
      // Mostrar mensaje claro al usuario
      if (error.response && error.response.data) {
        // Si el backend envía un mensaje de error específico
        Alert.alert(
          "Error",
          error.response.data.error || JSON.stringify(error.response.data)
        );
      } else {
        // Error de red u otro error desconocido
        Alert.alert("Error", "No se pudo guardar la vacuna. Intenta de nuevo.");
      }
      console.error(error);
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

      // Asignar dosisFinal directamente desde cattle.dosis (si existe)
      setDosisFinal(cattle.dosis || "");

      setObservacion(cattle.observacion || null);
      setFechaVacuna(cattle.fechaNacimiento || "");
    }
    setFilteredCattle([]);
  };

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "ml", value: "ml" },
    { label: "cc", value: "cc" },
    { label: "mg", value: "mg" },
    { label: "mg/kg", value: "mg_kg" },
    { label: "ml/kg", value: "ml_kg" },
    { label: "ml/100kg", value: "ml_100kg" },
    { label: "UI", value: "ui" },
  ]);

  return (
    <Layout>
      <ScrollView
        style={[styles.container, { width, height }]} // Ajustamos el ancho y alto al de la pantalla
      >
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
              value={chipPeso} // o chipVacuna según el formulario
              editable={false}
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
              <Ionicons name="calendar" style={formsStyles.iconCalendar} />
              <Text style={styles.dateButtonText}>
                {fechaPeso || "Fecha de pesaje"}
              </Text>
            </TouchableOpacity>
            <View style={styles.weightContainer}>
              <TextInput
                style={styles.weightInput}
                placeholder="Peso"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />
              <Text style={styles.weightUnit}>kg</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={guardarPeso}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        {vacunaChecked && (
          <View style={styles.formSection}>
            <Text style={styles.subtitle}>Formulario de Vacunación</Text>
            <TextInput
              style={styles.input}
              value={chipVacuna}
              editable={false}
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
                setOpen(false);
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
              onChangeValue={() => setOpenTipoVacuna(false)}
            />

            <DropDownPicker
              open={openVacunaNombre}
              setOpen={() => {
                setOpenTipoVacuna(false);
                setOpenVacunaNombre(true);
                setOpen(false);
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
              onChangeValue={() => setOpenVacunaNombre(false)}
            />

            <View style={styles.row}>
              <TextInput
                style={styles.inputD}
                value={cantidad}
                onChangeText={setCantidad}
                placeholder="Dosis"
                keyboardType="numeric"
              />
              <DropDownPicker
                open={open}
                value={unidad}
                items={items}
                setOpen={() => {
                  setOpenTipoVacuna(false);
                  setOpenVacunaNombre(false);
                  setOpen(true);
                }}
                setValue={setUnidad}
                setItems={setItems}
                placeholder="Unidad"
                containerStyle={[
                  styles.dropdownContainerUnidad,
                  open && styles.dropdownBelowUnidad,
                  { zIndex: open ? 10 : 1 },
                ]}
                listMode="SCROLLVIEW"
                onChangeValue={() => setOpen(false)}
              />
            </View>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setCurrentDateType("vacuna");
                setDatePickerVisibility(true);
              }}
            >
              <Ionicons name="calendar" style={formsStyles.iconCalendar} />
              <Text style={styles.dateButtonText}>
                {fechaVacuna || "Fecha de vacunación"}
              </Text>
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.button} onPress={guardarVacuna}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          themeVariant="light"
          onCancel={() => setDatePickerVisibility(false)}
        />
      </ScrollView>
    </Layout>
  );
}
