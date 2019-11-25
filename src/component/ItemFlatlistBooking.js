import React, { Component } from 'react'
import { Text, View, Image,StyleSheet } from 'react-native'
import { colors, fonts } from '../constants/theme'
import { icons } from '../utils/images'
import Button from './Button'

export default class ItemFlatlistBooking extends Component {
 
    render() {
        return (
            <View style={{backgroundColor:'#80DCD9',flexDirection:'row',justifyContent:'space-around',marginVertical:5}}>
               <Image style={{margin:10}} source={icons.blank} />
               <View style={{marginVertical:10,marginHorizontal:10}}>
                   <Text style={{fontFamily:'Oswald-Bold',color:'white',fontSize:16}} >{this.props.item.username}</Text>
                   <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>STATUS: {this.props.item.status}</Text>
                   <Text style={{color:'white',fontSize:16}}>TOTAL: ${this.props.item.total}</Text>
               </View>
               <Button onPressBtn={()=> this.props.navigation.navigate('InterpreterSrceen')} style={styles.button} title="Confirm" styleCustom={styles.text} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title:{
      fontFamily:fonts.boldoswald,fontSize:18,alignSelf:'center',marginVertical:10,
    },
    button:{
      marginVertical: 10,
        backgroundColor: '#50BAB6',
        width: 100,
        height: 40,
        borderRadius: 19,
        justifyContent:'center',
        alignSelf:'center'
    },
    text:{
      fontFamily: fonts.boldoswald,
      fontSize: 16,
      textAlign: 'center',
      color: colors.white,
    }
    })