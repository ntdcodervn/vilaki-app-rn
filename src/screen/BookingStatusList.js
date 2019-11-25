import React, { Component } from 'react'
import { Text, View,FlatList,SafeAreaView } from 'react-native'
import Header from '../component/Header'
import Button from '../component/Button';
import ItemFlatlistBooking from '../component/ItemFlatlistBooking';


export default class BookingStatusList extends Component {
    state = {
        Searchvalue: '',
        data: [{
          key: 1,
          username: 'Asley Tidale',
          status: 'Waitting',
          total: '120000',
        },
        {
          key: 2,
          username: 'Asley Tidale',
          status: 'Waitting',
          total: '120000',
        },
        {
          key: 3,
          username: 'Asley Tidale',
          status: 'Waitting',
          total: '120000',
        },
        ],
        keyword: ''
      }
    render() {
        return (
            <SafeAreaView>
            <Header hideBars={true} backIcon={true} onPressBack={()=> this.props.navigation.navigate('ConfirmBillSrceen')} title='Bill Waitting' />
            <SafeAreaView>
            <FlatList
                           
                           data={this.state.data}
                           contentContainerStyle={{paddingBottom: 350}}
                           renderItem={({item, index}) => {
                             return (
                               <ItemFlatlistBooking item={item} index={index} />
                             );
                           }}
                         />
                          </SafeAreaView>
            </SafeAreaView>
        )
    }
}
