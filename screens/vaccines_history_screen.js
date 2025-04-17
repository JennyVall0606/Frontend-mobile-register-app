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
import { styles } from "../styles/vaccines_history_styles";

export default function VaccinesScreen({ navigation }) {
  const [search, setSearch] = useState("");


  const vacunas = [
    { id: "1", fecha: "25-03-01", id_animal: "A001", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "2", fecha: "25-03-02", id_animal: "A002", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Fiebre leve" },
    { id: "3", fecha: "25-03-03", id_animal: "A003", nombre: "Vacuna C", tipo: "Mixta", dosis: "1.5 ml", obs: "Normal" },
    { id: "4", fecha: "25-03-04", id_animal: "A004", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "5", fecha: "25-03-05", id_animal: "A005", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Normal" },
    { id: "6", fecha: "25-03-06", id_animal: "A006", nombre: "Vacuna C", tipo: "Mixta", dosis: "1.5 ml", obs: "Normal" },
    { id: "7", fecha: "25-03-07", id_animal: "A007", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "8", fecha: "25-03-08", id_animal: "A008", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Normal" },
    { id: "9", fecha: "25-03-09", id_animal: "A009", nombre: "Vacuna C", tipo: "Mixta", dosis: "1.5 ml", obs: "Normal" },
    { id: "10", fecha: "25-03-10", id_animal: "A010", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "11", fecha: "25-03-11", id_animal: "A011", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Fiebre leve" },
    { id: "12", fecha: "25-03-12", id_animal: "A012", nombre: "Vacuna C", tipo: "Mixta", dosis: "1.5 ml", obs: "Normal" },
    { id: "13", fecha: "25-03-13", id_animal: "A013", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "14", fecha: "25-03-14", id_animal: "A014", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Normal" },
    { id: "15", fecha: "25-03-15", id_animal: "A015", nombre: "Vacuna C", tipo: "Mixta", dosis: "1.5 ml", obs: "Normal" },
    { id: "16", fecha: "25-03-16", id_animal: "A016", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "17", fecha: "25-03-17", id_animal: "A017", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Normal" },
    { id: "18", fecha: "25-03-18", id_animal: "A018", nombre: "Vacuna C", tipo: "Mixta", dosis: "1.5 ml", obs: "Normal" },
    { id: "19", fecha: "25-03-19", id_animal: "A019", nombre: "Vacuna A", tipo: "Virus", dosis: "1 ml", obs: "Sin reacción" },
    { id: "20", fecha: "25-03-20", id_animal: "A020", nombre: "Vacuna B", tipo: "Bacteriana", dosis: "2 ml", obs: "Fiebre leve" },
  ];
  

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

        <ScrollView style={{ marginTop: 20 }}>
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

