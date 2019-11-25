import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Header from '../../component/Header';
import Button from '../../component/Button';
import ItemFlatlistBookHistoryDetail
  from '../../component/ItemFlatlistBookHistoryDetail';
import ModalInfo from '../../component/ModalInfo';
import {fonts, colors} from '../../constants/theme';
import BASE_URL from '../../utils/misc';
import AsyncStorage from '@react-native-community/async-storage';
import {AirbnbRating} from 'react-native-elements'
import Axios from 'axios';

export default class BookHistoryDetial extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isVisible: false,
      role : '',
      star: 0,
    };
  }
  async componentDidMount () {
    console.log(this.props.navigation.state.params.item);
    let token = await AsyncStorage.getItem('Token');
    let roleFind = await Axios.get(`${BASE_URL}/api/users/getById`,{
      headers : {
        'vilaki-auth-token' : token
      }
    })

    this.setState({
      role : roleFind.data.data.role.name
    })
  }

  
  _renderStatus (status) {
    if(status == 0){
      return 'Đang chờ'
    }
    else if(status == 1){
      return 'Đã xác nhận'
    }else if(status == -1){
      return 'Đã hủy'
    }
}
_renderDate = (date) => {
  return `${new Date(date).getDate()}-${new Date(date).getMonth()}-${new Date(date).getFullYear()}`
}
_onPressModal = () => {
  this.refs.modalInfo.setItem(this.props.navigation.state.params.item.interpreter);
}

ratingCompleted (rating) {
  this.setState ({star: rating});
}
  render () {
    console.log(this.state.star)
    const {item} = this.props.navigation.state.params;
    return (
      <SafeAreaView>
        <Header
          title="Book Details"
          backIcon={true}
          onPressBack={() =>
            this.props.navigation.navigate ('BookHistoryScreen')}
          hideBars={true}
        />
        <ScrollView>
          <View style={{maginTop: 24, marginHorizontal: 25}}>
            <Text style={[styles.textInfoStyle, {marginTop: 24}]}>
              Thông tin người đặt
            </Text>

            <View style={[styles.infoViewStyle, {marginBottom: 10}]}>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Name : </Text>
                <Text style={[styles.descInfoTextStyle1, {marginLeft: 65}]}>
                  {item.client.fullName ? item.client.fullName  : 'Not update'}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>National : </Text>
                <Text style={[styles.descInfoTextStyle1, {marginLeft: 48}]}>
                {item.client.locationWork ? item.client.locationWork : 'Not update'}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Email : </Text>
                <Text style={[styles.descInfoTextStyle1, {marginLeft: 70}]}>
                {item.client.email ? item.client.email : 'Not update'}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Phone number : </Text>
                <Text style={[styles.descInfoTextStyle1, {marginLeft: 5}]}>
                  {item.client.numberPhone}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Role : </Text>
                <Text style={[styles.descInfoTextStyle1, {marginLeft: 5}]}>
                  {this.state.role}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Type to pay : </Text>
                <Text
                  style={[
                    styles.descInfoTextStyle1,
                    {marginLeft: 25, marginBottom: 24},
                  ]}
                >
                  {item.type.name}
                </Text>
              </View>
              
            </View>

            <Text style={styles.textInfoStyle}>
              Bill Infomation
            </Text>

            <View style={[styles.infoViewStyle, {marginBottom: 20}]}>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Date Start: </Text>
                <Text style={[styles.descInfoTextStyle, {marginLeft: 5}]}>
                {this._renderDate(item.dateStart)}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Date End : </Text>
                <Text style={[styles.descInfoTextStyle, {marginLeft: 8}]}>
                {this._renderDate(item.dateEnd)}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Location : </Text>
                <Text style={[styles.descInfoTextStyle, {marginLeft: 10}]}>
                  {item.location.name}
                </Text>
              </View>

              <View style={styles.descInfoStyle}>
                <Text style={styles.descInfoTextStyle}>Satus: </Text>
                <Text
                  style={[
                    styles.descInfoTextStyle,
                    {marginLeft: 5, color: 'green'},
                  ]}
                >
                  {this._renderStatus(item.status)}
                </Text>
              </View>

              <View style={{position: 'absolute', top: 10, right: 20}}>
                <Image
                  source={{uri : `${BASE_URL}${item.interpreter.avarta}`}}
                  style={styles.imageStyle}
                  resizeMode="cover"
                />
              </View>

              <View style={{position: 'absolute', top: 88, right: 5}}>
                <Button
                  onPressBtn={() =>{this._onPressModal();
                    this.setState ({isVisible: !this.state.isVisible})}}
                  style={styles.button}
                  title="Show info"
                  styleCustom={styles.text}
                />
              </View>

              <ModalInfo
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.setState ({isVisible: false})}
                onPressMessage={() => this.setState ({isVisible: false})}
                onPressCall={() => this.setState ({isVisible: false})}
                ref = {"modalInfo"}
              />

              <Text
                style={[
                  styles.descInfoTextStyle,
                  {marginLeft: 10, marginTop: 15, marginBottom: 25},
                ]}
              >
                Description jon: {item.description ? item.description : '...'}
              </Text>

              <FlatList
                contentContainerStyle={{paddingBottom: 10}}
                data={item.services}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return <ItemFlatlistBookHistoryDetail {...item} />;
                }}
              />
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: Dimensions.get ('window').width - 100,
                    alignItems: 'center',
                    backgroundColor: colors.black,
                    height: 1,
                  }}
                />
              </View>

              <View style={[styles.descInfoStyle, {marginBottom: 10}]}>
                <Text style={[styles.totalStyle, {marginLeft: 50}]}>
                  Total :
                </Text>
                <Text style={[styles.totalStyle, {marginLeft: 30}]}>
                  ${item.price}
                </Text>
              </View>
            </View>

            <Text style={[styles.textInfoStyle, {marginTop: 24}]}>
              Rating star
            </Text>
            <AirbnbRating
                  style={{marginBottom: 30}}
                  count={5}
                  reviews={['Bad', 'OK', 'Good', 'Very Good', 'Jesus']}
                  defaultRating={5}
                  size={30}
                  onFinishRating={rating => this.ratingCompleted (rating)}
                />
            
            <View style={{marginTop: 120}} />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  textInfoStyle: {
    fontFamily: fonts.bold,
    fontSize: 17,
    marginBottom: 6,
  },
  descInfoStyle: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 14,
  },
  infoViewStyle: {
    elevation: 1,
    borderRadius: 7,
    backgroundColor: colors.white,
  },
  descInfoTextStyle: {
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  descInfoTextStyle1: {
    fontFamily: fonts.light,
    fontSize: 15,
  },
  totalStyle: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 12,
  },
  button: {
    marginVertical: 7,
    backgroundColor: '#50BAB6',
    width: 110,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.bold,
    fontSize: 17,
    textAlign: 'center',
    color: colors.white,
  },
});
