import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Layout from '../components/layoutHome';
import styles from '../styles/home_styles';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  
 const { width, height } = Dimensions.get('window');
  return (
    <Layout>
      <ScrollView
              style={[styles.container, { width, height }]} // Ajustamos el ancho y alto al de la pantalla
            >
        
        <Image
          source={require('../assets/Logo_Positivo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

       <View style={styles.buttonRow}>
  {/* Botón "Registrar Ganado" con imagen */}
  <TouchableOpacity
    style={styles.squareButton}
    onPress={() => navigation.navigate('RegisterCattle')}
  >
    <View style={styles.buttonContent}>
      <Image
        source={require('../assets/RegistrarGanado.png')} // Ruta de la imagen para "Registrar Ganado"
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Registrar Ganado</Text>
    </View>
  </TouchableOpacity>

  {/* Botón "Ver mi ganado" con imagen */}
  <TouchableOpacity
    style={styles.squareButton}
    onPress={() => navigation.navigate('CattleScreen')}
  >
    <View style={styles.buttonContent}>
      <Image
        source={require('../assets/VerMiGanado.png')} // Ruta de la imagen para "Ver mi ganado"
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Ver mi ganado</Text>
    </View>
  </TouchableOpacity>
</View>
      </ScrollView>
    </Layout>
  );
}
