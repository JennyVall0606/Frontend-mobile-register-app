import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../components/layout';  // Verifica que la ruta sea correcta
import styles from '../styles/welcome_styles';  // Ruta correcta a tu archivo de estilos

export default function ControlScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>HISTORICO DE LOS DOS VACUNAS Y PESO</Text>
      </View>
    </Layout>
  );
}