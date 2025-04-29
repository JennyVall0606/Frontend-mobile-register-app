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

  topBar: {
    flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 60,
  paddingHorizontal: 20,
  marginBottom: 20,
  gap: 300,  
  },

  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: -500,
    height: 60,
    zIndex: 10,
  },

  icon: {
    width: 40, 
    height: 40,
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
    backgroundColor: "rgb(207, 207, 212)",
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
    top: 105, 
    left: 30,
    backgroundColor: "rgb(192, 197, 194)",
    padding: 2,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
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
    right: 30,
    backgroundColor: "rgb(192, 197, 194)",
    padding: 2,
    borderRadius: 8, 
    elevation: 5,
    zIndex: 999,
  },

  content: {
    flex: 1,
  },
  
});
