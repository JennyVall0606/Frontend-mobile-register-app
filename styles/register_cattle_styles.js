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

  imageStyle: {
    width: 20, 
    height: 20,
  },

   imageText: {
    marginTop: 5, 
    color: "white", 
    fontSize: 12, 
    fontWeight: "normal", 
     left: -6,
  },


   //===========================================================================
  
 container: {
    flex: 1,
    paddingTop: 80,
    
  }, 
  fieldTitle: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#43a709ff',
  marginLeft: 30,
  
  marginBottom: 5,
},

  editText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)", 
    textAlign: "center",
    marginBottom: 0,
  },


  formText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "rgb(3, 3, 3)", 
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
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 0, 
    marginBottom: 30,

    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 6,


    elevation: 10, 
  },

  rowContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start", 
  },

  logo: {
    width: 31,
    height: 26,
    marginRight: 8,
    marginLeft: -5,
  },

  imagePickerText: {
    fontSize: 16, 
    color: "#000", 
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
    width: 30, 
    height: 30,
    marginLeft: -5,
  },
  ////////////////////////////////////////////////////////////////

  dropdown: {
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

  





  dropdownLogoRaza: {
    width: 34,
    height: 30,
    marginRight: 6,
    marginLeft: -5,
  },

  dropdownText: {
    fontSize: 16, 
    color: "#020202ff", 
    marginLeft: 10,
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
    flexDirection: "row", 
    alignItems: "center", 
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
    flexDirection: "row", 
    alignItems: "center",
    flex: 1, 
  },

  weightInput: {
    flex: 1, 
    fontSize: 16,
    color: "rgb(2, 2, 2)",
    paddingVertical: 0, 
    paddingLeft: 5, 
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
    flexDirection: "row", 
    alignItems: "center",
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
    width: 30, 
    height: 30,
    marginRight: 4, 
    marginLeft: -5,
  },
  iconStyleChipsP: {
    width: 35,
    height: 25,
    marginLeft: -5,
  },
  inputChips: {
    flex: 1, 
    fontSize: 16, 
    paddingVertical: 0, 
    paddingLeft: 5,
  },

  dropdownTextEnfermedad: {
       fontSize: 16, 
    color: "#020202ff", 
    marginLeft: 10,
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
    alignItems: "flex-start", 
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
    width: 30, 
    height: 30,
    marginRight: 6,
    marginLeft: -5,
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

  selectedDiseases: {
    fontSize: 16, 
    color: "rgb(9, 167, 9)",
    lineHeight: 18,
    paddingVertical: 2,
    paddingHorizontal: 25,
    flexDirection: "column",
    flexWrap: "wrap", 
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0, 
  },

  registerButtonText: {
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
    fontSize: 16,
  },

  inputError: {
    borderColor: "red", 
    borderWidth: 1,
  },
});
