import { StyleSheet } from 'react-native';

export const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  iconFecha: {
    fontSize: 24,
    color: "rgb(53, 51, 51)",
    marginRight: 10, 
  },

  image: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  arrowButton: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 50,
    
  },
  table: {
    marginTop: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: "#fff",
  },
};


