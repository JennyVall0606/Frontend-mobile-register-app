import DatabaseManager from '../DatabaseManager';

export class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getDb() {
    return await DatabaseManager.getDatabase();
  }

  async create(data) {
    try {
      const db = await this.getDb();
      const columns = Object.keys(data);
      const placeholders = columns.map(() => '?').join(', ');
      const values = Object.values(data);

      const query = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
      const [result] = await db.executeSql(query, values);
      
      console.log(`✅ Registro creado en ${this.tableName}:`, result.insertId);
      return result.insertId;
    } catch (error) {
      console.error(`❌ Error creando registro en ${this.tableName}:`, error);
      throw error;
    }
  }

  async findAll() {
    try {
      const db = await this.getDb();
      const [result] = await db.executeSql(`SELECT * FROM ${this.tableName} ORDER BY id DESC`);
      
      const rows = [];
      for (let i = 0; i < result.rows.length; i++) {
        rows.push(result.rows.item(i));
      }
      
      return rows;
    } catch (error) {
      console.error(`❌ Error obteniendo registros de ${this.tableName}:`, error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const db = await this.getDb();
      const [result] = await db.executeSql(
        `SELECT * FROM ${this.tableName} WHERE id = ?`, 
        [id]
      );

      if (result.rows.length > 0) {
        return result.rows.item(0);
      }
      return null;
    } catch (error) {
      console.error(`❌ Error buscando por ID en ${this.tableName}:`, error);
      throw error;
    }
  }
}