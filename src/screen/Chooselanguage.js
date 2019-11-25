import React, {Component} from 'react';
import {Text, SafeAreaView, View, Image,TouchableOpacity} from 'react-native';
import theme from '../constants/theme';
import PickerSelect from '../component/PickerSelect';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {checkPersonAction} from '../redux/action/personAction'

class Chooselanguage extends Component {
  constructor(props){
    super(props);
    this.state = {
      languageId: '',
    };
  }
  _onChangeLanguage = value =>{
    this.setState({
      languageId:value,
    })
  }

  _onPressUser=()=>{
    this.props.navigation.navigate('SigninSrceen');
    this.props.checkPersonAction('user')
  }

  _onPressInterpreter=()=>{
    this.props.navigation.navigate('SigninSrceen');
    this.props.checkPersonAction('interpreter')
  }
  render() {
    return (
      <SafeAreaView>
      <ScrollView>
        <View style={theme.ChooseLanguage.container}>
          <Text style={theme.ChooseLanguage.text}>CHOOSE LANGUAGE</Text>
          <PickerSelect
            placeholder={{label: 'Choose your language', value: 'en'}}
            value={this.state.languageId}
            onChangeValue={this._onChangeLanguage}
            data={[
              {label: 'Tiếng Việt', value: '3'},
              {label: 'English ', value: '4'},
              {label: 'Korean ', value: '5'},
            ]}
          />
          <Text style={theme.ChooseLanguage.text}>CHOOSE POSITION</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 54,
            }}>
            <TouchableOpacity
              onPress={() => this._onPressUser()}
              style={theme.ChooseLanguage.choosePosition}>
              <FontAwesome name="user" size={100} color="#50BAB6" />
              <Text style={theme.ChooseLanguage.textNomar}>GUEST</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={theme.ChooseLanguage.choosePosition}
              onPress={() => this._onPressInterpreter()}>
              <FontAwesome name="child" size={100} color="#50BAB6" />
              <Text style={theme.ChooseLanguage.textNomar}>INTEPRETERS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    person : state.person
  }
}

const mapDispatchToProps=dispatch=>{
    return bindActionCreators({checkPersonAction},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chooselanguage)
