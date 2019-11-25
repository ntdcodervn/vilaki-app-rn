import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {sizes, fonts, colors} from '../constants/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class Tab extends Component {
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.child}>
              <Text style={styles.textNum}>{this.props.numLeft}</Text>
              <Text style={styles.textTitle}>{this.props.textLeft}</Text>
            </View>
            <View style={[styles.child, {marginHorizontal: 1}]}>
                    <Text style={styles.textNum}>{this.props.numMid}</Text>
                    <Text style={styles.textTitle}>{this.props.textMid}</Text>
            </View>
            <View style={styles.child}>
              <Text style={styles.textNum}>{this.props.numRight}</Text>
              <Text style={styles.textTitle}>{this.props.textRight}</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.mainColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  child: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5
  },
  textNum: {
    color: colors.mainColor,
    fontSize: 22,
  },
  textTitle: {
    fontSize: 13,
    color: colors.mainColor,
  },
}); 