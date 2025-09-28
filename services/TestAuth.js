
import AuthManager from './AuthManager';

export const testAuth = async () => {
  try {
    console.log('🧪 === INICIANDO PRUEBAS DE AUTENTICACIÓN ===');
    
    // 1. Probar conexiones básicas
    console.log('\n1️⃣ Probando conexiones...');
    const connectionTest = await AuthManager.testConnection();
    console.log('Resultado conexiones:', connectionTest ? '✅' : '❌');
    
    // 2. Probar login
    console.log('\n2️⃣ Probando login...');
    const loginResult = await AuthManager.simpleLogin('test@test.com', '123456');
    console.log('Resultado login:', loginResult);
    
    // 3. Verificar estado después del login
    console.log('\n3️⃣ Estado después del login...');
    console.log('Usuario actual:', AuthManager.getCurrentUser());
    console.log('Está autenticado:', AuthManager.isAuthenticated());
    
    // 4. Probar sesión guardada
    console.log('\n4️⃣ Probando sesión guardada...');
    const savedSession = await AuthManager.checkSavedSession();
    console.log('Sesión guardada:', savedSession);
    
    // 5. Probar logout
    console.log('\n5️⃣ Probando logout...');
    const logoutResult = await AuthManager.logout();
    console.log('Logout exitoso:', logoutResult);
    console.log('Usuario después del logout:', AuthManager.getCurrentUser());
    
    console.log('\n🎉 === PRUEBAS COMPLETADAS ===');
    return true;
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error);
    return false;
  }
};