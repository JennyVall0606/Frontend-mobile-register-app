import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'rgb(6, 97, 59)',
    textAlign: 'center',
  },
  

  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
    alignSelf: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50, 
  },

  squareButton: {
    backgroundColor: 'rgb(160, 159, 159)',
    width: 150,
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: 'rgb(3, 44, 3)',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
