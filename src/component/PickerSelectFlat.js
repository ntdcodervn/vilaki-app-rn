import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,FlatList} from 'react-native'

export default class PickerSelectFlat extends Component {
    state = {
        isVisible : false
    }

    _onChangeVisible = () => {
        this.setState({
            isVisible : !this.state.isVisible
        })
        console.log(this.state.isVisible)
    }

    render() {
        return (
            <View style={{position : 'relative',width : '100%', height : 50}}>
             {this.state.isVisible == true ?  <View style={{width: 100,height:100,position:'absolute',bottom:0}}>
                    
                    <FlatList
                        data={this.props.item}
                        renderItem={({ item }) => <Text>{item.title}</Text>}
                        keyExtractor={item => item.id}
                    />
                   
                </View> : null}
                <TouchableOpacity onPress={() => {this._onChangeVisible()}}>
                    <View >
                        <Text>Chong Ngon Ngu</Text>
                    </View>
                </TouchableOpacity>
              
            </View>
        )
    }
}
