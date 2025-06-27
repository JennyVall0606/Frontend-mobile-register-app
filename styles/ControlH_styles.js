import { StyleSheet } from "react-native";

export const styles = {
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
  },

  image: {
    width: "60%",
    height: 190,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: "center",
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
    marginBottom: 30,
    textAlign: "center",
    color: "#7dac53",
  },

  card: {
    backgroundColor: "rgb(244, 245, 244)",
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
    marginBottom: 15,
  },

  logo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },

  tableCellChip: {
    flex: 1,
    fontSize: 14,
    color: "#7dac53",
  },

  tableCellDatoChip: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  editButton: {
    backgroundColor: "#31502a",
    padding: 8,
    borderWidth: 1,
    borderColor: "#31502a",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    borderTopRightRadius: 0,
    borderRadius: 10,
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
    fontSize: 10, // Tamaño del texto para la fecha
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
    fontSize: 11, // Tamaño del texto
    color: "#7dac53", // Color del texto
    textAlign: "center", // Alinea el texto a la izquierda
    flex: 1, // Hace que ocupe el mismo espacio que las otras celdas
    paddingRight: 25,
  },

  // Estilo para la celda de edición
  editCellVacuna: {
    justifyContent: "center", // Centra el contenido dentro de la celda
    alignItems: "center", // Centra la imagen dentro de la celda
    flex: 0.3, // Asegura que ocupe un espacio más pequeño
  },

  // Estilo para la imagen del botón de editar (en la fila)
  editButtonImageVacuna2: {
    width: 27, // Ajusta el tamaño de la imagen
    height: 27, // Ajusta el tamaño de la imagen
    resizeMode: "contain", // Mantiene la proporción de la imagen
    marginBottom: 10, // Ajusta el espacio inferior
    marginLeft: -12,
  },

  // Estilo para el botón de editar en la tabla
  editButtonTextVacuna: {
    fontSize: 10, // Tamaño del texto del botón
    color: "#7dac53", // Color verde para el texto
    textAlign: "left", // Alinea el texto a la izquierda
    paddingHorizontal: 10, // Espacio dentro de la celda
  },

  /////////////////////////////////////// TITULOS E IMAGENES DE CONTROL DE PESOS Y VACUNAS ///////////////////////////////////////

  imagePesoVacuna: {
    width: 150, // Ancho de la imagen
    height: 150, // Alto de la imagen
    alignSelf: "center", // Centra la imagen horizontalmente
  },

  subtitle1: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    textAlign: "center", // centra el texto
  },
  subtitle2: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#7dac53",
    textAlign: "center", // centra el texto
  },

  ////////////////////////////////// MODAL PESO ///////////////////////////////////////

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 30,
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
    height: 35,
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
    marginTop: 20,
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
    width: 32,
    height: 32,
    marginRight: 10,
    marginLeft: 10,
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
    fontSize: 16,
    color: "#000",
  },

  inputVacuna: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
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

  //////////////////////////////////////////  BOTON NUEVO CONTROL ///////////////////////////////////////

  newControlButton: {
    backgroundColor: "#292929",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    borderTopRightRadius: 0,
    marginTop: 60,
    marginBottom: 40,
    borderWidth: 1,
    width: "75%",
    alignSelf: "center",
  },

  newControlButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
};
