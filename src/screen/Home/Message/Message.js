import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Header from '../../../component/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dataMessenger} from '../../../utils/dataMessage';
import {colors, fonts} from '../../../constants/theme';
import Button from '../../../component/Button';

export default class Message extends Component {
  _onPressBack = () => {
    this.props.navigation.navigate ('HomeSrceen');
  };
  render () {
    const WIDTH = Dimensions.get ('window').width;

    _MessageBackup = () => {
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Nhập để tìm kiếm"
              style={{width: WIDTH - 40, fontSize: 19}}
            />

            <Ionicons name="md-search" size={25} style={{marginTop: 12}} />
          </View>
          <FlatList
            data={dataMessenger}
            keyExtractor={item => item.id}
            contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{flexDirection: 'row', flex: 1, padding: 10}}
                  onPress={() => {
                    this.props.navigation.navigate ('ChatSrceen');
                  }}
                >
                  <Image
                    style={{width: 50, height: 50}}
                    source={require ('../../../assets/images/minhan.jpg')}
                  />
                  <View style={{marginLeft: 20, width: WIDTH - 170}}>
                    <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                    <Text style={{marginTop: 5}}>{item.content}</Text>
                  </View>
                  <View>
                    <Ionicons
                      name="md-checkmark-circle"
                      size={17}
                      color="blue"
                      style={{marginLeft: 40}}
                    />
                    <Text style={{marginTop: 5}}>{item.time}</Text>

                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      );
    };
    return (
      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Header hideBars={true} title="MESSAGE" />
        <View style={styles.descView}>
          <Text style={styles.textDescStyle}>Trang này đang cập nhật</Text>
          <Button
            onPressBtn={() => this._onPressBack ()}
            style={styles.button}
            title="Quay lại HOME"
            styleCustom={styles.text}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  descView: {
    flexDirection: 'column',
    width: Dimensions.get ('window').width - 50,
    height: 200,
    marginTop: 200,
    borderRadius: 5,
    borderColor: colors.gray,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDescStyle: {
    fontSize: 26,
    fontFamily: fonts.bold,
  },
  button: {
    backgroundColor: '#50BAB6',
    width: 185,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  text: {
    fontFamily: fonts.boldoswald,
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
});
