import AsyncStorage from '@react-native-async-storage/async-storage';

class SyncQueue {
  constructor() {
    this.QUEUE_KEY = 'sync_queue';
    this.queue = [];
  }

  /**
   * Inicializar - Cargar cola desde AsyncStorage
   */
  async initialize() {
    try {
      const savedQueue = await AsyncStorage.getItem(this.QUEUE_KEY);
      if (savedQueue) {
        this.queue = JSON.parse(savedQueue);
        console.log(`✅ Cola cargada: ${this.queue.length} operaciones pendientes`);
      } else {
        this.queue = [];
      }
      return this.queue;
    } catch (error) {
      console.error('❌ Error cargando cola:', error);
      this.queue = [];
      return [];
    }
  }

  /**
   * Agregar operación a la cola
   */
  async add(operation) {
    try {
      const queueItem = {
        id: Date.now() + Math.random(), // ID único
        table: operation.table,
        recordId: operation.recordId,
        action: operation.action, // 'INSERT', 'UPDATE', 'DELETE'
        data: operation.data,
        timestamp: new Date().toISOString(),
        attempts: 0,
        status: 'pending', // 'pending', 'syncing', 'success', 'failed'
        error: null
      };

      this.queue.push(queueItem);
      await this.save();
      
      console.log(`✅ Operación agregada a cola: ${operation.action} en ${operation.table}`);
      return queueItem;
    } catch (error) {
      console.error('❌ Error agregando a cola:', error);
      throw error;
    }
  }

  /**
   * Obtener todas las operaciones pendientes
   * ✅ CORREGIDO: Incluye operaciones 'pending' y 'failed'
   */
  async getPending() {
    await this.initialize(); // ← Cargar la cola desde AsyncStorage
    return this.queue.filter(op => 
      op.status === 'pending' || op.status === 'failed'
    );
  }

  /**
   * Obtener operaciones por tabla
   * ✅ MEJORADO: También incluye operaciones fallidas
   */
  async getByTable(tableName) {
    await this.initialize();
    return this.queue.filter(item => 
      item.table === tableName && 
      (item.status === 'pending' || item.status === 'failed')
    );
  }

  /**
   * Marcar operación como sincronizada
   */
  async markAsSynced(queueItemId) {
    try {
      const index = this.queue.findIndex(item => item.id === queueItemId);
      if (index !== -1) {
        this.queue[index].status = 'success';
        this.queue[index].syncedAt = new Date().toISOString();
        await this.save();
        console.log(`✅ Operación ${queueItemId} marcada como sincronizada`);
      }
    } catch (error) {
      console.error('❌ Error marcando como sincronizada:', error);
    }
  }

  /**
   * Marcar operación como fallida
   */
  async markAsFailed(queueItemId, errorMessage) {
    try {
      const index = this.queue.findIndex(item => item.id === queueItemId);
      if (index !== -1) {
        this.queue[index].status = 'failed';
        this.queue[index].error = errorMessage;
        this.queue[index].attempts += 1;
        this.queue[index].lastAttempt = new Date().toISOString(); // ← Nuevo
        
        // Si ha fallado más de 5 veces, marcar como error permanente
        if (this.queue[index].attempts >= 5) {
          this.queue[index].status = 'error';
          console.log(`❌ Operación ${queueItemId} falló permanentemente después de ${this.queue[index].attempts} intentos`);
        } else {
          console.log(`⚠️ Operación ${queueItemId} marcada como fallida (intento ${this.queue[index].attempts}/5)`);
        }
        
        await this.save();
      }
    } catch (error) {
      console.error('❌ Error marcando como fallida:', error);
    }
  }

  /**
   * Limpiar operaciones sincronizadas exitosamente
   */
  async cleanSynced() {
    try {
      const beforeCount = this.queue.length;
      this.queue = this.queue.filter(item => item.status !== 'success');
      await this.save();
      
      const cleaned = beforeCount - this.queue.length;
      if (cleaned > 0) {
        console.log(`🧹 Limpiadas ${cleaned} operaciones sincronizadas`);
      }
      return cleaned;
    } catch (error) {
      console.error('❌ Error limpiando cola:', error);
    }
  }

  /**
   * Reintentar operaciones fallidas (resetear a 'pending')
   * ✅ NUEVO: Permite reintentar operaciones fallidas manualmente
   */
  async retryFailed() {
    try {
      const failedOps = this.queue.filter(item => item.status === 'failed');
      
      if (failedOps.length === 0) {
        console.log('ℹ️ No hay operaciones fallidas para reintentar');
        return 0;
      }

      let retried = 0;
      for (const op of failedOps) {
        const index = this.queue.findIndex(item => item.id === op.id);
        if (index !== -1) {
          this.queue[index].status = 'pending';
          this.queue[index].error = null;
          retried++;
        }
      }

      await this.save();
      console.log(`🔄 ${retried} operaciones fallidas listas para reintentar`);
      return retried;
    } catch (error) {
      console.error('❌ Error reintentando operaciones:', error);
      return 0;
    }
  }

  /**
   * Obtener estadísticas de la cola
   */
  async getStats() {
    await this.initialize();
    
    const stats = {
      total: this.queue.length,
      pending: this.queue.filter(item => item.status === 'pending').length,
      syncing: this.queue.filter(item => item.status === 'syncing').length,
      success: this.queue.filter(item => item.status === 'success').length,
      failed: this.queue.filter(item => item.status === 'failed').length,
      error: this.queue.filter(item => item.status === 'error').length,
    };

    console.log('📊 Cola de sincronización:', stats);
    return stats;
  }

  /**
   * Obtener detalles de operaciones fallidas
   * ✅ NUEVO: Para debugging
   */
  async getFailedDetails() {
    await this.initialize();
    return this.queue.filter(item => item.status === 'failed' || item.status === 'error');
  }

  /**
   * Guardar cola en AsyncStorage
   */
  async save() {
    try {
      await AsyncStorage.setItem(this.QUEUE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error('❌ Error guardando cola:', error);
    }
  }

  /**
   * Limpiar toda la cola (usar con cuidado)
   */
  async clear() {
    try {
      this.queue = [];
      await AsyncStorage.removeItem(this.QUEUE_KEY);
      console.log('✅ Cola limpiada completamente');
    } catch (error) {
      console.error('❌ Error limpiando cola:', error);
    }
  }
}

export default new SyncQueue();