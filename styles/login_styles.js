// styles/login_styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    paddingTop: 40,
  },

logo: {
  width: 210,
  height: 210, 
  alignSelf: 'center', 
  marginTop: 100,
  marginBottom: 50, 
},

  inputContainer: {
   width: "140%", 
  height: 60, 
  borderRadius: 10, 
  marginBottom: 35, 
  backgroundColor: "rgb(255, 255, 255)", 
  padding: 5, 
  borderTopLeftRadius: 20,
  borderTopRightRadius: 0, 

  // Sombra para iOS
  shadowColor: "rgb(0, 0, 0)", 
  shadowOffset: { width: 0, height: 5 }, 
  shadowOpacity: 0.9, 
  shadowRadius: 5,

  // Sombra para Android
  elevation: 5, 
  },






  
  label: {
    fontSize: 15,
    fontWeight: "normal",
    color: "rgb(18, 22, 20)", // Color para el texto del título
    alignSelf: "flex-start", // Alinea el título a la izquierda
    marginBottom: -10, // Espacio entre el título y el input
    marginLeft: 30, // Alinea el label a la izquierda (debe coincidir con el marginLeft del input)
    marginTop: 5,
  },

  input: {
    height: 50,
    borderRadius: 30,
    paddingLeft: 25, // Ajusta este valor para controlar el espacio dentro del input
    fontSize: 13,
    marginLeft: 10, // Asegura que el input se alinee con el label
    width: "100%", // Ajusta el ancho del input
  },

  button: {
    backgroundColor: "rgb(140, 177, 91)",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
     borderTopLeftRadius: 20, // Redondea la esquina superior izquierda
    borderTopRightRadius: 0, // No redondea la esquina superior derecha
  },

  buttonText: {
    color: "rgb(240, 240, 240)",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "60",
    fontFamily: "bold",
  },
});

export default styles;
