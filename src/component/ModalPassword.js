import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors, fonts} from '../constants/theme';
import Button from '../component/Button'
import TextInput from '../component/TextInput'

export default class ModalPassword extends Component {
  
  state = {
    pass: false,
    pass2: false,
    pass3: false,
    passCurrent: null,
    passNew: null,
    passNewRe: null
  }

  _secureTextPassword=()=>{
    if(this.state.pass === false){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={true}
        value={this.state.passCurrent}
        secure={true}
        onPressSecure={()=>this.setState({pass: !this.state.pass})}
        onChangeText={value =>
          this.setState({passCurrent: value})}
          
      />
      );
    }
    else if(this.state.pass === true){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={false}
        value={this.state.passCurrent}
        secure={true}
        onPressSecure={()=>this.setState({pass: !this.state.pass})}
        onChangeText={value =>
            this.setState({passCurrent: value})}
      />
      );
    }
  }

  _secureTextPasswordNew=()=>{
    if(this.state.pass2 === false){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={true}
        value={this.state.passNew}
        secure={true}
        onPressSecure={()=>this.setState({pass2: !this.state.pass2})}
        onChangeText={value =>
          this.setState({passNew: value})}
          
      />
      );
    }
    else if(this.state.pass2 === true){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={false}
        value={this.state.passNew}
        secure={true}
        onPressSecure={()=>this.setState({pass2: !this.state.pass2})}
        onChangeText={value =>
            this.setState({passNew: value})}
      />
      );
    }
  }

  _secureTextPasswordNewRe=()=>{
    if(this.state.pass3 === false){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={true}
        value={this.state.passNewRe}
        secure={true}
        onPressSecure={()=>this.setState({pass3: !this.state.pass3})}
        onChangeText={value =>
          this.setState({passNewRe: value})}
          
      />
      );
    }
    else if(this.state.pass3 === true){
      return(
        <TextInput
        nameIcon="key"
        searchForm={true}
        placeholder={'Password'}
        secureTextEntry={false}
        value={this.state.passNewRe}
        secure={true}
        onPressSecure={()=>this.setState({pass3: !this.state.pass3})}
        onChangeText={value =>
            this.setState({passNewRe: value})}
      />
      );
    }
  }

  render () {
    return (
      <Modal {...this.props}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.contentView}>
              <Text style={{fontFamily: fonts.bold, fontSize: 20, textAlign: "center", marginTop: 10}}>Cập nhật mật khẩu</Text>

              <Text style={{fontFamily: fonts.light, fontSize: 17, marginLeft:10, marginTop: 18}}>Mật khẩu hiện tại</Text>

              <View style={{alignItems: 'center'}}>
                    {this._secureTextPassword()}
                </View>

            <Text style={{fontFamily: fonts.light, fontSize: 17, marginLeft:10,  marginTop: 10}}>Nhập mật khẩu mới</Text>

            <View style={{alignItems: 'center'}}>
            {this._secureTextPasswordNew()}
            </View>

            <Text style={{fontFamily: fonts.light, fontSize: 17, marginLeft:10,  marginTop: 10}}>Nhập lại mật khẩu mới</Text>
            <View style={{alignItems: 'center'}}>
            {this._secureTextPasswordNewRe()}
            </View>

            <Button
                  onPressBtn={
                   this.props.onPressBtn}
                  style={styles.button}
                  title="Cập nhật"
                  styleCustom={styles.text}
                />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create ({
  contentView: {
    width: 300,
    height: 390,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 50,
  },
  button: {
    marginVertical: 7,
    backgroundColor: '#50BAB6',
    width: 185,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom:10
  }, 
  text: {
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: 'center',
    color: colors.white,
  },
});
