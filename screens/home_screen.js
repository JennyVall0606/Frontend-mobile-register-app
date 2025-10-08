import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import Layout from '../components/layoutHome';
import styles from '../styles/home_styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function HomeScreen() {
  const navigation = useNavigation();
  
 const clearCorruptedData = async () => {
    Alert.alert(
      '🗑️ Limpiar Datos Locales',
      '⚠️ Esto eliminará:\n\n• Registros pendientes\n• Cola de sincronización\n• Caché local\n\n¿Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🧹 LIMPIEZA COMPLETA INICIADA...');
              
              // Limpiar específicamente lo necesario
              await AsyncStorage.removeItem('local_registro_animal');
              await AsyncStorage.removeItem('sync_queue');
              await AsyncStorage.removeItem('cached_animals');
              
              console.log('✅ LIMPIEZA COMPLETA TERMINADA');
              
              Alert.alert(
                '✅ Limpieza Exitosa',
                'Todos los datos locales fueron eliminados.\n\n🔄 Cierra completamente la app y ábrela de nuevo para ver los cambios.',
                [{ text: 'OK' }]
              );
              
            } catch (error) {
              console.error('❌ Error en limpieza:', error);
              Alert.alert('Error', 'No se pudo completar la limpieza: ' + error.message);
            }
          }
        }
      ]
    );
  };

  // Función de migración forzada
  const forceMigration = async () => {
    try {
      console.log('🔄 MIGRACIÓN COMPLETA INICIADA...');
      
      // 1. Limpiar cola actual completamente
      await AsyncStorage.setItem('sync_queue', JSON.stringify([]));
      console.log('🗑️ Cola limpiada');
      
      // 2. Obtener todos los animales locales
      const localData = await AsyncStorage.getItem('local_registro_animal');
      const animals = JSON.parse(localData || '[]');
      
      const newQueue = [];
      let addedCount = 0;
      
      // 3. Agregar TODOS los animales no sincronizados
      for (const animal of animals) {
        if (!animal.synced) {
          const operation = {
            id: Date.now() + Math.random() * 10000 + addedCount,
            table: 'registro_animal',
            recordId: animal.id,
            action: 'INSERT',
            data: animal,
            status: 'pending',
            created_at: new Date().toISOString(),
            attempts: 0
          };
          
          newQueue.push(operation);
          addedCount++;
          console.log(`➕ ${addedCount}. ${animal.chip_animal} agregado`);
        }
      }
      
      // 4. Guardar nueva cola
      await AsyncStorage.setItem('sync_queue', JSON.stringify(newQueue));
      
      console.log(`✅ MIGRACIÓN COMPLETADA:`);
      console.log(`   Total animales locales: ${animals.length}`);
      console.log(`   Agregados a cola: ${addedCount}`);
      
      alert(`¡Migración exitosa!\n\n${addedCount} animales agregados a la cola.\n\nReinicia la app para sincronizar.`);
      
    } catch (error) {
      console.error('❌ Error en migración:', error);
      alert('Error: ' + error.message);
    }
  };

  // Resto de tus useEffect...
  useEffect(() => {
    const checkData = async () => {
      try {
        console.log('🔍 === DIAGNÓSTICO DE DATOS LOCALES ===');
        
        const result = await AsyncStorage.multiGet(['local_registro_animal', 'sync_queue']);
        const [localAnimals, syncQueue] = result;
        
        const animals = JSON.parse(localAnimals[1] || '[]');
        const queue = JSON.parse(syncQueue[1] || '[]');
        
        console.log('🐄 Animales locales encontrados:', animals.length);
        console.log('📦 Operaciones en cola:', queue.length);
        
      } catch (error) {
        console.error('❌ Error verificando datos:', error);
      }
    };
    
    checkData();
  }, []);

  const { width, height } = Dimensions.get('window');
  
  return (
    <Layout>
    
       
        <ScrollView style={[styles.container, { width, height }]}>
          {/* Resto de tu contenido existente */}
          <Image
            source={require('../assets/Logo_Positivo.png')}  
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.container}>
            {/* Botones originales */}
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
     
    </Layout>
  );
}