import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/ControlH_styles";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

export default function ControlH_Screen({ navigation, route }) {
  const { chip } = route.params || {};
  const { width, height } = Dimensions.get("window");
  const [animalInfo, setAnimalInfo] = useState(null);
  const [historicoPesaje, setHistoricoPesaje] = useState([]);
  const [historicoVacunas, setHistoricoVacunas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVacuna, setSelectedVacuna] = useState(null);
  const [modalVacunaVisible, setModalVacunaVisible] = useState(false);
  const [nuevaFechaVacuna, setNuevaFechaVacuna] = useState("");
  const [nuevaDosisVacuna, setNuevaDosisVacuna] = useState("");
  const [nuevaObsVacuna, setNuevaObsVacuna] = useState("");
  const [selectedPeso, setSelectedPeso] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoPeso, setNuevoPeso] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [itemsTipoVacuna, setItemsTipoVacuna] = useState([]);
  const [itemsVacunaNombre, setItemsVacunaNombre] = useState([]);
  const [tipoVacuna, setTipoVacuna] = useState(null);
  const [nombreVacuna, setNombreVacuna] = useState(null);
  const [openTipoVacuna, setOpenTipoVacuna] = useState(false);
  const [openNombreVacuna, setOpenNombreVacuna] = useState(false);

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // Extrae solo la parte de la fecha
  };

  // Función para formatear peso
  const formatWeight = (weight) => {
    if (!weight) return "";
    const weightNum = parseFloat(weight);
    return weightNum % 1 === 0 ? weightNum.toString() : weightNum.toFixed(2);
  };

  useEffect(() => {
    if (chip) {
      axios
        .get(`http://192.168.1.4:3000/register/animal/${chip}`)
        .then((response) => {
          setAnimalInfo(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el animal:", error);
          setAnimalInfo(null);
        });
    }
  }, [chip]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pesosRes, vacunasRes] = await Promise.all([
          axios.get("http://192.168.1.4:3000/weighing/historico-pesaje"),
          axios.get("http://192.168.1.4:3000/vaccines/historico-vacunas"),
        ]);

        const pesosFiltrados = pesosRes.data
          .filter((item) => item.chip === chip)
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const vacunasFiltradas = vacunasRes.data
          .filter((item) => item.chip === chip)
          .sort((a, b) => new Date(b.fecha_vacuna) - new Date(a.fecha_vacuna));

        setHistoricoPesaje(pesosFiltrados);
        setHistoricoVacunas(vacunasFiltradas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chip]);

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

  const handleEditPeso = (id) => {
    const pesoSeleccionado = historicoPesaje.find((item) => item.id === id);
    if (pesoSeleccionado) {
      setSelectedPeso(pesoSeleccionado);
      setNuevoPeso(pesoSeleccionado.peso.toString());
      setNuevaFecha(pesoSeleccionado.fecha);
      setModalVisible(true);
    }
  };

  const handleGuardarCambiosPeso = async () => {
    try {
      await axios.put(`http://192.168.1.4:3000/weighing/${selectedPeso.id}`, {
        peso: nuevoPeso,
        fecha: nuevaFecha,
      });

      const updatedPesos = historicoPesaje.map((p) =>
        p.id === selectedPeso.id
          ? { ...p, peso: nuevoPeso, fecha: nuevaFecha }
          : p
      );
      setHistoricoPesaje(updatedPesos);
      setModalVisible(false);
      alert("Peso actualizado");
    } catch (error) {
      console.error("Error al actualizar el peso:", error);
      alert("Error al actualizar");
    }
  };

  const handleEditVacuna = (id) => {
    const vac = historicoVacunas.find((item) => item.id === id);
    if (!vac) return;

    setSelectedVacuna(vac);
    setNuevaFechaVacuna(vac.fecha.slice(0, 10));
    setNuevaDosisVacuna(vac.dosis);
    setNuevaObsVacuna(vac.obs || "");

    const tipoItem = itemsTipoVacuna.find((i) => i.label === vac.tipo);
    if (tipoItem) setTipoVacuna(tipoItem.value);

    const nombreItem = itemsVacunaNombre.find((i) => i.label === vac.nombre);
    if (nombreItem) setNombreVacuna(nombreItem.value);

    setModalVacunaVisible(true);
  };

  const handleGuardarCambiosVacuna = async () => {
    const datosParaApi = {
      fecha_vacuna: nuevaFechaVacuna.split("T")[0],
      tipo_vacunas_id_tipo_vacuna: tipoVacuna,
      nombre_vacunas_id_vacuna: nombreVacuna,
      dosis_administrada: nuevaDosisVacuna,
      observaciones: nuevaObsVacuna,
    };

    await axios.put(
      `http://192.168.1.4:3000/vaccines/${selectedVacuna.id}`,
      datosParaApi
    );

    setHistoricoVacunas(
      historicoVacunas.map((v) => {
        if (v.id !== selectedVacuna.id) return v;
        const tipoLabel = itemsTipoVacuna.find(
          (i) => i.value === tipoVacuna
        )?.label;
        const nombreLabel = itemsVacunaNombre.find(
          (i) => i.value === nombreVacuna
        )?.label;
        return {
          ...v,
          fecha: datosParaApi.fecha_vacuna,
          tipo: tipoLabel || v.tipo,
          nombre: nombreLabel || v.nombre,
          dosis: datosParaApi.dosis_administrada,
          observaciones: datosParaApi.observaciones,
        };
      })
    );

    setModalVacunaVisible(false);
    alert("Vacuna actualizada");
  };

  return (
    <Layout>
      <ScrollView style={[styles.container, { width, height }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" style={styles.iconFecha} />
        </TouchableOpacity>

        <Text style={styles.title}>Control de Chip</Text>

        {animalInfo && animalInfo.foto && (
          <Image
            source={{
              uri: `http://192.168.1.4:3000/uploads/${animalInfo.foto}`,
            }}
            style={styles.image}
          />
        )}

        <View style={styles.card}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Chip:</Text>
            <Text style={styles.tableCell}>
              {animalInfo?.chip_animal ||
                "No se encontró información del animal"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Raza:</Text>
            <Text style={styles.tableCell}>
              {animalInfo?.raza || "No especificado"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Fecha de Nacimiento:</Text>
            <Text style={styles.tableCell}>
              {animalInfo?.fecha_nacimiento
                ? formatDate(animalInfo.fecha_nacimiento)
                : ""}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Peso de Nacimiento:</Text>
            <Text style={styles.tableCell}>
              {animalInfo?.peso_nacimiento
                ? formatWeight(animalInfo.peso_nacimiento)
                : ""}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>ID Madre:</Text>
            <Text style={styles.tableCell}>{animalInfo?.id_madre}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>ID Padre:</Text>
            <Text style={styles.tableCell}>{animalInfo?.id_padre}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Enfermedades:</Text>
            <Text style={styles.tableCell}>
              {Array.isArray(animalInfo?.enfermedades)
                ? animalInfo.enfermedades.join(", ")
                : animalInfo?.enfermedades}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Observaciones:</Text>
            <Text style={styles.tableCell}>{animalInfo?.observaciones}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Estado:</Text>
            <Text style={styles.tableCell}>{animalInfo?.estado}</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("RegisterCattle", {
                chip: animalInfo.chip_animal,
                isEditing: true,
              })
            }
          >
            <Text>✏️ Editar CHIP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Pesos Registrados</Text>
        {historicoPesaje.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
              <Text style={styles.tableHeaderText}>Peso</Text>
              <Text style={styles.editButtonTextHe}>✏️</Text>
            </View>
            {historicoPesaje.map((peso, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {peso.fecha.substring(0, 10)}
                </Text>
                <Text style={styles.tableCell}>{peso.peso}</Text>
                <TouchableOpacity
                  onPress={() => handleEditPeso(peso.id)}
                  style={styles.editCell}
                >
                  <Text style={styles.editButtonText}>✏️ </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No se encontraron registros de peso.</Text>
        )}

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Peso</Text>
              <TextInput
                value={nuevoPeso}
                onChangeText={setNuevoPeso}
                placeholder="Peso"
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                value={nuevaFecha}
                onChangeText={setNuevaFecha}
                placeholder="Fecha (YYYY-MM-DD)"
                style={styles.input}
              />
              <Button
                title="Guardar cambios"
                onPress={handleGuardarCambiosPeso}
              />
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <Text style={styles.subtitle}>Vacunas Registradas</Text>
        {historicoVacunas.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
              <Text style={styles.tableHeaderText}>Nombre</Text>
              <Text style={styles.tableHeaderText}>Tipo</Text>
              <Text style={styles.tableHeaderText}>Dosis</Text>
              <Text style={styles.tableHeaderText}>Obs</Text>

              <Text style={styles.editButtonTextHe}>✏️</Text>
            </View>
            {historicoVacunas.map((vacuna, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCellVV}>
                  {vacuna.fecha.substring(0, 10)}
                </Text>
                <Text style={styles.tableCellV}>{vacuna.nombre}</Text>
                <Text style={styles.tableCellV}>{vacuna.tipo}</Text>
                <Text style={styles.tableCellV}>{vacuna.dosis}</Text>
                <Text style={styles.tableCellV}>
                  {vacuna.obs || "No disponible"}
                </Text>
                <TouchableOpacity
                  onPress={() => handleEditVacuna(vacuna.id)}
                  style={styles.editCell}
                >
                  <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No se encontraron registros de vacunas.</Text>
        )}

        <Modal visible={modalVacunaVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Vacuna</Text>
              <TextInput
                value={nuevaFechaVacuna}
                onChangeText={setNuevaFechaVacuna}
                placeholder="YYYY-MM-DD"
                style={styles.input}
              />

              <DropDownPicker
                open={openTipoVacuna}
                value={tipoVacuna}
                items={itemsTipoVacuna}
                setOpen={setOpenTipoVacuna}
                setValue={setTipoVacuna}
                placeholder="Tipo de vacuna"
                containerStyle={[
                  styles.dropdownContainer,
                  openTipoVacuna && styles.dropdownBelow,
                ]}
                listMode="SCROLLVIEW"
              />

              <DropDownPicker
                open={openNombreVacuna}
                value={nombreVacuna}
                items={itemsVacunaNombre}
                setOpen={setOpenNombreVacuna}
                setValue={setNombreVacuna}
                placeholder="Nombre de vacuna"
                containerStyle={[
                  styles.dropdownContainer,
                  openNombreVacuna && styles.dropdownBelow,
                  { zIndex: openNombreVacuna ? 10 : 1 },
                ]}
                listMode="SCROLLVIEW"
              />

              <TextInput
                value={nuevaDosisVacuna}
                onChangeText={setNuevaDosisVacuna}
                placeholder="Dosis"
                style={styles.input}
              />

              <TextInput
                value={nuevaObsVacuna}
                onChangeText={setNuevaObsVacuna}
                placeholder="Observaciones"
                style={styles.input}
              />

              <Button
                title="Guardar cambios"
                onPress={handleGuardarCambiosVacuna}
              />
              <Button
                title="Cancelar"
                color="red"
                onPress={() => setModalVacunaVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
  style={styles.newControlButton}
  onPress={() => navigation.navigate("FormScreen", { chip })}
>
  <Text style={styles.newControlButtonText}>
    Realiza un nuevo control
  </Text>
</TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}
