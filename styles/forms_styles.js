import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },

   image: {
    width: 260,
    height: 220,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },

  title1: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#7dac53",
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },

  iconChecked: {
    color: "rgb(7, 7, 7)",
    fontSize: 20,
  },
  iconUnchecked: {
    color: "rgb(7, 7, 7)",
    fontSize: 20,
  },

  switchText: {
    marginLeft: 5,
  },

  formSection: {
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
  },

  imagePeso: {
    width: 380, // Ajusta el tamaño de la imagen
    height: 50, // Ajusta el tamaño de la imagen
    marginBottom: 10, // Espacio entre la imagen y el texto
    resizeMode: "contain", // Mantiene la proporción de la imagen
  },

  subtitle1: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#7dac53",
    textAlign: "center",
  },

  inputContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 10,
  },
  logo: {
    width: 35, // Ajusta el tamaño del logo
    height: 35, // Ajusta el tamaño del logo
    marginRight: 8, // Espacio entre el logo y el TextInput
  },
  inputChip: {
    padding: 10,
    flex: 1, // El TextInput ocupa el espacio restante
  },

  dateButton: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    zIndex: 5,
    elevation: 10,
  },

  dateButtonText: {
    fontSize: 14,
    color: "rgb(9, 10, 10)",
  },

  weightContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,
    width: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },

  iconStylePeso: {
    width: 32, // Ajusta el tamaño del logo
    height: 35, // Ajusta el tamaño del logo
    marginRight: 10, // Espacio entre el logo y el TextInput
    marginLeft: 12,
  },

  weightInput: {
    fontSize: 14,
    paddingHorizontal: 1,
    paddingVertical: 15,
    borderRadius: 5,
    width: 100,
    textAlign: "left",
  },

  weightUnit: {
    fontSize: 16, // Tamaño de la fuente
    marginLeft: 2, // Espacio entre el input y la unidad
    color: "#000", // Color del texto
  },

  /////////////////////////////////////////////////////////////////////////////////////
  dropdownContainerTipoVacuna: {
    backgroundColor: "rgb(255, 255, 255)",
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
    position: "relative", // Esto asegura que zIndex funcione correctamente
    zIndex: 20, // Se coloca encima de "Nombre Vacuna"
  },

  dropdownContainerPicker: {
    width: "85%", // Asegura que el contenedor ocupe todo el ancho disponible
    borderWidth: 1, // Borde alrededor del contenedor
    borderColor: "rgb(255, 255, 255)", // Color del borde
    borderRadius: 5, // Bordes redondeados
    backgroundColor: "rgb(255, 255, 255)", // Fondo claro para el contenedor
  },

  dropdownListStyle: {
    backgroundColor: "rgb(255, 255, 255)", // Fondo blanco para la lista
    borderWidth: 0, // Elimina cualquier borde de la lista
    zIndex: 15, // Asegúrate de que la lista quede encima si se necesita
  },

  dropdownBelow: {
    backgroundColor: "rgb(255, 255, 255)", // Cambia el fondo del dropdown cuando está abierto
    borderRadius: 10,
    borderWidth: 1, // Borde alrededor del contenedor
    borderColor: "rgb(255, 255, 255)", // Color del borde
  },

  dropdownLogo: {
    width: 34, // Ajusta el tamaño del logo
    height: 35, // Ajusta el tamaño del logo
    marginRight: 3, // Espacio entre el logo y el TextInput
    marginLeft: 8,
  },
  dropdownText: {
    fontSize: 14, // Tamaño del texto
    color: "#000", // Color del texto
    textAlign: "left", // Alinea el texto a la izquierda
    marginLeft: 1,
  },
  arrowIconStyle: {
    tintColor: "#7dac53",
    transform: [{ scale: 2.0 }],
  },

  dropdownContainerNombreVacuna: {
    backgroundColor: "rgb(255, 255, 255)",
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    marginBottom: 30,
    flexDirection: "row",
    position: "relative", // Esto asegura que zIndex funcione correctamente
    zIndex: 15, // Se coloca debajo de "Tipo Vacuna"
    alignItems: "center",
    marginHorizontal: 10,
    borderTopRightRadius: 0,
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },


  row: {
    marginBottom: 15,
    position: "relative", // Esto asegura que zIndex funcione correctamente
    zIndex: 10, // Se coloca debajo de "Tipo Vacuna"
    alignItems: "center",
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    justifyContent: "space-between",
  },

  inputDosisContainer: {
    flexDirection: "row", // Coloca la imagen y el TextInput en fila (horizontal)
    alignItems: "center", // Alinea verticalmente los elementos en el centro
    width: "40%", // Relleno dentro del contenedor
    borderWidth: 1, // Bordes del contenedor
    borderColor: "rgb(255, 255, 255)", // Color del borde del contenedor
    borderRadius: 8,
    padding: 5,
    backgroundColor: "rgb(252, 252, 252)",
    marginRight: 10,
        height: 52,
    marginBottom: 20,
    borderTopRightRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },

  dropdownLogo: {
    width: 30, // Tamaño de la imagen
    height: 30, // Tamaño de la imagen
    marginRight: 10, // Espacio entre la imagen y el TextInput
    marginLeft: 8,
  },

  inputDosis: {
    flex: 1, // El TextInput ocupa el espacio restante
    paddingVertical: 10, // Espaciado vertical para el campo de texto

    fontSize: 16, // Tamaño de la fuente
    backgroundColor: "rgb(255, 255, 255)", // Fondo blanco para el campo de entrada
  },

  dropdownContainerUnidad: {
    flexDirection: "row", // Coloca la imagen y el TextInput en fila (horizontal)
    alignItems: "center", // Alinea verticalmente los elementos en el centro
    width: "40%", // Relleno dentro del contenedor
    borderWidth: 1, // Bordes del contenedor
    borderColor: "rgb(255, 255, 255)", // Color del borde del contenedor
    borderRadius: 8,
    padding: 2,
    backgroundColor: "rgb(255, 255, 255)",
    marginRight: 80,
    height: 52,
    marginBottom: 20,

    
    borderTopRightRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },

  dropdownBelowUnidad: {
    zIndex: 5,
  },



  inputWrapper: {
    flexDirection: "row", // Alineación horizontal
    alignItems: "flex-start", // Alineación vertical hacia la parte superior
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 9,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(255, 255, 255)",
    marginHorizontal: 10,

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
    marginRight: 10,
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











  /////////////////////////////////////////////////////////////////////////////////////

  buttonGuardar: {
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

  buttonTextGuardar: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  inputError: {
    borderColor: "red", // Aplica el borde rojo cuando hay error
    borderWidth: 1,
  },
});
