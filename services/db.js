import React, { useEffect } from "react";
import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";

// Abre o crea la base de datos (se guardará localmente en el dispositivo)
const db = SQLite.openDatabase("app.db"); // Nombre de la base de datos

// Contenido del archivo SQL (todo el contenido de tu backup.sql)
const sqlContent = `
  PRAGMA journal_mode = MEMORY;
  PRAGMA synchronous = OFF;
  PRAGMA foreign_keys = OFF;
  PRAGMA ignore_check_constraints = OFF;
  PRAGMA auto_vacuum = NONE;
  PRAGMA secure_delete = OFF;
  BEGIN TRANSACTION;

  -- Sentencias de creación de tablas e inserción de datos
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    correo TEXT NOT NULL,
    rol TEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS registro_animal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chip_animal TEXT,
    fecha_nacimiento DATE,
    peso_nacimiento DECIMAL(10,2),
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
  );

  CREATE TABLE IF NOT EXISTS device_sessions (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    device_id TEXT NOT NULL,
    refresh_token TEXT,
    last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS historico_pesaje (
    id INTEGER PRIMARY KEY,
    registro_animal_id INTEGER NOT NULL,
    chip_animal TEXT,
    fecha_pesaje DATE NOT NULL,
    peso_kg DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    costo_compra DECIMAL(10,2),
    costo_venta DECIMAL(10,2),
    precio_kg_compra DECIMAL(10,2),
    precio_kg_venta DECIMAL(10,2)
  );

  CREATE TABLE IF NOT EXISTS historico_vacuna (
    id INTEGER PRIMARY KEY,
    fecha_vacuna DATE DEFAULT NULL,
    tipo_vacunas_id_tipo_vacuna TEXT DEFAULT NULL,
    registro_animal_id INTEGER DEFAULT NULL,
    nombre_vacunas_id_vacuna TEXT DEFAULT NULL,
    dosis_administrada TEXT DEFAULT NULL,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registro_animal_id) REFERENCES registro_animal(id)
  );

  CREATE TABLE IF NOT EXISTS nombre_vacunas (
    id_vacuna INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    observaciones TEXT DEFAULT NULL
  );

  CREATE TABLE IF NOT EXISTS raza (
    id_raza INTEGER PRIMARY KEY,
    nombre_raza TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tipo_vacunas (
    id_tipo_vacuna INTEGER PRIMARY KEY,
    tipo TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Insertar valores en las tablas
  INSERT INTO usuarios (correo, rol) VALUES ('jenny@correo.com', 'admin');
  INSERT INTO usuarios (correo, rol) VALUES ('alexandra@correo.com', 'user');
  INSERT INTO usuarios (correo, rol) VALUES ('pepito@correo.com', 'user');
  
  INSERT INTO registro_animal (chip_animal, fecha_nacimiento, peso_nacimiento, id_usuario) 
  VALUES ('Vaca1', '2025-08-04', 30.00, 1);

  INSERT INTO device_sessions (user_id, device_id, refresh_token) 
  VALUES (1, 'device_001', 'refresh_token_example');
  
  INSERT INTO historico_pesaje (registro_animal_id, chip_animal, fecha_pesaje, peso_kg) 
  VALUES (1, 'Vaca1', '2025-08-04', 30.00);

  INSERT INTO nombre_vacunas (nombre, observaciones) 
  VALUES ('Aftosa', 'Prevención del ántrax en bovinos');

  INSERT INTO raza (nombre_raza) 
  VALUES ('Brahman');
  
  INSERT INTO tipo_vacunas (tipo) 
  VALUES ('preventiva');

  COMMIT;

  -- Habilitar las restricciones de claves foráneas
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = NORMAL;
`;

// Función para importar el SQL y crear la base de datos en SQLite
const importarSQL = () => {
  db.transaction((tx) => {
    tx.executeSql(
      sqlContent, // El contenido SQL de tu archivo
      [],
      () => {
        console.log("Base de datos creada e importada correctamente.");
        Alert.alert("Base de datos", "La base de datos se ha creado correctamente.");
      },
      (error) => {
        console.log("Error al crear la base de datos:", error);
        Alert.alert("Error", "Hubo un problema al crear la base de datos.");
      }
    );
  });
};

// Llamar a la función importarSQL en el hook useEffect
useEffect(() => {
  importarSQL(); // Llamar la función para importar el SQL al iniciar la app
}, []);

export default function App() {
  return null; // Aquí puedes retornar tu componente principal si es necesario
}
