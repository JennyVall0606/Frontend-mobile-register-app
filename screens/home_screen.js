import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Layout from '../components/layout';
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
        <Text style={styles.title}>AgroGestor</Text>

        <Image
          source={require('../assets/logogv.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => navigation.navigate('RegisterCattle')}
          >
            <Text style={styles.buttonText}>Registrar Ganado</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => navigation.navigate('CattleScreen')}
          >
            <Text style={styles.buttonText}>Ver mi ganado</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
}
