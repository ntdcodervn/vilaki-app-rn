import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, fonts} from '../constants/theme';

export default class ItemFlatlistPostList extends Component {
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.ImageContainer}>
          <Image
            source={this.props.item.image}
            style={{
              width: '100%',
              height: 137,
              borderRadius: 16,
            }}
          />
          <View style={styles.ImageChild}>
            <Ionicons name="ios-heart" size={25} color="red" />
          </View>
        </View>
        <Text style={styles.requireStyles}>{this.props.item.require}</Text>
        <View style={styles.descriptionStyle}>
          <View style={styles.descriptionChildStyle}>
            <FontAwesome
              name="user-alt"
              size={25}
              color="#50BAB6"
              style={{
                width: 30,
                height: 30,
                marginRight: 5,
              }}
            />
            <Text style={styles.nameStyles}>{this.props.item.name}</Text>
          </View>

          <View style={styles.descriptionChildStyle}>
            <FontAwesome
              name="globe"
              size={25}
              color="#50BAB6"
              style={{
                width: 30,
                height: 30,
                marginRight: 5,
              }}
            />
            <Text style={styles.localStyles}>{this.props.item.local}</Text>
          </View>

          <View style={styles.descriptionChildStyle}>
            <FontAwesome
              name="map-marker-alt"
              size={25}
              color="#50BAB6"
              style={{
                width: 30,
                height: 30,
                marginRight: 5,
              }}
            />
            <Text style={styles.cityStyles}>{this.props.item.city}</Text>
            <View style={styles.descriptionChildRightStyle}>
              <Text style={styles.vndStyle}>VND</Text>
              <Text style={styles.moneyStyle}>{this.props.item.money}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'column',
    borderColor: '#ccc',
    borderRadius: 16,
    borderWidth: 0.5,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  ImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    left: -5,
  },
  ImageChild: {
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 7,
    right: 12,
  },
  requireStyles: {
    fontFamily: fonts.regular,
    fontSize: 15,
    marginLeft: 15,
  },
  nameStyles: {
    fontFamily: fonts.regular,
    fontSize: 20,
    marginLeft: 10,
  },
  localStyles: {
    fontFamily: fonts.regular,
    fontSize: 12,
    marginLeft: 10,
  },
  cityStyles: {
    fontFamily: fonts.regular,
    fontSize: 15,
    marginLeft: 10,
  },
  descriptionStyle: {
    marginHorizontal: 6,
    marginVertical: 15,
    flexDirection: 'column',
  },
  descriptionChildStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionChildRightStyle: {
    marginLeft: 40,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  vndStyle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    marginRight: 5,
  },
  moneyStyle: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.red,
  },
});
