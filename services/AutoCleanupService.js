// services/AutoCleanupService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { AppState } from 'react-native';

/**
 * 🧹 AutoCleanupService
 * 
 * PROPÓSITO: Complementar la limpieza automática de SyncManager
 * 
 * ¿POR QUÉ ES NECESARIO?
 * - SyncManager.performSync() YA limpia registros fallidos cuando hay conexión
 * - PERO si el usuario está offline por días/semanas, los errores se acumulan
 * - Este servicio limpia SOLO cuando el usuario está offline por mucho tiempo
 * 
 * ESTRATEGIA:
 * 1. Verificar PRIMERO si hay conexión
 * 2. Si hay conexión → NO hacer nada (dejar que SyncManager lo maneje)
 * 3. Si NO hay conexión por >30 minutos → Limpiar registros obsoletos
 */
class AutoCleanupService {
  constructor() {
    this.cleanupInterval = null;
    this.checkIntervalMinutes = 120; // Verificar cada 30 minutos
    this.offlineThresholdMinutes = 120; // Limpiar si está offline por más de 30 min
    this.isRunning = false;
    this.lastCleanup = null;
    this.lastSyncCheck = null;
    this.appState = AppState.currentState;
  }

  /**
   * 🚀 INICIAR el servicio
   */
  start() {
    if (this.isRunning) {
      console.log('⚠️ AutoCleanupService ya está corriendo');
      return;
    }

    console.log(`🧹 AutoCleanupService INICIADO`);
    console.log(`   - Verificación cada: ${this.checkIntervalMinutes} minutos`);
    console.log(`   - Limpia si offline por: ${this.offlineThresholdMinutes} minutos`);
    this.isRunning = true;

    // Primera verificación después de 5 minutos (dar tiempo a SyncManager)
    setTimeout(() => {
      this.checkAndCleanIfNeeded();
    }, 5 * 60 * 1000);

    // Verificar periódicamente
    this.cleanupInterval = setInterval(() => {
      this.checkAndCleanIfNeeded();
    }, this.checkIntervalMinutes * 60 * 1000);

    // Escuchar cambios de estado de la app
    this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange.bind(this));

    console.log('✅ AutoCleanupService configurado');
  }

  /**
   * ⏸️ DETENER el servicio
   */
  stop() {
    if (!this.isRunning) return;

    console.log('⏸️ Deteniendo AutoCleanupService...');

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
      this.appStateSubscription = null;
    }

    this.isRunning = false;
    console.log('✅ AutoCleanupService detenido');
  }

  /**
   * 🔄 Manejar cambios de estado de la app
   */
  handleAppStateChange(nextAppState) {
    // Si la app vuelve a foreground después de estar en background
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('📱 App volvió a foreground, verificando necesidad de limpieza...');
      setTimeout(() => this.checkAndCleanIfNeeded(), 2000);
    }

    this.appState = nextAppState;
  }

  /**
   * 🔍 VERIFICAR si es necesario limpiar
   */
  async checkAndCleanIfNeeded() {
    try {
      // 1. Verificar conexión
      const networkState = await NetInfo.fetch();
      const isOnline = networkState.isConnected;

      console.log('\n╔════════════════════════════════════════╗');
      console.log('║  🔍 VERIFICACIÓN DE LIMPIEZA          ║');
      console.log('╚════════════════════════════════════════╝');
      console.log('⏰ Hora:', new Date().toLocaleTimeString());
      console.log('📶 Estado:', isOnline ? 'Online' : 'Offline');

      // 2. Si está ONLINE, SyncManager se encarga
      if (isOnline) {
        console.log('✅ Online - SyncManager manejará la limpieza');
        console.log('ℹ️ No es necesario limpiar manualmente\n');
        this.lastSyncCheck = new Date();
        return { cleaned: false, reason: 'Online - delegado a SyncManager' };
      }

      // 3. Si está OFFLINE, verificar cuánto tiempo
      const lastSync = await AsyncStorage.getItem('last_sync_time');
      const lastSyncDate = lastSync ? new Date(lastSync) : null;
      
      if (lastSyncDate) {
        const minutesOffline = (Date.now() - lastSyncDate.getTime()) / (1000 * 60);
        console.log(`⏱️ Tiempo sin sincronizar: ${minutesOffline.toFixed(0)} minutos`);

        // 4. Si lleva poco tiempo offline, esperar
        if (minutesOffline < this.offlineThresholdMinutes) {
          console.log(`✅ Aún no es necesario limpiar (umbral: ${this.offlineThresholdMinutes} min)\n`);
          return { cleaned: false, reason: 'Offline reciente' };
        }
      }

      // 5. ⚠️ Offline por mucho tiempo → LIMPIAR
      console.log('⚠️ Offline por mucho tiempo, iniciando limpieza...\n');
      return await this.performCleanup();

    } catch (error) {
      console.error('❌ Error verificando necesidad de limpieza:', error);
      return { cleaned: false, error: error.message };
    }
  }

  /**
   * 🧹 EJECUTAR LIMPIEZA (solo cuando es necesario)
   */
  async performCleanup() {
    try {
      const startTime = new Date();
      console.log('╔════════════════════════════════════════╗');
      console.log('║  🧹 LIMPIEZA AUTOMÁTICA (OFFLINE)     ║');
      console.log('╚════════════════════════════════════════╝');

      // 1. Obtener cola
      const queueData = await AsyncStorage.getItem('sync_queue');
      if (!queueData) {
        console.log('ℹ️ No hay cola para limpiar\n');
        return { cleaned: 0, message: 'Sin cola' };
      }

      const queue = JSON.parse(queueData);
      console.log(`📊 Total operaciones en cola: ${queue.length}`);

      // 2. Identificar errores permanentes (status='error' o attempts >= 5)
      const failedOps = queue.filter(op => 
        op.status === 'error' || op.attempts >= 5
      );

      if (failedOps.length === 0) {
        console.log('✅ No hay operaciones con error permanente\n');
        this.lastCleanup = new Date();
        return { cleaned: 0, message: 'Sin errores permanentes' };
      }

      console.log(`🔍 Encontradas ${failedOps.length} operaciones con error permanente:`);
      
      // Mostrar detalles
      failedOps.slice(0, 5).forEach((op, index) => {
        console.log(`\n  ${index + 1}. ID: ${op.recordId}`);
        console.log(`     Tabla: ${op.table}`);
        console.log(`     Intentos: ${op.attempts}`);
        console.log(`     Error: ${(op.error || 'Desconocido').substring(0, 50)}`);
      });

      if (failedOps.length > 5) {
        console.log(`\n  ... y ${failedOps.length - 5} más`);
      }

      // 3. Limpiar registros locales
      const localIdsToDelete = failedOps.map(op => op.recordId);
      let animalsDeleted = 0;

      const localData = await AsyncStorage.getItem('local_registro_animal');
      if (localData) {
        let animals = JSON.parse(localData);
        const beforeCount = animals.length;
        
        animals = animals.filter(animal => !localIdsToDelete.includes(animal.id));
        
        await AsyncStorage.setItem('local_registro_animal', JSON.stringify(animals));
        
        animalsDeleted = beforeCount - animals.length;
        console.log(`\n🗑️ Registros eliminados de local_registro_animal: ${animalsDeleted}`);
      }

      // 4. Limpiar cola
      const cleanQueue = queue.filter(op => 
        op.status !== 'error' && op.attempts < 5
      );

      await AsyncStorage.setItem('sync_queue', JSON.stringify(cleanQueue));

      const queueDeleted = queue.length - cleanQueue.length;
      console.log(`🗑️ Operaciones eliminadas de sync_queue: ${queueDeleted}`);

      // 5. Guardar log
      const endTime = new Date();
      const duration = (endTime - startTime) / 1000;
      this.lastCleanup = endTime;

      await this.saveCleanupLog({
        timestamp: endTime.toISOString(),
        animalsDeleted,
        queueDeleted,
        duration,
        reason: 'Offline prolongado',
        failedOps: failedOps.length
      });

      console.log(`\n╔════════════════════════════════════════╗`);
      console.log(`║  ✅ LIMPIEZA COMPLETADA               ║`);
      console.log(`╚════════════════════════════════════════╝`);
      console.log(`📊 Resumen:`);
      console.log(`   • Registros eliminados: ${animalsDeleted}`);
      console.log(`   • Operaciones eliminadas: ${queueDeleted}`);
      console.log(`   • Tiempo: ${duration.toFixed(2)}s\n`);

      return {
        success: true,
        animalsDeleted,
        queueDeleted,
        duration
      };

    } catch (error) {
      console.error('❌ Error en limpieza:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 💾 Guardar log
   */
  async saveCleanupLog(logEntry) {
    try {
      const logsData = await AsyncStorage.getItem('cleanup_logs');
      let logs = logsData ? JSON.parse(logsData) : [];

      logs.push(logEntry);

      // Mantener últimos 50 logs
      if (logs.length > 50) {
        logs = logs.slice(-50);
      }

      await AsyncStorage.setItem('cleanup_logs', JSON.stringify(logs));
    } catch (error) {
      console.error('❌ Error guardando log:', error);
    }
  }

  /**
   * 📊 Obtener estadísticas
   */
  async getStats() {
    const logsData = await AsyncStorage.getItem('cleanup_logs');
    const history = logsData ? JSON.parse(logsData) : [];
    
    const totalCleanups = history.length;
    const totalAnimalsDeleted = history.reduce((sum, log) => sum + (log.animalsDeleted || 0), 0);
    const totalQueueDeleted = history.reduce((sum, log) => sum + (log.queueDeleted || 0), 0);

    return {
      isRunning: this.isRunning,
      lastCleanup: this.lastCleanup,
      checkIntervalMinutes: this.checkIntervalMinutes,
      offlineThresholdMinutes: this.offlineThresholdMinutes,
      totalCleanups,
      totalAnimalsDeleted,
      totalQueueDeleted,
      recentHistory: history.slice(-10)
    };
  }

  /**
   * 🔧 Configurar umbrales
   */
  configure(options = {}) {
    if (options.checkIntervalMinutes) {
      this.checkIntervalMinutes = Math.max(1, options.checkIntervalMinutes);
    }
    if (options.offlineThresholdMinutes) {
      this.offlineThresholdMinutes = Math.max(1, options.offlineThresholdMinutes);
    }

    console.log('✅ Configuración actualizada:');
    console.log(`   - Verificación: ${this.checkIntervalMinutes} min`);
    console.log(`   - Umbral offline: ${this.offlineThresholdMinutes} min`);

    // Reiniciar con nueva configuración
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  /**
   * 🔧 Forzar limpieza manual
   */
  async forceCleanup() {
    console.log('🔧 Limpieza manual forzada (sin verificar conexión)');
    return await this.performCleanup();
  }
}

export default new AutoCleanupService();