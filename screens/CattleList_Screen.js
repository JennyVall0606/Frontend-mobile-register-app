import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/CattleList_Styles";
import axios from "axios";

export default function CattleScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [ganado, setGanado] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.4:3000/register/all")
      .then((response) => setGanado(response.data))
      .catch((error) => console.error("Error al obtener el ganado:", error));
  }, []);

  // Agrupar ganado en pares
  const agruparEnPares = (animales) => {
    const pares = [];
    for (let i = 0; i < animales.length; i += 2) {
      pares.push(animales.slice(i, i + 2));
    }
    return pares;
  };

  return (
    <Layout>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons style={styles.icon} name="arrow-back" />
        </TouchableOpacity>

        <Text style={styles.title}>Resumen del Ganado</Text>

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.subtitle}>Animales registrados</Text>

          {agruparEnPares(ganado).map((par, index) => (
            <View key={index} style={styles.card}>
              {par.map((animal) => (
                <View key={animal.id} style={styles.cardContent}>
                  <Image
                    source={{
                      uri: animal.foto_url || "https://via.placeholder.com/100",
                    }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardText}>Chip: {animal.chip}</Text>
                  <Text style={styles.cardText}>Estado: {animal.estado}</Text>
                  <Text style={styles.cardText}>
                    Nacimiento:{" "}
                    {new Date(animal.fecha_nacimiento).toLocaleDateString()}
                  </Text>
                  <Text style={styles.cardText}>Peso: {animal.peso} kg</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
