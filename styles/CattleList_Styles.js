// styles/CattleList_Styles.js

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
