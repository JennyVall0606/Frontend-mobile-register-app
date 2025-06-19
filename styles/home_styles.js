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
    width: 200,
    height: 200,
    marginBottom: 50,
    alignSelf: 'center',
  },

  buttonRow: {
     flexDirection: 'row', // Alineamos los botones de forma horizontal
    justifyContent: 'space-between', // Distribuye los botones con espacio entre ellos
    marginHorizontal: 20,
    marginTop: 30,
  },

  squareButton: {
     width: 150, // Ancho de cada cuadro
    height: 150, // Altura de cada cuadro
    backgroundColor: '#f5f5f5', // Color de fondo del botón
    borderRadius: 10, // Bordes redondeados
    justifyContent: 'center', // Centra el contenido dentro del cuadro
    alignItems: 'center', // Centra el contenido horizontalmente
    elevation: 5, // Sombra para dar un efecto de profundidad
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 6, // Radio de la sombra
     borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
  borderTopRightRadius: 0, // No redondea la esquina superior derecha
  },

  buttonContent: {
    flex: 1,
    justifyContent: 'flex-end', // Alineamos el texto en la parte inferior
    alignItems: 'center',
    paddingBottom: 190, // Espacio entre la imagen y el texto
  },

   buttonImage: {
    width: 120, // Ancho de la imagen
    height: 120, // Alto de la imagen
    resizeMode: 'contain', // Ajusta la imagen para que no se distorsione
     marginBottom: 40, // Espacio entre la imagen y el texto
  },
  
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
