import * as SQLite from 'expo-sqlite';

// Abre o crea la base de datos (se guardará localmente en el dispositivo)
const db = SQLite.openDatabase('app.db');

// Función para crear la tabla de usuarios
export const crearTabla = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        correo TEXT,
        rol TEXT
      );`,
      [],
      () => console.log('Tabla de usuarios creada o ya existe'),
      (error) => console.log('Error al crear la tabla de usuarios', error)
    );
  });
};

// Función para insertar un nuevo usuario
export const insertarUsuario = (correo, rol) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO usuarios (correo, rol) VALUES (?, ?);',
      [correo, rol],
      () => console.log('Usuario insertado con éxito'),
      (error) => console.log('Error al insertar usuario', error)
    );
  });
};

// Función para obtener todos los usuarios
export const obtenerUsuarios = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM usuarios;',
        [],
        (tx, results) => {
          let usuarios = [];
          for (let i = 0; i < results.rows.length; i++) {
            usuarios.push(results.rows.item(i));
          }
          resolve(usuarios); // Devuelve los usuarios
        },
        (error) => {
          console.log('Error al obtener usuarios', error);
          reject(error);
        }
      );
    });
  });
};

// Función para eliminar un usuario
export const eliminarUsuario = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM usuarios WHERE id = ?;',
      [id],
      () => console.log('Usuario eliminado con éxito'),
      (error) => console.log('Error al eliminar usuario', error)
    );
  });
};
