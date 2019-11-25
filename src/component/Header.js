import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import {sizes, fonts, colors} from '../constants/theme';

export default class Header extends Component {
  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.backIcon
          ? <TouchableOpacity
              style={{marginRight: 5}}
              onPress={() => this.props.onPressBack ()}
            >
              <MaterialCommunityIcons
                name={'keyboard-backspace'}
                size={35}
                color="#fff"
              />
            </TouchableOpacity>
          : null}
        {this.props.hideBars
          ? null
          : <TouchableOpacity onPress={() => this.props.onPressBar ()}>
              <MaterialCommunityIcons name={'menu'} size={35} color="#fff" />
            </TouchableOpacity>}
        <Text style={[styles.headerText, this.props.backgroundColor]}>
          {this.props.title}
        </Text>
        {this.props.rightIcon
          ? <TouchableOpacity onPress={() => this.props.onPressRightIcon ()}>
              <MaterialCommunityIcons
                name={this.props.iconName}
                size={35}
                color="#fff"
              />
            </TouchableOpacity>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: colors.mainColor,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: sizes.textBase + 6,
    flexGrow: 1,
    textAlign: 'center',
  },
});
