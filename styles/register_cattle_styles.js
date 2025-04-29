import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  backButton: {
    padding: 20,
    flex: 1,
    marginHorizontal: 1,
    marginBottom: 10,
  },

  backArrow: {
    fontSize: 30,
    color: "rgb(53, 51, 51)",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 60,
    textAlign: "center",
    color: "rgb(6, 97, 59)",
    marginHorizontal: 50,
  },

  imagePicker: {
    backgroundColor: "rgb(244, 245, 244)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    marginHorizontal: 20,
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
  },

  imagePickerText: {
    color: "rgb(53, 51, 51)",
    fontSize: 16,
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
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
  },

  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgb(233, 27, 12)",
    padding: 4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButtonIcon: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
  },

  input: {
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
    height: 400,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    width: "90%",
    alignSelf: "center",
    maxHeight: 200,
    marginBottom: 20,
  },

  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(53, 51, 51)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "rgb(244, 245, 244)",
    marginHorizontal: 20,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconStyle: {
    fontSize: 20,
    color: "rgb(2, 2, 2)",
    marginRight: 8,
  },

  dateButtonText: {
    fontSize: 16,
    color: "rgb(2, 2, 2)",
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
    marginBottom: 20,
  },

  dateButtonText: {
    fontSize: 16,
    color: "black",
    flexDirection: "row",
    alignItems: "center",
  },

  iconStyle: {
    fontSize: 20,
    color: "black",
    marginRight: 8,
  },

  registerButton: {
    backgroundColor: "rgb(185, 182, 182)",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 40,
    marginBottom: 100,
  },

  registerButtonText: {
    color: "rgb(3, 44, 3)",
    fontWeight: "bold",
    fontSize: 16,
  },

  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20, // igual que los demás campos
  },
  
  weightInput: {
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 30,
    width: "40%",
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    marginRight: 10, // espacio entre el input y la unidad de peso
  },
  
  weightUnit: {
    fontSize: 16,
    color: "#333",
  },
  
  inputWrapper: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  
  inputobs: {
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 130,
    maxHeight: 200,
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    textAlignVertical: "top",
  },

  selectedDiseases: {
    fontSize: 10,
    color: 'black',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    letterSpacing: 0.5,
    flexWrap: 'wrap',
    marginBottom: 20,
    marginTop: -20,
  },
});
