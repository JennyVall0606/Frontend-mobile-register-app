import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/simple_layout';
import styles from '../styles/login_styles';

export default function LoginScreen() {
  const navigation = useNavigation();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Verifica que el usuario y contraseña no estén vacíos
    if (username && password) {
      // Lógica para verificar el login (aquí puedes hacer la validación que desees)
      navigation.navigate('Home'); // Asegúrate de que este nombre coincida con tu AppNavigator
    } else {
      alert('Por favor ingresa usuario y contraseña');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Video
          source={require('../assets/video.mp4')}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay
          isMuted
        />
        <Text style={styles.title}>INICIAR   SESIÓN</Text>

        
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />

        {/* Campo para la contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Oculta el texto para la contraseña
        />
        

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

