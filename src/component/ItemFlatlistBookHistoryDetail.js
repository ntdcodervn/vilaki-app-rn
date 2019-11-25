import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors, fonts} from '../constants/theme';

export default class ItemFlatlistBookHistoryDetail extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.textView}>{this.props.service}</Text>
        <Text style={styles.textView}>{this.props.money}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 29,
    marginRight: 38,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  textView: {
    fontFamily: fonts.bold,
    fontSize: 17,
  },
});
