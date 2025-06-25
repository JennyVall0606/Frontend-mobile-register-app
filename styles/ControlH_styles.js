import { StyleSheet } from "react-native";

export const styles = {
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
  },

  // CONTROL CHIP

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
    width: 28, // Ajusta el tamaño del logo
    height: 28, // Ajusta el tamaño del logo
    marginRight: 10, // Espacio entre el logo y el texto
  },

  tableCell: {
    flex: 1,
    fontSize: 14,
    color: "#7dac53",
  },

  tableCellDato: {
    flex: 1,
    fontSize: 14,
    color: "#7dac53",
  },

  editButton: {
    backgroundColor: "#31502a",
    padding: 8,
    borderWidth: 1,
    borderColor: "#31502a",
    marginBottom: 30,
    alignItems: "center", // Centra el contenido dentro del botón (texto o iconos)
    justifyContent: "center", // Centra verticalmente el contenido dentro del botón
    marginHorizontal: "auto", // Centra el botón horizontalmente
    borderTopRightRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
    width: '70%', 
  },

  containerEditChip: {
    flexDirection: "row", // Alinea los elementos horizontalmente
    borderWidth: 1,
    borderColor: "#31502a",
    borderTopRightRadius: 0,
    borderRadius: 10,
  },

  logoEditarChip: {
    width: 45, // Ajusta el tamaño de la imagen
    height: 39, // Ajusta el tamaño de la imagen
  },

  editTextEditar: {
    fontSize: 15, // Tamaño de la fuente
    fontWeight: "normal", // Fuente normal (puedes cambiar a 'bold' si prefieres negrita)
    color: "rgb(255, 255, 255)", // Color blanco del texto
    textAlign: "left", // Centra el texto horizontalmente dentro de su contenedor
    padding: 10, // Espaciado alrededor del texto
  },

// TITULOS E IMAGENES DE CONTROL DE PESOS Y VACUNAS 

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


// TABLAS 

 table: {
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
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderBottomColor: "#7dac53",
    paddingBottom: 8,
    marginBottom: 8,
  },

 tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
    
  },


////////////////////////////////// EDITAR PESO MODAL

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

modalImage: {
    width: 77,   // Ajusta el tamaño de la imagen
    height: 70,  // Ajusta el tamaño de la imagen
    marginBottom: 15, // Espacio entre la imagen y el título
     alignSelf: 'center', // Asegura que la imagen esté centrada
  },
  modalTitle1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto del título
  },

   modalTitle2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40, // Espacio entre el título y el contenido
    textAlign: 'center', // Centra el texto del título
    color: "#7dac53",
  },
  inputContainer: {
    flexDirection: 'row', // Alinea los elementos horizontalmente
    alignItems: 'center', // Alinea el logo y el TextInput verticalmente
    borderWidth: 1,
    borderRadius: 5,
     borderTopRightRadius: 0,
    borderRadius: 10,
    marginBottom: 20, // Espacio entre los inputs
   
   
  },
  inputLogo: {
    width: 35,   // Ajusta el tamaño del logo
    height: 35,  // Ajusta el tamaño del logo
    marginRight: 10, // Espacio entre el logo y el TextInput
    marginLeft: 20,
  },

  input: {
    paddingVertical: 20,
    fontSize: 16,
      width: '65%',
  },


    buttonsContainer: {
    flexDirection: 'row', // Alinea los botones horizontalmente
    justifyContent: 'space-between', // Espacio entre los botones
    marginTop: 20, // Espacio superior para separar de otros elementos
  },
  buttonGuardar: {
    flexDirection: 'row', // Alinea la imagen y el texto horizontalmente dentro de cada botón
    alignItems: 'center', // Centra verticalmente la imagen y el texto
    backgroundColor: '#31502a', // Fondo verde para el botón "Guardar cambios"
    paddingVertical: 10,
    paddingHorizontal: 15,
      borderTopRightRadius: 0,
    borderRadius: 10,
    borderRadius: 5,
    marginRight: 10, // Espacio entre los botones
  },
   buttonCancelar: {
    flexDirection: 'row', // Alinea la imagen y el texto horizontalmente dentro de cada botón
    alignItems: 'center', // Centra verticalmente la imagen y el texto
    backgroundColor: '#292929', // Fondo verde para el botón "Guardar cambios"
    paddingVertical: 10,
    paddingHorizontal: 15,
      borderTopRightRadius: 0,
    borderRadius: 10,
    borderRadius: 5,
    marginRight: 10, // Espacio entre los botones
  },
  buttonText: {
    color: 'white', // Color del texto del botón
    fontSize: 16,
    marginLeft: 10, // Espacio entre la imagen y el texto del botón
  },
  buttonLogo: {
    width: 20,   // Ajusta el tamaño del logo
    height: 20,  // Ajusta el tamaño del logo
  },
  
////////////////////////////////////////////////////////

////////////////////////////////// EDITAR PESO MODAL



  tableCellFechaVcuna: {
    flex: 6, // si quieres que tenga un ancho relativo
    padding: 1,
    textAlign: "left",
    fontSize: 10,
  color: "#7dac53",
    paddingLeft: 0,
  },

  tableCellDatosVacuna: {
    flex: 5,
    padding: 1,
    textAlign: "left",
    fontSize: 11,
    color: "#7dac53",
    paddingLeft: 0,
    
  },

  editButtonText: {
    fontSize: 12,
    textAlign: "center",

    paddingLeft: 0,
    borderColor: "rgb(255, 255, 255)", // color de la línea
    borderRadius: 4, // opcional, esquinas suavizadas
    overflow: "hidden", // para que respete el borderRadius
  },

 
  editCell: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
 
  editButtonTextHe: {
    fontSize: 12,
    alignItems: "flex-start",
    paddingLeft: 20,
  },

  newControlButton: {
    backgroundColor: "rgb(180, 180, 180)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24, // espacio arriba
    marginBottom: 16, // (opcional) separa abajo
    borderWidth: 1, // grosor del borde
    borderColor: "black", // mismo tono que el fondo o el que prefieras
    elevation: 2,
  },

  newControlButtonText: {
    color: "black", // texto blanco
    fontSize: 16,
    fontWeight: "600",
  },

  
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
 
  dropdownContainer: {
    marginBottom: 12,
    zIndex: 1000,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 6,
    overflow: "hidden",
  },
  picker: {
    height: 40,
    width: "100%",
  },
  dropdownBelow: {
    marginTop: 40,
  },
};
