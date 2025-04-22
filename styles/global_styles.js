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
    gap: 15, 
  },

  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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

  fechaTexto: {
    color: "rgb(53, 50, 50)",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  searchResultsContainer: {
    position: "absolute",
    top: 105,
    left: 90,
    right: 90,
    backgroundColor: "rgb(207, 207, 212)",
    borderRadius: 10,
    padding: 10,
    maxHeight: 100,
    borderColor: "rgb(53, 50, 50)", 
    borderWidth: 1, 
    zIndex: 999,
    elevation: 10,
  },

  resultItem: {
    borderRadius: 10, 
    paddingVertical: 5, 
    paddingHorizontal: 5, 
  },

  resultText: {
    fontSize: 16,
    color: "rgb(53, 50, 50)", 
    paddingVertical: 10, 
    paddingHorizontal: 14, 
    fontWeight: "400", 
  },

  noResultsText: {
    fontSize: 16,
    color: "rgb(53, 50, 50)",
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
    backgroundColor: "rgb(2, 236, 96)",
    padding: 2,
    borderRadius: 8, 
    elevation: 5,
    zIndex: 999,
  },

  content: {
    flex: 1,
  },
  
});
