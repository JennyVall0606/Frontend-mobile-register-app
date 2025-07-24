import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },

  container: {
    flex: 1, 
    
  },


  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: -30,
    height: 60,
    zIndex: 10,
    
  },
  topBarGreen: {
    height: 150, // Altura de la barra verde
    backgroundColor: "#7dac53", // Color verde
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
       marginTop: 10,  
  },

  bottomImageContainer: {
    position: "absolute", // Lo posiciona en la parte inferior de la barra
    bottom: 10, // Asegura que esté en la parte inferior
    left: 0,
    right: 0,
    flexDirection: "row", // Para colocar las imágenes una al lado de la otra
    justifyContent: "space-between", // Espaciado entre las imágenes
    paddingHorizontal: 120, // Espacio de los bordes de la barra
    marginBottom:15, // Espacio adicional debajo de las imágenes
  },
  
 imageContainer: {
    alignItems: "center", // Centra la imagen y el texto horizontalmente
    justifyContent: "center", // Centra la imagen y el texto verticalmente
    marginHorizontal: 15, // Añade espacio entre los contenedores de imagen
  },

  imageStyle: {
    width: 20, // Ancho de las imágenes
    height: 20, // Alto de las imágenes
  },

   imageText: {
    marginTop: 5, // Añade un pequeño espacio entre la imagen y el texto
    color: "white", // Puedes cambiar el color del texto si lo prefieres
    fontSize: 12, // Tamaño del texto
    fontWeight: "normal", // Estilo del texto
  },
  
});
