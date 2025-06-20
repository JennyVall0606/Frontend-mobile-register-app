// styles/CattleList_Styles.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  imageStyle: {
    width: 250, // Ajusta el ancho de la imagen
    height: 250, // Ajusta la altura de la imagen
  },

  titleContainer: {
    alignItems: "center", // Alinea horizontalmente los elementos al centro
    justifyContent: "center", // Centra los elementos verticalmente
    flexDirection: "column", // Alinea los títulos en una columna
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", // Asegura que el texto esté centrado dentro de su contenedor
    color: "#2c3e50",
  },

  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Asegura que el texto esté centrado dentro de su contenedor
    color: "rgb(52, 112, 24)",
  },

  totalCountContainer: {
    flexDirection: "row", // Alinea los elementos horizontalmente (imagen y texto)
    alignItems: "center", // Centra la imagen y el texto verticalmente dentro del contenedor
    marginTop: 10, // Ajusta el espacio superior según sea necesario
    marginBottom: 25,
  },

  logoStyle: {
    width: 28, // Ajusta el tamaño del logo
    height: 28, // Ajusta el tamaño del logo
    marginRight: 5, // Espacio entre el logo y el texto
  },

  totalCount: {
    fontSize: 15, // Tamaño del texto
    color: "rgb(39, 85, 18)",
    fontWeight: "bold",
  },

  counter: {
    fontSize: 16, // Tamaño del contador
    color: "rgb(65, 173, 15)", // Color del contador (puedes cambiar este color)
    fontWeight: "bold", // Puedes agregar negrita si lo deseas
  },

  card: {
    flexDirection: "column", // Cambiar a columna para una disposición vertical
    justifyContent: "flex-start", // Alineación de los elementos desde arriba
    marginBottom: 30, // Espaciado entre las cartas
    gap: 10, // Espaciado entre los elementos dentro de cada carta
   
  },

  cardContent: {
    flexDirection: "row", // Alinea la imagen y el texto horizontalmente
    alignItems: "center", // Centra los elementos verticalmente
    width: "100%", // Carta ocupa todo el ancho disponible
    minHeight: 150, // Asegura que la carta tenga una altura mínima adecuada
    backgroundColor: "rgb(238, 238, 238)", // Fondo de la tarjeta
    borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
    borderTopRightRadius: 0, // No redondea la esquina superior derecha
    marginBottom: 10, // Espaciado entre las líneas
    borderRadius: 20, // Bordes redondeados
    elevation: 3, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },

  cardImage: {
    width: 180, // Ajusta el tamaño de la imagen
    height: 180, // Altura de la imagen
    borderRadius: 20, // Bordes redondeados para la imagen
    marginRight: 10, // Espacio entre la imagen y el texto
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  
  cardText: {
  fontSize: 14,
  marginRight: 60,
  color: "#333", // Color del texto
  marginBottom: 12, // Espaciado entre los textos
  width: "100%", // Asegura que el contenedor ocupe todo el ancho disponible
},
DatosText: {
  fontSize: 14, // Tamaño del texto de los datos
  color: "rgb(156, 89, 35)", // Color específico para los valores
  marginBottom: 10, // Espaciado entre los valores
  textAlign: "center", // Alineación horizontal del texto al centro
},


  iconStyle: {
    width: 26, // Tamaño de la imagen
    height: 26, // Tamaño de la imagen
  },

  DatosText: {
    fontSize: 14,
  color: "rgb(65, 173, 15)",
  marginBottom: 10,
  textAlign: "center",
  width: '100%',
  alignSelf: 'center', // Asegura que el texto se centre en su contenedor
  },

  
});
