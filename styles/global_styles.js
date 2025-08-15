import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
  },

  container: {
    flex: 1, 
    
  },


  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: -30,
    height: 60,
    zIndex: 10,
    
  },
  topBarGreen: {
    height: 150, 
    backgroundColor: "#7dac53", 
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
    height: 80, 
    backgroundColor: "#7dac53", 
    width: "100%", 
       marginTop: 10,  
  },

  bottomImageContainer: {
    position: "absolute", 
    bottom: 10, 
    left: 0,
    right: 0,
    flexDirection: "row", 
    justifyContent: "space-between",
    paddingHorizontal: 120, 
    marginBottom:15, 
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
  },
  
});
