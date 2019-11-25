import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../component/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';

export default class Chat extends Component {
  render () {
    const HEIGHT = Dimensions.get ('window').height;
    return (
      <SafeAreaView>
        <Header
          hideBars={true}
          backIcon={true}
          title="MESSAGE"
          onPressBack={() => {
            this.props.navigation.navigate ('MessageSrceen');
          }}
        />
        <ScrollView style={{height: HEIGHT - 220}} />
        <View style={{marginLeft: 20, borderTopColor: 'black'}}>
          <Text style={{fontSize: 17}}>Nội dung</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <TextInput
              placeholder={'Chạm để chọn nội dung...'}
              style={{
                width: 300,
                height: 75,
                backgroundColor: '#D4CECE',
                borderRadius: 20,
              }}
            />
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignSelf: 'center'}}
          >
            <Ionicons name="md-image" size={40} />
            <TouchableOpacity
              style={{
                backgroundColor: '#50BAB6',
                marginLeft: 200,
                flexDirection: 'row',
                padding: 10,
                borderRadius: 12,
                justifyContent: 'space-around',
              }}
            >
              <Ionicons name="md-send" size={20} color="white" />
              <Text style={{color: 'white', marginLeft: 10}}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
