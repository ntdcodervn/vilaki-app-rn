import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {sizes, fonts, colors} from '../constants/theme';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderPerson extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image
          source={{uri : this.props.ImageView}}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={() => this.props.onPressSetting ()}>
          <MaterialCommunityIcons name="settings" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: colors.mainColor,
    paddingVertical: 20,
    alignItems: 'center',
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 12,
  },
  headerText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: sizes.textBase + 6,
    flexGrow: 1,
    textAlign: 'center',
  },
});
