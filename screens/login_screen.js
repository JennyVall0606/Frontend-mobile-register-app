// screens/login_screen.js
import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../components/simple_layout';
import styles from '../styles/welcome_styles'; // O login_styles si tienes uno diferente

export default function LoginScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenida, INICIA SESIÓN!</Text>
      </View>
    </Layout>
  );
}

