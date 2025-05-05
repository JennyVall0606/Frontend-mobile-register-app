import { StyleSheet } from 'react-native';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  iconFecha: {
    fontSize: 24,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 24,
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 24,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  editButtonText: {
    color: "#007BFF",
    textAlign: "center",
  },
  editButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  dropdownContainer: {
    marginBottom: 12,
    zIndex: 1000,
  },
  dropdownBelow: {
    marginTop: 40,
  },
};


