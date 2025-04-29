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
            onPress={() => navigation.navigate('ControlScreen')}
          >
            <Text style={styles.buttonText}>Ver mi ganado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}
