import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'rgb(6, 97, 59)',
    textAlign: 'center',
  },
  

  logo: {
    width: 220,
    height: 220,
    marginBottom: 50,
    alignSelf: 'center',
    marginTop: 30,
  },

  buttonRow: {
     flexDirection: 'row', // Alineamos los botones de forma horizontal
    justifyContent: 'space-between', // Distribuye los botones con espacio entre ellos
    marginHorizontal: 20,
    marginTop: 40,
  },

  squareButton: {
     width: 150, // Ancho de cada cuadro
    height: 150, // Altura de cada cuadro
    backgroundColor: 'rgb(248, 244, 244)', // Color de fondo del botón
    borderRadius: 10, // Bordes redondeados
    justifyContent: 'center', // Centra el contenido dentro del cuadro
    alignItems: 'center', // Centra el contenido horizontalmente
    elevation: 5, // Sombra para dar un efecto de profundidad
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
    shadowOpacity: 0.9, // Opacidad de la sombra
    shadowRadius: 9, // Radio de la sombra
     borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
  borderTopRightRadius: 0, // No redondea la esquina superior derecha
  },

  buttonContent: {
    flex: 1,
  justifyContent: 'center', // Centra el contenido en el eje vertical
  alignItems: 'center',
 marginBottom: -40,  // Elimina el espacio entre la imagen y el texto
  },

   buttonImage: {
   width: 140, // Ancho de la imagen
  height: 140, // Alto de la imagen
  resizeMode: 'contain', // Ajusta la imagen para que no se distorsione
  marginBottom: 20, // Espacio entre la imagen y el texto (ajústalo según sea necesario)
  
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'rgb(3, 3, 3)',
  },
});
