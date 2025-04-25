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
import { styles } from "../styles/weight_history_styles";
import axios from "axios";
export default function WeightScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [historicoPesaje, setHistoricoPesaje] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    
    axios
      .get("http://192.168.1.4:3000/weighing/historico-pesaje") 
      .then((response) => {
       
        const filteredPesos = response.data.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        ); 
        setHistoricoPesaje(filteredPesos);
      })
      .catch((error) => console.error("Error al obtener los pesos:", error))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }
  
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = historicoPesaje.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

 
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

  const totalPages = Math.ceil(historicoPesaje.length / recordsPerPage);

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons style={styles.icon} name="arrow-back" />
        </TouchableOpacity>

        <Text style={styles.title}>Pesos registrados</Text>

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
              <Text style={styles.cellHeader}>Peso</Text>
            </View>
            {currentRecords.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.cellId}>{item.id}</Text>
                <Text style={styles.cell}>
                  {new Date(item.fecha).toLocaleDateString("en-CA")}
                </Text>
                <Text style={styles.cell}>{item.chip}</Text>
                <Text style={styles.cell}>{item.peso}</Text>
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
              onPress={() => navigation.navigate("WeightScreen")}
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
