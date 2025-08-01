// styles/CattleList_Styles.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

 //===========================================================================


 topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    zIndex: 10,
    
  },
  topBarGreen: {
    height: 150, // Altura de la barra verde
    backgroundColor:  "#7dac53",
    width: "100%",
    flexDirection: "row", // Alinea los elementos de manera horizontal
    justifyContent: "space-between", // Espaciado entre los íconos
    alignItems: "center", // Centra los íconos verticalmente dentro de la barra
    paddingHorizontal: 15, // Ajusta el espaciado de los íconos desde los bordes
    top: -40, // Asegura que esté en la parte superior de la pantalla
    zIndex: 1, // Asegura que la barra esté por encima del contenido
  },

  icon: {
    width: 30, 
    height: 30,
    marginTop: 90,
  },

  
  iconUser: {
    width: 50, 
    height: 50,
    marginTop: 90,
  },

  searchContainerCustom: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "rgb(207, 207, 212)",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "rgb(53, 50, 50)", 
    borderWidth: 1, 
  },

  searchInputPlaceholder: {
    color: "rgb(53, 50, 50)",
  },

  searchInput: {
    flex: 1,
    backgroundColor: "rgb(34, 34, 143)",
    padding: 8,
    borderRadius: 20,
    fontSize: 16, 
    marginLeft: 10,
  },

  searchIcon: {
    width: 20, 
    height: 20,
  },




 

  dropdownMenuLeft: {
    position: "absolute",
    top: 100, 
    left: 1,
    backgroundColor: "#7dac53",
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  dropdownMenuLeftuser:{
position: "absolute",
  top: 100,  // Ajusta esta posición vertical según lo necesites
  left: 280,// Asegura que el menú esté alineado completamente a la izquierda
  backgroundColor: "#7dac53",
  padding: 2,
  borderRadius: 8,
  elevation: 5,
  zIndex: 999,
  width: 140,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "rgb(40, 43, 41)",
    marginBottom: 4, 
  },

  

  dropdownMenuRight: {
    position: "absolute",
    top: 105, 
    right: -1,
    backgroundColor: "#7dac53",
    padding: 2,
    borderRadius: 8, 
    elevation: 5,
    zIndex: 999,
  },

  content: {
    flex: 1,
  },

  greenBar: {
    height: 80, // Altura de la barra verde
    backgroundColor: "#7dac53", // Color verde
    width: "100%", // Asegura que la barra ocupe todo el ancho
        
  },

   bottomImageContainer: {
    position: "absolute", // Lo posiciona en la parte inferior de la barra
    bottom: 10, // Asegura que esté en la parte inferior
    left: 0,
    right: 0,
    flexDirection: "row", // Para colocar las imágenes una al lado de la otra
    justifyContent: "space-between", // Espaciado entre las imágenes
    paddingHorizontal: 130, // Espacio de los bordes de la barra
    marginBottom:5, // Espacio adicional debajo de las imágenes
  },
  
 imageContainer: {
    alignItems: "center", // Centra la imagen y el texto horizontalmente
    justifyContent: "center", // Centra la imagen y el texto verticalmente
    marginHorizontal: 15, // Añade espacio entre los contenedores de imagen
  },

  imageStyleG: {
    width: 20, // Ancho de las imágenes
    height: 20, // Alto de las imágenes
  },

   imageText: {
    marginTop: 3, // Añade un pequeño espacio entre la imagen y el texto
    color: "white", // Puedes cambiar el color del texto si lo prefieres
    fontSize: 12, // Tamaño del texto
    fontWeight: "normal", // Estilo del texto
     left: -6,
     marginBottom:8,
  },


   //===========================================================================
  

  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
   
  },
containerloading: {
    flex: 1, // Esto hace que el contenedor ocupe toda la pantalla
    justifyContent: 'center', // Centra los elementos verticalmente
    alignItems: 'center', // Centra los elementos horizontalmente
    backgroundColor: '#fff', // Fondo blanco, puedes cambiarlo
  },
  loadingText: {
    marginTop: 10, // Espacio entre el indicador de carga y el texto
    fontSize: 18, // Tamaño del texto
    color: "rgb(52, 112, 24)",
  },
  imageStyle: {
    width: 200, 
    height: 200, 
     marginTop: 60, 
  },

  titleContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column", 
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", 
    color: "#2c3e50",
  },

  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", 
    color: "rgb(52, 112, 24)",
  },

  totalCountContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 10, 
    marginBottom: 25,
  },

  logoStyle: {
    width: 28, 
    height: 30, 
    marginRight: 5, 
  },

  totalCount: {
    fontSize: 16, 
    color: "rgba(46, 49, 45, 1)",
    fontWeight: "bold",
  },

  counter: {
    fontSize: 18, 
    color: "#7dac53", 
    fontWeight: "bold", 
  },

  
  card: {
    flexDirection: "column", 
    justifyContent: "flex-start", 
    marginBottom: 40, 
    gap: 10, 
   
  },

  
  cardContent: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%", 
    minHeight: 170, 
    backgroundColor: "rgb(255, 255, 255)", 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 0, 
    borderRadius: 20,
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },

  cardImage: {
    width: 170, 
    height: 203, 
    borderRadius: 20, 
    marginRight: 10, 
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  
column: {
  flexDirection: 'column', 
  width: '100%', 
},

row: {
  flexDirection: 'row', 
  alignItems: 'center', 
  marginBottom: 12, 
},

iconStyle: {
  width: 29,
  height: 30,
  marginRight: 8, 
  marginTop: 8,
   marginLeft: -6,
},

iconStyleNacimiento: {
  width: 29,
  height: 33,
  marginRight: 8, 
  marginTop: 8,
   marginLeft: -6,
},

chipText: {
  fontSize: 14,
  color: "rgb(0, 0, 0)", 
  fontWeight: "bold", 
   marginRight: 8, 
  marginTop: 12,
   marginLeft: -4,
},

DatosTextChip: {
   fontSize:16,
   width: '23%',
  color: "#7dac53", 
  textAlign: 'Left', 
  marginTop: 12,
   marginLeft: 40,
},


DatosTextNacimiento: {
   fontSize:13,
   width: '23%',
  color: "#7dac53", 
  textAlign: 'Left', 
  marginTop: 12,
   marginLeft: -9,
},

DatosTextPeso: {
   fontSize:15,
   width: '23%',
  color: "#7dac53", 
  textAlign: 'Left', 
  marginTop: 12,
   marginLeft: 39,
},

DatosTextEstado: {
   fontSize:15,
   width: '23%',
  color: "#7dac53", 
  textAlign: 'Left', 
  marginTop: 12,
  marginLeft: 24,
},


  
});
