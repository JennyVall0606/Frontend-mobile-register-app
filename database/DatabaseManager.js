import * as SQLite from 'expo-sqlite';

class DatabaseManager {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.DB_NAME = 'livestock.db';
  }

  async initialize() {
    if (this.isInitialized) {
      return this.db;
    }

    try {
      console.log('🔄 Abriendo base de datos SQLite con Expo...');
      console.log('📋 SQLite object:', SQLite);
      
      // Intentar diferentes métodos según la versión
      if (SQLite.openDatabaseSync) {
        // Expo SDK 49+
        this.db = SQLite.openDatabaseSync(this.DB_NAME);
        console.log('✅ Usando openDatabaseSync');
      } else if (SQLite.openDatabase) {
        // Expo SDK 47-48
        this.db = SQLite.openDatabase(this.DB_NAME);
        console.log('✅ Usando openDatabase');
      } else {
        throw new Error('No se encontró método para abrir base de datos');
      }

      console.log('✅ Base de datos abierta:', this.DB_NAME);
      
      // Crear tabla de prueba
      await this.createTestTable();
      
      this.isInitialized = true;
      return this.db;

    } catch (error) {
      console.error('❌ Error abriendo base de datos:', error);
      throw error;
    }
  }

  async createTestTable() {
    return new Promise((resolve, reject) => {
      if (this.db.execSync) {
        // Método síncrono para versiones nuevas
        try {
          this.db.execSync(`
            CREATE TABLE IF NOT EXISTS test_table (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);
          console.log('✅ Tabla de prueba creada (sync)');
          resolve();
        } catch (error) {
          console.error('❌ Error creando tabla (sync):', error);
          reject(error);
        }
      } else {
        // Método con transacciones para versiones anteriores
        this.db.transaction(
          (tx) => {
            tx.executeSql(
              `CREATE TABLE IF NOT EXISTS test_table (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              )`,
              [],
              (_, result) => {
                console.log('✅ Tabla de prueba creada (async)');
                resolve(result);
              },
              (_, error) => {
                console.error('❌ Error creando tabla (async):', error);
                reject(error);
              }
            );
          },
          (error) => {
            console.error('❌ Error en transacción:', error);
            reject(error);
          }
        );
      }
    });
  }
  

  async executeSql(query, params = []) {
    if (this.db.execSync) {
      // Versión síncrona
      try {
        const result = this.db.execSync(query, params);
        return [result];
      } catch (error) {
        throw error;
      }
    } else {
      // Versión asíncrona
      return new Promise((resolve, reject) => {
        this.db.transaction(
          (tx) => {
            tx.executeSql(
              query,
              params,
              (_, result) => {
                resolve([result]);
              },
              (_, error) => {
                reject(error);
              }
            );
          },
          (error) => reject(error)
        );
      });
    }
  }

  async getDatabase() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.db;
  }

  async close() {
    if (this.db && this.db.closeSync) {
      this.db.closeSync();
    }
    this.db = null;
    this.isInitialized = false;
    console.log('✅ Base de datos cerrada');
  }
}

export default new DatabaseManager();