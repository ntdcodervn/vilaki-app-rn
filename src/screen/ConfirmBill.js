import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../component/Header';
import { fonts, colors, sizes } from '../constants/theme';
import TextInputComponent from '../component/TextInput';
import PickerSelect from '../component/PickerSelect';
import Modal from "react-native-modal";
import Button from '../component/Button';
export default class ConfirmBill extends Component {
  state = {
    languageId: '',
    isModalVisible: false,
    isCenterModalVisible: false,
    First_Name: '',
    Last_Name: '',
    National: '',
    Email: '',
    National_code: '',
    Phone_number: '',
    Type_pay: '',
    Discount: ''
  }
  _onChangeValue = (stateName, value) => {
    switch (stateName) {
      case 'First Name':
        this.setState({ First_Name: value });
        break;
      case 'Last Name':
        this.setState({ Last_Name: value });
        break;
      case 'National':
        this.setState({ National: value });
        break;
      case 'Email':
        this.setState({ Email: value });
        break;
      case 'National_code':
        this.setState({ National_code: value });
        break;
      case 'Phone_number':
        this.setState({ Phone_number: value });
        break;
      case 'Type_pay':
        this.setState({ Type_pay: value });
        break;
      case 'Discount':
        this.setState({ Discount: value });
    }
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  movetoStatusBill = () => {
    this.props.navigation.navigate('BookingStatusScreen')
  }
  _onChangeLanguage = value => {
    this.setState({
      languageId: value,
    })
  }
  _renderCenterModal = () => {
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 4,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffffe6',
        }}>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: sizes.textBase,
            marginBottom: 5,
            textAlign: 'center',
          }}>
          Chuyển khoản
          </Text>
      </SafeAreaView>
    );
  }
  _showModal() {
    <View style={{ flex: 1 }}>
      <Button title="Show modal" onPressBtn={this.toggleModal} />
      <Modal isVisible={this.state.isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPressBtn={this.toggleModal} />
        </View>
      </Modal>
    </View>
  }
  render() {
    return (
      <View>
        <Header hideBars={true} backIcon={true} onPressBack={() => this.props.navigation.navigate('BookingSrceen')} title="Confirm Bill" />
        <SafeAreaView style={{ margin: 15 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, marginBottom: '30%' }}>
              <Text style={styles.title}>Your Infomation</Text>
              <TextInputComponent
                title="Name"
                value={this.state.First_Name}
                placeholder="Tên (Họ đệm theo hộ chiếu)"
                customStyle={styles.textInput}
                onChangeText={value => this._onChangeValue('First Name', value)} />
              <TextInputComponent title="Last Name"
                value={this.state.Last_Name}
                placeholder="Tên (Họ đệm theo hộ chiếu)"
                customStyle={styles.textInput}
                onChangeText={value => this._onChangeValue('Last Name', value)} />
              <PickerSelect
                title="National"
                bgPicker="#fff"
                placeholder={{ label: 'Picking Location', value: 'en' }}
                value={this.state.National}
                onChangeValue={value => this._onChangeValue('National', value)}
                data={[
                  { label: 'Tiếng Việt', value: '3' },
                  { label: 'English ', value: '4' },
                  { label: 'Korean ', value: '5' },
                ]}
              />
              <TextInputComponent
                title="Email"
                value={this.state.Email}
                placeholder="minhan2111@gmail.com"
                customStyle={styles.textInput}
                onChangeText={value => this._onChangeValue('Email', value)} />
              <PickerSelect
                title="National Code"
                bgPicker="#fff"
                value={this.state.National_code}
                placeholder={{ label: 'Vietnam (+84)', value: 'en' }}
                onChangeValue={value => this._onChangeValue('National_code', value)}
                data={[
                  { label: 'Tiếng Việt', value: '3' },
                  { label: 'English ', value: '4' },
                  { label: 'Korean ', value: '5' },
                ]}
              />
              <TextInputComponent
                value={this.state.Phone_number}
                title="Phone number"
                placeholder="097888987"
                customStyle={styles.textInput}
                onChangeText={value => this._onChangeValue('Phone_number', value)}
              />
              <PickerSelect
                title="Picking type to pay"
                bgPicker="#fff"
                placeholder={{ label: 'Picking type to pay', value: 'en' }}
                value={this.state.Type_pay}
                onChangeValue={value => this._onChangeValue('Type_pay', value)}
                data={[
                  { label: 'Tiếng Việt', value: '3' },
                  { label: 'English ', value: '4' },
                  { label: 'Korean ', value: '5' },
                ]}
              />
              <TextInputComponent
                value={this.state.Discount}
                title="Mã giảm giá"
                placeholder="Nhập mã giảm giá"
                customStyle={styles.textInput}
                onChangeText={value => this._onChangeValue('Discount', value)}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Tổng tiền</Text>
                <Text style={styles.title}>500.000 VNĐ</Text>
              </View>
              <TouchableOpacity onPress={this.movetoStatusBill} style={styles.button}>
                <Text style={styles.textdatngay}>Đặt ngay</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Modal isVisible={this.state.isModalVisible}>
                  <View style={{ backgroundColor: 'white', width: '80%', height: '40%', marginHorizontal: 20, alignSelf: 'center', borderRadius: 37, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.alert}>THÔNG BÁO</Text>
                    <Text style={styles.textalert}>Vui lòng chờ 5 phút để xác nhận</Text>
                    <TouchableOpacity onPress={this.toggleModal} style={styles.button}>
                      <Text style={styles.textdatngay}>Xác nhận</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center', height: 43, backgroundColor: '#50BAB6', borderRadius: 26, marginVertical: 15,
  },
  textdatngay: {
    fontFamily: 'Oswald-Bold', color: 'white', textAlign: 'center', fontSize: 18, paddingVertical: 5, paddingHorizontal: 40
  },
  textInput: {
    backgroundColor: 'white', borderBottomWidth: 1,
    borderBottomColor: colors.mainColor, borderRadius: 7
  },
  textbill: {
    fontFamily: fonts.light_oswald,
    fontSize: 17
  },
  textalert: {
    fontFamily: fonts.light_oswald,
    fontSize: 17,
    alignSelf: 'center'
  },
  total: {
    fontFamily: fonts.light_oswald,
    fontSize: 17,
    alignSelf: 'flex-end'
  },
  title: {
    fontFamily: fonts.mediumoswald,
    fontSize: 23
  },
  alert: {
    fontFamily: fonts.boldoswald,
    color: colors.mainColor,
    fontSize: 26,
    alignSelf: 'center'
  }
})
