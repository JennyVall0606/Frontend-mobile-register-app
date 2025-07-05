// eas.js

const projectId = "580a386b-db8e-4b3f-b121-5d33a43668b1"; // El ID de tu proyecto
const slug = "frontend-mobile-register-app"; // El slug del proyecto

// Configuración de EAS Build
module.exports = {
  build: {
    development: {
      developmentClient: true, // Activar cliente de desarrollo
      distribution: "internal", // Distribución interna
    },
    preview: {
      android: {
        buildType: "apk", // Configuración para APK
      },
    },
    production: {
      // Configuración de producción (si la necesitas)
    },
  },
  submit: {
    production: {
      // Configuración de envío de producción
    },
  },
};
