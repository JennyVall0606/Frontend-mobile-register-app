import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
   
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
    marginBottom: 20, // Espacio entre cada dropdown
    zIndex: 10, // zIndex base para que el dropdown esté encima cuando se abre
  },
  
  dropdownBelow: {
    zIndex: 5, // Menor zIndex si el otro dropdown está abierto
  },

});

