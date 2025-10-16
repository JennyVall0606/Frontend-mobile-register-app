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
    height: 150, 
    backgroundColor:  "#7dac53",
    width: "100%",
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 15, 
    top: -40, 
    zIndex: 1, 
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


modalFieldTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#43a709ff',
  marginLeft: 30,
  
  marginBottom: 5,
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
  top: 100,  
  left: 280,
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
    height: 90, 
    backgroundColor: "#7dac53",
    width: "100%", 
        
  },

  bottomImageContainer: {
    position: "absolute", 
    bottom: 10, 
    left: 0,
    right: 0,
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingHorizontal: 150,
    marginBottom:23, 
  },
  
  
 imageContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    marginHorizontal: 15, 
  },

  imageStyleG: {
    width: 20, 
    height: 20, 
  },

   imageText: {
    marginTop: 3, 
    color: "white", 
    fontSize: 12, 
    fontWeight: "normal", 
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
  flex: 1,  
  padding: 2, 
  width: "100%",  
  alignSelf: "center",  
},

containerloading: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
  },
  loadingText: {
    marginTop: 10, 
    fontSize: 18, 
    color: "rgb(52, 112, 24)",
  },

  //////////////////////////////////////////  BOTON NUEVO CONTROL ///////////////////////////////////////
 
    

  newControlButton: {
   backgroundColor: "#3f4e3cff", 
  paddingVertical: 12, 
  paddingHorizontal: 24, 
  borderWidth: 1,
  borderColor: '#8dc65cff',
  alignItems: "center",
marginTop: 15,
marginBottom: 12,
  borderTopRightRadius: 0,
  borderRadius: 20, 
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 }, 
  shadowOpacity: 0.8, 
  shadowRadius: 8, 
  elevation: 10, 
  alignSelf: 'center', 

  },

  newControlButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",     
  textAlign: "center",    
  alignSelf: "center",    
  },


 button: {
  backgroundColor: "rgba(255, 255, 255, 1)",
  padding: 8,
  borderWidth: 1,
  borderColor: '#7dac53',
  alignItems: "center",
  marginTop: 6,
   
 
  marginRight:15, 
  borderTopRightRadius: 0,
  borderRadius: 10,
  alignSelf: 'flex-end', 
},

link: {
  fontSize: 14, 
  color: '#40532fff', 
  fontWeight: 'bold',
},

  image: {
    width: "40%",
    height: 130,
    resizeMode: "c//over",
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: "center",
    marginTop: 50,
   
  },


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
    fontSize: 12, 
    fontWeight: "normal", 
    color: "#000", 
    textAlign: "center", 
    flex: 1, 
  },

  editButtonImagePeso1: {
    width: 30, 
    height: 30, 
    resizeMode: "contain", 
    marginHorizontal: 10, 
    alignSelf: "center",
    marginTop: -10,
  },

  tableRowPeso: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc", 
    paddingVertical: 10, 
  },

  
  tableCellPeso: {
    fontSize: 10, 
    color: "#7dac53",
    flex: 1, 
    textAlign: "center", 
  },

  
  editCell: {
    justifyContent: "center", 
    alignItems: "center", 
    padding: 10, 
  },


  editButtonImagePeso2: {
    width: 30, 
    height: 30, 
    resizeMode: "contain", 
    marginTop: -5,
  },

  noRecordsText: {
    fontSize: 18, 
    color: "#31502a", 
    textAlign: "center", 
    marginTop: 20, 
    marginBottom: 20, 
    fontWeight: "bold", 
    paddingHorizontal: 20, 
  },

  ///////////////////////////////  /////////////////////////////// ///////////////////////////////  ///////////////////////////////  ///////////////////////////////  ////////////////////////////////
  tableHeaderTextVacuna: {
    fontSize: 14, 
    fontWeight: "normal", 
    color: "#000", 
    flex: 1, 
    textAlign: "center", 
    paddingRight: 10,
  },

 
  editButtonImageVacuna1: {
    width: 27, 
    height: 27, 
    resizeMode: "contain", 
    marginTop: -5, 
    alignSelf: "center", 
  },

  
  tableRowVacuna: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc", 
  },

 
  tableCellFechaVacuna: {
    fontSize: 9, 
    color: "#7dac53", 
    textAlign: "left", 
    flex: 1, 

    paddingLeft: 2, 
  },

  
  tableCellDatosVacunaNombre: {
    fontSize: 10, 
    color: "#7dac53", 
    textAlign: "center", 
    flex: 1, 
    paddingRight: 12,
  },

 
  tableCellDatosVacunaTipo: {
    fontSize: 10, 
    color: "#7dac53", 
    textAlign: "center", 
    flex: 1, 
    paddingRight: 6,
  },

 
  tableCellDatosVacunaDosis: {
    fontSize: 12, 
    color: "#7dac53", 
    textAlign: "center", 
    flex: 1, 
    paddingRight: 16,
  },

  
  tableCellDatosVacunaObs: {
    fontSize: 11, 
    color: "#7dac53", 
    textAlign: "center", 
    flex: 1, 
    paddingRight: 25,
  },

  
  editCellVacuna: {
    justifyContent: "center", 
    alignItems: "center", 
    flex: 0.3, 
  },

  
  editButtonImageVacuna2: {
    width: 27, 
    height: 27, 
    resizeMode: "contain", 
    marginBottom: 10, 
    marginLeft: -12,
  },

  
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
    marginTop:10,
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

  
  textcosto: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#7dac53",
    textAlign: "center",
  },

  ////////////////////////////////// MODAL VACUNA ///////////////////////////////////////


   row: {
    marginBottom: 5,
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
     zIndex: 10001,
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
    zIndex: 10001, 
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
    marginTop:30,
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
     marginTop: 25,
    marginBottom: 38,
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
    marginBottom: 22,
    width: "90%",
    alignSelf: "center",
    
  },

  dropdownStyle: {
    marginTop: -9,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    padding: 8,
    height: 50,
    width: "99%",
    marginBottom: 20,
  },

  dropdownContainerVacuna: {
    flex: 1,
    height: 30,
    
    borderWidth: 0,
    marginLeft: -10,
  },

  dropdownBelowVacuna: {
    marginTop: 10,
    borderWidth: 0,
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

pesoInicialBadge: {
  fontSize: 10,
  color: '#4CAF50', // Verde
  fontWeight: '600',
  fontStyle: 'italic',
  marginLeft: 4,
},

 
});
