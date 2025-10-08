import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import DatabaseManager from "./database/DatabaseManager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { testAuth } from './services/TestAuth';
import AuthManager from './services/AuthManager';
import SyncManager from './services/SyncManager';
import SyncQueue from './services/SyncQueue';
import AutoCleanupService from './services/AutoCleanupService';

export default function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [dbError, setDbError] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isSyncReady, setIsSyncReady] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const [showTests, setShowTests] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showDebugButtons, setShowDebugButtons] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  // 🆕 Detener servicio cuando se desmonta la app
  useEffect(() => {
    return () => {
      console.log('🛑 Desmontando app, deteniendo AutoCleanupService...');
      AutoCleanupService.stop();
    };
  }, []);

  const initializeApp = async () => {
    await Promise.allSettled([
      initializeDatabase(),
      initializeAuth(),
      initializeSync()
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

  const initializeAuth = async () => {
    try {
      console.log('🔄 Inicializando sistema de autenticación...');
      
      const connectionTest = await AuthManager.testConnection();
      if (!connectionTest) {
        throw new Error('AuthManager no funciona correctamente');
      }

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

  const initializeSync = async () => {
    try {
      console.log('🔄 Inicializando sistema de sincronización...');
      
      await SyncQueue.initialize();
      
      // Limpieza automática al inicio (solo si está marcado)
      const needsCleanup = await AsyncStorage.getItem('needs_cleanup');
      if (needsCleanup === 'true') {
        console.log('🧹 Ejecutando limpieza automática al inicio...');
        
        await AsyncStorage.removeItem('local_registro_animal');
        await AsyncStorage.removeItem('sync_queue');
        await AsyncStorage.setItem('needs_cleanup', 'false');
        
        console.log('✅ Limpieza automática completada');
        await SyncQueue.initialize();
      }
      
      const syncInitialized = await SyncManager.initialize();
      
      if (!syncInitialized) {
        throw new Error('SyncManager no se inicializó correctamente');
      }

      const queueStats = await SyncQueue.getStats();
      console.log('📊 Cola de sincronización:', queueStats);
      
      if (queueStats.pending > 0) {
        console.log(`⏳ ${queueStats.pending} operaciones pendientes de sincronizar`);
      }

      // 🆕 INICIAR SERVICIO DE LIMPIEZA AUTOMÁTICA (DESPUÉS de que todo esté listo)
      console.log('🧹 Iniciando servicio de limpieza automática...');
      AutoCleanupService.start();
      
      // 🆕 Configurar servicio (opcional - ajustar según necesidades)
      AutoCleanupService.configure({
        checkIntervalMinutes: 30,      // Verificar cada 30 minutos
        offlineThresholdMinutes: 30    // Limpiar si offline por más de 30 min
      });

      console.log('✅ Sistema de sincronización listo');
      setIsSyncReady(true);
    } catch (error) {
      console.error('❌ Error inicializando Sync:', error);
      setSyncError(error);
      setIsSyncReady(true);
    }
  };

  const clearAllLocalData = async () => {
    Alert.alert(
      '🗑️ Limpiar datos locales',
      '⚠️ ATENCIÓN: Esto eliminará todos los registros pendientes y la cola de sincronización.\n\nLos datos del servidor NO se afectarán.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Limpiar Ahora',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('🗑️ Iniciando limpieza inmediata...');

              await AsyncStorage.removeItem('local_registro_animal');
              console.log('✅ local_registro_animal eliminado');

              await AsyncStorage.removeItem('sync_queue');
              console.log('✅ sync_queue eliminado');

              await AsyncStorage.removeItem('cached_animals');
              console.log('✅ cached_animals eliminado');

              await SyncQueue.initialize();

              Alert.alert(
                '✅ Limpieza completa',
                'Todos los datos locales fueron eliminados.\n\n✅ Los cambios ya están aplicados.\n\nPuedes volver a la app.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      setShowDebugButtons(false);
                    }
                  }
                ]
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

  const runAuthTests = async () => {
    setShowTests(true);
    console.log('🧪 Ejecutando pruebas de autenticación...');
    const success = await testAuth();
    setTestResults(success ? '✅ Todas las pruebas pasaron!' : '❌ Algunas pruebas fallaron');
  };

  const goToNormalApp = () => {
    setShowTests(false);
  };

  // Pantalla de loading
  if (!isDbReady || !isAuthReady || !isSyncReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          Inicializando aplicación...
        </Text>
        
        <Text style={[styles.subText, { color: isDbReady ? '#28a745' : '#666' }]}>
          {isDbReady ? '✅' : '🔄'} Base de datos local
        </Text>
        
        <Text style={[styles.subText, { color: isAuthReady ? '#28a745' : '#666' }]}>
          {isAuthReady ? '✅' : '🔄'} Sistema de autenticación
        </Text>
        
        <Text style={[styles.subText, { color: isSyncReady ? '#28a745' : '#666' }]}>
          {isSyncReady ? '✅' : '🔄'} Sistema de sincronización
        </Text>

        {isDbReady && isAuthReady && isSyncReady && (
          <TouchableOpacity
            onPress={() => setShowDebugButtons(true)}
            style={{
              marginTop: 30,
              padding: 10,
            }}
          >
            <Text style={{ color: '#007AFF', fontSize: 12 }}>
              🔧 Opciones de desarrollo
            </Text>
          </TouchableOpacity>
        )}

        {dbError && (
          <View style={[styles.errorContainer, { backgroundColor: '#FFF3CD' }]}>
            <Text style={styles.errorText}>
              ⚠️ SQLite falló - Continuando sin BD local
            </Text>
          </View>
        )}

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

  // Pantalla de opciones de debug
  if (showDebugButtons) {
    return (
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>🔧 Opciones de Desarrollo</Text>
        <Text style={styles.debugSubtitle}>
          Herramientas para limpiar datos locales
        </Text>

        <TouchableOpacity
          style={styles.debugButton}
          onPress={clearAllLocalData}
        >
          <Text style={styles.debugButtonText}>
            🗑️ Limpiar TODOS los datos locales
          </Text>
          <Text style={styles.debugButtonSubtext}>
            Elimina registros pendientes, cola y caché
          </Text>
        </TouchableOpacity>

        {/* 🆕 Botón de estadísticas */}
        <TouchableOpacity
          style={[styles.debugButton, { backgroundColor: '#FF9800' }]}
          onPress={async () => {
            const stats = await AutoCleanupService.getStats();
            Alert.alert(
              '📊 Estadísticas de Limpieza Automática',
              `Estado: ${stats.isRunning ? '🟢 Activo' : '🔴 Inactivo'}\n\n` +
              `Verificación cada: ${stats.checkIntervalMinutes} min\n` +
              `Umbral offline: ${stats.offlineThresholdMinutes} min\n` +
              `Última limpieza: ${stats.lastCleanup ? new Date(stats.lastCleanup).toLocaleString() : 'Nunca'}\n\n` +
              `Total limpiezas: ${stats.totalCleanups}\n` +
              `Registros eliminados: ${stats.totalAnimalsDeleted}\n` +
              `Operaciones eliminadas: ${stats.totalQueueDeleted}`
            );
          }}
        >
          <Text style={styles.debugButtonText}>
            📊 Ver Estadísticas
          </Text>
          <Text style={styles.debugButtonSubtext}>
            Historial del servicio automático
          </Text>
        </TouchableOpacity>

        {/* 🆕 Botón de limpieza forzada */}
        <TouchableOpacity
          style={[styles.debugButton, { backgroundColor: '#9C27B0' }]}
          onPress={async () => {
            const result = await AutoCleanupService.forceCleanup();
            Alert.alert(
              '✅ Limpieza Forzada',
              result.success 
                ? `Registros eliminados: ${result.animalsDeleted || 0}\nOperaciones eliminadas: ${result.queueDeleted || 0}`
                : `Error: ${result.message || result.error}`
            );
          }}
        >
          <Text style={styles.debugButtonText}>
            🔧 Forzar Limpieza Ahora
          </Text>
          <Text style={styles.debugButtonSubtext}>
            Ejecutar limpieza manualmente
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.debugButton, { backgroundColor: '#007AFF' }]}
          onPress={() => setShowDebugButtons(false)}
        >
          <Text style={[styles.debugButtonText, { color: '#fff' }]}>
            ← Volver a la app
          </Text>
        </TouchableOpacity>

        <Text style={styles.debugWarning}>
          ⚠️ Estas opciones son solo para desarrollo.{'\n'}
          Los datos del servidor NO se afectarán.
        </Text>
      </View>
    );
  }

  // Pantalla de pruebas
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
  debugContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },
  debugTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  debugSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  debugButton: {
    backgroundColor: '#F44336',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  debugButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  debugButtonSubtext: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  debugWarning: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    lineHeight: 20,
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