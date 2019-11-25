import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import {icons} from '../utils/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BASE_URL from './../utils/misc'
const {height, width} = Dimensions.get('window');

export default class ItemFlatlist extends Component {
  
  _renderLang = () => {
      let s = '';
      for(let i =0;i<this.props.item.language.length;i++)
      {
        if(i == this.props.item.language.length-1)
        {
          s = s + this.props.item.language[i];
        }else {
          s = s + this.props.item.language[i] +", ";
        }
        
      }
      
      return <Text style={styles.text}>{ this.props.item.language && this.props.item.language.length != 0 ? s : 'Not update' }</Text>;
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: '100%',
              height: 137,
              borderRadius: 16,
            }}
            source={{uri : `${BASE_URL}${this.props.item.avarta}`}}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <Image source={icons.evaluate} style={{width: 100, height: 20}} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <FontAwesome name="user" size={20} color="#80DCD9" />
            <Text style={[styles.text, {fontFamily: 'Roboto-Black'}]}>
              {this.props.item.fullName ? this.props.item.fullName : "Not update"}
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <FontAwesome name="globe" size={20} color="#80DCD9" />
            {this._renderLang()}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <FontAwesome name="map" size={20} color="#80DCD9" />
            <Text style={styles.text}>{this.props.item.locationWork ? this.props.item.locationWork : 'Not update' }</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <FontAwesome name="globe" size={20} color="#80DCD9" />
            <Text style={styles.text}>{this.props.item.order ? this.props.item.order  : 0 } jobs</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18}}> ${this.props.item.price ? this.props.item.price : 0} </Text>
           
          </View>
        </View>
      </View>
    );
  }
}

const textStyle = (flexDirection, marginTop, justifyContent) => {
  return {
    flexDirection,
    marginTop,
    justifyContent,
  };
};

const styles = StyleSheet.create ({
  text: {
    marginHorizontal: 10,
  },
  container: {
    flexDirection: 'column',
    borderColor: '#ccc',
    width : width - 40,
    borderRadius: 16,
    borderWidth: 0.5,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  moneyDetails: {
    fontFamily: 'Roboto-Medium',
    color: 'black',
    fontSize: 18,
    marginHorizontal: 10,
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
});
