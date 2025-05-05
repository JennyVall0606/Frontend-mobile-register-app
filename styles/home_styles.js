import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'rgb(6, 97, 59)',
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },

  squareButton: {
    backgroundColor: 'rgb(160, 159, 159)',
    width: 130,
    height: 130,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: 'rgb(3, 44, 3)',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
