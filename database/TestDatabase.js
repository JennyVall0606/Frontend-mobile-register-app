import DatabaseManager from './DatabaseManager';
import { BaseModel } from './models/BaseModel';

// Crear una instancia de prueba
const TestModel = new BaseModel('usuarios');

export const testDatabase = async () => {
  try {
    console.log('🧪 Iniciando prueba de base de datos...');
    
    // Inicializar base de datos
    await DatabaseManager.initialize();
    console.log('✅ Base de datos inicializada');

    // Crear un usuario de prueba
    const testUser = {
      correo: 'test@example.com',
      contraseña: 'hashedpassword123',
      rol: 'user'
    };

    const userId = await TestModel.create(testUser);
    console.log('✅ Usuario de prueba creado:', userId);

    // Obtener el usuario
    const user = await TestModel.findById(userId);
    console.log('✅ Usuario encontrado:', user);

    // Obtener todos los usuarios
    const allUsers = await TestModel.findAll();
    console.log('✅ Total de usuarios:', allUsers.length);

    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
    return true;
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error);
    return false;
  }
};