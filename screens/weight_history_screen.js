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
import { styles } from "../styles/weight_history_styles";

export default function WeightScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const pesos = [
    { id: "1", fecha: "25-04-01", id_animal: "A001", peso: "320 kg" },
    { id: "2", fecha: "25-04-02", id_animal: "A002", peso: "315 kg" },
    { id: "3", fecha: "25-04-03", id_animal: "A003", peso: "300 kg" },
    { id: "4", fecha: "25-04-04", id_animal: "A004", peso: "310 kg" },
    { id: "5", fecha: "25-04-05", id_animal: "A005", peso: "325 kg" },
    { id: "6", fecha: "25-04-01", id_animal: "A001", peso: "320 kg" },
    { id: "7", fecha: "25-04-02", id_animal: "A002", peso: "315 kg" },
    { id: "8", fecha: "25-04-03", id_animal: "A003", peso: "300 kg" },
    { id: "9", fecha: "25-04-04", id_animal: "A004", peso: "310 kg" },
    { id: "10", fecha: "25-04-05", id_animal: "A005", peso: "325 kg" },
    { id: "11", fecha: "25-04-01", id_animal: "A001", peso: "320 kg" },
    { id: "12", fecha: "25-04-02", id_animal: "A002", peso: "315 kg" },
    { id: "13", fecha: "25-04-03", id_animal: "A003", peso: "300 kg" },
    { id: "14", fecha: "25-04-04", id_animal: "A004", peso: "310 kg" },
    { id: "15", fecha: "25-04-05", id_animal: "A005", peso: "325 kg" },
    { id: "16", fecha: "25-04-01", id_animal: "A001", peso: "320 kg" },
    { id: "17", fecha: "25-04-02", id_animal: "A002", peso: "315 kg" },
    { id: "18", fecha: "25-04-03", id_animal: "A003", peso: "300 kg" },
    { id: "19", fecha: "25-04-04", id_animal: "A004", peso: "310 kg" },
    { id: "20", fecha: "25-04-05", id_animal: "A005", peso: "325 kg" },
  ];

  

  const filteredPesos = pesos.filter((item) =>
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

        <ScrollView style={{ marginTop: 20 }}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cellHeaderId}>ID</Text>
              <Text style={styles.cellHeader}>Fecha</Text>
              <Text style={styles.cellHeader}>Chip</Text>
              <Text style={styles.cellHeader}>Peso</Text>
            </View>
            {filteredPesos.slice(0, 20).map((item) => (
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
