import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
    color: "rgb(6, 97, 59)",
    textAlign: "center",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 90,
    alignSelf: "center",
    marginTop:20,
  },

  buttonRow: {
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: -130,
  },

  squareButton: {
    width: 150,
    height: 150,
    backgroundColor: "rgb(248, 244, 244)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
  },

  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -40,
  },

  buttonImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "rgb(3, 3, 3)",
  },

  squareButtoninforme: {
    width: 140,
  height: 140,
  backgroundColor: "rgba(255, 255, 255, 1)",
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.9,
  shadowRadius: 9,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 0,
  display: "flex",  // Ensuring flexbox is active
  alignSelf: "center",  // Centers the button horizontally within its parent container
marginTop: 15,

  },

  buttonContentinforme: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -40,
  },

  buttonImageinforme: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginBottom: 20,
  },
  buttonTextinforme: {
    fontSize: 16,
    fontWeight: "normal",
    color: "rgb(3, 3, 3)",
    
  },
});
