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
import { styles } from "../styles/ControlH_styles";

import axios from "axios"; // Si prefieres usar axios

export default function ControlScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [historicoPesaje, setHistoricoPesaje] = useState([]);
  const [historicoVacunas, setHistoricoVacunas] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
 
    axios
      .get("http://192.168.1.4:3000/weighing/historico-pesaje") 
      .then((response) => {
       
        const filteredPesos = response.data
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) 
          .slice(0, 5);
        setHistoricoPesaje(filteredPesos);
      })
      .catch((error) => console.error("Error al obtener los pesos:", error))
      .finally(() => setLoading(false)); 
  }, []);

  axios
    .get("http://192.168.1.4:3000/vaccines/historico-vacunas") 
    .then((response) => {
    
      const filteredVacunas = response.data
        .sort((a, b) => new Date(b.fecha_vacuna) - new Date(a.fecha_vacuna)) 
        .slice(0, 5);
      setHistoricoVacunas(filteredVacunas);
    })
    .catch((error) => console.error("Error al obtener las vacunas:", error))
    .finally(() => setLoading(false)); 
  []; 

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons style={styles.icon} name="arrow-back" />
        </TouchableOpacity>

        <Text style={styles.title}>Historial de controles</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" style={styles.searchIcon} />
          <TextInput
            placeholder="Buscar chip de vaca"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.subtitle}>Pesos registrados</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cellHeaderId}>ID</Text>
              <Text style={styles.cellHeader}>Fecha</Text>
              <Text style={styles.cellHeader}>Chip</Text>
              <Text style={styles.cellHeader}>Peso</Text>
            </View>
            {historicoPesaje.map((item) => (
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

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("WeightScreen")}
            >
              <Text style={styles.link}>Ver más</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FormScreen")}>
              <Ionicons name="add-circle" style={styles.addIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Vacunas aplicadas</Text>
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
            {historicoVacunas.map((item) => (
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

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("VaccinesScreen")}
            >
              <Text style={styles.link}>Ver más</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FormScreen")}>
              <Ionicons name="add-circle" style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
