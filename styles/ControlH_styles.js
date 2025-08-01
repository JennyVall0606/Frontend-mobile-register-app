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
  

 background: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    position: 'absolute'
  },

container: {
  flex: 1,  // El contenedor ocupa el 100% del espacio disponible
  padding: 2, // Espaciado general alrededor del contenido
  width: "100%",  // Ancho del contenedor
  alignSelf: "center",  // Centra el contenedor horizontalmente en su vista padre
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

  //////////////////////////////////////////  BOTON NUEVO CONTROL ///////////////////////////////////////
 
    

  newControlButton: {
   backgroundColor: "#3f4e3cff", // Color de fondo verde
  paddingVertical: 12, // Aumentar el padding para hacerlo más grande verticalmente
  paddingHorizontal: 24, // Aumentar el padding horizontalmente para mayor tamaño
  borderWidth: 1,
  borderColor: '#8dc65cff',
  alignItems: "center",
marginTop: 15,
marginBottom: 12,
  borderTopRightRadius: 0,
  borderRadius: 20, // Aumenté el radio del borde para hacerlo más redondeado
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 }, // Más profundidad en la sombra
  shadowOpacity: 0.8, // Opacidad de sombra más suave
  shadowRadius: 8, // Radio de sombra más grande
  elevation: 10, // Añadir sombra para Android
  alignSelf: 'center', // Centra el botón horizontalmente en su contenedor

  },

  newControlButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",      // Cambié '20' a 'bold' ya que '20' no es un valor válido para fontWeight
  textAlign: "center",     // Alineación horizontal del texto
  alignSelf: "center",     // Alineación vertical del texto dentro de su contenedor
  },


 button: {
  backgroundColor: "rgba(255, 255, 255, 1)",
  padding: 8,
  borderWidth: 1,
  borderColor: '#7dac53',
  alignItems: "center",
  marginTop: 6,
   
 
  marginRight:15, // Ajusta este margen según sea necesario
  borderTopRightRadius: 0,
  borderRadius: 10,
  alignSelf: 'flex-end', // Esto centra el botón dentro de su contenedor
},

link: {
  fontSize: 14, // Tamaño del texto
  color: '#40532fff', // Color del enlace
  fontWeight: 'bold', // Texto en negrita
},

  image: {
    width: "40%",
    height: 140,
    resizeMode: "c//over",
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: "center",
    marginTop: 50,
   
  },

  // image: {
  //   width: "100%",
  //   height: 200,
  //   resizeMode: "cover",
  //   borderRadius: 10,
  //   marginBottom: 16,
  // },

  title: {
    fontSize: 24,
    fontWeight: "bold",
   
    textAlign: "center",
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 1,
    color: "#7dac53",
  },

  card: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 16,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    alignItems: "center",
    marginHorizontal: 5,
    alignItems: "flex-start",
    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  logo: {
   width: 35,
  height: 36,
  marginRight: 8, 
  marginTop: 8,
   marginLeft: -5,
  },

    logoId: {
   width: 44,
  height: 32,
     marginRight: 4, 
  marginTop: 8,
   marginLeft: -9,
  },

  logoObs: {
   width: 45,
  height: 35,
  marginTop: 8,

   marginLeft: -5,
  },

  tableCellChip: {
    flex: 1,
    fontSize: 14,
     marginTop: 15,
     
     fontWeight: "bold",
    color: "#7dac53",
  },

  tableCellDatoChip: {
    flex: 1,
    fontSize: 14,
     marginTop: 15,
    color: "#000",
  },

  editButton: {
    backgroundColor: "#31502a",
    padding: 8,
    borderWidth: 1,
    borderColor: "#31502a",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    borderTopRightRadius: 0,
    borderRadius: 10,
       marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
    width: "70%",
  },

  containerEditChip: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#31502a",
    borderTopRightRadius: 0,
    borderRadius: 10,
  },

  logoEditarChip: {
    width: 45,
    height: 39,
  },

  editTextEditar: {
    fontSize: 15,
    fontWeight: "normal",
    color: "rgb(255, 255, 255)",
    textAlign: "left",
    padding: 10,
  },

  tablePesoVacuna: {
    backgroundColor: "rgb(244, 245, 244)",
    paddingHorizontal: 3,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    alignItems: "center",
    marginHorizontal: 5,
    alignItems: "flex-start",
    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },

  tableHeaderPesoVacuna: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderBottomColor: "#7dac53",
    paddingBottom: 8,
    marginBottom: 10,
    width: "100%",
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  tableHeaderTextPeso: {
    fontSize: 16, // Tamaño del texto
    fontWeight: "normal", // Negrita para resaltar los encabezados
    color: "#000", // Color del texto, ajusta según tus necesidades
    textAlign: "center", // Alinea el texto al centro de cada celda
    flex: 1, // Hace que cada celda ocupe el mismo espacio
  },

  editButtonImagePeso1: {
    width: 30, // Ajusta el tamaño de la imagen
    height: 30, // Ajusta el tamaño de la imagen
    resizeMode: "contain", // Mantiene la proporción de la imagen
    marginHorizontal: 10, // Espacio a los lados de la imagen
    alignSelf: "center", // Centra la imagen dentro de su contenedor
    marginTop: -10,
  },

  tableRowPeso: {
    flexDirection: "row", // Alinea los elementos de la fila horizontalmente
    justifyContent: "space-between", // Espacio entre las celdas
    alignItems: "center", // Alinea los elementos verticalmente
    borderBottomWidth: 1, // Líneas horizontales entre filas
    borderBottomColor: "#ccc", // Color de las líneas horizontales
    paddingVertical: 10, // Espacio vertical para separar las filas
  },

  // Estilo para las celdas de la tabla
  tableCellPeso: {
    fontSize: 14, // Tamaño de la fuente
    color: "#7dac53",
    flex: 1, // Hace que cada celda ocupe el mismo espacio
    textAlign: "center", // Centra el texto dentro de cada celda
  },

  // Estilo para el botón de editar (imagen)
  editCell: {
    justifyContent: "center", // Centra el contenido dentro de la celda de editar
    alignItems: "center", // Centra la imagen dentro del TouchableOpacity
    padding: 10, // Espaciado dentro del área del botón de editar
  },

  // Estilo para la imagen del botón de editar
  editButtonImagePeso2: {
    width: 30, // Ajusta el tamaño de la imagen
    height: 30, // Ajusta el tamaño de la imagen
    resizeMode: "contain", // Asegura que la imagen mantenga su proporción
    marginTop: -5,
  },

  noRecordsText: {
    fontSize: 18, // Tamaño de fuente más grande para hacerlo visible
    color: "#31502a", // Un color verde amigable para el texto
    textAlign: "center", // Centra el texto horizontalmente
    marginTop: 20, // Espacio desde el top, para darle algo de espacio alrededor
    marginBottom: 20, // Espacio debajo
    fontWeight: "bold", // Hace el texto más destacado
    paddingHorizontal: 20, // Agrega un pequeño padding en los lados para no pegarse al borde
  },

  ///////////////////////////////  /////////////////////////////// ///////////////////////////////  ///////////////////////////////  ///////////////////////////////  ////////////////////////////////
  tableHeaderTextVacuna: {
    fontSize: 14, // Tamaño del texto
    fontWeight: "normal", // Peso de la fuente
    color: "#000", // Color del texto (negro)
    flex: 1, // Hace que cada celda ocupe el mismo espacio
    textAlign: "center", // Centra el texto dentro de cada celda
    paddingRight: 10,
  },

  // Estilo para la imagen del botón de editar (en el encabezado)
  editButtonImageVacuna1: {
    width: 27, // Ajusta el tamaño de la imagen
    height: 27, // Ajusta el tamaño de la imagen
    resizeMode: "contain", // Mantiene la proporción de la imagen
    marginTop: -5, // Ajusta el espacio superior
    alignSelf: "center", // Alinea la imagen al centro
  },

  // Estilo para la fila de datos en la tabla
  tableRowVacuna: {
    flexDirection: "row", // Alinea los elementos en una fila
    justifyContent: "space-between", // Distribuye el espacio entre las celdas
    alignItems: "center", // Centra los elementos verticalmente
    borderBottomWidth: 1, // Línea divisoria entre las filas
    borderBottomColor: "#ccc", // Color gris claro para la línea divisoria
  },

  // Estilo para la celda de fecha
  tableCellFechaVacuna: {
    fontSize: 9, // Tamaño del texto para la fecha
    color: "#7dac53", // Color del texto
    textAlign: "left", // Alinea el texto a la izquierda
    flex: 1, // Hace que ocupe el mismo espacio que las otras celdas

    paddingLeft: 2, // Ajusta el espacio a la izquierda
  },

  // Estilo para la celda de nombre
  tableCellDatosVacunaNombre: {
    fontSize: 11, // Tamaño del texto
    color: "#7dac53", // Color del texto
    textAlign: "center", // Alinea el texto a la izquierda
    flex: 1, // Hace que ocupe el mismo espacio que las otras celdas
    paddingRight: 12,
  },

  // Estilo para la celda de tipo
  tableCellDatosVacunaTipo: {
    fontSize: 11, // Tamaño del texto
    color: "#7dac53", // Color del texto
    textAlign: "center", // Alinea el texto a la izquierda
    flex: 1, // Hace que ocupe el mismo espacio que las otras celdas
    paddingRight: 10,
  },

  // Estilo para la celda de dosis
  tableCellDatosVacunaDosis: {
    fontSize: 12, // Tamaño del texto
    color: "#7dac53", // Color del texto
    textAlign: "center", // Alinea el texto a la izquierda
    flex: 1, // Hace que ocupe el mismo espacio que las otras celdas
    paddingRight: 16,
  },

  // Estilo para la celda de observaciones
  tableCellDatosVacunaObs: {
    fontSize: 11, 
    color: "#7dac53", 
    textAlign: "center", 
    flex: 1, 
    paddingRight: 25,
  },

  // Estilo para la celda de edición
  editCellVacuna: {
    justifyContent: "center", 
    alignItems: "center", 
    flex: 0.3, 
  },

  // Estilo para la imagen del botón de editar (en la fila)
  editButtonImageVacuna2: {
    width: 27, 
    height: 27, 
    resizeMode: "contain", 
    marginBottom: 10, 
    marginLeft: -12,
  },

  // Estilo para el botón de editar en la tabla
  editButtonTextVacuna: {
    fontSize: 10, 
    color: "#7dac53", 
    textAlign: "left", 
    paddingHorizontal: 10, 
  },

  /////////////////////////////////////// TITULOS E IMAGENES DE CONTROL DE PESOS Y VACUNAS ///////////////////////////////////////

  imagePesoVacuna: {
    width: 120,
    height: 120, 
    alignSelf: "center", 
    marginTop: 24,
  },

  subtitle1: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    textAlign: "center", 
  },
  subtitle2: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#7dac53",
    textAlign: "center", 
  },

  ////////////////////////////////// MODAL PESO ///////////////////////////////////////

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(7, 7, 7, 0.77)",
    alignItems: "center",
  },

  modalImagePeso: {
    width: 82,
    height: 72,
    marginBottom: 15,
    alignSelf: "center",
  },

  modalTitle1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  modalTitle2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#7dac53",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputLogo: {
    width: 35,
    height: 37,
    marginRight: 10,
    marginLeft: 20,
  },

  input: {
    paddingVertical: 20,
    fontSize: 16,
    width: "65%",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:65,
     marginRight: 20,
      marginLeft: 20,
      
  },
  buttonGuardarPeso: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#31502a",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 0,
    borderRadius: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonCancelarPeso: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#292929",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 0,
    borderRadius: 10,
    borderRadius: 5,
    marginRight: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  buttonLogo: {
    width: 20,
    height: 20,
  },

  ////////////////////////////////// MODAL VACUNA ///////////////////////////////////////


   row: {
    marginBottom: 10,
    position: "relative",
    zIndex: 10,
    alignItems: "center",
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    justifyContent: "space-between",
  },

  inputDosisContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderTopRightRadius: 0,
    borderRadius: 10,
    marginBottom: 10,
    width: "40%",
    alignSelf: "center",
  },


  inputDosis: {
   flex: 1,                    
    height: 40,                 
    borderColor: 'white',       
    borderWidth: 1,            
    borderRadius: 5,            
    paddingHorizontal: 5,      
    fontSize: 16,            
    color: '#000',          
  },


  dropdownLogo: {
   width: 35,
    height: 35,
    marginRight: 12,
    marginLeft: 8,
  },


  dropdownContainerUnidad: {
   flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
     
    padding: 3,
    borderTopRightRadius: 0,
    borderRadius: 10,
    marginBottom: 10,
    width: "40%",
    marginHorizontal:35,
    alignSelf: "center",
  },

  arrowIconStyle: {
    marginRight: 1, 
  },
  
  dropdownBelowUnidad: {
    marginTop: 4, 
    zIndex: 9999, 
  },


























  modalContentVacuna: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "90%",
    elevation: 5,
  },

  modalImageVacuna: {
    width: 82,
    height: 72,
    marginBottom: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  modalContainerVacuna: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(7, 7, 7, 0.77)",
    alignItems: "center",
  },

  datePickerLogo: {
    width: 35,
    height: 35,
    marginRight: 12,
    marginLeft: 8,
  },
    datePickerLogoCC: {
    width: 35,
    height: 45,
    marginRight: 12,
    marginLeft: 8,
  },

  inputContainerVacuna: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    borderTopRightRadius: 0,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },

  ////EL DropDownPicker DE TIPO DE VACUNAS

  datePickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    borderTopRightRadius: 0,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    
  },

  dropdownStyle: {
    marginTop: -10,
    borderWidth: 1,
    borderColor: "rgb(250, 250, 250)",
    borderRadius: 10,
    padding: 8,
    height: 50,
    width: "99%",
    marginBottom: 10,
  },

  dropdownContainerVacuna: {
    flex: 1,
    height: 30,
    borderWidth: 0,
    marginLeft: -10,
  },

  dropdownBelowVacuna: {
    marginTop: 20,
    borderWidth: 0,
  },

  dropDownStyle: {
    borderWidth: 0,
    backgroundColor: "#7dac53",
  },

  arrowIconStyle: {
    tintColor: "#7dac53",
    transform: [{ scale: 2.0 }],
  },

  textStyle: {
    fontSize: 13,
    color: "#000",
  },

  inputVacuna: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: -14,
  },

  buttonGuardarVacuna: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#31502a",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderTopRightRadius: 0,
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 30,
  },
  buttonCancelarVacuna: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#292929",
    padding: 15,
    borderTopRightRadius: 0,
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 30,
  },



 
});
