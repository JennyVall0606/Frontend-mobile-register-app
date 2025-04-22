import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingHorizontal: 20, 
  paddingTop: 10, 
  
  },

  backButton: {
    position: 'absolute',
    top: -15, 
    left: 8, 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 30, 
    color: "rgb(53, 51, 51)", 
  },

  title: {
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 20, 
    marginBottom: 20,
    color: 'rgb(6, 97, 59)',
    textAlign: 'center',
    width: '100%' 
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(192, 197, 194)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20, 
  },

  searchIcon: {
    fontSize: 20,
    color: "rgb(53, 51, 51)",
    marginRight: 5,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
  },

  scrollView: {
    marginTop: 20,
  },

  table: {
    width: '100%', 
    marginHorizontal: 0, 
    borderWidth: 1,
    borderColor: "rgb(53, 51, 51)",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20, 
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "rgb(70, 136, 84)",
    borderBottomWidth: 1,
    borderColor: "rgb(53, 51, 51)",
  },

  cellHeader: {
    flex: 40, 
    padding: 6,
    fontWeight: "bold",
    fontSize: 12,
    color: "rgb(41, 41, 39)",
    textAlign: "center", 
  },
  cellHeaderId: {
    flex: 15, 
    padding: 6,
    fontWeight: "bold",
    fontSize: 12,
    color: "rgb(41, 41, 39)",
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgb(53, 51, 51)",
    backgroundColor: "rgb(192, 197, 194)",
  },

  cell: {
    flex: 35, 
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    color: "rgb(46, 39, 45)",
  },
  cellId: {
    flex: 15,
    padding: 6,
    fontSize: 10,
    textAlign: "center",
    color: "rgb(46, 39, 45)",
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    
  },

  paginationButton: {
    fontSize: 16,
    color: "rgb(50, 88, 58)",
  },

  pageInfo: {
    fontSize: 16,
    color: "rgb(28, 34, 29)",
    alignSelf: 'center',
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%', 
    alignItems: "center",
    paddingHorizontal: 0, 
    marginBottom: 20, 
  },

  addIcon: {
    fontSize: 40,
    color: "rgb(19, 150, 29)",
    marginBottom: 60,
    marginTop: 40,
  },
  
});
