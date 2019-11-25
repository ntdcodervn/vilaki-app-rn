import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Header from '../component/Header';
import {icons} from '../utils/images';
import {colors, fonts} from '../constants/theme';
import Button from '../component/Button';
import CalendarPicker from 'react-native-calendar-picker';

export default class BlankBook extends Component {
  render () {
    return (
      <SafeAreaView>
        <Header hideBars={true} backIcon={true} title="Booking Now" />
        <Image
          style={{
            width: 246,
            height: 246,
            alignSelf: 'center',
            marginTop: 100,
            marginBottom: 10,
          }}
          source={icons.blank2}
        />
        <Text
          style={{
            fontFamily: 'Roboto-Light',
            fontSize: 19,
            alignSelf: 'center',
            color: colors.gray,
          }}
        >
          There is notthing to display here
        </Text>
        <Button
          onPressBtn={() =>
            this.props.navigation.navigate ('InterpreterSrceen')}
          style={styles.button}
          title="Discovery Interpreter"
          styleCustom={styles.text}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create ({
  title: {
    fontFamily: fonts.boldoswald,
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#50BAB6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 40,
    borderRadius: 19,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.boldoswald,
    fontSize: 20,
    textAlign: 'center',
    color: colors.white,
  },
});
