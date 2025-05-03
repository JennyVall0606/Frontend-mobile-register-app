import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Button, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/ControlH_styles";
import axios from "axios";
const { width, height } = Dimensions.get('window');
export default function ControlH_Screen({ navigation, route }) {
  const { chip } = route.params || {}; // Recibimos el chip del animal
  const [animalInfo, setAnimalInfo] = useState(null);
  const [historicoPesaje, setHistoricoPesaje] = useState([]);
  const [historicoVacunas, setHistoricoVacunas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Text style={{ padding: 20 }}>Cargando datos...</Text>;

  // Obtener el peso más reciente si hay registros de pesaje
  const pesoRegistrado = historicoPesaje.length > 0 ? historicoPesaje[0] : null;

  return (
    <Layout>
        <ScrollView
        style={[styles.container, { width, height }]} // Ajustamos el ancho y alto al de la pantalla
      >
        {/* Flecha de vuelta */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" style={styles.iconFecha} />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>Control de Chip</Text>

        {/* Imagen del animal */}
        {animalInfo && animalInfo.foto && (
          <Image
            source={{ uri: `http://192.168.1.4:3000/uploads/${animalInfo.foto}` }}
            style={styles.image}
          />
        )}

        {/* Información del animal */}
<View style={styles.card}>
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>Chip:</Text>
    <Text style={styles.tableCell}>{animalInfo?.chip_animal || 'No se encontró información del animal'}</Text>
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
                <TouchableOpacity onPress={() => handleEditPeso(peso._id)} style={styles.tableCell}>
                  <Text style={styles.editButtonText}>✏️ </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No se encontraron registros de peso.</Text>
        )}

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
                <Text style={styles.tableCell}>{vacuna.observaciones || 'No disponible'}</Text>
                <TouchableOpacity onPress={() => handleEditVacuna(vacuna._id)} style={styles.tableCell}>
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No se encontraron registros de vacunas.</Text>
        )}

        {/* Botón de nuevo registro */}
        <Button title="Realiza un nuevo registro" onPress={() => navigation.navigate('FormScreen', { chip })} />

      </ScrollView>
    </Layout>
  );
}
