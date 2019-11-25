import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  style,
} from 'react-native';
import {connect} from 'react-redux';
import {icons} from '../../utils/images';
import theme, {colors, fonts} from '../../constants/theme';
import InputText from '../../component/TextInput';
import TextInput from '../../component/TextInput';
import Button from '../../component/Button';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import BASE_URL from '../../utils/misc';

class Signin extends Component {
  state = {
    Emailvalue: '',
    Phonevalue: '',
    Passwordvalue: '',
    Repasswordvalue: '',
    isActive: 0,
    isModalVisible: false,
    seePass: false,
    seeRePass: false
  };

  _logIn=async()=>{
    let typeUser='5dc5535efadc8139a8e6f41e'
    
    if(this.props.person === 'user'){
      typeUser='5dc553c3fadc8139a8e6f41f'
    }
    const form = {      
      password: this.state.Passwordvalue,
      numberPhone : this.state.Phonevalue,     
    }
    try {
      let response = await fetch(
        'https://vilakyserverdemo.herokuapp.com/api/users/signIn',
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      )
      let jsonResponse = await response.json();
      console.log(jsonResponse)
      if (jsonResponse.status == 200 && jsonResponse.role===typeUser) {
        let fcmToken = await AsyncStorage.getItem ('fcmToken');
        let updateFcmToken = Axios.post(`${BASE_URL}/api/users/updateFcmToken`,{
              fcmToken  : fcmToken
            },{
              headers : {
                  'vilaki-auth-token' : jsonResponse.token
              }
            })
        try{
          AsyncStorage.getItem('Token',  (error,result)=>{
            AsyncStorage.mergeItem('Token',jsonResponse.token);
           
            
           
            this.setState({ isModalVisible: !this.state.isModalVisible });
          })
        }catch(error){
          AsyncStorage.setItem('Token',jsonResponse.token);
          
          this.setState({ isModalVisible: !this.state.isModalVisible });
        }
        
        
      }else {
        alert('Sign In fails')
      }
    } catch (errors) {
      alert(errors);
    }
  }

  _createAcount = async () => {
    let typeUsercreate='5dc5535efadc8139a8e6f41e'
    
    if(this.props.person === 'user'){
      typeUsercreate='5dc553c3fadc8139a8e6f41f'
    }
    const form = {
      email: this.state.Emailvalue,
      password: this.state.Passwordvalue,
      numberPhone : this.state.Phonevalue,
      fullName :"admin",
      role:typeUsercreate
    }
    if (form.password === this.state.Repasswordvalue) {
      try {
        let response = await fetch(
          'https://vilakyserverdemo.herokuapp.com/api/users/signUp',
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
          }
        )
        let jsonResponse = await response.json();
        console.log(jsonResponse)
        if (jsonResponse.status == 200) {
          //alert(jsonResponse.token)
          alert('Successful');
          
        //  AsyncStorage.setItem('Token',jsonResponse.token)
        //  AsyncStorage.getItem('Token',(err, result) => {
        //    data=result;
        //   alert(data)
        // })
          
        }else {
          alert('Sign Up fails')
        }
      } catch (errors) {
        alert(errors);
      }
    } else {
      alert('Wrong Retype Password')
    }
  }

  // toggleModal = () => {
  //   this.setState ({isModalVisible: !this.state.isModalVisible});
  // };

   _CheckPerson () {
   
    if (this.props.person === 'user') {
      this.props.navigation.navigate ('DrawerNav');
    } else if (this.props.person === 'interpreter') {
      this.props.navigation.navigate ('DrawerNav2');
    }
  }
  _onChangeValue = (stateName, value) => {
    switch (stateName) {
      case 'Email':
        this.setState ({Emailvalue: value});
        break;
      case 'PhoneNumber':
        this.setState ({Phonevalue: value});
        break;
      case 'Password':
        this.setState ({Passwordvalue: value});
        break;
      case 'rePassword':
        this.setState ({Repasswordvalue: value});
        break;
    }
  };

  _secureTextPassword=()=>{
    if(this.state.seePass === false){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={true}
        value={this.state.Passwordvalue}
        secure={true}
        onPressSecure={()=>this.setState({seePass: !this.state.seePass})}
        onChangeText={value =>
          this._onChangeValue ('Password', value)}
          
      />
      );
    }
    else if(this.state.seePass === true){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={false}
        value={this.state.Passwordvalue}
        secure={true}
        onPressSecure={()=>this.setState({seePass: !this.state.seePass})}
        onChangeText={value =>
          this._onChangeValue ('Password', value)}
      />
      );
    }
  }

  _secureTextPasswordRe=()=>{
    if(this.state.seeRePass === false){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={true}
        value={this.state.Repasswordvalue}
        secure={true}
        onPressSecure={()=>this.setState({seeRePass: !this.state.seeRePass})}
        onChangeText={value =>
          this._onChangeValue ('rePassword', value)}
          
      />
      );
    }
    else if(this.state.seeRePass === true){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={false}
        value={this.state.Repasswordvalue}
        secure={true}
        onPressSecure={()=>this.setState({seeRePass: !this.state.seeRePass})}
        onChangeText={value =>
          this._onChangeValue ('rePassword', value)}
      />
      );
    }
  }



  _changeTabs = index => {
    this.setState ({isActive: index});
  };
  _renderTabs (tab, index) {
    return (
      <TouchableOpacity
        key={index}
        style={[
          theme.Signin.SignInBox,
          this.state.isActive === index
            ? theme.Signin.SignInBox
            : theme.Signin.SignUpBox,
          this.state.style,
        ]}
        onPress={() => this._changeTabs (index)}
      >
        <Text
          style={[
            theme.Signin.textSignin,
            this.state.isActive === index
              ? theme.Signin.textSignin
              : theme.Signin.textSignUp,
            this.state.style,
          ]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }
  renderContent () {
    if (this.state.isActive === 1) {
      return (
        <ScrollView>
          <View style={theme.Signin.container}>
            <View style={theme.Signin.boxxanh}>
              <View style={theme.Signin.boxtrang}>
                <TextInput
                  nameIcon="user"
                  searchForm={true}
                  placeholder={'Email Address '}
                  value={this.state.Emailvalue}
                  onChangeText={value => this._onChangeValue ('Email', value)}
                />
                <TextInput
                  nameIcon="phone"
                  searchForm={true}
                  placeholder={'Phone number '}
                  value={this.state.Phonevalue}
                  onChangeText={value =>
                    this._onChangeValue ('PhoneNumber', value)}
                />
                {this._secureTextPassword()}
                {this._secureTextPasswordRe()}
              </View>
              <Button
                onPressBtn={this._createAcount}
                style={theme.Signin.button}
                title="Create Account"
                styleCustom={theme.Signin.SignText}
              />
            </View>
            <Text style={theme.Signin.textaccount}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChooselanguageSrceen')}>
              <Text style={theme.Signin.textbottomm}>Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if (this.state.isActive === 0) {
      return (
        <ScrollView>
          <View style={theme.Signin.container}>
            <View style={theme.Signin.boxxanh}>
              <View style={theme.Signin.boxtrang}>
                <TextInput
                  nameIcon="phone"
                  searchForm={true}
                  placeholder={'Phone number '}
                  value={this.state.Phonevalue}
                  onChangeText={value => this._onChangeValue ('PhoneNumber', value)}
                />
                 {this._secureTextPassword()}
                <TouchableOpacity>
                  <Text style={theme.Signin.forgotpsw}>
                    Forgot your password
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                onPressBtn={this._logIn}
                style={theme.Signin.button}
                title="Sign In"
                styleCustom={theme.Signin.SignText}
              />
            </View>
            <Text style={theme.Signin.textaccount}>Don't have account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChooselanguageSrceen')}>
              <Text style={theme.Signin.textbottomm}>Back</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.isModalVisible}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  height: '40%',
                  marginHorizontal: 20,
                  alignSelf: 'center',
                  borderRadius: 37,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.alert}>THÔNG BÁO</Text>
                <Text style={styles.textalert}>Đăng nhập thành công!</Text>
                <TouchableOpacity
                  onPress={() => this._CheckPerson ()}
                  style={styles.button}
                >
                  <Text style={styles.textdatngay}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ScrollView>
      );
    }
  }
  render () {
    const tabs = ['Sign In', 'Sign Up'];
    return (
      <ScrollView style={{backgroundColor: '#80DCD9'}}>
        <SafeAreaView style={theme.Signin.container}>
          <Image
            style={{alignSelf: 'center', marginTop: 10, width: 80, height: 80}}
            source={icons.logo2}
          />
          <Text style={theme.Signin.text}>VIKAKI</Text>
          <View style={theme.Signin.tab}>
            {tabs.map ((tab, index) => this._renderTabs (tab, index))}
          </View>
          <View style={{flex: 1}}>{this.renderContent ()}</View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create ({
  button: {
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
    paddingHorizontal: 40,
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
  textalert: {
    fontFamily: fonts.light_oswald,
    fontSize: 17,
    alignSelf: 'center',
  },
  total: {
    fontFamily: fonts.light_oswald,
    fontSize: 17,
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: fonts.mediumoswald,
    fontSize: 23,
  },
  alert: {
    fontFamily: fonts.boldoswald,
    color: colors.mainColor,
    fontSize: 26,
    alignSelf: 'center',
  },
});

const mapStateToProps = state => {
  return {
    person: state.person,
  };
};

export default connect (mapStateToProps, null) (Signin);
