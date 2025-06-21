import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 15,
  },

  registerImage: {
    width: 260,
    height: 220,
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },

  imagePicker: {
    backgroundColor: "rgb(244, 245, 244)",
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 5,
    shadowRadius: 20,

    elevation: 10,
  },

  imagePickerText: {
    color: "rgb(216, 17, 17)",
    fontSize: 16,
    textAlign: "left",
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
    borderColor: "rgb(248, 248, 248)",
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
    width: 30,
    height: 25,
    marginRight: 8, // Espacio entre el logo y el texto
  },

  imagePickerText: {
    color: "rgb(0, 0, 0)", // Color del texto
    fontSize: 16, // Tamaño de la fuente
    textAlign: "left", // Alinea el texto a la izquierda
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
    marginRight: 10,
  },

  
     dropdown: {
    borderColor: "rgb(8, 43, 28)",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    width: "90%",
    alignSelf: "center",
    maxHeight: 200,
   marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
     borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height:2 },
    shadowOpacity: 5,
    shadowRadius: 20,

    elevation: 10,
  },

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "rgb(244, 245, 244)",
    marginHorizontal: 20,
    
     borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 5,
    shadowRadius: 20,

    elevation: 10,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateButtonText: {
    fontSize: 16,
    color: "rgb(2, 2, 2)",
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
    backgroundColor: "rgb(244, 245, 244)",
    marginHorizontal: 20, 
    width: '45%',

     borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius:10,

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
    width: 30, // Ajusta el tamaño de la imagen
    height: 32,
    marginRight: 10,
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
    backgroundColor: "rgb(244, 245, 244)",
    marginHorizontal: 20, 

     borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 5,
    shadowRadius: 20,

    elevation: 10,
  },
  iconStyleChips: {
    width: 30, // Ajusta el tamaño de la imagen
    height: 30,
    marginRight: 10, // Espacio entre el logo y el texto
  },
   iconStyleChipsP: {
    width:35,
    height:25,
    marginRight: 10, // Espacio entre el logo y el texto
  },
  inputChips: {
    flex: 1, // El TextInput ocupará todo el espacio disponible
    fontSize: 16, // Tamaño del texto
    color: '#333', // Color del texto
    paddingVertical: 0, // Elimina padding vertical por defecto
    paddingLeft: 5, // Evita que el texto se solape con el logo
  },

inputWrapper: {
   flexDirection: "row", // Alineación horizontal
    alignItems: 'flex-start', // Alineación vertical hacia la parte superior
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    padding: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  marginBottom: 30,
    backgroundColor: "rgb(244, 245, 244)",
    marginHorizontal: 20, 

     borderTopRightRadius: 0,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 5,
    shadowRadius: 20,

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
    textAlignVertical: 'top', // Alinea el texto en la parte superior
    height: 100, // Altura ajustada para un TextInput multilinea
    paddingLeft: 2, // Espacio izquierdo para que no se solape con el logo
    paddingVertical: 5,
    selectionColor: '#000', // Color de la selección (cuando el texto está seleccionado)
  },


  dropdownE: {
    borderColor: "rgb(8, 43, 28)",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    width: "90%",
    alignSelf: "center",
    maxHeight: 200,
    borderTopRightRadius: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(255, 255, 255)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 5,
    shadowRadius: 20,
    elevation: 10,
     marginBottom: 15,
    
  },

 selectedDiseases: {
    fontSize: 16, // Ajusta el tamaño de la fuente
    color: "rgb(9, 167, 9)",                   
    lineHeight: 18,
    paddingVertical: 2,
    paddingHorizontal: 25,
    flexDirection: 'column', // Alinea el texto en una columna
    flexWrap: 'wrap', // Asegura que el texto no se desborde y se ajuste
    marginBottom: 15,
  },









 

  registerButton: {
    backgroundColor: "#2a2a2a",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 40,
    marginBottom: 100,
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
