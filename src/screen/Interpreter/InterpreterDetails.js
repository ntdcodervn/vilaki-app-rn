import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Header from '../../component/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fonts, colors} from '../../constants/theme';
import ImagePicker from 'react-native-image-picker';
import BASE_URL from './../../utils/misc'

export default class InterpreterDetails extends Component {
  constructor (props) {
    super (props);
    this.state = {
      videoUrl: null,
      paused: false,
    };
  }
  componentDidMount () {
    console.log(BASE_URL + this.props.navigation.state.params.item.avarta)
  }

  static navigationOptions = {header: null};
  
  _onPressBack = () => {
    this.props.navigation.navigate ('InterpreterSrceen');
  };

  _handleChooseVideo = () => {
    const options = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1,
    };
    ImagePicker.launchImageLibrary (options, response => {
      if (response) {
        this.setState ({videoUrl: response.uri});
      }
    });
  };

  render () {
   
    return (

      <SafeAreaView style={{flex: 1}}>
      <ScrollView>
          <Header
            hideBars={true}
            backIcon={true}
            onPressBack={() =>
              this.props.navigation.navigate ('InterpreterSrceen')}
            title="IntepreterDetails"
          />
          <Image style={{alignSelf: 'center',width:'100%',height:200}}  source={{uri : `${BASE_URL}${this.props.navigation.state.params.item.avarta}`}} />
          <View style={{marginHorizontal: 25}}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <FontAwesome name="user" size={20} color="#80DCD9" />
              <Text style={[styles.text, {fontFamily: fonts.boldoswald}]}>
                {this.props.navigation.state.params.item.fullName ? this.props.navigation.state.params.item.fullName : ''}
              </Text>
            </View>
            <View style={textStyle ('row', 10, 'center')}>
              <FontAwesome name="globe" size={20} color="#80DCD9" />
              <Text style={styles.text}>{this.props.navigation.state.params.item.language && this.props.navigation.state.params.item.language.length != 0 ? this.props.navigation.state.params.item.language[0] : 'Not update'}</Text>
            </View>
            <View style={textStyle ('row', 10, 'center')}>
              <FontAwesome name="map" size={20} color="#80DCD9" />
              <Text style={styles.text}>{this.props.navigation.state.params.item.locationWork ? this.props.navigation.state.params.item.locationWork : 'Not update'}</Text>
            </View>
            <View style={textStyle ('row', 10, 'center')}>
              <FontAwesome name="globe" size={20} color="#80DCD9" />
              <Text style={styles.text}>{this.props.navigation.state.params.item.order ? this.props.navigation.state.params.item.order : 0} Jobs Experiences</Text>
            </View>
            <View style={textStyle ('row', 10, 'center')}>
              <FontAwesome name="tag" size={20} color="#80DCD9" />
              <Text style={styles.text}>$ {this.props.navigation.state.params.item.price ? this.props.navigation.state.params.item.price : 0}</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.mainColor,
                marginTop: 10,
              }}
            />
            <Text
              style={{
                fontFamily: 'Oswald-Bold',
                fontSize: 17,
                marginVertical: 10,
              }}
            >
              Description
            </Text>
            <Text style={styles.description}>
              - Hi my name is Asley Tidale, I am
              a interpreter online, I have 3 language
              so please contact me, and follow
              my infomation
            </Text>
            <Text style={styles.description}>
              - Hi my name is Asley Tidale, I am
              a interpreter online, I have 3 language
              so please contact me, and follow
              my infomation
            </Text>
            <Text style={styles.description}>
              - Hi my name is Asley Tidale, I am
              a interpreter online, I have 3 language
              so please contact me, and follow
              my infomation
            </Text>

           

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate ('BookingSrceen',{item : this.props.navigation.state.params.item})}
              style={styles.button}
            >
              <Text style={styles.textdatngay}>Đặt ngay</Text>
            </TouchableOpacity>
          </View>
       
      </ScrollView>
      </SafeAreaView>
    );
  }
}
const textStyle = (flexDirection, marginTop, alignItems) => {
  return {
    flexDirection,
    marginTop,
    alignItems,
  };
};
const styles = StyleSheet.create ({
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: fonts.light_oswald,
  },
  boxshadows: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginHorizontal: 25,
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  money: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  moneyDetails: {
    fontFamily: 'Roboto-Medium',
    color: '#80DCD9',
    fontSize: 18,
  },
  description: {
    fontFamily: 'Oswald-Light',
    fontSize: 17,
    marginVertical: 10,
  },
  button: {
    width: 325,
    alignSelf: 'center',
    height: 43,
    backgroundColor: '#50BAB6',
    borderRadius: 26,
    marginVertical: 15,
  },
  textdatngay: {
    fontFamily: 'Oswald-Bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 5,
  },
  buttonInterpreter: {
    marginHorizontal: 5,
    borderRadius: 10,
    height: 28,
    backgroundColor: colors.mainColor,
  },
  buttonInterpreterText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Oswald-Bold',
    marginTop: 5,
  },
});
