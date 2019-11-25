import {StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get ('window');
export const sizes = {
  textBase: 14,
};
export const colors = {
  white: '#fff',
  mainColor: '#50BAB6',
  blue: '#0000FF',
  gray: '#B7BAB9',
  black: '#000',
  red: '#ff0000',
};
export const fonts = {
  light: 'Roboto-Light',
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  black: 'Roboto-Black',
  medium: 'Roboto-Medium',
  thin: 'Roboto-Thin',
  boldoswald: 'Oswald-Bold',
  light_oswald: 'Oswald-Light',
  mediumoswald: 'Oswald-Medium',
  semi: 'Oswald-SemiBold',
};
const Welcome = StyleSheet.create ({
  container: {
    backgroundColor: colors.mainColor,
    flex: 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 80,
    alignSelf: 'center',
    marginVertical: 10,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 28,
    width: 241,
    height: 56,
    alignSelf: 'center',
  },
  textz: {
    color: colors.mainColor,
    fontFamily: fonts.bold,
    fontSize: 27,
  },
});
const Login = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
  },
  box: {},
  text: {
    fontFamily: fonts.bold,
    color: colors.mainColor,
    fontSize: 20,
  },
});
const ChooseLanguage = StyleSheet.create ({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  text: {
    fontFamily: fonts.light_oswald,
    fontSize: 39,
    alignSelf: 'center',
    marginTop: 60,
  },
  choosePosition: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    width: 161,
    height: 186,
  },
  textNomar: {
    fontFamily: fonts.light_oswald,
    fontSize: 20,
    marginTop: 10,
  },
});
const Signin = StyleSheet.create ({
  container: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tab: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.boldoswald,
    color: colors.white,
    fontSize: 39,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textSign: {
    fontFamily: fonts.mediumoswald,
    fontSize: 25,
    paddingHorizontal: 38,
    paddingVertical: 3,
  },
  textSignUp: {
    fontFamily: fonts.boldoswald,
    color: colors.white,
    paddingHorizontal: 31,
    paddingVertical: 10,
    textAlign: 'center',
  },
  SignText: {
    fontFamily: fonts.boldoswald,
    fontSize: 20,
    textAlign: 'center',
    color: colors.white,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#0B9B96',
    width: 185,
    height: 60,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignUp: {
    fontFamily: 'Roboto-Black',
    color: '#80DCD9',
    fontSize: 20,
  },
  textSignin: {
    fontFamily: 'Roboto-Black',
    color: '#fff',
    fontSize: 20,
  },
  boxxanh: {
    backgroundColor: '#80DCD9',
    height: 378,
    width: 340,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxtrang: {
    backgroundColor: '#fff',
    width: 302,
    height: 308,
    borderRadius: 39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignInBox: {
    width: 147,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0B9B96',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpBox: {
    width: 147,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textaccount: {
    fontFamily: fonts.mediumoswald,
    fontSize: 15,
    alignSelf: 'center',
    color: colors.white,
  },
  textbottomm: {
    fontFamily: fonts.mediumoswald,
    color: colors.blue,
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: colors.blue,
    marginBottom: 10,
  },
  forgotpsw: {
    fontFamily: fonts.light_oswald,
    color: colors.mainColor,
    fontSize: 12,
  },
});
const Home = StyleSheet.create ({
  title: {
    fontFamily: fonts.mediumoswald,
    fontSize: 19,
    margin: 10,
  },
});
export default (theme = {Home, Login, sizes, Welcome, ChooseLanguage, Signin});
