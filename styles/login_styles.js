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
  width: 200,
  height: 200, 
  alignSelf: 'center', 
  marginTop: 25,
  marginBottom: 20, 
},

  inputContainer: {
   width: "100%", 
  height: 60, 
  borderRadius: 10, 
  marginBottom: 35, 
  backgroundColor: "rgb(255, 255, 255)", 
  padding: 5, 
  borderTopLeftRadius: 20,
  borderTopRightRadius: 0, 


  shadowColor: "rgb(0, 0, 0)", 
  shadowOffset: { width: 0, height: 5 }, 
  shadowOpacity: 0.9, 
  shadowRadius: 5,

 
  elevation: 5, 
  },






  
  label: {
    fontSize: 15,
    fontWeight: "normal",
    color: "rgb(18, 22, 20)", 
    alignSelf: "flex-start", 
    marginBottom: -10, 
    marginLeft: 30, 
    marginTop: 5,
  },

  input: {
    height: 50,
    borderRadius: 30,
    paddingLeft: 25, 
    fontSize: 13,
    marginLeft: 10, 
    width: "100%",
  },

  button: {
    backgroundColor: "rgb(140, 177, 91)",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
     borderTopLeftRadius: 20, 
    borderTopRightRadius: 0, 
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