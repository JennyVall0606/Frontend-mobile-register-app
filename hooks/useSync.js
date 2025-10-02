import { useState, useEffect } from 'react';
import SyncManager from '../services/SyncManager';
import SyncQueue from '../services/SyncQueue';

export const useSync = () => {
  const [syncStatus, setSyncStatus] = useState({
    isOnline: false,
    isSyncing: false,
    lastSyncTime: null,
    pendingOperations: 0,
    queueStats: {}
  });

  const [syncResult, setSyncResult] = useState(null);

  useEffect(() => {
    loadStatus();
    
    // Actualizar estado cada 5 segundos
    const interval = setInterval(loadStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadStatus = async () => {
    try {
      const status = await SyncManager.getStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Error cargando estado de sync:', error);
    }
  };

  const syncNow = async () => {
    try {
      setSyncResult(null);
      const result = await SyncManager.syncNow();
      setSyncResult(result);
      await loadStatus();
      return result;
    } catch (error) {
      console.error('Error en sincronización manual:', error);
      return { success: false, error: error.message };
    }
  };

  const clearQueue = async () => {
    try {
      await SyncQueue.clear();
      await loadStatus();
    } catch (error) {
      console.error('Error limpiando cola:', error);
    }
  };

  return {
    syncStatus,
    syncResult,
    syncNow,
    clearQueue,
    refreshStatus: loadStatus
  };
};