import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/CattleList_Styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CattleScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [ganado, setGanado] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  const API_URL = "http://192.168.1.11:3000";

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert(
            "❌ Error",
            "Token no encontrado. Inicia sesión nuevamente."
          );
          return;
        }

        const response = await axios.get(`${API_URL}/api/mis-animales`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGanado(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el ganado:", error);
        setLoading(false);
        Alert.alert(
          "❌ Error",
          "Hubo un problema al obtener los datos del ganado."
        );
      }
    };

    fetchAnimals();
  }, []);

  const filteredGanado = ganado.filter(
    (animal) =>
      animal.chip && animal.chip.toLowerCase().includes(search.toLowerCase())
  );

  const agruparEnPares = (animales) => {
    const pares = [];
    for (let i = 0; i < animales.length; i += 2) {
      pares.push(animales.slice(i, i + 2));
    }
    return pares;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Layout>
      <ScrollView
        style={[styles.container, { width, height }]} // Ajustamos el ancho y alto al de la pantalla
      >
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/Imagen_Resumen_Ganado.png")} // Coloca la ruta de tu imagen aquí
            style={styles.imageStyle} // Define el estilo para la imagen
          />
          <Text style={styles.title}>RESUMEN</Text>
          <Text style={styles.title1}>DE GANADO</Text>
        </View>

        <View style={styles.totalCountContainer}>
          <Image
            source={require("../assets/TotalRegistros.png")} // Ruta de tu logo
            style={styles.logoStyle} // Estilo para el logo
          />
          <Text style={styles.totalCount}>
            Total de registros:{" "}
            <Text style={styles.counter}>{ganado.length}</Text>
          </Text>
        </View>

        {ganado.map((animal) => (
          <View key={animal.id} style={styles.card}>
            <TouchableOpacity
              key={animal.id}
              style={styles.cardContent}
              onPress={() =>
                navigation.navigate("ControlScreen", {
                  chip: animal.chip_animal,
                })
              }
            >
              <Image
                source={{
                  uri: animal.foto
                    ? `${API_URL}/uploads/${animal.foto}`
                    : "https://via.placeholder.com/100",
                }}
                style={styles.cardImage}
              />
              <View style={styles.column}>
  {/* Chip */}
  <View style={styles.row}>
    <Image
      source={require("../assets/Chip.png")}
      style={styles.iconStyle}
    />
    <Text style={styles.chipText}>Chip: </Text>
    <Text style={styles.DatosTextChip}>
      {animal.chip_animal || "Sin chip"}
    </Text>
  </View>



  {/* Nacimiento */}
  <View style={styles.row}>
    <Image
      source={require("../assets/Nacimiento.png")}
      style={styles.iconStyleNacimiento}
    />
    <Text style={styles.chipText}>Nacimiento: </Text>
    <Text style={styles.DatosTextNacimiento}>
      {new Date(animal.fecha_nacimiento).toLocaleDateString()}
    </Text>
  </View>

  {/* Peso */}
  <View style={styles.row}>
    <Image
      source={require("../assets/Peso.png")}
      style={styles.iconStyle}
    />
    <Text style={styles.chipText}>Peso: </Text>
    <Text style={styles.DatosTextPeso}>
      {animal.peso_nacimiento ? `${animal.peso_nacimiento} kg` : "Sin dato"}
    </Text>
  </View>

  {/* Estado */}
  <View style={styles.row}>
    <Image
      source={require("../assets/Estado.png")}
      style={styles.iconStyle}
    />
    <Text style={styles.chipText}>Estado: </Text>
    <Text style={styles.DatosTextEstado}>
      {animal.estado || "Desconocido"}
    </Text>
  </View>

</View>

            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}
