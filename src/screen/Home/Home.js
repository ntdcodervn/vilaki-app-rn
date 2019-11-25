import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../../component/Header';
import ItemFlatlist from '../../component/ItemFlatlist';
import ItemFlatlistTravel from '../../component/ItemFlatlistTravel';
import theme, {fonts, colors} from '../../constants/theme';
import Button from '../../component/Button';
import {icons} from '../../utils/images';
import PickerSelect from '../../component/PickerSelect';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import ModalCalendar from '../../component/ModalCalendar';
import Axios from 'axios';
import BASE_URL from './../../utils/misc';
import AsyncStorage from '@react-native-community/async-storage'

export default class Home extends Component {
  static navigationOptions = {header: null};
  state = {
    province: '',
    ListTypeTranslator : [],
    typeLanguage: '',
    Searchvalue: '',
    languageFrom: '',
    languageTo: '',
    isVisible: false,
    selectedStartDate: moment ().toDate (),
    selectedEndDate: moment ().toDate (),
    data: [],
    data2: [
      {
        key: 1,
        title: 'Taipei',
      },
      {
        key: 2,
        title: 'USA',
      },
      {
        key: 3,
        title: 'Korean',
      },
    ],
    province: '',
    ward: '',
    Phuong: '',
  };

  async componentDidMount () {
    let getListTypeTranslator = await Axios.get(`${BASE_URL}/api/typetranslator/getListTypeTranslator`);
    let token = await AsyncStorage.getItem('Token');
   
    let response = await Axios.get(`${BASE_URL}/api/users/getListInterpreter`,{
      headers : {
        'vilaki-auth-token':token
      }
    })
   
  
    this.setState({
      ListTypeTranslator : getListTypeTranslator.data.data.map((value,index) => {
          let newObj = {
            label : value.name,
            value : value._id
          }
          return newObj;
      }),
      data:response.data.data
    })
    
  }
  componentWillUnmount () {
    
    Linking.removeEventListener (
      'https://www.msn.com/vi-vn/money/currencyconverter',
      this._handleOpenURL
    );
  }
  _handleOpenURL () {
    Linking.canOpenURL ('https://www.msn.com/vi-vn/money/currencyconverter')
      .then (supported => {
        if (!supported) {
          console.log (
            "Can't handle url: " +
              'https://www.msn.com/vi-vn/money/currencyconverter'
          );
        } else {
          return Linking.openURL (
            'https://www.msn.com/vi-vn/money/currencyconverter'
          );
        }
      })
      .catch (err => console.error ('An error occurred', err));
  }

  _onChangeLanguageFrom = value => {
    this.setState ({
      languageFrom: value,
    });
  };
  _onChangeLanguageTo = value => {
    this.setState ({
      languageTo: value,
    });
  };
  _onChangeProvince = value => {
    this.setState ({
      province: value,
    });
  };
  _onChangeType = value => {
    this.setState ({
      typeLanguage: value,
    });
  };

  _onChangeValue = (stateName, value) => {
    switch (stateName) {
      case 'province':
        this.setState ({province: value});
        break;
      case 'ward':
        this.setState ({ward: value});
        break;
      case 'Phuong':
        this.setState ({Phuong: value});
        break;
      case 'Skill':
        this.setState ({Skill: value});
    }
  };

  _renderService = () => {
    return (
      <View style={{marginBottom: 27}}>
        <Text style={[theme.Home.title, {marginBottom: 10}]}>SERVICE</Text>
        <View style={styles.serviceStyle}>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate ('MessageStack')}
            >
              <View style={styles.serviceChildStyles}>
                <FontAwesome
                  name="envelope-square"
                  size={30}
                  color={colors.white}
                />
              </View>
              <Text style={styles.textServiceStyle}>Message</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => this._handleOpenURL ()}>
              <View style={styles.serviceChildStyles}>
                <FontAwesome
                  name="dollar-sign"
                  size={30}
                  color={colors.white}
                />
              </View>
              <Text style={styles.textServiceStyle}>Currency</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  };
  _renderContentBestInter = () => (
    <ScrollView>
      <View style={{flex: 1}}>
        <Text style={theme.Home.title}>THE BEST INTERPRETER</Text>
        <View>
          <FlatList
            style={{marginBottom: 10}}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate ('InterpreterDetailsStack',{item})}
              >
                <ItemFlatlist item={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString ()}
          />
        </View>
      </View>
    </ScrollView>
  );
  _renderContentNews = () => (
    <View>
      <Text style={theme.Home.title}>THE FAVORITE PLACES TO TRAVEL</Text>
      <FlatList
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={this.state.data2}
        renderItem={({item}) => (
          <ItemFlatlistTravel
            onPressBtn={() => this.props.navigation.navigate ('NewsSrceen')}
            item={item}
          />
        )}
        keyExtractor={(item, index) => index.toString ()}
      />
    </View>
  );

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.setState ({
        selectedEndDate: date._i.year + "-" + (date._i.month+1) + "-" + date._i.day,
      });
    } else {
      this.setState ({
        selectedStartDate: date._i.year + "-" + (date._i.month+1) + "-" + date._i.day,
        selectedEndDate: date._i.year + "-" + (date._i.month+1) + "-" + date._i.day,
      });
    }
  };

  _renderDate = () => {
    const {selectedStartDate, selectedEndDate} = this.state;
    const minDate = new Date ();
    const startDate = selectedStartDate
      ? selectedStartDate.toString ()
      : moment ().toDate.toString ();
    const endDate = selectedEndDate
      ? selectedEndDate.toString ()
      : moment ().toDate.toString ();
    return (
      <TouchableOpacity
        onPress={() => this.setState ({isVisible: true})}
        style={{marginBottom: 20}}
      >
        <View style={styles.dateStyle}>
          <View style={styles.dateStartStyle}>
            <Text style={styles.dateTextStyle}>
              Ngày bắt đầu
            </Text>
            <Text style={styles.dateNumStyle}>
              {moment (startDate).format ('DD/MM/YYYY')}
            </Text>
          </View>

          <View style={{marginHorizontal: 15}}>
            <FontAwesome name="arrow-right" size={30} />
          </View>

          <View style={styles.dateEndStyle}>
            <Text style={styles.dateTextStyle}>
              Ngày kết thúc
            </Text>
            <Text style={styles.dateNumStyle}>
              {moment (endDate).format ('DD/MM/YYYY')}
            </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  onSearchingNow = async () => {
    let token = await AsyncStorage.getItem('Token');
    let searchNow = await Axios.get(`${BASE_URL}/api/searching/searchingNow?locationWork=${this.state.province}&languageForm=${this.state.languageFrom}&typeOfTranslator=${this.state.typeLanguage}&dateStart=${this.state.selectedStartDate}&dateEnd=${this.state.selectedEndDate}&role=5dc5535efadc8139a8e6f41e&languageTo=${this.state.languageTo}`)
    if(searchNow.data.status == 200)
    {
      console.log(searchNow);
      this.props.navigation.navigate ('InterpreterSrceen',{item : searchNow.data.doc})
    }else {
      alert('Vui lòng chọn tất cá các trường')
    }
    
  }
  render () {
    return (
      <SafeAreaView>
        <Header hideBars={true} title="Home" />
        <ScrollView style={{marginBottom: '10%'}}>
          <View>
            <ImageBackground style={{height: 240}} source={icons.sky}>
              <Image
                style={{alignSelf: 'center', marginTop: 20}}
                source={icons.logo3}
              />
              <Text
                style={{
                  fontFamily: fonts.bold,
                  color: 'white',
                  fontSize: 50,
                  alignSelf: 'center',
                }}
              >
                VILAKI
              </Text>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: 'white',
                  fontSize: 20,
                  alignSelf: 'center',
                }}
              >
                Dễ dàng tìm kiếm thông dịch viên
              </Text>
            </ImageBackground>
            <View style={{margin: 33}}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: 18,
                  color: '#000',
                }}
              >
                SEARCHING NOW
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <PickerSelect
                  style={{flex: 1, marginRight: 5}}
                  hideTitle={true}
                  bgPicker="#fff"
                  placeholder={{label: 'Chọn địa điểm'}}
                  value={this.state.province}
                  onChangeValue={this._onChangeProvince}
                  data={[
                    {label: 'Hồ Chí Minh', value: 'Hồ Chí Minh'},
                    {label: 'Đà Nẵng', value: 'Đà Nẵng'},
                    {label: 'Long An ', value: 'Long An'},
                  ]}
                />
                <PickerSelect
                  style={{flex: 1, marginLeft: 5}}
                  hideTitle={true}
                  bgPicker="#fff"
                  placeholder={{label: 'Loại hình phiên dịch'}}
                  value={this.state.typeLanguage}
                  onChangeValue={this._onChangeType}
                  data={this.state.ListTypeTranslator}
                />
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    elevation: 1,
                    borderRadius: 7,
                    marginVertical: 10,
                    height: 90,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 18,
                      color: '#707070',
                    }}
                  >
                    Chuyên ngành dịch
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <PickerSelect
                      placeholderIcon="#fff"
                      hideTitle={true}
                      bgPicker="#fff"
                      placeholder={{label: 'Chọn ngôn ngữ', value: ''}}
                      value={this.state.languageFrom}
                      onChangeValue={this._onChangeLanguageFrom}
                      data={[
                        {label: 'Tiếng Việt', value: 'Vietnamese'},
                        {label: 'English ', value: 'English'},
                        {label: 'Korean ', value: 'Korean'},
                      ]}
                    />
                    <FontAwesome name="arrow-right" size={12} color="gray" />
                    <PickerSelect
                      placeholderIcon="#fff"
                      hideTitle={true}
                      bgPicker="#fff"
                      placeholder={{label: 'Chọn ngôn ngữ', value: ''}}
                      value={this.state.languageTo}
                      onChangeValue={this._onChangeLanguageTo}
                      data={[
                        {label: 'Tiếng Việt', value: 'Vietnamese'},
                        {label: 'English ', value: 'English'},
                        {label: 'Korean ', value: 'Korean'},
                      ]}
                    />
                  </View>
                </View>

                {this._renderDate ()}

                <ModalCalendar
                  selectedStartDate={this.state.selectedStartDate}
                  selectedEndDate={this.state.selectedEndDate}
                  isVisible={this.state.isVisible}
                  onDateChange={this.onDateChange}
                  goBack={() => this.setState ({isVisible: false})}
                />
                <Button
                  onPressBtn={() =>
                   this.onSearchingNow()}
                  style={styles.button}
                  title="TÌM KIẾM NHANH"
                  styleCustom={styles.text}
                />
              </View>

            </View>
            {this._renderService ()}
            {this._renderContentBestInter ()}
            {this._renderContentNews ()}
          </View>
        </ScrollView>
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create ({
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 10,
  },
 button: {
    marginVertical: 7,
    backgroundColor: '#50BAB6',
    width: 185,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignSelf: 'center',
  }, 
  text: {
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
  serviceStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  serviceChildStyles: {
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: 67,
    height: 61,
    borderRadius: 6,
    marginBottom: 6,
  },
  textServiceStyle: {
    fontFamily: fonts.regular,
    fontSize: 18,
    textAlign: 'center',
  },
  buttonChoiceDateStyle: {
    backgroundColor: colors.mainColor,
    borderRadius: 10,
    marginHorizontal: 100,
    marginTop: 9,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
  },
  buttonDateTextStyle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginVertical: 5,
  },
  dateStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    borderColor: colors.gray,
    borderWidth: 0.5,
    marginTop: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateStartStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 50,
  },
  dateEndStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 50,
  },
  dateTextStyle: {
    fontFamily: fonts.medium,
    color: '#707070',
    fontSize: 15,
  },
  dateNumStyle: {
    fontFamily: fonts.light,
    alignSelf: 'center',
    fontSize: 21,
  },
});
