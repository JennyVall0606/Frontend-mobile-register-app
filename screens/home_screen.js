import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Layout from '../components/layout';
import styles from '../styles/home_styles';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>REGISTROS</Text>

        <Image
          source={require('../assets/logogv.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegisterCattle')}
        >
          <Text style={styles.buttonText}>Registrar Ganado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => navigation.navigate('ControlHistory')}
        >
          <Text style={styles.buttonText}>Control de Historial</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
