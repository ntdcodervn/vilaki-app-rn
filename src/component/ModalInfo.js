import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {colors, fonts} from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import BASE_URL from '../utils/misc';

export default class ModalInfo extends Component {
  setItem = (item) => {
   
    this.setState({
        item : item
    })
    console.log(this.state.item)
  }
  state = {
    item : {}
  }
  render () {
    return (
      <Modal {...this.props}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.contentView}>
            <View style={styles.headerStyle}>
              <Image
                source={{uri : `${BASE_URL}${this.state.item.avarta}`}}
                style={styles.imageStyle}
                resizeMode="cover"
              />
              <View style={styles.headerChildStyle}>
                <Text
                  style={{
                    fonstSize: 17,
                    fontFamily: fonts.bold,
                    marginTop: 30,
                  }}
                >
                  {this.state.item.fullName}
                </Text>
                <View style={styles.headerChildStyle2}>
                  <Text
                    style={{
                      fonstSize: 17,
                      fontFamily: fonts.bold,
                    }}
                  >
                    Age:
                  </Text>
                  <Text
                    style={{
                      fonstSize: 17,
                      fontFamily: fonts.bold,
                    }}
                  >
                    18
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                fonstSize: 20,
                fontFamily: fonts.bold,
                marginTop: 10,
                marginLeft: 15,
              }}
            >
              Interpreter
            </Text>

            <View>

              <View style={styles.descStyle}>
                <FontAwesome name="phone" color={colors.mainColor} size={20} />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: fonts.light,
                    marginLeft: 20,
                  }}
                >
                  {this.state.item.numberPhone}
                </Text>
              </View>

              <View style={styles.descStyle}>
                <FontAwesome name="home" color={colors.mainColor} size={20} />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: fonts.light,
                    marginLeft: 20,
                  }}
                >
                  {this.state.item.locationWork}
                </Text>
              </View>

              <View style={styles.descStyle}>
                <FontAwesome name="globe" color={colors.mainColor} size={20} />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: fonts.light,
                    marginLeft: 20,
                  }}
                >
                 {this.state.item.language && this.state.item.language.length != 0 ? this.state.item.language[0] : 'Not update'}
                </Text>
              </View>

              <View style={styles.descStyle}>
                <FontAwesome name="check" color={colors.mainColor} size={20} />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: fonts.light,
                    marginLeft: 20,
                  }}
                >
                  {this.state.item.order} job experience
                </Text>
              </View>
            </View>

            <View style={styles.butonViewStyle}>
              <TouchableOpacity
                style={styles.butonStyle}
                onPress={this.props.onPressMessage}
              >
                <View style={styles.butonViewChildStyle}>
                  <FontAwesome name="envelope" color={colors.white} size={20} />
                  <Text
                    style={{
                      marginLeft: 5,
                      fonstSize: 17,
                      fontFamily: fonts.bold,
                      color: colors.white,
                    }}
                  >
                    MESSAGE
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.butonStyle, {marginLeft: 1}]}
                onPress={this.props.onPressCall}
              >
                <View style={styles.butonViewChildStyle}>
                  <FontAwesome name="phone" color={colors.white} size={20} />
                  <Text
                    style={{
                      marginLeft: 5,
                      fonstSize: 17,
                      fontFamily: fonts.bold,
                      color: colors.white,
                    }}
                  >
                    Make a phone
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create ({
  contentView: {
    width: 300,
    height: 330,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 50,
  },
  imageStyle: {
    height: 90,
    width: 90,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 12,
    marginTop: 24,
    marginLeft: 20,
    marginBottom: 15,
  },
  headerStyle: {
    flexDirection: 'row',
  },
  headerChildStyle: {
    flexDirection: 'column',
    marginTop: 29,
    marginLeft: 12,
  },
  headerChildStyle2: {
    flexDirection: 'row',
  },
  descStyle: {
    flexDirection: 'row',
    marginTop: 9,
    marginLeft: 15,
  },
  butonViewStyle: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 23 :9,
    marginRight: 1
  },
  butonViewChildStyle: {
    flexDirection: 'row',
  },
  butonStyle: {
    backgroundColor: colors.mainColor,
    height: 35,
    width: 150,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
