import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {fonts} from '../constants/theme';

export default class ItemFlatlistNews extends Component {
  render () {
    return (
      <TouchableOpacity onPress={() => this.props.onPressNewsDT ()}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={this.props.item.image}
              style={{
                width: '100%',
                height: 137,
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#fff',
                borderRadius: 30 / 2,
                position: 'absolute',
                right: 12,
                top: 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="ios-heart" size={25} color="red" />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.itemContainer}>
              <FontAwesome
                name="bolt"
                size={25}
                color="#50BAB6"
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <Text style={styles.textTravel}>
                {this.props.item.travel}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <FontAwesome
                name="map-marker-alt"
                size={15}
                color="#B7BAB9"
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <Text style={styles.textChild}>
                {this.props.item.local}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <FontAwesome
                name="file-alt"
                size={15}
                color="#B7BAB9"
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <Text style={styles.textChild}>
                {this.props.item.detail}
              </Text>
            </View>
            <View
              style={[
                styles.itemContainer,
                {
                  justifyContent: 'space-between',
                  marginBottom: 11,
                },
              ]}
            >
              <Image
                source={this.props.item.evaluate}
                style={{width: 100, height: 20}}
              />
              <View style={[styles.itemContainer, {marginBottom: 0}]}>
                <Text style={styles.textVND}>VNĐ</Text>
                <Text style={styles.textPrice}>
                  {this.props.item.price}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    left: -5,
    top: 0,
  },
  contentContainer: {
    marginTop: 6,
    marginHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  textTravel: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: '#000',
  },
  textChild: {
    fontSize: 12,
    color: '#B7BAB9',
    fontFamily: fonts.regular,
  },
  textVND: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: '#000',
    marginRight: 5,
  },
  textPrice: {
    fontFamily: fonts.bold,
    color: '#50BAB6',
    fontSize: 18,
  },
});
