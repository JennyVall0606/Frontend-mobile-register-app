import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SyncQueue from './SyncQueue';
import AuthManager from './AuthManager';

class SyncManager {
  constructor() {
    this.API_BASE_URL = 'https://webmobileregister-production.up.railway.app'; 
    this.isSyncing = false;
    this.lastSyncTime = null;
    this.syncInterval = null;
    this.isOnline = false;
  }

  /**
   * Inicializar sistema de sincronización
   */
  async initialize() {
    try {
      console.log('🔄 Inicializando SyncManager...');
      
      // Limpiar operaciones fallidas al inicio
    //  await this.clearFailedOperations();
      
      // Cargar cola de sincronización
      await SyncQueue.initialize();
      
      // Obtener último tiempo de sincronización
      const lastSync = await AsyncStorage.getItem('last_sync_time');
      this.lastSyncTime = lastSync ? new Date(lastSync) : null;
      
      // Configurar listener de red
      this.setupNetworkListener();
      
      // Verificar estado inicial de red
      const networkState = await NetInfo.fetch();
      this.isOnline = networkState.isConnected;
      
      console.log('✅ SyncManager inicializado');
      console.log('📶 Estado de red:', this.isOnline ? 'Online' : 'Offline');
      console.log('⏰ Última sincronización:', this.lastSyncTime || 'Nunca');
      
      // Si hay conexión, sincronizar
      if (this.isOnline) {
        setTimeout(() => this.performSync(), 2000);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error inicializando SyncManager:', error);
      return false;
    }
  }

  /**
   * Limpiar operaciones fallidas
   */
 /**
 * Limpiar SOLO operaciones fallidas, mantener pendientes
 */
async clearFailedOperations() {
  try {
    console.log('🧹 Limpiando solo operaciones fallidas...');
    
    // Obtener cola actual
    const queueData = await AsyncStorage.getItem('sync_queue');
    if (!queueData) {
      console.log('✅ No hay cola para limpiar');
      return true;
    }
    
    const queue = JSON.parse(queueData);
    
    // Filtrar solo las NO fallidas (mantener pending, syncing, etc.)
    const cleanQueue = queue.filter(op => op.status !== 'failed' && op.status !== 'error');
    
    console.log(`🗑️ Eliminando ${queue.length - cleanQueue.length} operaciones fallidas`);
    console.log(`✅ Manteniendo ${cleanQueue.length} operaciones válidas`);
    
    // Guardar cola limpia
    await AsyncStorage.setItem('sync_queue', JSON.stringify(cleanQueue));
    
    console.log('✅ Operaciones fallidas limpiadas correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error limpiando operaciones:', error);
    return false;
  }
}

  /**
   * Configurar listener de cambios de red
   */
  setupNetworkListener() {
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected;
      
      console.log('📶 Estado de red cambió:', this.isOnline ? 'Online' : 'Offline');
      
      // Si recuperó conexión, sincronizar
      if (wasOffline && this.isOnline) {
        console.log('🔄 Conexión recuperada, iniciando sincronización...');
        setTimeout(() => this.performSync(), 1000);
      }
    });
  }

  /**
   * Sincronización completa (Pull + Push)
   */
  async performSync() {
    if (this.isSyncing) {
      console.log('⏳ Sincronización en progreso, esperando...');
      return { success: false, message: 'Sincronización en progreso' };
    }

    if (!this.isOnline) {
      console.log('📵 Sin conexión, no se puede sincronizar');
      return { success: false, message: 'Sin conexión' };
    }

    try {
      this.isSyncing = true;
      console.log('🔄 === INICIANDO SINCRONIZACIÓN COMPLETA ===');
      
      const results = {
        pull: null,
        push: null,
        startTime: new Date(),
        endTime: null,
        success: false
      };

      // 1. PULL: Traer cambios del servidor
      console.log('\n📥 1. Trayendo cambios del servidor...');
      results.pull = await this.pullFromServer();
      
      // 2. PUSH: Enviar cambios locales al servidor
      console.log('\n📤 2. Enviando cambios al servidor...');
      results.push = await this.pushToServer();
      
      // 3. Limpiar operaciones sincronizadas
      await SyncQueue.cleanSynced();
      
      // 4. Actualizar tiempo de última sincronización
      this.lastSyncTime = new Date();
      await AsyncStorage.setItem('last_sync_time', this.lastSyncTime.toISOString());
      
      results.endTime = new Date();
      results.success = results.pull.success && results.push.success;
      
      const duration = (results.endTime - results.startTime) / 1000;
      console.log(`\n✅ === SINCRONIZACIÓN COMPLETADA EN ${duration.toFixed(2)}s ===`);
      
      return results;
      
    } catch (error) {
      console.error('❌ Error en sincronización:', error);
      return { success: false, error: error.message };
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * PULL: Traer datos del servidor
   */
  async pullFromServer() {
    try {
      const token = AuthManager.getAuthToken();
      if (!token) {
        return { success: false, message: 'No hay token de autenticación' };
      }

      console.log('🔑 Token disponible:', token ? 'Sí' : 'No');
      console.log('🔑 Token preview:', token?.substring(0, 20) + '...');

      const tables = ['registro_animal', 'historico_pesaje', 'historico_vacuna'];
      const results = { success: true, tables: {}, total: 0 };
      
      for (const table of tables) {
        try {
          // ✅ CORRECCIÓN: Usar /api/sync/
          let url = `${this.API_BASE_URL}/api/sync/${table}`;
          if (this.lastSyncTime) {
            url += `?since=${this.lastSyncTime.toISOString()}`;
          }
          
          console.log(`📥 Trayendo datos de ${table}...`);
          console.log(`🔗 URL: ${url}`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            timeout: 30000
          });

          if (response.ok) {
            const data = await response.json();
            const records = data.records || data.data || [];
            
            console.log(`✅ Recibidos ${records.length} registros de ${table}`);
            
            // Guardar en AsyncStorage local
            await this.saveRecordsLocally(table, records);
            
            results.tables[table] = records.length;
            results.total += records.length;
          } else {
            const errorText = await response.text();
            console.log(`⚠️ Error HTTP ${response.status} en ${table}: ${errorText}`);
            results.success = false;
          }
          
        } catch (error) {
          console.error(`❌ Error en pull de ${table}:`, error.message);
          results.success = false;
        }
      }
      
      console.log(`✅ Pull completado: ${results.total} registros`);
      return results;
      
    } catch (error) {
      console.error('❌ Error en pullFromServer:', error);
      return { success: false, error: error.message };
    }
  }

/**
 * PUSH: Enviar cambios locales al servidor
 */
async pushToServer() {
  try {
    // 🆕 Obtener token inicial
    let token = AuthManager.getAuthToken();
    
    if (!token) {
      console.log('❌ No hay token de autenticación');
      return { success: false, message: 'No hay token de autenticación' };
    }

    // 🆕 Verificar si el token es válido haciendo una petición de prueba
    try {
      console.log('🔍 Verificando validez del token...');
      
      const testResponse = await fetch(`${this.API_BASE_URL}/api/sync/registro_animal?since=2025-01-01`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 5000
      });

      // Si obtenemos 401, el token está inválido
      if (testResponse.status === 401) {
        console.log('⚠️ Token inválido detectado, intentando refrescar...');
        
        // Intentar refrescar el token
        const refreshed = await AuthManager.refreshToken();
        
        if (!refreshed) {
          console.log('❌ No se pudo refrescar el token');
          return { 
            success: false, 
            message: 'Token expirado. Por favor inicia sesión nuevamente.' 
          };
        }
        
        // Obtener el nuevo token
        token = AuthManager.getAuthToken();
        console.log('✅ Token refrescado exitosamente');
      } else {
        console.log('✅ Token válido');
      }
    } catch (verifyError) {
      console.log('⚠️ Error verificando token (continuando de todas formas):', verifyError.message);
    }

    const pendingOps = await SyncQueue.getPending();
    
    console.log('=== PUSH TO SERVER ===');
    console.log('Token disponible:', token ? 'Sí' : 'No');
    console.log('Operaciones pendientes:', pendingOps.length);
    
    if (pendingOps.length === 0) {
      console.log('✅ No hay operaciones pendientes para enviar');
      return { success: true, pushed: 0 };
    }

    // Mostrar detalles de cada operación (solo primeras 5 para no saturar logs)
    const opsToShow = Math.min(5, pendingOps.length);
    for (let i = 0; i < opsToShow; i++) {
      const op = pendingOps[i];
      console.log(`\nOperación ${i + 1}:`);
      console.log('  Tabla:', op.table);
      console.log('  Acción:', op.action);
      console.log('  ID Local:', op.recordId);
      
      // Mostrar tamaño de la foto si existe
      if (op.data?.foto) {
        const fotoSize = op.data.foto.length;
        console.log(`  📸 Tamaño foto: ${(fotoSize / 1024).toFixed(2)} KB`);
      }
    }
    
    if (pendingOps.length > 5) {
      console.log(`\n... y ${pendingOps.length - 5} operaciones más`);
    }

    const results = {
      success: true,
      pushed: 0,
      failed: 0,
      operations: []
    };

    for (const op of pendingOps) {
      try {
        console.log(`\n📤 Procesando: ${op.action} en ${op.table}`);
        
        const result = await this.pushOperation(op, token);
        
        if (result.success) {
          await SyncQueue.markAsSynced(op.id);
          results.pushed++;
          console.log('  ✅ Marcado como sincronizado');
        } else {
          await SyncQueue.markAsFailed(op.id, result.error);
          results.failed++;
          console.log('  ❌ Marcado como fallido:', result.error);
        }
        
      } catch (error) {
        console.error('  ❌ Error procesando operación:', error);
        await SyncQueue.markAsFailed(op.id, error.message);
        results.failed++;
      }
    }
    
    console.log('\n=== RESUMEN PUSH ===');
    console.log('Enviados:', results.pushed);
    console.log('Fallidos:', results.failed);
    
    return results;
    
  } catch (error) {
    console.error('❌ Error en pushToServer:', error);
    return { success: false, error: error.message };
  }
}

async pushOperation(operation, token) {
  try {
    // ✅ Usar token guardado en la operación si existe, sino usar el token actual
    const authToken = operation.token || token || AuthManager.getAuthToken();
    
    if (!authToken) {
      console.error('❌ No hay token disponible para sincronizar');
      return { 
        success: false, 
        error: 'No hay token de autenticación válido' 
      };
    }

    console.log('🔑 Token para sync:', authToken.substring(0, 20) + '...');

    const url = `${this.API_BASE_URL}/api/sync/batch`;
    
    console.log(`📤 Enviando ${operation.action} para ${operation.table}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operations: [operation]
      }),
      timeout: 15000
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Operación sincronizada');
      
      if (data.success && data.results && data.results.length > 0) {
        const result = data.results[0];
        
        if (result.success) {
          return { success: true, data: result };
        } else {
          return { success: false, error: result.error };
        }
      }
      
      return { success: true, data };
    } else {
      const errorText = await response.text();
      console.error('❌ Error HTTP:', response.status, errorText);
      
      // Si es error 401, marcar token como inválido
      if (response.status === 401) {
        console.log('⚠️ Token inválido durante sincronización');
        return { 
          success: false, 
          error: 'Token expirado - requiere login' 
        };
      }
      
      try {
        const errorData = JSON.parse(errorText);
        return { 
          success: false, 
          error: errorData.message || errorData.error || `HTTP ${response.status}` 
        };
      } catch {
        return { 
          success: false, 
          error: `HTTP ${response.status}: ${errorText}` 
        };
      }
    }
    
  } catch (error) {
    console.error('❌ Error en pushOperation:', error);
    return { success: false, error: error.message };
  }
}

  async fullSync() {
  const originalTime = this.lastSyncTime;
  this.lastSyncTime = null; // Temporalmente sin filtro
  
  const result = await this.performSync();
  
  this.lastSyncTime = originalTime; // Restaurar
  return result;
}
  /**
   * Guardar registros del servidor en AsyncStorage local
   */
  async saveRecordsLocally(table, records) {
    try {
      // Obtener registros existentes
      const existingData = await AsyncStorage.getItem(`local_${table}`);
      let localRecords = existingData ? JSON.parse(existingData) : [];
      
      // Mergear con nuevos registros (evitar duplicados por ID)
      for (const newRecord of records) {
        const index = localRecords.findIndex(r => r.id === newRecord.id);
        
        if (index !== -1) {
          // Actualizar si el del servidor es más reciente
          const localDate = new Date(localRecords[index].updated_at || 0);
          const serverDate = new Date(newRecord.updated_at || 0);
          
          if (serverDate > localDate) {
            localRecords[index] = newRecord;
            console.log(`  🔄 Actualizado registro ${newRecord.id}`);
          }
        } else {
          // Agregar nuevo registro
          localRecords.push(newRecord);
          console.log(`  ➕ Agregado registro ${newRecord.id}`);
        }
      }
      
      // Guardar de vuelta
      await AsyncStorage.setItem(`local_${table}`, JSON.stringify(localRecords));
      
    } catch (error) {
      console.error(`❌ Error guardando ${table} localmente:`, error);
    }
  }

  /**
   * Sincronización manual (para botón de UI)
   */
  async syncNow() {
    console.log('🔄 Sincronización manual solicitada');
    return await this.performSync();
  }

  /**
   * Obtener estado de sincronización
   */
  async getStatus() {
    const queueStats = await SyncQueue.getStats();
    
    return {
      isOnline: this.isOnline,
      isSyncing: this.isSyncing,
      lastSyncTime: this.lastSyncTime,
      pendingOperations: queueStats.pending,
      queueStats: queueStats
    };
  }

  /**
   * Detener sincronización automática
   */
  stop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    console.log('⏸️ Sincronización automática detenida');
  }
}

export default new SyncManager();