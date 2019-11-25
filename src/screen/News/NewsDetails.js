import React, { Component } from 'react'
import Headers from '../../component/Header'
import {Text, View, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';

export default class NewsDetails extends Component {
  static navigationOptions = {header: null};
  constructor(props){
        super(props);
        this.state = {
          discription:
            ' - Hi my name Long, asdasdasdasdasdasdasdasdsadsadcdsjcuweinc8ycgweyucbyaSDCuiABSXybsducbwybdcukeccewcd',
          discription2:
            ' - Hi my name Long, asdasdasdasdasdasdasdasdsadsadcdsjcuweinc8ycgweyucbyaSDCuiABSXybsducbwybdcukeccewcd',
        };
    }
    _onPressBack=()=>{
         this.props.navigation.navigate('NewsSrceen');
      };
    render() {
        return (
          <SafeAreaView>
            <Headers
              hideBars={true}
              backIcon={true}
              title="Tin tức chi tiết"
              onPressBack={() => this._onPressBack()}
            />
            <ScrollView>
              <Text style={styles.textHeader}>Du lịch Hàn Quốc giá rẻ </Text>
              <Text style={styles.textDate}>27/01/2019</Text>
              <Image
                source={require('../../assets/images/photo.jpeg')}
                style={styles.imageStyle}
              />
              <View style={styles.viewDiscription}>
                <Text style={styles.textDiscription}>Discription</Text>
                <Text style={styles.textChild}>{this.state.discription}</Text>
                <Text style={styles.textChild}>{this.state.discription2}</Text>
              </View>
            </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
  textHeader: {
    marginTop: 29,
    marginLeft: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textDate: {
    marginTop: 6,
    marginLeft: 20,
    fontSize: 17,
    color: '#A49F9F',
  },
  imageStyle: {
    width: 340,
    height: 190,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 13,
    marginBottom: 24,
  },
  viewDiscription: {
    marginHorizontal: 17,
    marginVertical: 5,
    borderTopColor: '#000',
    borderTopWidth: 0.5,
  },
  textDiscription: {
    marginVertical: 10,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  textChild: {
    fontSize: 20,
  },
});