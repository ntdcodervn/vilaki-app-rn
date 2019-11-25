import React, { Component } from 'react'
import { Text, View, Image,TouchableOpacity } from 'react-native'
import { icons } from '../utils/images'

export default class ItemFlatlistTravel extends Component {
    render() {
        return (
            <TouchableOpacity onPress={()=> this.props.onPressBtn()} >
            <View style={{  marginHorizontal: 15,
                marginVertical: 10,}}>
              <Image style={{borderRadius:20}} source={icons.img2} />
              <Text style={{fontFamily:'Oswald-Medium',fontSize:17}}>{this.props.item.title}</Text>
            </View>
            </TouchableOpacity>
        )
    }
}
