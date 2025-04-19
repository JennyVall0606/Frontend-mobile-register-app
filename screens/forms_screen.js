import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Layout from "../components/layout";
import styles from "../styles/forms_styles";
import { findCattleByChip } from "../services/cattleData";

export default function FormsScreen() {
  const [pesoChecked, setPesoChecked] = useState(false);
  const [vacunaChecked, setVacunaChecked] = useState(false);

  // Estados para formulario de peso
  const [chipPeso, setChipPeso] = useState("");
  const [peso, setPeso] = useState("");
  const [fechaPeso, setFechaPeso] = useState("");
  const [cattlePeso, setCattlePeso] = useState(null);
  const [filteredCattle, setFilteredCattle] = useState([]); // Para los resultados de la búsqueda

  // Estados para formulario de vacunas
  const [chipVacuna, setChipVacuna] = useState("");
  const [tipoVacuna, setTipoVacuna] = useState("");
  const [nombreVacuna, setNombreVacuna] = useState("");
  const [dosis, setDosis] = useState("");
  const [observacion, setObservacion] = useState("");
  const [fechaVacuna, setFechaVacuna] = useState("");
  const [cattleVacuna, setCattleVacuna] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentDateType, setCurrentDateType] = useState("");

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

  const handleChipPesoChange = (text) => {
    setChipPeso(text);

    // Búsqueda automática cuando el chip tiene al menos 4 caracteres
    if (text.trim().length >= 1) {
      const results = findCattleByChip(text.trim()); // Búsqueda de animales
      setFilteredCattle(results); // Mostrar los resultados
    } else {
      setFilteredCattle([]); // Si el chip tiene menos de 4 caracteres, limpiamos los resultados
    }

    // Si el chip tiene 4 caracteres o más, se buscará el dato
    if (text.trim().length >= 4) {
      const vaca = findCattleByChip(text.trim());
      if (vaca) {
        setCattlePeso(vaca);
        setPeso(vaca.peso?.toString() || "");
        setFechaPeso(vaca.fechaNacimiento || "");
      } else {
        resetPesoFields();
      }
    } else {
      resetPesoFields();
    }
  };

  const handleChipVacunaChange = (text) => {
    setChipVacuna(text);

    // Búsqueda automática cuando el chip tiene al menos 4 caracteres
    if (text.trim().length >= 4) {
      const results = findCattleByChip(text.trim()); // Búsqueda de animales
      setFilteredCattle(results); // Mostrar los resultados
    } else {
      setFilteredCattle([]); // Limpiar resultados si el chip es menor a 4 caracteres
    }

    // Si el chip tiene 4 caracteres o más, se buscará el dato
    if (text.trim().length >= 4) {
      const vaca = cattleData.find((item) => item.chip === text.trim());

      if (vaca) {
        setCattleVacuna(vaca);
        setTipoVacuna(vaca.tipoVacuna || "");
        setNombreVacuna(vaca.nombreVacuna || "");
        setDosis(vaca.dosis || "");
        setObservacion(vaca.observacion || "");
        setFechaVacuna(vaca.fechaNacimiento || "");
      } else {
        resetVacunaFields();
      }
    } else {
      resetVacunaFields();
    }
  };

  const resetPesoFields = () => {
    setCattlePeso(null);
    setPeso("");
    setFechaPeso("");
  };

  const resetVacunaFields = () => {
    setCattleVacuna(null);
    setTipoVacuna("");
    setNombreVacuna("");
    setDosis("");
    setObservacion("");
    setFechaVacuna("");
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
    // Aquí podrías guardar en backend o local
    Alert.alert("Éxito", "Datos de peso guardados.");
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
    // Aquí podrías guardar en backend o local
    Alert.alert("Éxito", "Datos de vacuna guardados.");
  };

  const handleSelectCattle = (cattle) => {
    setChipPeso(cattle.chip);
    setCattlePeso(cattle);
    setPeso(cattle.weight || "");  // Cambiar 'peso' por el nombre correcto del campo si es necesario
    setFechaPeso(cattle.birthDate || "");  // Cambiar 'fechaNacimiento' por el campo correspondiente
    setFilteredCattle([]);
  };
  

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Formularios de control</Text>

        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              { backgroundColor: pesoChecked ? "#add8e6" : "#eee" },
            ]}
            onPress={() => {
              setPesoChecked(true);
              setVacunaChecked(false);
            }}
          >
            <Ionicons
              name={pesoChecked ? "checkbox" : "square-outline"}
              size={20}
              color="black"
            />
            <Text style={styles.switchText}>Control de Peso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.switchButton,
              { backgroundColor: vacunaChecked ? "#add8e6" : "#eee" },
            ]}
            onPress={() => {
              setVacunaChecked(true);
              setPesoChecked(false);
            }}
          >
            <Ionicons
              name={vacunaChecked ? "checkbox" : "square-outline"}
              size={20}
              color="black"
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
              <ScrollView style={styles.cattleList}>
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
            {cattlePeso && (
              <View style={styles.cattleInfo}>
                <Text>{`Vaca encontrada: ${cattlePeso.nombre}`}</Text>
                <Text>{`Peso actual: ${cattlePeso.peso} kg`}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setCurrentDateType("peso");
                setDatePickerVisibility(true);
              }}
            >
              <Ionicons name="calendar" size={20} color="black" />
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

        {/* FORMULARIO DE VACUNAS */}
        {vacunaChecked && (
          <View style={styles.formSection}>
            <Text style={styles.subtitle}>Formulario de Control de Vacunas</Text>
            <TextInput
              style={styles.input}
              placeholder="Chip de la vaca"
              value={chipVacuna}
              onChangeText={handleChipVacunaChange}
            />
            {filteredCattle.length > 0 && (
              <ScrollView style={styles.cattleList}>
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
            {cattleVacuna && (
              <View style={styles.cattleInfo}>
                <Text>{`Vaca encontrada: ${cattleVacuna.nombre}`}</Text>
                <Text>{`Vacuna: ${cattleVacuna.nombreVacuna}`}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => {
                setCurrentDateType("vacuna");
                setDatePickerVisibility(true);
              }}
            >
              <Ionicons name="calendar" size={20} color="black" />
              <Text style={styles.dateButtonText}>
                {fechaVacuna || "Fecha de vacunación"}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Tipo de vacuna"
              value={tipoVacuna}
              onChangeText={setTipoVacuna}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre de la vacuna"
              value={nombreVacuna}
              onChangeText={setNombreVacuna}
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
              placeholder="Observación"
              value={observacion}
              onChangeText={setObservacion}
            />
            <TouchableOpacity style={styles.button} onPress={guardarVacuna}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </ScrollView>
    </Layout>
  );
}


