import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   paddingTop: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'rgb(6, 97, 59)',
    textAlign: 'center',
  },
  

  logo: {
    width: 220,
    height: 220,
    marginBottom: 50,
    alignSelf: 'center',
    marginTop: 90,
  },

  buttonRow: {
 marginBottom: 40,
     flexDirection: 'row',
    justifyContent: 'space-between', 
    marginHorizontal: 20,
    marginTop: -90,
  },

  squareButton: {
     width: 150, 
    height: 150, 
    backgroundColor: 'rgb(248, 244, 244)', 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.9, 
    shadowRadius: 9, 
     borderTopLeftRadius: 20, 
  borderTopRightRadius: 0,
  },

  buttonContent: {
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 marginBottom: -40,  
  },

   buttonImage: {
   width: 140, 
  height: 140, 
  resizeMode: 'contain', 
  marginBottom: 20, 
  
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'rgb(3, 3, 3)',
  },
});
