import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default class ItemFlatlistHistoryBooked extends Component {
  
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.childLeft}>
              <Image
                source={this.props.item.image}
                style={{width: 77, height: 83}}
                resizeMode="cover"
              />
            </View>
            <View style={styles.childRight}>
              <Text
                style={[styles.textStyle, {fontSize: 16, fontWeight: 'bold'}]}>
                {this.props.item.fullName ? this.props.item.fullName : "Not update"}
              </Text>
              <Text style={styles.textStyle}>{this.props.item.numberPhone}</Text>
              <Text style={styles.textStyle}>
                {this.props.item.language[0] ? this.props.item.language[0] : 'Not update' }
              </Text>
            </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50BAB6',
    marginVertical:5
  },
  childLeft: {
    marginHorizontal: 22,
  },
  childRight: {
    justifyContent: 'space-between',
    marginRight:5,
    lineHeight: 5
  },
  textStyle:{
      color: '#fff'
  }
});
