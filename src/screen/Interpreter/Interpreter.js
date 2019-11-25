import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Header from '../../component/Header';
import TextInputComponent from '../../component/TextInput';
import ItemFlatlist from '../../component/ItemFlatlist';

import { NavigationEvents } from 'react-navigation';

import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'; 
import axios from 'axios';
import BASE_URL from './../../utils/misc'

class Interpreter extends Component {
  static navigationOptions = {header: null};
  state = {
    Searchvalue: '',
    data: [],
    keyword: '',
    role : 'Khách hàng',
    loading : true,
    loading2 : false
  };

  onSearchPage = async () => {
    console.log(this.props.navigation.state.params)
    if(this.props.navigation.state.params) {
      this.setState({ 
        data : this.props.navigation.state.params.item 
      })
    }else {
      let response = await axios.get(`${BASE_URL}/api/users/getListInterpreter`,{
        headers : {
          'vilaki-auth-token':token
        }
      })
     
      console.log(response.data.data)
      this.setState({
        data:response.data.data
      })
    
      
    
    let CheckToken = await axios.get(`${BASE_URL}/api/users/getById`,{
      headers : {
        'vilaki-auth-token' : token
      }
    })
  
   
      this.setState({role : CheckToken.data.data.role.name, loading : false})
    }
  }
  
  componentDidMount= async()=>{  
   
    let token = await AsyncStorage.getItem('Token');
    console.log(token)

    if(this.props.navigation.state.params) {
      this.setState({ 
        data : this.props.navigation.state.params.item ,
        loading : false
      })
    }else {
      let response = await axios.get(`${BASE_URL}/api/users/getListInterpreter`,{
        headers : {
          'vilaki-auth-token':token
        }
      })
     
      console.log(response.data.data)
      this.setState({
        data:response.data.data
      })
    
      
    
    let CheckToken = await axios.get(`${BASE_URL}/api/users/getById`,{
      headers : {
        'vilaki-auth-token' : token
      }
    })
  
   
      this.setState({role : CheckToken.data.data.role.name, loading : false})
    }
   
   
   
    
  }



  
  _onChangeValue = async (stateName, value) => {
    switch (stateName) {
      case 'Search':
          this.setState ({keyword: value,loading2 : true});
          let search = await axios.get(`${BASE_URL}/api/searching/searchByKeyword?keyword=${value}`);
          
          this.setState({
            data:search.data.doc
          })
          this.setState ({loading2 : false});
        
        break;
    }
  };

  _renderPerson = () => {
   
      return (
        <SafeAreaView style={{flex : 1}}>
          <Header
            hideBars={true}
            backIcon={true}
            onPressBack={() => this.props.navigation.navigate ('HomeSrceen')}
            title="IntepreterDetails"
            title="Intepreter"
          />
          <TextInputComponent
            nameIcon="search"
            searchForm={true}
            placeholder={'Search here '}
            value={this.state.keyword}
            onChangeText={value => { this._onChangeValue ('Search', value)}}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={styles.buttonfillter}
              onPress={() => this._onChangeValue ('Search','English')}
            >
              <Text style={{color: 'white', textAlign: 'center'}}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonfillter}
              onPress={() =>  this._onChangeValue ('Search','Vietnamese')}
            >
              <Text style={{color: 'white', textAlign: 'center'}}>Vietnamese</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonfillter}
              onPress={() => this._onChangeValue ('Search','Korean') }
            >
              <Text style={{color: 'white', textAlign: 'center'}}>Korean</Text>
            </TouchableOpacity>
            
          </View>
          
          {this.state.loading2 ? <ActivityIndicator style={{marginTop : 30}} size="large" color="#80DCD9" />  : this._renderContent ()}
        </SafeAreaView>
      );
    
  
 
  };

  _renderContent = () => (
    <ScrollView style={{marginTop: 15}}>
      <View style={{flex: 1}}>
        <Text style={theme.Home.title}>{this.state.data.length} result</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 300}}
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
  _renderNewFlatlist = () => (
    <View>
      <Text>Hello</Text>
    </View>
  );
  searchKey = value => {
    this.setState ({keyword: value});
  };

  render () {
    return (
          <>
        <NavigationEvents
                onDidFocus={() => this.onSearchPage()}
                />
         {this.state.loading ? <View style={{flex :1, justifyContent : 'center', alignItems : 'center'}}><ActivityIndicator size="large" color="#80DCD9" /></View> : this._renderPerson ()}
        </>
    );
  }
}
const styles = StyleSheet.create ({
  buttonfillter: {
    backgroundColor: '#80DCD9',
    paddingHorizontal: 10,
    borderRadius: 15,
    width: 100,
    paddingVertical: 5,
  },
});

const mapStateToProps = state => {
  return {
    person: state.person,
  };
};

export default connect (mapStateToProps, null) (Interpreter);
