export const Migration001 = {
  version: 1,
  name: 'create_initial_tables',
  
  async up(db) {
    // Tabla usuarios
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        correo TEXT NOT NULL UNIQUE,
        contraseña TEXT NOT NULL,
        rol TEXT DEFAULT NULL,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        synced INTEGER DEFAULT 0,
        last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla registro_animal
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS registro_animal (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        foto TEXT NOT NULL,
        chip_animal TEXT NOT NULL UNIQUE,
        fecha_nacimiento DATE NOT NULL,
        peso_nacimiento DECIMAL(10,2) NOT NULL,
        id_madre TEXT DEFAULT NULL,
        id_padre TEXT DEFAULT NULL,
        enfermedades TEXT DEFAULT NULL,
        observaciones TEXT DEFAULT NULL,
        estado INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        raza_id_raza INTEGER NOT NULL,
        id_usuario INTEGER NOT NULL,
        procedencia TEXT DEFAULT NULL,
        hierro TEXT DEFAULT NULL,
        categoria TEXT DEFAULT NULL,
        ubicacion TEXT DEFAULT NULL,
        numero_parto TEXT DEFAULT NULL,
        precocidad TEXT DEFAULT NULL,
        tipo_monta TEXT DEFAULT NULL,
        synced INTEGER DEFAULT 0,
        last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla historico_pesaje
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS historico_pesaje (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        registro_animal_id INTEGER NOT NULL,
        chip_animal TEXT DEFAULT NULL,
        fecha_pesaje DATE NOT NULL,
        peso_kg DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        costo_compra DECIMAL(10,2) DEFAULT NULL,
        costo_venta DECIMAL(10,2) DEFAULT NULL,
        precio_kg_compra DECIMAL(10,2) DEFAULT NULL,
        precio_kg_venta DECIMAL(10,2) DEFAULT NULL,
        synced INTEGER DEFAULT 0,
        last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla sync_queue
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_name TEXT NOT NULL,
        record_id INTEGER NOT NULL,
        operation TEXT NOT NULL,
        data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        attempts INTEGER DEFAULT 0,
        synced INTEGER DEFAULT 0
      )
    `);

    console.log('✅ Tablas creadas exitosamente');
  }
};