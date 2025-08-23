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
    marginBottom:16, 
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

  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },

  image: {
    width: 160,
    height: 120,
    marginTop: 80,
    alignSelf: "center",
    marginBottom: 10,
  },

  title1: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
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
    width: 380, 
    height: 40, 
    marginBottom: 10, 
    resizeMode: "contain", 
  },

  subtitle1: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 40,
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
    width: 35,
    height: 35, 
    marginRight: 8, 
  },
  inputChip: {
    padding: 10,
    flex: 1, 
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
    width: 32, 
    height: 35, 
    marginRight: 10, 
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
    fontSize: 16, 
    marginLeft: 2,
    color: "#000", 
  },



 inputprecio: {
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
  
  weightInput: {
    flex: 1, 
    fontSize: 16,
    color: "#000",
  },
  
  textcosto: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#7dac53",
    textAlign: "center",
  },

















  /////////////////////////////////////////////////////////////////////////////////////
  //  dropdownContainerNombreVacuna: {
  //     backgroundColor: "rgb(255, 255, 255)",
  //     borderWidth: 1,
  //     borderColor: "rgb(255, 255, 255)",
  //     marginBottom: 30,
  //     flexDirection: "row",
  //     position: "relative", // Esto asegura que zIndex funcione correctamente
  //     zIndex: 10, // Se coloca debajo de "Tipo Vacuna"
  //     alignItems: "center",
  //     marginHorizontal: 10,
  //     borderTopRightRadius: 0,
  //     borderRadius: 10,
  //     padding: 5,
  //     shadowColor: "#000",
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 5,
  //     shadowRadius: 4,
  //     elevation: 10,
  //   },

  dropdownContainerPicker: {
    marginBottom: 30,
    flexDirection: "row",
    position: "relative", 
    alignItems: "center",
    marginHorizontal: 5,

    padding: 5,
    width: "97%", 
    borderRadius: 5, 
  },

  dropdownListStyle: {
    borderWidth: 0, 
    borderTopRightRadius: 0,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 10,
  },

  dropdownBelow: {
    backgroundColor: "rgb(255, 255, 255)", 
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: "rgb(255, 255, 255)", 
    zIndex: 15, 
    height: 90,
  },

  dropdownLogo: {
    width: 34,
    height: 35, 
    marginRight: 3,
    marginLeft: 8,
  },

  dropdownLogoCC: {
    width: 34, 
    height: 45, 
    marginRight: 3,
    marginLeft: 8,
  },

  dropdownText: {
    fontSize: 14, 
    color: "#000", 
    textAlign: "left", 
    marginLeft: 1,
  },
  arrowIconStyle: {
    tintColor: "#7dac53",
    transform: [{ scale: 2.0 }],
  },

  row: {
    marginBottom: 15,
    position: "relative", 
    zIndex: 10, 
    alignItems: "center",
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    justifyContent: "space-between",
  },

  inputDosisContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "40%", 
    borderWidth: 1, 
    borderColor: "rgb(255, 255, 255)", 
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
    width: 30,
    height: 30,
    marginRight: 10, 
    marginLeft: 8,
  },

  inputDosis: {
    flex: 1, 
    paddingVertical: 10,

    fontSize: 16, 
    backgroundColor: "rgb(255, 255, 255)", 
  },

  dropdownContainerUnidad: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "40%", 
    borderWidth: 1, 
    borderColor: "rgb(255, 255, 255)",
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
    flexDirection: "row", 
    alignItems: "flex-start", 
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
    width: 30, 
    height: 30,
    marginRight: 10,
  },

  inputobs: {
    flex: 1, 
    fontSize: 16, 
    textAlignVertical: "top", 
    height: 100, 
    paddingLeft: 2, 
    paddingVertical: 5,
    selectionColor: "#000", 
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
    borderColor: "red", 
    borderWidth: 1,
  },
});
