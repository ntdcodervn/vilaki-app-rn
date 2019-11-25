import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/theme';

export default class ItemFlatlistImageDescription extends Component {
  _deleteImageList = () => {
    this.props.onPress;
  };
  render () {
    return (
      <View>
        <Image
          source={this.props.item}
          style={{
            width: 100,
            height: 150,
            marginHorizontal: 5,
            position: 'relative',
          }}
        />
        <View style={{position: 'absolute', top: -2, right: 6}}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Ionicons name="md-trash" size={25} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
