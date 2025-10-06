import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import DatabaseManager from "./database/DatabaseManager";
import AsyncStorage from '@react-native-async-storage/async-storage';
// Sistema de autenticación
import { testAuth } from './services/TestAuth';
import AuthManager from './services/AuthManager';

// 🆕 Sistema de sincronización
import SyncManager from './services/SyncManager';
import SyncQueue from './services/SyncQueue';

export default function App() {
  // Estados existentes
  const [isDbReady, setIsDbReady] = useState(false);
  const [dbError, setDbError] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState(null);
  
  // 🆕 Estados de sincronización
  const [isSyncReady, setIsSyncReady] = useState(false);
  const [syncError, setSyncError] = useState(null);
  
  const [showTests, setShowTests] = useState(false);
  const [testResults, setTestResults] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    // Inicializar en paralelo SQLite, Auth y Sync
    await Promise.allSettled([
      initializeDatabase(),
      initializeAuth(),
      initializeSync() // 🆕 Agregar inicialización de sync
    ]);
  };

  const initializeDatabase = async () => {
    try {
      console.log('🔄 Inicializando SQLite...');
      await DatabaseManager.initialize();
      console.log('✅ SQLite listo');
      setIsDbReady(true);
    } catch (error) {
      console.error('❌ Error SQLite:', error);
      setDbError(error);
      setTimeout(() => {
        console.log('⚠️ Continuando sin SQLite...');
        setIsDbReady(true);
      }, 3000);
    }
  };

// En App.js, reemplaza la función initializeAuth por esta versión mejorada:

const initializeAuth = async () => {
  try {
    console.log('🔄 Inicializando sistema de autenticación...');
    
    const connectionTest = await AuthManager.testConnection();
    if (!connectionTest) {
      throw new Error('AuthManager no funciona correctamente');
    }

    // 🆕 Cargar sesión guardada automáticamente
    const savedSession = await AuthManager.checkSavedSession();
    
    if (savedSession) {
      console.log('✅ Sesión restaurada:', savedSession.user.correo);
      console.log('✅ Token disponible:', !!AuthManager.getAuthToken());
    } else {
      console.log('⚠️ No hay sesión guardada - login requerido');
    }

    console.log('✅ Sistema de autenticación listo');
    setIsAuthReady(true);
  } catch (error) {
    console.error('❌ Error inicializando Auth:', error);
    setAuthError(error);
    setIsAuthReady(true);
  }
};

  // 🆕 Inicializar sistema de sincronización
  const initializeSync = async () => {
    try {
      console.log('🔄 Inicializando sistema de sincronización...');
      
      // Inicializar cola de sincronización
      await SyncQueue.initialize();
      
      // Inicializar gestor de sincronización
      const syncInitialized = await SyncManager.initialize();
      
      if (!syncInitialized) {
        throw new Error('SyncManager no se inicializó correctamente');
      }

      // Obtener estadísticas de la cola
      const queueStats = await SyncQueue.getStats();
      console.log('📊 Cola de sincronización:', queueStats);
      
      if (queueStats.pending > 0) {
        console.log(`⏳ ${queueStats.pending} operaciones pendientes de sincronizar`);
      }

      console.log('✅ Sistema de sincronización listo');
      setIsSyncReady(true);
    } catch (error) {
      console.error('❌ Error inicializando Sync:', error);
      setSyncError(error);
      // Continuar sin sincronización
      setIsSyncReady(true);
    }
  };

  const runAuthTests = async () => {
    setShowTests(true);
    console.log('🧪 Ejecutando pruebas de autenticación...');
    const success = await testAuth();
    setTestResults(success ? '✅ Todas las pruebas pasaron!' : '❌ Algunas pruebas fallaron');
  };

  const goToNormalApp = () => {
    setShowTests(false);
  };

  // Pantalla de loading mientras se inicializa todo
  if (!isDbReady || !isAuthReady || !isSyncReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          Inicializando aplicación...
        </Text>
        
        {/* Estado SQLite */}
        <Text style={[styles.subText, { color: isDbReady ? '#28a745' : '#666' }]}>
          {isDbReady ? '✅' : '🔄'} Base de datos local
        </Text>
        
        {/* Estado Auth */}
        <Text style={[styles.subText, { color: isAuthReady ? '#28a745' : '#666' }]}>
          {isAuthReady ? '✅' : '🔄'} Sistema de autenticación
        </Text>
        
        {/* 🆕 Estado Sync */}
        <Text style={[styles.subText, { color: isSyncReady ? '#28a745' : '#666' }]}>
          {isSyncReady ? '✅' : '🔄'} Sistema de sincronización
        </Text>
        
        {/* Errores SQLite */}
        {dbError && (
          <View style={[styles.errorContainer, { backgroundColor: '#FFF3CD' }]}>
            <Text style={styles.errorText}>
              ⚠️ SQLite falló - Continuando sin BD local
            </Text>
          </View>
        )}

        {/* Errores Auth */}
        {authError && (
          <View style={[styles.errorContainer, { backgroundColor: '#F8D7DA' }]}>
            <Text style={[styles.errorText, { color: '#721c24' }]}>
              ❌ Error en sistema de autenticación
            </Text>
            <Text style={[styles.errorSubText, { color: '#721c24' }]}>
              {authError.message}
            </Text>
          </View>
        )}

        {/* 🆕 Errores Sync */}
        {syncError && (
          <View style={[styles.errorContainer, { backgroundColor: '#FFF3CD' }]}>
            <Text style={styles.errorText}>
              ⚠️ Error en sincronización - Continuando sin sync automático
            </Text>
            <Text style={styles.errorSubText}>
              {syncError.message}
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Pantalla de pruebas de autenticación (opcional)
  if (showTests) {
    return (
      <View style={styles.testContainer}>
        <Text style={styles.testTitle}>🧪 Pruebas de Autenticación</Text>
        <Text style={styles.testSubtitle}>
          Verificar que el sistema híbrido funcione correctamente
        </Text>

        <View style={styles.testButtons}>
          <Button
            title="▶️ Ejecutar Pruebas"
            onPress={runAuthTests}
          />
          <View style={styles.spacer} />
          <Button
            title="📱 Ir a la App"
            onPress={goToNormalApp}
            color="#007AFF"
          />
        </View>

        {testResults && (
          <View style={styles.testResults}>
            <Text style={styles.testResultsText}>{testResults}</Text>
            <Text style={styles.testNote}>
              📋 Revisa los logs para más detalles
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Tu aplicación normal (sin cambios)
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  errorText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorSubText: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center',
    marginTop: 4,
  },
  testContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },
  testTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  testSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  testButtons: {
    marginBottom: 30,
  },
  spacer: {
    height: 15,
  },
  testResults: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  testResultsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  testNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});