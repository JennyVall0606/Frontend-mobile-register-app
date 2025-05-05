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

export default function ControlH_Screen({ navigation, route }) {
  const { chip } = route.params || {}; // Recibimos el chip del animal
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
  useEffect(() => {
    if (chip) {
      axios
        .get(`http://192.168.1.4:3000/register/animal/${chip}`)
        .then((response) => {
          setAnimalInfo(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el animal:", error);
          setAnimalInfo(null); // ← Solo si hay error
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

        console.log("Pesos response:", pesosRes);
console.log("Vacunas response:", vacunasRes);

        // Filtrar por el chip recibido
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

  const [formData, setFormData] = useState({
    peso: selectedPeso ? selectedPeso.peso : "",
    fecha: selectedPeso ? selectedPeso.fecha : "",
  });

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

      // Actualiza los datos localmente
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
    const vac = historicoVacunas.find(item => item.id === id);
    if (!vac) return;
  
    setSelectedVacuna(vac);
  
    // 1) Fecha: corta el timestamp a "YYYY-MM-DD"
    setNuevaFechaVacuna(vac.fecha.slice(0, 10));
  
    // 2) Dosis y observaciones vienen como vac.dosis / vac.obs
    setNuevaDosisVacuna(vac.dosis);
    setNuevaObsVacuna(vac.obs || "");
  
    // 3) Para los dropdowns necesitas el ID, no la etiqueta.
    //    Busca el item cuyo label coincida con el string 'vac.tipo'
    const tipoItem = itemsTipoVacuna.find(i => i.label === vac.tipo);
    if (tipoItem) setTipoVacuna(tipoItem.value);
  
    //    Lo mismo para el nombre de la vacuna
    const nombreItem = itemsVacunaNombre.find(i => i.label === vac.nombre);
    if (nombreItem) setNombreVacuna(nombreItem.value);
  
    setModalVacunaVisible(true);
  };
  

  const handleGuardarCambiosVacuna = async () => {
    const datosParaApi = {
      fecha_vacuna: nuevaFechaVacuna.split("T")[0],
      tipo_vacunas_id_tipo_vacuna: tipoVacuna,
      nombre_vacunas_id_vacuna: nombreVacuna,
      dosis_administrada: nuevaDosisVacuna,
      observaciones: nuevaObsVacuna
    };
  
    // validaciones...
    await axios.put(
      `http://192.168.1.4:3000/vaccines/${selectedVacuna.id}`,
      datosParaApi
    );
  
    // Ahora actualizo el estado local:
    setHistoricoVacunas(historicoVacunas.map(v => {
      if (v.id !== selectedVacuna.id) return v;
      // Encuentro el label de tipo y nombre para mostrarlos
      const tipoLabel   = itemsTipoVacuna.find(i => i.value === tipoVacuna)?.label;
      const nombreLabel = itemsVacunaNombre.find(i => i.value === nombreVacuna)?.label;
      return {
        ...v,
        fecha: datosParaApi.fecha_vacuna,
        tipo: tipoLabel   || v.tipo,
        nombre: nombreLabel || v.nombre,
        dosis: datosParaApi.dosis_administrada,
        observaciones: datosParaApi.observaciones
      };
    }));
  
    setModalVacunaVisible(false);
    alert("Vacuna actualizada");
  };
  
  
  

  

  return (
    <Layout>
      <ScrollView
        style={[styles.container, { width, height }]} // Ajustamos el ancho y alto al de la pantalla
      >
        {/* Flecha de vuelta */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" style={styles.iconFecha} />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>Control de Chip</Text>

        {/* Imagen del animal */}
        {animalInfo && animalInfo.foto && (
          <Image
            source={{
              uri: `http://192.168.1.4:3000/uploads/${animalInfo.foto}`,
            }}
            style={styles.image}
          />
        )}

        {/* Información del animal */}
        <View style={styles.card}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Chip:</Text>
            <Text style={styles.tableCell}>
              {animalInfo?.chip_animal ||
                "No se encontró información del animal"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Fecha de Nacimiento:</Text>
            <Text style={styles.tableCell}>{animalInfo?.fecha_nacimiento}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Peso de Nacimiento:</Text>
            <Text style={styles.tableCell}>{animalInfo?.peso_nacimiento}</Text>
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
            <Text style={styles.tableCell}>{animalInfo?.enfermedades}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Observaciones:</Text>
            <Text style={styles.tableCell}>{animalInfo?.observaciones}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Estado:</Text>
            <Text style={styles.tableCell}>{animalInfo?.estado}</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text>✏️ Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Tabla de Pesos Registrados */}
        <Text style={styles.subtitle}>Pesos Registrados</Text>
        {historicoPesaje.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
              <Text style={styles.tableHeaderText}>Peso</Text>
              <Text style={styles.tableHeaderText}>✏️</Text>
            </View>
            {historicoPesaje.map((peso, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{peso.fecha}</Text>
                <Text style={styles.tableCell}>{peso.peso}</Text>
                <TouchableOpacity
                  onPress={() => handleEditPeso(peso.id)}
                  style={styles.tableCell}
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

        {/* Tabla de Vacunas Registradas */}
        <Text style={styles.subtitle}>Vacunas Registradas</Text>
        {historicoVacunas.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Fecha</Text>
              <Text style={styles.tableHeaderText}>Nombre</Text>
              <Text style={styles.tableHeaderText}>Tipo</Text>
              <Text style={styles.tableHeaderText}>Dosis</Text>
              <Text style={styles.tableHeaderText}>Observaciones</Text>
              <Text style={styles.tableHeaderText}>✏️</Text>
            </View>
            {historicoVacunas.map((vacuna, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{vacuna.fecha}</Text>
                <Text style={styles.tableCell}>{vacuna.nombre}</Text>
                <Text style={styles.tableCell}>{vacuna.tipo}</Text>
                <Text style={styles.tableCell}>{vacuna.dosis}</Text>
                <Text style={styles.tableCell}>
                  {vacuna.observaciones || "No disponible"}
                </Text>
                <TouchableOpacity
                  onPress={() => handleEditVacuna(vacuna.id)}
                  style={styles.tableCell}
                >
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
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

      {/* Fecha */}
      <TextInput
        value={nuevaFechaVacuna}
        onChangeText={setNuevaFechaVacuna}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />

      {/* Tipo de vacuna */}
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

      {/* Nombre de vacuna */}
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

      {/* Dosis */}
      <TextInput
        value={nuevaDosisVacuna}
        onChangeText={setNuevaDosisVacuna}
        placeholder="Dosis"
        style={styles.input}
      />

      {/* Observaciones */}
      <TextInput
        value={nuevaObsVacuna}
        onChangeText={setNuevaObsVacuna}
        placeholder="Observaciones"
        style={styles.input}
      />

      <Button title="Guardar cambios" onPress={handleGuardarCambiosVacuna} />
      <Button title="Cancelar" color="red" onPress={() => setModalVacunaVisible(false)} />
    </View>
  </View>
</Modal>


        {/* Botón de nuevo registro */}
        <Button
          title="Realiza un nuevo control"
          onPress={() => navigation.navigate("FormScreen", { chip })}
        />
      </ScrollView>
    </Layout>
  );
}
