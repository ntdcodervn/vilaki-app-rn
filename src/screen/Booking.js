import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import Header from '../component/Header';
import PickerSelect from '../component/PickerSelect';
import TextInputComponent from '../component/TextInput';
import {colors, fonts, sizes} from '../constants/theme';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ModalCalendar from '../component/ModalCalendar';
import Axios from 'axios';
import BASE_URL from '../utils/misc';
import AsyncStorage from '@react-native-community/async-storage';
import SelectMultiple from 'react-native-select-multiple';


export default class Booking extends Component {
  static navigationOptions = {header: null};

  state = {
    languageId: '',
    service: [],
    location: '',
    description: '',
    Type_pay: '',
    listLocation:[],
    listTypePay:[],
    listServices:[],
    listServices2:[],
    isVisible: false,
    selectedStartDate: new Date(),
    selectedEndDate: new Date(),
    checked1: false,
    checked2: false,
  };

  handlerArray = value => {
    let item = this.state.service;
    this.state.listServices.map((value,key) => {

    })
    item.push (value);
    // switch (value) {
    //   case 'Dịch văn bản': {
    //     this.setState ({checked1: !this.state.checked1});
    //     if (this.state.checked1 == false) {
    //       item.push (value);
    //     } else if (this.state.checked1) {
    //       const remove = item.filter (i => i != value);
    //       this.setState({service: remove})
    //     }
    //     break;
    //   }

    //   case 'Phiên dịch': {
    //     this.setState ({checked2: !this.state.checked2});
    //     if (this.state.checked2 == false) {
    //       item.push (value);
    //     } else if (this.state.checked2) {
    //       const remove = item.filter (i => i != value);
    //       this.setState({service: remove})
    //     }
    //     break;
    //   }

    
    // }
  };

   componentDidMount = async () => {
    let token = await AsyncStorage.getItem('Token');
    let s = await Axios.get(`${BASE_URL}/api/typebills/getListTypeBills`,{
      headers : {
        'vilaki-auth-token' : token
      }
    });

    let s2 = await Axios.get(`${BASE_URL}/api/services/getListServices`,{
      headers : {
        'vilaki-auth-token' : token
      }
    });

    let s3 = await Axios.get(`${BASE_URL}/api/provinces/getListProvinces`,{
      headers : {
        'vilaki-auth-token' : token
      }
    });
    this.setState({
      listTypePay : s.data.data.map((value) => {
        return {
          label : value.name,
          value : value._id
        }
      }),
      listServices : s2.data.data.map((value)=> {
        return {
          label : value.name,
          value : value._id
        }
      }),
      listLocation : s3.data.data.map((value)=> {
        return {
          label : value.name,
          value : value._id
        }
      })
    })
      console.log(this.props.navigation.state.params.item)
  }

  _onChangeLanguage = value => {
    this.setState ({
      languageId: value,
    });
   
  };
  // _onChangeService = value => {
  //   this.setState ({
  //     service: value,
  //   });
   
  // };
  _onChangeLocation = value => {
    this.setState ({
      location: value,
    });
  };
  onChangeDescription = value => {
    this.setState ({
      description: value,
    });
  };

  onSelectionsService = service => {
    this.setState({listServices2: service})
  }

  onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      this.setState ({
        selectedEndDate: date,
      });
    } else {
      this.setState ({
        selectedStartDate: date,
        selectedEndDate: date,
      });
    }
  }; 
  _onChangeValue = (stateName, value) => {
    switch (stateName) {
   
      case 'Type_pay':
        this.setState({ Type_pay: value });
        break;
      case 'Discount':
        this.setState({ Discount: value });
    }
  }
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

  submit = async () => {
    if(this.state.service == '' || this.state.location == '' || this.state.Type_pay == ''){
      alert('Vui lòng chọn tất cả các trường');
    }else {
      let token = await AsyncStorage.getItem('Token');
      let subMitBill = await Axios.post(`${BASE_URL}/api/bills/addBills`,{
            price : this.props.navigation.state.params.item.price,
            numberCard : '',
            interpreter : this.props.navigation.state.params.item._id,
            dateStart : this.state.selectedStartDate,
            dateEnd : this.state.selectedEndDate,
            type : this.state.Type_pay,
            location : this.state.location,
            description : this.state.description,
            services : this.state.listServices2.map((value) => {return value.value;})
      },{
        headers : {
          'vilaki-auth-token' : token
        }
      })
      if(subMitBill.data.status == 200)
      {
        Alert.alert(
          'Thông báo',
          'Đặt thông dịch viên thành công, vui lòng chờ 5 phút, để thông dịch viên xác nhận.',
          [
            {text: 'OK', onPress: () => this.props.navigation.navigate('BookHistoryStack')},
          ],
          {cancelable: false},
        );
      }
      else if(subMitBill.data.status == 210)
      {
        Alert.alert(
          'Thông báo',
          subMitBill.data.msg,
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
      else {
        alert('Đặt lỗi vui lòng thử lại')
      }
      
      // this.props.navigation.navigate('BookHistoryStack')
    }
    
  }

  renderServices = () => {

      return (
      <SelectMultiple
            items={this.state.listServices}
            selectedItems={this.state.listServices2}
            onSelectionsChange={this.onSelectionsService}/>
      )
 
  }

  render () {
    return (
      <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        
          <Header
            hideBars={true}
            backIcon={true}
            onPressBack={() =>
              this.props.navigation.navigate ('InterpreterDetailsSrceen')}
            title="Booking Now"
          />
          <SafeAreaView style={{marginHorizontal: 15}}>

            {this._renderDate ()}

            <ModalCalendar
              selectedStartDate={this.state.selectedStartDate}
              selectedEndDate={this.state.selectedEndDate}
              isVisible={this.state.isVisible}
              onDateChange={this.onDateChange}
              goBack={() => this.setState ({isVisible: false})}
            />

<View>
  <Text style={{marginBottom: 5,
    fontSize: sizes.textBase + 1,
    fontFamily: fonts.bold,}}>Service (*)</Text>
        {this.renderServices()}

        </View>
            <PickerSelect
              title="Location (*)"
              bgPicker="#fff"
              placeholder={{label: 'Picking Location', value: 'en'}}
              value={this.state.location}
              onChangeValue={this._onChangeLocation}
              data={this.state.listLocation}
            />
            <PickerSelect
                title="Picking type to pay (*)"
                bgPicker="#fff"
                placeholder={{ label: 'Picking type to pay', value: 'en' }}
                value={this.state.Type_pay}
                onChangeValue={value => this._onChangeValue('Type_pay', value)}
                data={this.state.listTypePay}
              />
              <TextInputComponent
                value={this.state.Discount}
                title="Mã giảm giá"
                placeholder="Nhập mã giảm giá"
                customStyle={styles.textInput}
                onChangeText={value => this._onChangeValue('Discount', value)}
              />
            <TextInputComponent
              value={this.state.description}
              onChangeText={value => this.onChangeDescription(value)}
              title="Desciption Job"
              placeholder="Description Job"
              customStyle={styles.textInput}
            />

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.textbill}>1.</Text>
                <Text style={styles.textbill}>
                  Interpreter rental price
                </Text>
                <Text style={styles.textbill}>$ {this.props.navigation.state.params.item.price ? this.props.navigation.state.params.item.price : 0}</Text>
              </View>
              
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.mainColor,
                marginVertical: 15,
              }}
            />
            <Text style={styles.total}>Total: $ {this.props.navigation.state.params.item.price ? this.props.navigation.state.params.item.price : 0}</Text>
            <TouchableOpacity
              onPress={() => this.submit()}
              style={styles.button}
            >
              <Text style={styles.textdatngay}>Đặt ngay</Text>
            </TouchableOpacity>
          </SafeAreaView>
        
      </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create ({
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
  textInput: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.mainColor,
    borderRadius: 7,
  },
  textbill: {
    fontFamily: fonts.light_oswald,
    fontSize: 17,
  },
  total: {
    fontFamily: fonts.light_oswald,
    fontSize: 17,
    alignSelf: 'flex-end',
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
    fontFamily: fonts.mediumoswald,
    color: '#707070',
    fontSize: 16,
  },
  dateNumStyle: {
    fontFamily: fonts.light_oswald,
    alignSelf: 'center',
    fontSize: 25,
  },
});
