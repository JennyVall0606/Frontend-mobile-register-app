import { StyleSheet } from "react-native";
export default StyleSheet.create({
 
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
    paddingHorizontal: 150,// Espacio de los bordes de la barra
    marginBottom:5, // Espacio adicional debajo de las imágenes
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
     left: -6,
  },


   //===========================================================================
  
 container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    
  }, 

  editText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)", // Color negro para "Editar"
    textAlign: "center",
    marginBottom: 0,
  },

  // Estilo para el texto "Formulario de Registro"
  formText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(3, 3, 3)", // Azul para "Formulario de Registro"
    textAlign: "center",
    marginBottom: 0,
  },

  ganadoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(0, 128, 0)",
    textAlign: "center",
    marginBottom: 50,
  },

  editImage: {
    width: 170,
    height: 140,
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 15,
  },

  registerImage: {
    width: 260,
    height: 220,
    marginTop: 90,
    alignSelf: "center",
    marginBottom: 20,
  },

  imagePicker: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    marginBottom: 30,
    alignItems: "center",
    marginHorizontal: 20,
    alignItems: "flex-start",
    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },


  imageContainer: {
    position: "relative",
    marginBottom: 15,
    marginHorizontal: 10,
  },

  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 30,
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 1,
    borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
    borderTopRightRadius: 0, // No redondea la esquina superior derecha
    marginBottom: 30,
    // Sombra para iOS
    shadowColor: "#000", // Sombra negra
    shadowOffset: { width: 0, height: 9 }, // Desplazamiento de la sombra
    shadowOpacity: 1, // Sombra completamente opaca
    shadowRadius: 6, // Mayor difuminado

    // Sombra para Android
    elevation: 10, // Aumenta la elevación para Android
  },

  rowContainer: {
    flexDirection: "row", // Coloca los elementos en fila (horizontal)
    alignItems: "center", // Centra verticalmente los elementos dentro de la fila
    justifyContent: "flex-start", // Alinea los elementos al inicio de la fila
  },

  logo: {
    width: 31,
    height: 26,
    marginRight: 8,
    marginLeft: -5,
  },

  imagePickerText: {
    fontSize: 16, // Ajusta el tamaño del texto
    color: "#000", // Cambia el color del texto
    marginLeft: -7,
  },

  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgb(139,196,52)",
    padding: 4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonIcon: {
    width: 22,
    height: 22,
    tintColor: "rgb(255, 255, 255)",
  },

  iconStyle: {
    width: 30, // Ajusta el tamaño de la imagen
    height: 30,
    marginLeft: -5,
  },
  ////////////////////////////////////////////////////////////////

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1, // Borde normal
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,
    borderTopRightRadius: 0,
    borderRadius: 10,
    width: "90%", // Ajusta el anch
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },

  



  dropdownLogo: {
    width: 30,
    height: 30,
    marginLeft: -5,
  },

  dropdownLogoRaza: {
    width: 34,
    height: 30,
    marginRight: 6,
    marginLeft: -5,
  },

  dropdownText: {
    fontSize: 16, // Ajusta el tamaño del texto
    color: "#000", // Cambia el color del texto
    marginLeft: -7,
  },

  arrowIconStyle: {
    tintColor: "#7dac53",
    transform: [{ scale: 2.0 }],
  },

  ///////////////////////////////////////////////

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,

    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateButtonText: {
    fontSize: 16,
    color: "rgb(15, 15, 15)",
    paddingLeft: 5,
  },

  // ///////////////////////////PESO#

  weightContainer: {
    flexDirection: "row", // Alineación horizontal
    alignItems: "center", // Centra verticalmente el logo y el texto
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,
    width: "45%",

    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },

  inputWithIcon: {
    flexDirection: "row", // Alinea el logo y el input en una fila
    alignItems: "center",
    flex: 1, // Ocupa todo el espacio disponible
  },

  weightInput: {
    flex: 1, // El input ocupará el espacio disponible
    fontSize: 16,
    color: "rgb(2, 2, 2)",
    paddingVertical: 0, // Elimina padding vertical
    paddingLeft: 5, // Para evitar que el texto se solape con el logo
  },
  weightUnit: {
    fontSize: 16,
    color: "rgb(15, 15, 15)",
    paddingLeft: 20,
  },

  iconStylePeso: {
    width: 30,
    height: 33,
    marginRight: 6,
    marginLeft: -5,
  },

  // ///////////////////////////CHIP#CHIPMADRE#CHIPPADRE#

  inputWithIconChips: {
    flexDirection: "row", // Alineación horizontal
    alignItems: "center", // Centra verticalmente el logo y el texto
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,

    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },
  iconStyleChips: {
    width: 30, // Ajusta el tamaño de la imagen
    height: 30,
    marginRight: 4, // Espacio entre el logo y el texto
    marginLeft: -5,
  },
  iconStyleChipsP: {
    width: 35,
    height: 25,
    marginLeft: -5,
  },
  inputChips: {
    flex: 1, // El TextInput ocupará todo el espacio disponible
    fontSize: 16, // Tamaño del texto
    paddingVertical: 0, // Elimina padding vertical por defecto
    paddingLeft: 5, // Evita que el texto se solape con el logo
  },

  dropdownTextEnfermedad: {
    fontSize: 16, // Ajusta el tamaño del texto
    color: "#000", // Cambia el color del texto
    marginLeft: -7,
  },

  dropdownEnfermedad: {
  flexDirection: "row",
    alignItems: "center",
    borderWidth: 1, 
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,
    borderTopRightRadius: 0,
    borderRadius: 10,
    width: "89%", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },






  inputWrapper: {
    flexDirection: "row", 
    alignItems: "flex-start", // Alineación vertical hacia la parte superior
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 20,

    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },

  iconStyleO: {
    width: 30, // Ajusta el tamaño de la imagen
    height: 30,
    marginRight: 6,
    marginLeft: -5,
  },

  inputobs: {
    flex: 1, // El TextInput ocupará todo el espacio disponible
    fontSize: 16, // Tamaño del texto
    textAlignVertical: "top", // Alinea el texto en la parte superior
    height: 100, // Altura ajustada para un TextInput multilinea
    paddingLeft: 2, // Espacio izquierdo para que no se solape con el logo
    paddingVertical: 5,
    selectionColor: "#000", // Color de la selección (cuando el texto está seleccionado)
  },

  selectedDiseases: {
    fontSize: 16, // Ajusta el tamaño de la fuente
    color: "rgb(9, 167, 9)",
    lineHeight: 18,
    paddingVertical: 2,
    paddingHorizontal: 25,
    flexDirection: "column", // Alinea el texto en una columna
    flexWrap: "wrap", // Asegura que el texto no se desborde y se ajuste
    marginBottom: 20,
    marginTop: -25,
  },

  registerButton: {
    backgroundColor: "#31502a",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 40,
    marginBottom: 20,
    borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
    borderTopRightRadius: 0, // No redondea la esquina superior derecha
  },

  registerButtonText: {
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
    fontSize: 16,
  },

  inputError: {
    borderColor: "red", // Aplica el borde rojo cuando hay error
    borderWidth: 1,
  },
});
