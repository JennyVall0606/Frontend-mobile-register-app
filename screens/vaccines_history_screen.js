import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/vaccines_history_styles";
import axios from "axios";

export default function VaccinesScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [historicoVacunas, setHistoricoVacunas] = useState([]);
  const [filteredVacunas, setFilteredVacunas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtiene las vacunas y maneja el filtro de búsqueda
  useEffect(() => {
    axios
      .get("http://192.168.1.4:3000/vaccines/historico-vacunas")
      .then((response) => {
        const sortedVacunas = response.data.sort(
          (a, b) => new Date(b.fecha_vacuna) - new Date(a.fecha_vacuna)
        );
        setHistoricoVacunas(sortedVacunas);
        setFilteredVacunas(sortedVacunas); // Almacena los datos sin filtrar inicialmente
      })
      .catch((error) => console.error("Error al obtener las vacunas:", error))
      .finally(() => setLoading(false));
  }, []);

  // Filtra los resultados cuando el usuario escribe en el campo de búsqueda
  useEffect(() => {
    if (search) {
      const filtered = historicoVacunas.filter((item) =>
        item.chip.toString().toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVacunas(filtered);
    } else {
      setFilteredVacunas(historicoVacunas);
    }
  }, [search, historicoVacunas]);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  const totalPages = Math.ceil(filteredVacunas.length / recordsPerPage);

  // Definir funciones de paginación
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredVacunas.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons style={styles.icon} name="arrow-back" />
        </TouchableOpacity>

        <Text style={styles.title}>Historial de vacunas</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar chip de vaca"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cellHeaderId}>ID</Text>
              <Text style={styles.cellHeader}>Fecha</Text>
              <Text style={styles.cellHeader}>Chip</Text>
              <Text style={styles.cellHeaderNombre}>Nombre</Text>
              <Text style={styles.cellHeader}>Tipo</Text>
              <Text style={styles.cellHeaderDosis}>Dosis</Text>
              <Text style={styles.cellHeader}>Obs</Text>
            </View>
            {currentRecords.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.cellId}>{item.id}</Text>
                <Text style={styles.cell}>
                  {new Date(item.fecha).toLocaleDateString("en-CA")}
                </Text>
                <Text style={styles.cell}>{item.chip}</Text>
                <Text style={styles.cellNombre}>{item.nombre}</Text>
                <Text style={styles.cell}>{item.tipo}</Text>
                <Text style={styles.cellDosis}>{item.dosis}</Text>
                <Text style={styles.cell}>{item.obs}</Text>
              </View>
            ))}
          </View>

          
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={prevPage} disabled={currentPage === 1}>
              <Text style={styles.paginationButton}>Anterior</Text>
            </TouchableOpacity>

            <Text style={styles.pageInfo}>
              Página {currentPage} de {totalPages}
            </Text>

            <TouchableOpacity
              onPress={nextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButton}>Siguiente</Text>
            </TouchableOpacity>
          </View>

         
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("VaccinesScreen")}
            ></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FormScreen")}>
              <Ionicons name="add-circle" style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
