import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  backButton: {
    marginBottom: 10,
  },

  iconFecha: {
    fontSize: 24,
    color: "rgb(53, 51, 51)",
    marginRight: 10, 
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },

  iconChecked: {
    color: "rgb(7, 7, 7)",
    fontSize: 20,   
  },
  iconUnchecked: {
    color: "rgb(7, 7, 7)",
    fontSize: 20,    
  },

  switchText: {
    marginLeft: 5,
  },

  formSection: {
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgb(41, 39, 38)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(253, 253, 253)',
  },

  inputError: {
    borderColor: 'red', // Aplica el borde rojo cuando hay error
    borderWidth: 1,
  },
  inputWrapper: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
  },

  inputobs: {
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 130,
    maxHeight: 200,
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    textAlignVertical: "top",
  },
  
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgb(41, 39, 38)',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'rgb(253, 253, 253)',
  },

  iconCalendar: {
    color: 'rgb(9, 10, 10)',
    fontSize: 20,    
  },

  dateButtonText: {
    fontSize: 14,
    color: 'rgb(9, 10, 10)',
  },

  button: {
    backgroundColor: 'rgb(185, 182, 182)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 50,
   
  },

  buttonText: {
    color: 'rgb(3, 44, 3)',
    fontWeight: 'bold',
  },

  dropdown: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'rgb(6, 97, 59)',
  },

  dateInput: {
    flex: 1,
  },

  calendarIcon: {
    marginLeft: 1,
  },

  dropdownContainer: {
    marginBottom: 20, 
    zIndex: 10, 
  },
  
  dropdownBelow: {
    zIndex: 5, 
  },

 

  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  
  weightInput: {
    borderColor: "rgb(8, 43, 28)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    width: "40%",
    backgroundColor: "rgb(244, 245, 244)",
    fontSize: 16,
    marginRight: 10, // espacio entre el input y la unidad de peso
  },
  
  weightUnit: {
    fontSize: 16,
    color: "#333",
  },
  
  labelDosis: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
    
  },
  
  inputD: {
    width: '40%', // Más ancho
    borderWidth: 1,
    borderColor: 'rgb(20, 20, 20)', // Mismo color de borde que el resto de los inputs
    borderRadius: 8, // Mismo radio de borde que el input común
    padding: 10, // Agregar padding para igualar el estilo
    backgroundColor: 'rgb(253, 253, 253)', // Fondo blanco como en otros inputs
    marginRight: 10,
    height: 50, // Altura igual al picker
    marginBottom: 20,
  },
  
  
  dropdownContainerUnidad: {
    marginBottom: 20, 
     borderWidth: 1,
     borderRadius: 8, // Mismo radio de borde que el input común
    borderColor: 'rgb(20, 20, 20)', // Mismo color de borde que el resto de los inputs
    zIndex: 10, 
    marginRight: 80,
    width: '35%'
  },
  
  dropdownBelowUnidad: {
    zIndex: 5, 
  },
  

});

