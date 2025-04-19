import { StyleSheet } from "react-native";

export const getDropdownWrapper = (open) => ({
  zIndex: 999,
  marginBottom: open ? 250 : 20,
});

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
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
    borderColor: "#032C03",
    borderWidth: 1,
  },
  imagePickerText: {
    color: "#333",
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
    borderColor: "#032C03",
    borderWidth: 1,
  },
  input: {
    borderColor: "#032C03",
    borderWidth: 1,
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
  

  dropdown: {
    borderColor: "#032C03",
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
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#ff6647",
    padding: 4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonIcon: {
    color: "#fff",
    fontSize: 20,
  },

  // NUEVOS estilos corregidos y movidos aquí:
  dateButton: {
    
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "rgb(244, 245, 244)",
    marginHorizontal: 20,
    
  },
  dateButtonText: {
    fontSize: 16,
    color: "black",
    flexDirection: "row", 
    alignItems: "center"
  },
});

