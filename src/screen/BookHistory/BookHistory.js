import React, {Component} from 'react';
import {ActivityIndicator, View, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import Headers from '../../component/Header';
import ItemFlatlistBookHistory from '../../component/ItemFlatlistBookHistory';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import BASE_URL from '../../utils/misc';
import io from 'socket.io-client';

const socket = io(BASE_URL);
export default class BookHistory extends Component {
  static navigationOptions = {header: null};
  state = {
    dataBill : [],
    loading : true
  }
  componentDidMount = async () => {
    
    let token = await AsyncStorage.getItem('Token');
    
    let getData = await Axios.get(`${BASE_URL}/api/users/getById`,{
      headers : {
        'vilaki-auth-token' : token
      }
    })
  
   
    if(getData.data.data.role.name == 'Thông dịch viên') {
      let getListOrder = await Axios.get(`${BASE_URL}/api/bills/getBillsClientStatusAllIn`,{
        headers : {
          'vilaki-auth-token' : token
        }
      })
      this.setState({
        dataBill : getListOrder.data.data,
        loading : false
      })

    
  
    }else {
      let getListOrder = await Axios.get(`${BASE_URL}/api/bills/getBillsClientStatusAll`,{
        headers : {
          'vilaki-auth-token' : token
        }
      })
      this.setState({
        dataBill : getListOrder.data.data,
        loading : false
      })
    }
    console.log(this.state.dataBill)
    socket.on('BookingChange', async (data) => {
      console.log(getData.data.data._id)
        if(data.client == getData.data.data._id || data.interpreter == getData.data.data._id ){
          this.setState({
            dataBill : data.data
          })
        }
    })
  }

  
  render () {
    return (
      <>
        {this.state.loading ? <View style={{flex :1, justifyContent : 'center', alignItems : 'center'}}><ActivityIndicator size="large" color="#80DCD9" /></View> :
        <SafeAreaView><Headers hideBars={true} title="Book History" />

        <FlatList
          data={this.state.dataBill}
          keyExtractor={item => item._id}
          contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate ('BookHistoryDetailScreen', {
                    item
                  })}
              >
                <ItemFlatlistBookHistory item={item} index={index} />
              </TouchableOpacity>
            );
          }}
        /></SafeAreaView>
      }
        
      </>
    );
  }
}
