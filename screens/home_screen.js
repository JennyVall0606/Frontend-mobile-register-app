import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import Layout from '../components/layoutHome';
import styles from '../styles/home_styles';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  
 const { width, height } = Dimensions.get('window');
  return (
    <Layout>
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
              style={[styles.container, { width, height }]} 
            >
        
<Image
  source={require('../assets/Logo_Positivo.png')}  
  style={styles.logo}
  resizeMode="contain"
/>

<View style={styles.container}>
  {/* Botones en la parte superior */}
  <View style={styles.buttonRow}>
    <TouchableOpacity
      style={styles.squareButton}
      onPress={() => navigation.navigate('RegisterCattle')}
    >
      <View style={styles.buttonContent}>
        <Image
          source={require('../assets/RegistrarGanado.png')} 
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Registrar Ganado</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.squareButton}
      onPress={() => navigation.navigate('CattleScreen')}
    >
      <View style={styles.buttonContent}>
        <Image
          source={require('../assets/VerMiGanado.png')} 
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Ver mi ganado</Text>
      </View>
    </TouchableOpacity>
  </View>

  {/* Botón Informes en la parte inferior centrado */}
  <TouchableOpacity
    style={styles.squareButtoninforme}
    onPress={() => navigation.navigate('InformesScreen')}
  >
    <View style={styles.buttonContentinforme}>
      <Image
        source={require('../assets/informes.png')} 
        style={styles.buttonImageinforme}
      />
      <Text style={styles.buttonTextinforme}>Informes</Text>
    </View>
  </TouchableOpacity>
</View>

      </ScrollView>
    
    </SafeAreaView>
    </Layout>
  );
}