import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../components/layout";
import { styles } from "../styles/CattleList_Styles";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importarlo

export default function CattleScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [ganado, setGanado] = useState([]);
  const [loading, setLoading] = useState(true);
const { width, height } = Dimensions.get('window');
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Obtener el token desde AsyncStorage
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Alert.alert("❌ Error", "Token no encontrado. Inicia sesión nuevamente.");
          return;
        }

        // Hacer la solicitud al backend para obtener los animales del usuario autenticado
        const response = await axios.get("http://192.168.1.4:3000/api/mis-animales", {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en los encabezados
          },
        });

        setGanado(response.data); // Setear los animales en el estado
        setLoading(false); // Detener el loading
      } catch (error) {
        console.error("Error al obtener el ganado:", error);
        setLoading(false); // Detener el loading
        Alert.alert("❌ Error", "Hubo un problema al obtener los datos del ganado.");
      }
    };

    fetchAnimals();
  }, []);

  // Filtrar ganado por chip o nombre
  const filteredGanado = ganado.filter((animal) =>
    animal.chip && animal.chip.toLowerCase().includes(search.toLowerCase())
  );
  

  // Agrupar ganado en pares para un mejor diseño
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons style={styles.icon} name="arrow-back" />
        </TouchableOpacity>

        <Text style={styles.title}>Resumen del Ganado</Text>

        
         
        
        

          {agruparEnPares(ganado).map((par, index) => (
            <View key={index} style={styles.card}>
              {par.map((animal) => (
                <TouchableOpacity
                key={animal.id}
                style={styles.cardContent}
                onPress={() => navigation.navigate("ControlScreen", { chip: animal.chip_animal })}
              >
                <Image
                  source={{
                    uri: `http://192.168.1.4:3000/uploads/${animal.foto}` || "https://via.placeholder.com/100",
                  }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardText}>Chip: {animal.chip_animal || "Sin chip"}</Text>
                <Text style={styles.cardText}>Estado: {animal.estado || "Desconocido"}</Text>
                <Text style={styles.cardText}>
                  Nacimiento: {new Date(animal.fecha_nacimiento).toLocaleDateString()}
                </Text>
                <Text style={styles.cardText}>
                  Peso: {animal.peso_nacimiento ? `${animal.peso_nacimiento} kg` : "Sin dato"}
                </Text>
              </TouchableOpacity>
              
              ))}
            </View>
          ))}
          <Text style={styles.totalCount}>
            Total de registros: {ganado.length}
          </Text>
        
      </ScrollView>
    </Layout>
  );
}
