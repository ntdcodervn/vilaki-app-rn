import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../constants/theme';
import {dataBookHistoryDetail} from '../utils/dataBookHistoryDetail';
import ItemFlatlistBookHistoryDetail from './ItemFlatlistBookHistoryDetail';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import BASE_URL from '../utils/misc';
import Icon from 'react-native-vector-icons/FontAwesome5'
export default class ItemFlatlistBookHistory extends Component {
  static navigationOptions = {header: null};
  constructor (props) {
    super (props);
    this.state = {
      inVisible: false,
      role : ''
    };
  }
  onConfirmBill = async (idBill) => {
    let token = await AsyncStorage.getItem('Token');
    let cofirmBill = await axios.post(`${BASE_URL}/api/bills/updateBillsStatus`,{
      idBill : this.props.item._id,
      status : 1
    },{
      headers : {
        'vilaki-auth-token' : token
      }
    })
    
    if(cofirmBill.data.status == 200) {
        alert('Xác nhận bill thành công')
    }
  }

  onCancelBill = async (idBill) => {
    let token = await AsyncStorage.getItem('Token');
    let cofirmBill = await axios.post(`${BASE_URL}/api/bills/updateBillsStatus`,{
      idBill : this.props.item._id,
      status : -1
    },{
      headers : {
        'vilaki-auth-token' : token
      }
    })
    if(cofirmBill.data.status == 200) {
        alert('Hủy bill thành công')
    }
  }
  _renderStatus (status) {
    if(this.state.role == 'Thông dịch viên') {
      if(status == 0){
        return (
          <>
          
              <Text style={styles.textColor4}>Đang chờ</Text>
              <View style={{flexDirection : 'row',width : '100%'}}>
            <TouchableOpacity onPress={() => this.onCancelBill()} style={styles.cancelBtn}>
              <Text style={styles.textColor4} >Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>this.onConfirmBill()} style={{...styles.cofirmBtn, marginLeft : 5}}>
              <Text style={styles.textColor4} >Xác nhận</Text>
            </TouchableOpacity>
            </View>
          </>
        )
      }
      else if(status == 1){
        return (<>
          
          <Text style={styles.textColor4}>Đã xác nhận</Text>
     
          <TouchableOpacity onPress={() =>this.onCancelBill()} style={styles.cancelBtn}>
            <Text  style={styles.textColor4}>Hủy</Text>
          </TouchableOpacity>
      </>)
      }else if(status == -1){
        return (<>
          
          <Text style={styles.textColor4}>Đã hủy</Text>
     
          
      </>)
      }
    }else {
      if(status == 0){
        return (
          <>
          
              <Text style={styles.textColor4}>Đang chờ</Text>
          
            <TouchableOpacity onPress={() =>this.onCancelBill()} style={styles.cancelBtn}>
              <Text  style={styles.textColor4} >Hủy</Text>
            </TouchableOpacity>

            
           
          </>
        )
      }
      else if(status == 1){
        return (<>
          
          <Text style={styles.textColor4}>Đã xác nhận</Text>
     
          <TouchableOpacity onPress={() =>this.onCancelBill()} style={styles.cancelBtn}>
            <Text  style={styles.textColor4}>Hủy</Text>
          </TouchableOpacity>
      </>)
      }else if(status == -1){
        return (<>
          
          <Text style={styles.textColor4}>Đã hủy</Text>
     
          
      </>)
      }
    }
  }
  async componentDidMount  () {
    let token = await AsyncStorage.getItem('Token');
    let CheckToken = await axios.get(`${BASE_URL}/api/users/getById`,{
      headers : {
        'vilaki-auth-token' : token
      }
    })
    console.log(CheckToken.data)
      this.setState({role : CheckToken.data.data.role.name});
      console.log(this.state.role);
  }

  _renderChild () {
    if (this.state.inVisible === true) {
      return (
        <View style={styles.viewDetail}>
          <Text style={styles.titleText}>INTERPRETER</Text>
          <FlatList
            data={dataBookHistoryDetail}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return <ItemFlatlistBookHistoryDetail {...item} />;
            }}
          />
          <View
            style={{
              backgroundColor: colors.mainColor,
              height: 1,
              width: '90%',
              marginHorizontal: 20,
            }}
          />
          <Text style={styles.totalDetail}>total: 5000.000.000 VNĐ</Text>
          <TouchableHighlight
            style={styles.buttonDetail}
            underlayColor="#fff"
            onPress={() => {
              alert ('Hello');
            }}
          >
            <Text style={styles.buttonTextDetail}>Close</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

 
  
  render () {
    return (
      <View style={{width : '100%', marginTop : 10, justifyContent : 'space-between', alignItems :'center'}}>
        <View style={styles.container}>
  

          <View style={{...styles.viewChild2, marginLeft:'5%'}}>
            <View style={{flexDirection : 'row'}}><Icon name='calendar-alt' style={{marginRight : 5}} size={15} color={'#FFF'}/><Text style={styles.textColor2}>{`Ngày ${new Date(this.props.item.dateCreate).getDate()}/${new Date(this.props.item.dateCreate).getMonth()}/${new Date(this.props.item.dateCreate).getFullYear()}`}</Text></View>
            <View style={{flexDirection : 'row'}}>
            <Text style={styles.textColor3}>
            {`Lúc ${new Date(this.props.item.dateCreate).getHours()}:${new Date(this.props.item.dateCreate).getMinutes()}h`}
            </Text></View>
            
          </View>

          <View style={{alignItems : 'flex-end', justifyContent : 'center', width : '50%', paddingRight : 20}}>
                {this._renderStatus(this.props.item.status)}
          </View>

         </View>
       
       
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    width : '90%',
    flexDirection: 'row',
    backgroundColor: '#50BAB6',
    height: 80,
    borderRadius : 5,
  },
 
  viewChild2: {
    flexDirection: 'column',
    width : '45%',
    justifyContent : 'center',
    alignItems : 'flex-start',
    
  },
  viewChild2f: {
   
  },
  viewChild2s: {
   
  },
  viewChild3: {
    
    justifyContent : 'center',
    alignItems : 'flex-start',
  },
  textColor1: {
    fontSize: 30,
    color: '#50BAB6',
  },
  cancelBtn : {
    backgroundColor : 'red', 
            padding : 5, 
            borderRadius : 10 , 
            width : 70 , alignItems : 'center', 
            justifyContent :'center'
  },
  cofirmBtn : {
    backgroundColor : 'green', 
            padding : 5, 
            borderRadius : 10 , width : 100 , 
            alignItems : 'center', 
            justifyContent :'center'
  },

  textColor2: {
    paddingLeft: 2,
    fontSize: 17,
    color: 'white',
  },
  textColor3: {
    paddingLeft: 2,
    fontSize: 25,
    color: 'white',
    fontWeight : 'bold'
  },
  textColor4: {
    paddingLeft: 2,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFF',
  },

  viewDetail: {
    backgroundColor: colors.white,
    borderColor: colors.mainColor,
    borderWidth: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    marginTop: -20,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.mainColor,
    marginLeft: 16,
    marginTop: 9,
    marginBottom: 15,
  },
  totalDetail: {
    marginVertical: 5,
    color: colors.black,
    fontFamily: fonts.regular,
    marginLeft: 200,
  },
  buttonDetail: {
    marginHorizontal: 150,
    borderRadius: 20,
    backgroundColor: colors.mainColor,
    marginBottom: 10,
  },
  buttonTextDetail: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
});
