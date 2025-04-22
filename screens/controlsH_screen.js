import React, { useState } from "react";
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
import { vacunas } from "../services/VaccinesData";
import { pesos } from "../services/weightData";

export default function ControlScreen({ navigation }) {
  const [search, setSearch] = useState("");

  // Filtrar y ordenar los pesos y vacunas por fecha de forma descendente
  const filteredPesos = pesos
    .filter((item) =>
      item.id_animal.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha, más reciente primero
    .slice(0, 5); // Tomar solo los 5 primeros registros

  const filteredVacunas = vacunas
    .filter((item) =>
      item.id_animal.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha, más reciente primero
    .slice(0, 5); // Tomar solo los 5 primeros registros

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
            {filteredPesos.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.cellId}>{item.id}</Text>
                <Text style={styles.cell}>{item.fecha}</Text>
                <Text style={styles.cell}>{item.id_animal}</Text>
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
            {filteredVacunas.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.cellId}>{item.id}</Text>
                <Text style={styles.cell}>{item.fecha}</Text>
                <Text style={styles.cell}>{item.id_animal}</Text>
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

