import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {sizes, fonts, colors} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TextInputComponent extends Component {
  render() {
    if (this.props.searchForm) {
      return (
        <View style={styles.searchView}>
          <View style={styles.searchIcon}>
            <FontAwesome name={this.props.nameIcon} size={12} color="gray" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder={this.props.placeholder}
            secureTextEntry={this.props.secureTextEntry}
            value={this.props.value}
            onChangeText={value => this.props.onChangeText(value)}
          />
          {this.props.secure
          ? <TouchableOpacity
              style={styles.secureIcon}
              onPress={this.props.onPressSecure}
            >
              <FontAwesome name='eye' size={12} color="gray" />
            </TouchableOpacity>
          : null}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.props.hideTitle ? null : (
            <Text style={styles.title}>{this.props.title}</Text>
          )}
          <TextInput
            placeholder={this.props.placeholder}
            style={this.props.customStyle}
            value={this.props.value}
            onChangeText={value => this.props.onChangeText(value)}
            secureTextEntry={this.props.secureTextEntry ? true : false}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {marginVertical: 10, borderRadius:80},
  title: {
    marginBottom: 5,
    fontSize: sizes.textBase + 1,
    fontFamily: fonts.bold,
    borderRadius:7
  },
  textInput: {
    backgroundColor: colors.mainColor,
    padding: 7,
    borderBottomWidth:1,
    borderBottomColor:colors.mainColor
  },
  searchView: {
    height: 33,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: sizes.textBase,
    fontFamily: fonts.regular,
    paddingHorizontal: 10,
    marginVertical:15
  },
  searchInput: {
    height: 33,
    width:'90%',
    padding: 7,
    backgroundColor: colors.white,
    fontSize: sizes.textBase,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    fontFamily: fonts.regular,
    borderBottomWidth:1,
    borderBottomColor:colors.mainColor
  
  },
  searchIcon: {
    height: 33,
    padding: 7,
    justifyContent: 'center',
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  secureIcon: {
    height: 33,
    marginRight:1
  },
  btnSearch: {
    height: 33,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
