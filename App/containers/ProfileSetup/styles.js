import {
  StyleSheet,
} from 'react-native';
import Dimensions from 'Dimensions';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1: {
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 3,
    width: (windowWidth - 30)
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  wrapper: {
    flex: 1
  },
  textColor: {
    color: '#9E9E9E'
  },
  boxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 120,
    marginTop: 20
  },
  boxBgColor: {
    backgroundColor: '#D8D8D8'
  },
  innerBoxWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  innerBox: {
    width: 56,
    height: 56
  },
  button: {
    height: 45,
    width: 115,
    backgroundColor: '#D80324',
    borderRadius: 4,
    borderColor: '#D80324',
    borderWidth: 1
  },
  cancelIcon: {
    width: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: -3,
    top: -22
  }
});
export default styles;
