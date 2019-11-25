import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sizes, fonts, colors} from '../constants/theme';

export default class PickerSelect extends Component {
  render () {
    return (
      <View
        style={[
          styles.container,
          this.props.style,
          {flexDirection: this.props.rowDirection ? 'row' : 'column'},
        ]}
      >
        {this.props.hideTitle
          ? null
          : <Text
              style={[
                styles.title,
                {
                  color: this.props.colorTitle ? this.props.colorTitle : '#000',
                  marginRight: this.props.rowDirection ? 7 : 0,
                  textAlign: this.props.rowDirection ? 'right' : 'left',
                  width: this.props.rowDirection ? 90 : '100%',
                },
              ]}
            >
              {this.props.title}
            </Text>}
        <View
          style={[
            {
              backgroundColor: this.props.bgPicker
                ? this.props.bgPicker
                : colors.lightGray,
              flex: this.props.rowDirection ? 1 : 0,
            },
          ]}
        >
          <RNPickerSelect
            onValueChange={value => this.props.onChangeValue (value)}
            items={this.props.data}
            value={this.props.value}
            placeholder={
              this.props.placeholder
                ? this.props.placeholder
                : {label: '- Vui lòng chọn  -', value: ''}
            }
            placeholderTextColor={
              this.props.placeholderTextColor
                ? this.props.placeholderTextColor
                : colors.gray
            }
            style={{
              inputIOS: {
                fontSize: sizes.textBase - 1,
                paddingVertical: 7,
                paddingHorizontal: 5,
                fontFamily: fonts.regular,
                color: this.props.color ? this.props.color : '#000',
                paddingRight: 20,
              },
              inputAndroid: {
                fontSize: sizes.textBase - 1,
                paddingHorizontal: 7,
                paddingVertical: 5,
                fontFamily: fonts.regular,
                color: this.props.color ? this.props.color : '#000',
                paddingRight: 20,
              },
              iconContainer: {
                top: Platform.OS == 'android' ? 10 : 4,
                right: 7,
              },
            }}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return (
                <Ionicons
                  name="ios-arrow-down"
                  size={15}
                  color={
                    this.props.placeholderIcon
                      ? this.props.placeholderIcon
                      : '#000'
                  }
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {marginVertical: 0},
  title: {
    marginBottom: 5,
    fontSize: sizes.textBase + 1,
    fontFamily: fonts.bold,
  },
});
