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

export default function ControlScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const pesos = [
    { id: "1", fecha: "25-04-01", id_animal: "A001", peso: "320 kg" },
    { id: "2", fecha: "25-04-02", id_animal: "A002", peso: "315 kg" },
    { id: "3", fecha: "25-04-03", id_animal: "A003", peso: "300 kg" },
    { id: "4", fecha: "25-04-04", id_animal: "A004", peso: "310 kg" },
    { id: "5", fecha: "25-04-05", id_animal: "A005", peso: "325 kg" },
  ];

  const vacunas = [
    {
      id: "1",
      fecha: "25-03-20",
      id_animal: "A001",
      nombre: "Vacuna A",
      tipo: "Virus",
      dosis: "1 ml",
      obs: "Sin reacción",
    },
    {
      id: "2",
      fecha: "25-03-21",
      id_animal: "A002",
      nombre: "Vacuna B",
      tipo: "Bacteriana",
      dosis: "2 ml",
      obs: "Fiebre leve",
    },
    {
      id: "3",
      fecha: "25-03-22",
      id_animal: "A003",
      nombre: "Vacuna C",
      tipo: "Mixta",
      dosis: "1.5 ml",
      obs: "Normal",
    },
    {
      id: "4",
      fecha: "25-03-23",
      id_animal: "A004",
      nombre: "Vacuna A",
      tipo: "Virus",
      dosis: "1 ml",
      obs: "Sin reacción",
    },
    {
      id: "5",
      fecha: "25-03-24",
      id_animal: "A005",
      nombre: "Vacuna B",
      tipo: "Bacteriana",
      dosis: "2 ml",
      obs: "Normal",
    },
  ];

  const filteredPesos = pesos.filter((item) =>
    item.id_animal.toLowerCase().includes(search.toLowerCase())
  );

  const filteredVacunas = vacunas.filter((item) =>
    item.id_animal.toLowerCase().includes(search.toLowerCase())
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

        <ScrollView style={{ marginTop: 10 }}>
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

