import React, { Component } from 'react'
import { Text, View, ScrollView, Image, ActivityIndicator, SafeAreaView } from 'react-native'
import theme from '../constants/theme';
import { icons } from '../utils/images';
import Button from '../component/Button';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import BASE_URL from '../utils/misc';


export default class Welcome extends Component {
  state = {
    text: 'dsadsad',
    loading : true
  }
  async componentDidMount() {
    let token = await AsyncStorage.getItem('Token');
    
      if(token) {
        this._movetoLogin();
      }else {
        this.setState({loading : false})
      }
    
    
  }

  async _movetoLogin() {
      let token = await AsyncStorage.getItem('Token');
    
      if(token) {
        console.log("hello")
        let CheckToken = await Axios.get(`${BASE_URL}/api/users/getById`,{
          headers : {
            'vilaki-auth-token' : token
          }
        })
        console.log(CheckToken)
        if (CheckToken.data.data.role.name == 'Khách hàng') {
          this.props.navigation.navigate ('DrawerNav');
        } else {
          this.props.navigation.navigate ('DrawerNav2');
        }
      }
  }
  render() {
    return (<>
      {this.state.loading ? <View style={{flex :1, justifyContent : 'center', alignItems : 'center'}}><ActivityIndicator size="large" color="#80DCD9" /></View> : 
        <SafeAreaView style={theme.Welcome.container}>
        <ScrollView>
          <View >
            <Image
              style={{ flex: 1, alignSelf: 'center', marginVertical: 30 }}
              source={icons.logo}
            />
            <Text style={theme.Welcome.title}>VILAKI</Text>
            <Button style={theme.Welcome.button} title="Welcome"  styleCustom={theme.Welcome.textz} onPressBtn={() => this.props.navigation.navigate('ChooselanguageSrceen')} />
          </View>
        </ScrollView>
      </SafeAreaView>
      }
      </>
    );
  }
}
