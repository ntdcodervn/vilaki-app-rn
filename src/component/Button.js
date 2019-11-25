import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fonts, sizes} from '../constants/theme';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressBtn()}
        style={[
          styles.btnContainer,
          {backgroundColor: this.props.backgroundColor},
          this.props.style,
          this.props.boxShadow ? styles.boxShadow : null,
        ]}>
        <Text style={[styles.title,this.props.styleCustom]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: sizes.textBase,
    textAlign: 'center',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});