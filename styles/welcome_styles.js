// styles/welcome_styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  video: {
    width: 200,
    height: 190,
    borderRadius: 70, 
    marginTop: -20,// Esto lo convierte en un círculo
    marginBottom: 10,
    backgroundColor: '#000',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(6, 97, 59)',

    marginTop: 20,
  },
  // Aquí agregas los estilos para las imágenes
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 100,
    width: '100%',  // Asegura que las imágenes se distribuyan bien
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,  // Opcional, para hacer las imágenes redondas
  },

  subtitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'rgb(78, 73, 73)',
  marginTop: 50,
  textAlign: 'center',  // Centra el texto
  fontFamily: 'serif',  // O puedes usar 'serif' o cualquier fuente personalizada que te guste
  paddingHorizontal: 15,
},

button: {
  backgroundColor: 'rgb(160, 159, 159)',
  paddingVertical: 14,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 100,
  alignSelf: 'center', // opcional, lo centra horizontalmente
  width: '50%',        // opcional, lo hace más ancho
},

buttonText: {
  color: 'rgb(3, 44, 3)',
  fontSize: 20, // Aumenta el tamaño de la letra aquí
  textAlign: 'center',
  fontWeight: '60', // Opcional, para que se vea más fuerte
  fontFamily: 'serif',
},


});

export default styles;
