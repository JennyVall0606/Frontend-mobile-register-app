import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSync } from '../hooks/useSync';

const SyncIndicator = () => {
  const { syncStatus, syncNow } = useSync();

  const handleSync = async () => {
    const result = await syncNow();
    if (result.success) {
      alert('✅ Sincronización completada');
    } else {
      alert('❌ Error en sincronización: ' + (result.message || result.error));
    }
  };

  return (
    <View style={styles.container}>
      {/* Indicador de conexión */}
      <View style={[
        styles.statusDot,
        { backgroundColor: syncStatus.isOnline ? '#28a745' : '#dc3545' }
      ]} />
      
      <Text style={styles.statusText}>
        {syncStatus.isOnline ? 'En línea' : 'Sin conexión'}
      </Text>

      {/* Operaciones pendientes */}
      {syncStatus.pendingOperations > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{syncStatus.pendingOperations}</Text>
        </View>
      )}

      {/* Botón de sincronización */}
      {syncStatus.isOnline && !syncStatus.isSyncing && (
        <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
          <Text style={styles.syncButtonText}>🔄 Sincronizar</Text>
        </TouchableOpacity>
      )}

      {/* Indicador de sincronización en progreso */}
      {syncStatus.isSyncing && (
        <View style={styles.syncingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.syncingText}>Sincronizando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  syncButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  syncButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  syncingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncingText: {
    fontSize: 12,
    color: '#007AFF',
    marginLeft: 6,
  },
});

export default SyncIndicator;