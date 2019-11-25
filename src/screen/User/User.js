import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  Platform
} from 'react-native';
import HeaderPerson from '../../component/HeaderPerson';
import Tab from '../../component/Tab';
import PickerSelect from '../../component/PickerSelect';
import {colors, fonts} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {validateForm} from '../../utils/Validateform';
import AsyncStorage from '@react-native-community/async-storage'; 
import ModalBirthday from '../../component/ModalBirthday'
import axios from 'axios';
import ModalPassword from '../../component/ModalPassword'
import SelectMulti from 'react-native-select-multiple'
import BASE_URL from '../../utils/misc';

class User extends Component {
  constructor (props) {
    super (props);
    this.state = {
      indexUser: true,
      userdata:{},
      interpreterdata:[],
      indexInterpreter: 1,
      role : 'Khách hàng',
      isVisible: false,
      isVisible1: false,
      isVisiblePass: false,
      LNPD: ['Tour(80-150$)','Doanh nghiệp(120-150$)','Hội nghị(150-300$)','Cabin(>400$)'],
      NNPD:['English','Viet Nam','Korean','Other'],
      formUser: {
        sdt: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
            isLengthMobile: true,
          },
        },
        hoten: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        tuoi: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        diachi: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        email: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
            isEmail: true,
          },
        },
        workId: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        nationalId: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        languageId: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
      },

      formInterpreter: {
        email: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
            isEmail: true,
          },
        },
        sdt: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
            isLengthMobile: true,
          },
        },
        hoten: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        tuoi: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        sexId: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        workId: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        nationalId: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        CMND: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
            isLengthId: true,
          },
        },
        STKNH: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        ngayCap: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        noiCap: {
          value: '',
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        maSoTCN: {
          value: '',
          valid: true,
        },
        loaiHinhPhienDich: {
          value: [],
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        ngonNguPhienDich: {
          value: [],
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        imageBC: {
          value: null,
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        imageMTCMND: {
          value: null,
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        imageMSCMND: {
          value: null,
          valid: false,
          rules: {
            isRequired: true,
          },
        },
        videoGT: {
          value: null,
          valid: false,
          rules: {
            isRequired: true,
          },
        },
      },
    };
  }

  componentDidMount= async()=>{  
   
    let token = await AsyncStorage.getItem('Token');
    
    // let CheckToken = await axios.get(`${BASE_URL}/api/users/getById`,{
    //   headers : {
    //     'vilaki-auth-token' : token
    //   }
    // })
  
   
    //   this.setState({role : CheckToken.data.data.role.name})

    let response = await axios.get(`https://vilakyserverdemo.herokuapp.com/api/users/getById`,{
      headers : {
        'vilaki-auth-token':token
      },
     
    })
   
    console.log(response.data.data.avarta)
    this.setState({
      userdata:response.data.data,
      role : response.data.data.role.name
    })
   
   
  }
  _ReLoadUser = async()=>{
    let tokenReLoad = await AsyncStorage.getItem('Token');

    let response = await axios.get(`https://vilakyserverdemo.herokuapp.com/api/users/getById`,{
      headers : {
        'vilaki-auth-token':tokenReLoad
      },
     
    })
   
    console.log(response.data.data.avarta)
    this.setState({
      userdata:response.data.data
    })
  }

  _birthday=()=>{
    var today=new Date()
    var birthDate=new Date(this.state.userdata.birthDay)
    
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
  }
  onPressSettingUser = () => {
    this.setState ({indexUser: !this.state.indexUser});
  };

  onPressSettingInterpreter = () => {
    if (this.state.indexInterpreter <= 1) {
      this.state.indexInterpreter++;
      this.setState ({
        indexInterpreter: this.state.indexInterpreter,
      });
    } else {
      this.setState ({
        indexInterpreter: 1,
      });
    }
  };

  _onChangeText = (type, value) => {
    let formCopy = this.state.formInterpreter;
    formCopy[type].value = value;
    let rules = formCopy[type].rules;
    let valid = validateForm (value, rules);
    formCopy[type].valid = valid;
    console.log (formCopy);
    this.setState ({form: formCopy});
  };

  _onChangeTextUser = (type, value) => {
    let formCopy = this.state.formUser;
    formCopy[type].value = value;
    let rules = formCopy[type].rules;
    let valid = validateForm (value, rules);
    formCopy[type].valid = valid;
    this.setState ({form: formCopy});
  };

  _onChangeLanguageUser = value => {
    this._onChangeTextUser ('languageId', value);
  };

  _onChangeWorkUser = value => {
    this._onChangeTextUser ('workId', value);
  };
  _onChangeNationalUser = value => {
    this._onChangeTextUser ('nationalId', value);
  };

  _onChangeWork = value => {
    this._onChangeText ('workId', value);
  };

  _onChangeNational = value => {
    this._onChangeText ('nationalId', value);
  };

  _onChangeSex = value => {
    this._onChangeText ('sexId', value);
  };

  onSelectionsLHPD = selectLHPD => {
    this._onChangeText('loaiHinhPhienDich', selectLHPD)
  }

  onSelectionsNNPD = selectNNPD => {
    this._onChangeText('ngonNguPhienDich', selectNNPD)
  }

  _submitForm = async() => {
    let tokenInter = await AsyncStorage.getItem('Token');
    console.log(tokenInter);
  
    let getData= await axios.post('https://vilakyserverdemo.herokuapp.com/api/users/updateInfoClient',{
      "numberPhone": this.state.form.sdt.value,
      "fullName": this.state.form.hoten.value,
      "email":this.state.form.email.value,
      "type":'5dc54ff92c75ab0940dd311e',
      "nationality":"5dc6e8d06df7e716ec905e40",
      "idCardNumber":this.state.form.CMND.value,
      "banknumber":this.state.form.STKNH.value,
      "IdCardLocation":this.state.form.noiCap.value,
      "IdCardDate":this.state.form.ngayCap.value
    },headers={
      
      'vilaki-auth-token':tokenInter
    }  
   
    )
    console.log(getData)
    // let isFormValid = true;
    // let formToSubmit = {};
    // const formCopy = this.state.formInterpreter;
    // for (let key in formCopy) {
    //   isFormValid = isFormValid && formCopy[key].valid;
    //   formToSubmit[key] = formCopy[key].value;
    // }
    // if (getData.status==200) {
    //   Alert.alert ('Thông báo', 'Thành công!!!');
    // } else {
    //   Alert.alert ('Thông báo', 'Lỗi!!!');
    // }
    if (getData.status==200) {
      Alert.alert ('Thông báo', 'Thành công!!!');
    } else {
      Alert.alert ('Thông báo', 'Lỗi!!!');
    }
   
  };

  _submitFormUser = async() => {
   
    let tokenUser = await AsyncStorage.getItem('Token');
   console.log(tokenUser)
   const formData = new FormData();
   formData.append(
     'avatarUser',
    {
     name: photo.fileName,
     type: photo.type,
     uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")

    }
   );

    let post= await axios({
      method:'POST',
      url:'https://vilakyserverdemo.herokuapp.com/api/users/updateInfoClient',
      data:{
      "numberPhone":this.state.form.sdt.value,
      "fullName":this.state.form.hoten.value,
      "birthDay":"1999/11/11",
      "email":this.state.form.email.value,
      "type":"5dc54f8b2c75ab0940dd311d",
      "locationWork":this.state.form.diachi.value,
      "nationality":"5dd3cf601c9d44000030233d"
      }
    },headers={
      'vilaki-auth-token':tokenUser,
      'Content-Type': 'multipart/form-data',
      'x-auth-token': this.state.token,
      Accept: 'application/json',
    } 
   
   
    )
    console.log(post)
    // let isFormValid = true;
    // let formToSubmit = {};
    // const formCopy = this.state.formUser;
    // for (let key in formCopy) {
    //   isFormValid = isFormValid && formCopy[key].valid;
    //   formToSubmit[key] = formCopy[key].value;
    // }
    // if ( post.status==200) {
    //   Alert.alert ('Thông báo', 'Thành công!!!');
    // } else {
    //   Alert.alert ('Thông báo', 'Lỗi!!!');
    // }
    if(post.status==200){
      Alert.alert ('Thông báo', 'Thành công!!!');
    }else{
      Alert.alert ('Thông báo', 'Lỗi!!!');
    }
    this._ReLoadUser()

  };

  _handleChooseImageBC = () => {
    const options = {};
    ImagePicker.launchImageLibrary (options, response => {
      if (response.uri) {
        this._onChangeText ('imageBC', response.uri);
        console.log ('response thumbnail' + response.uri);
      }
    });
  };

  _handleChooseImageMTCMND = () => {
    const options = {};
    ImagePicker.launchImageLibrary (options, response => {
      if (response.uri) {
        this._onChangeText ('imageMTCMND', response.uri);
        console.log ('response thumbnail' + response.uri);
      }
    });
  };

  _handleChooseImageMSCMND = () => {
    const options = {};
    ImagePicker.launchImageLibrary (options, response => {
      if (response.uri) {
        this._onChangeText ('imageMSCMND', response.uri);
        console.log ('response thumbnail' + response.uri);
      }
    });
  };

  _handleChooseVideo = () => {
    const options = {
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1,
    };
    ImagePicker.launchImageLibrary (options, response => {
      if (response.uri) {
        this._onChangeText ('videoGT', response.uri);
      }
    });
  };

  _renderImageBC = () => {
    if (this.state.formInterpreter.imageBC.value === null) {
      return (
        <Image
          source={require ('../../assets/images/minhan.jpg')}
          style={{
            marginHorizontal: 5,
            width: 150,
            height: 130,
          }}
        />
      );
    } else {
      return (
        <Image
          source={{uri: this.state.formInterpreter.imageBC.value}}
          style={{
            marginHorizontal: 5,
            width: 150,
            height: 130,
          }}
        />
      );
    }
  };

  _renderImageMTCMND = () => {
    if (this.state.formInterpreter.imageMTCMND.value === null) {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            source={require ('../../assets/images/minhan.jpg')}
            style={{
              marginHorizontal: 5,
              width: 200,
              height: 150,
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: this.state.formInterpreter.imageMTCMND.value}}
            style={{
              marginHorizontal: 5,
              width: 200,
              height: 150,
            }}
          />
        </View>
      );
    }
  };

  _renderImageMSCMND = () => {
    if (this.state.formInterpreter.imageMSCMND.value === null) {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            source={require ('../../assets/images/minhan.jpg')}
            style={{
              marginHorizontal: 5,
              width: 200,
              height: 150,
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: this.state.formInterpreter.imageMSCMND.value}}
            style={{
              marginHorizontal: 5,
              width: 200,
              height: 150,
            }}
          />
        </View>
      );
    }
  };

  _renderVideo = () => {
    if (this.state.formInterpreter.videoGT.value === null) {
      return (
        <Image
          source={require ('../../assets/images/minhan.jpg')}
          style={{
            marginTop: 10,
            height: 500,
            width: '100%',
          }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.state.formInterpreter.videoGT.value &&
            <Video
              ref={ref => {
                this.player = ref;
              }}
              posterResizeMode="cover"
              style={{
                marginTop: 10,
                height: 500,
                width: '100%',
              }}
              source={{uri: this.state.formInterpreter.videoGT.value}}
              paused={this.state.paused}
              controls={true}
            />}
        </TouchableOpacity>
      );
    }
  };

  _renderUser = () => {
    return (
      <View>
        {this.state.indexUser == true
          ? <View style={styles.Container2}>
              <View style={styles.viewText}>
                <FontAwesome
                  style={styles.iconStyle}
                  name="user-alt"
                  size={18}
                  color={colors.mainColor}
                />
                <Text style={styles.textStyle}>
                 Họ và tên :  {this.state.userdata.fullName ? this.state.userdata.fullName:'Not update'}
                </Text>
              </View>

              <View style={styles.viewText}>
                <FontAwesome
                  style={styles.iconStyle}
                  name="calendar"
                  size={18}
                  color={colors.mainColor}
                />
              <Text style={styles.textStyle}>Tuổi : {this._birthday() ? this._birthday() : 'Not update'}</Text>
              </View>

              <View style={styles.viewText}>
                <FontAwesome
                  style={styles.iconStyle}
                  name="phone"
                  size={18}
                  color={colors.mainColor}
                />
                <Text style={styles.textStyle}> Số điện thoại : {this.state.userdata.numberPhone ? this.state.userdata.numberPhone:'Not update'}</Text>
              </View>

              <View style={styles.viewText}>
                <FontAwesome
                  style={styles.iconStyle}
                  name="map-marker-alt"
                  size={18}
                  color={colors.mainColor}
                />
                <Text style={styles.textStyle}>
                  Địa chỉ {this.state.userdata.locationWork  ?this.state.userdata.locationWork:'Not update'}
                </Text>
              </View>

              <View style={styles.viewText}>
                <FontAwesome
                  style={styles.iconStyle}
                  name="user"
                  size={18}
                  color={colors.mainColor}
                />
              <Text style={styles.textStyle}>
                {this.state.userdata.role ?this.state.userdata.role.name:'Not update'}
                </Text>
              </View>

              <View style={styles.viewText}>
                <FontAwesome
                  style={styles.iconStyle}
                  name="font-awesome"
                  size={18}
                  color={colors.mainColor}
                />
            <Text style={styles.textStyle}> Quốc tịch : {this.state.userdata.national ? this.state.userdata.national:'Not update'}</Text>

                
              </View >
                 

                <TouchableHighlight
                  style={[styles.buttonStyle, {marginBottom: 10}]}
                  underlayColor="#fff"
                  onPress={()=>this.setState({isVisiblePass : !this.state.isVisiblePass})}
                >
                  <Text style={styles.buttonTextStyle}>
                  Cập nhật password
                  </Text>
                </TouchableHighlight>

                  <ModalPassword isVisible={this.state.isVisiblePass}
                  onPressBtn={()=>this.setState({isVisiblePass : !this.state.isVisiblePass})}/>
            </View>
          : <ScrollView>
              <View style={styles.container}>
                <TextInput
                  style={[styles.textInputStyle,{marginTop: Platform.OS === "ios" ? 15 : 0}]}
                  placeholder="Nhập họ và tên"
                  placeholderTextColor="#000"
                  value={this.state.formUser.hoten}
                  onChangeText={value =>
                    this._onChangeTextUser ('hoten', value)}
                />

              <View style={{flexDirection: 'row',flex:1, marginTop: Platform.OS === "ios" ? 15 : 15}}>
              <Text style={[styles.textInputStyle ,{flex:6}]}>
                {this.state.formUser.tuoi.value}
                </Text>
                <TouchableOpacity style={{backgroundColor: colors.mainColor, width:70, height: 30, borderRadius:6, flex:3, justifyContent: 'center'}} onPress={()=>this.setState({isVisible1: !this.state.isVisible1})}>
                  <Text style={{color: colors.white, textAlign: "center", fontSize: 17}}>Ngày sinh</Text>
                </TouchableOpacity>
                </View>
              
              <ModalBirthday
              birthdaySelect={this.state.formUser.tuoi.value}
              isVisible={this.state.isVisible1}
              onDateChange={this._onChooseBirthday1}
              goBack={() => this.setState ({isVisible1: false})}/>

                <TextInput
                 style={[styles.textInputStyle,{marginTop: Platform.OS === "ios" ? 15 : 0}]}
                  keyboardType="numeric"
                  placeholder="Số điện thoại"
                  value={this.state.formUser.sdt}
                  placeholderTextColor="#000"
                  onChangeText={value => this._onChangeTextUser ('sdt', value)}
                />

                <TextInput
                  style={[styles.textInputStyle,{marginTop: Platform.OS === "ios" ? 15 : 0}]}
                  placeholder="Nhập địa chỉ"
                  placeholderTextColor="#000"
                  value={this.state.formUser.diachi}
                  onChangeText={value =>
                    this._onChangeTextUser ('diachi', value)}
                />

                <TextInput
                  style={[styles.textInputStyle,{marginTop: Platform.OS === "ios" ? 15 : 0}]}
                  keyboardType="email-address"
                  placeholder="Email"
                  placeholderTextColor="#000"
                  value={this.state.formUser.email}
                  onChangeText={value =>
                    this._onChangeTextUser ('email', value)}
                />

                <PickerSelect
                  title="Ngôn ngữ"
                  style={[styles.pickerStyle, {marginTop: 30}]}
                  value={this.state.languageId}
                  onChangeValue={this._onChangeLanguageUser}
                  data={[
                    {label: 'Tiếng Việt', value: 'Tiếng Việt'},
                    {label: 'English ', value: 'English'},
                    {label: 'Korean ', value: 'Korean'},
                  ]}
                />

                <PickerSelect
                  title="Bạn là ?"
                  style={styles.pickerStyle}
                  value={this.state.workId}
                  onChangeValue={this._onChangeWorkUser}
                  data={[
                    {label: 'Học sinh', value: 'Học sinh'},
                    {label: 'Sinh viên', value: 'Sinh viên'},
                    {label: 'Giáo viên', value: 'Giáo viên'},
                  ]}
                />

                <PickerSelect
                  title="Quốc tịch "
                  style={styles.pickerStyle}
                  value={this.state.nationalId}
                  onChangeValue={this._onChangeNationalUser}
                  data={[
                    {label: 'Việt Nam', value: 'Việt Nam'},
                    {label: 'Korea', value: 'Korea'},
                    {label: 'American', value: 'American'},
                  ]}
                />
                <View style={ {flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <TouchableHighlight
                  style={[styles.buttonStyle, {marginBottom: 10}]}
                  underlayColor="#fff"
                  onPress={() => this._submitFormUser ()}
                >
                  <Text style={styles.buttonTextStyle}>
                    Cập nhật
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.buttonStyle, {marginBottom: 10}]}
                  underlayColor="#fff"
                  onPress={() => this._logout()}
                >
                  <Text style={styles.buttonTextStyle}>
                    Đăng xuất
                  </Text>
                </TouchableHighlight>
                </View>
              </View>
             
            </ScrollView>}
      </View>
    );
  };


 
  _onChooseBirthday=(date)=>{
    this._onChangeText('tuoi',date._i.year + "-" + (date._i.month+1) + "-" + date._i.day)
  }

  _onChooseBirthday1=(date)=>{
    this._onChangeTextUser('tuoi',date._i.year + "-" + (date._i.month+1) + "-" + date._i.day)
  }


  _renderInterpreter = () => {
    if (this.state.indexInterpreter === 2) {
      return (
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.titleInterpreter, {marginTop: 15}]}>
              INFO INTERPRETER
            </Text>
          </View>
          <ScrollView>
            <View style={styles.container}>
              <TextInput
                style={styles.textInputStyle}
                placeholder="Nhập họ và tên"
                placeholderTextColor="#000"
                value={this.state.formInterpreter.hoten.value}
                onChangeText={value => this._onChangeText ('hoten', value)}
              />

            
              <View style={{flexDirection: 'row',flex:1, marginTop: Platform.OS === "ios" ? 20 : 15}}>
              <Text style={[styles.textInputStyle ,{flex:6}]}>
                {this.state.formInterpreter.tuoi.value}
                </Text>
                <TouchableOpacity style={{backgroundColor: colors.mainColor, width:70, height: 30, borderRadius:6, flex:3, justifyContent: 'center'}} onPress={()=>this.setState({isVisible: !this.state.isVisible})}>
                  <Text style={{color: colors.white, textAlign: "center", fontSize: 17}}>Ngày sinh</Text>
                </TouchableOpacity>
                </View>
              
              <ModalBirthday
              birthdaySelect={this.state.formInterpreter.tuoi.value}
              isVisible={this.state.isVisible}
              onDateChange={this._onChooseBirthday}
              goBack={() => this.setState ({isVisible: false})}/>

              <TextInput
                style={[styles.textInputStyle, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}
                placeholder="Số điện thoại"
                keyboardType="numeric"
                value={this.state.formInterpreter.sdt.value}
                placeholderTextColor="#000"
                onChangeText={value => this._onChangeText ('sdt', value)}
              />

              <TextInput
                style={[styles.textInputStyle, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#000"
                value={this.state.formInterpreter.email.value}
                onChangeText={value => this._onChangeText ('email', value)}
              />

              <PickerSelect
                title="Giới tính"
                style={[styles.pickerStyle, {marginTop: 30}]}
                value={this.state.formInterpreter.sexId.value}
                onChangeValue={this._onChangeSex}
                data={[
                  {label: 'Nam', value: 'Nam'},
                  {label: 'Nữ', value: 'Nữ'},
                ]}
              />

              <PickerSelect
                title="Bạn là ?"
                style={styles.pickerStyle}
                value={this.state.formInterpreter.workId.value}
                onChangeValue={this._onChangeWork}
                data={[
                  {label: 'Học sinh', value: 'Học sinh'},
                  {label: 'Sinh viên', value: 'Sinh viên'},
                  {label: 'Giáo viên', value: 'Giáo viên'},
                ]}
              />

              <PickerSelect
                title="Quốc tịch "
                style={styles.pickerStyle}
                value={this.state.formInterpreter.nationalId.value}
                onChangeValue={this._onChangeNational}
                data={[
                  {label: 'Việt Nam', value: 'Việt Nam'},
                  {label: 'Korea', value: 'Korea'},
                  {label: 'American', value: 'American'},
                ]}
              />

              <TextInput
                style={styles.textInputStyle}
                placeholder="Số CMND"
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={this.state.formInterpreter.CMND.value}
                onChangeText={value => this._onChangeText ('CMND', value)}
              />

              <TextInput
                style={[styles.textInputStyle, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}
                placeholder="Số tài khoản ngân hàng"
                placeholderTextColor="#000"
                keyboardType="numeric"
                value={this.state.formInterpreter.STKNH.value}
                onChangeText={value => this._onChangeText ('STKNH', value)}
              />

              <View
                style={[styles.viewTextInterpreter, {flex: 1, marginTop: 20}]}
              >
                {/* <TextInput
                  style={[styles.textInputStyle, {flex: 8}]}
                  placeholder="Hình bằng cấp"
                  placeholderTextColor="#000"
                /> */}
                {this._renderImageBC ()}
                <TouchableHighlight
                  style={styles.buttonInterpreter}
                  onPress={() => this._handleChooseImageBC ()}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonInterpreterText}>
                    Hình bằng cấp
                  </Text>
                </TouchableHighlight>
              </View>

              <View style={{flex: 1, marginTop: 20}}>
                {/* <TextInput
                  style={[styles.textInputStyle, {flex: 8}]}
                  placeholder="Video giới thiệu bản thân"
                  placeholderTextColor="#000"
                /> */}
                <TouchableHighlight
                  style={[styles.buttonInterpreter, {marginTop: 10}]}
                  onPress={() => this._handleChooseVideo ()}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonInterpreterText}>
                    Video bản thân
                  </Text>
                </TouchableHighlight>
                {this._renderVideo ()}
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                }}
              >
                {/* <TextInput
                  style={[styles.textInputStyle, {flex: 8}]}
                  placeholder="Hình mặt trước CMND"
                  placeholderTextColor="#000"
                /> */}
                <TouchableHighlight
                  onPress={() => this._handleChooseImageMTCMND ()}
                  style={[styles.buttonInterpreter, {marginBottom: 10}]}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonInterpreterText}>
                    Hình mặt trước CMND
                  </Text>
                </TouchableHighlight>
                {this._renderImageMTCMND ()}
              </View>

              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                }}
              >
                {/* <TextInput
                  style={[styles.textInputStyle, {flex: 8}]}
                  placeholder="Hình mặt sau CMND"
                  placeholderTextColor="#000"
                /> */}
                <TouchableHighlight
                  onPress={() => this._handleChooseImageMSCMND ()}
                  style={[styles.buttonInterpreter, {marginBottom: 10}]}
                  underlayColor="#fff"
                >
                  <Text style={styles.buttonInterpreterText}>
                    Hình mặt sau CMND
                  </Text>
                </TouchableHighlight>
                {this._renderImageMSCMND ()}
              </View>

              <TextInput
                style={[styles.textInputStyle, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}
                placeholder="Ngày cấp"
                placeholderTextColor="#000"
                value={this.state.formInterpreter.ngayCap.value}
                onChangeText={value => this._onChangeText ('ngayCap', value)}
              />

              <TextInput
                style={[styles.textInputStyle, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}
                placeholder="Nơi cấp"
                placeholderTextColor="#000"
                value={this.state.formInterpreter.noiCap.value}
                onChangeText={value => this._onChangeText ('noiCap', value)}
              />

              <View style={{marginVertical: 20}}>
                <Text style={styles.maSoTCNStyle}>
                  (*)Không bắt buộc, tuy nhiên sẽ tính thêm 10%
                  trong mỗi giao dịch
                </Text>

                <TextInput
                  style={[styles.textInputStyle, {marginTop: Platform.OS === 'ios' ? 20 : 0}]}
                  placeholder="Mã số thuế cá nhân"
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  value={this.state.formInterpreter.maSoTCN.value}
                  onChangeText={value => this._onChangeText ('maSoTCN', value)}
                />
              </View>

              <View style={styles.viewChildInterpreter}>
                <Text style={styles.titleChildInterpreter}>
                  Loại hình phiên dịch
                </Text>
              </View>

              <SelectMulti 
                  items={this.state.LNPD}
                  selectedItems={this.state.formInterpreter.loaiHinhPhienDich.value}
                  onSelectionsChange={this.onSelectionsLHPD}/>

             
              <View style={styles.viewChildInterpreter}>
                <Text style={styles.titleChildInterpreter}>
                  Ngôn ngữ phiên dịch
                </Text>
              </View>

              <SelectMulti 
                  items={this.state.NNPD}
                  selectedItems={this.state.formInterpreter.ngonNguPhienDich.value}
                  onSelectionsChange={this.onSelectionsNNPD}/>
            <View style={{ width : '100%' ,justifyContent : 'center',alignItems : 'center'}}></View>
              <TouchableHighlight
                style={[styles.buttonInterpreter, {marginBottom: 10, marginTop : 20}]}
                underlayColor="#fff"
                onPress={() => this._submitForm ()}
              >
                <Text style={styles.buttonInterpreterText}>
                  Cập nhật
                </Text>
              </TouchableHighlight>
           </View>
          </ScrollView>
        </View>
      );
    }
    if (this.state.indexInterpreter === 1) {
      return (
        <View style={styles.Container2}>
          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="user-alt"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>
              Họ và tên : {this.state.userdata.fullName}
            </Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="question"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Ngày sinh : {this.state.userdata.birthDay ? this.state.userdata.birthDay : 'Not update'}</Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="smile-beam"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Số điện thoại : {this.state.userdata.numberPhone}</Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="envelope"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>
            Email : {this.state.userdata.email}
            </Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="user"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Sinh viên</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.viewText}>
              <FontAwesome
                style={styles.iconStyle}
                name="address-card"
                size={18}
                color={colors.mainColor}
              />
              <Text style={styles.textStyle}>Hình Bằng cấp</Text>
            </View>
            <Image
              source={require ('../../assets/images/minhan.jpg')}
              style={{
                marginHorizontal: 5,
                width: 200,
                height: 150,
              }}
            />
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="cog"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Quốc tịch: {this.state.userdata.national ? this.state.userdata.national.name : 'Not update'}</Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="id-card"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>CMND: {this.state.userdata.idCardNumber ? idCardNumber : 'Not update'}</Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="calendar-day"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Ngày cấp: {this.state.userdata.IdCardDate ? this.state.userdata.IdCardDate : 'Not update'}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.viewText}>
              <FontAwesome
                style={styles.iconStyle}
                name="address-card"
                size={18}
                color={colors.mainColor}
              />
              <Text style={styles.textStyle}>Hình mặt trước CMND</Text>
            </View>
            <Image
              source={require ('../../assets/images/minhan.jpg')}
              style={{
                marginHorizontal: 5,
                width: 200,
                height: 150,
              }}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.viewText}>
              <FontAwesome
                style={styles.iconStyle}
                name="address-card"
                size={18}
                color={colors.mainColor}
              />
              <Text style={styles.textStyle}>Hình mặt sau CMND</Text>
            </View>
            <Image
              source={require ('../../assets/images/minhan.jpg')}
              style={{
                marginHorizontal: 5,
                width: 200,
                height: 150,
              }}
            />
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="money-check-alt"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Tài khoản ngân hàng: {this.state.userdata.bankNumber ? this.state.userdata.bankNumber : 'Not update'}</Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="money-bill"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>
              Thuế thu nhập cá nhân: Not update
            </Text>
          </View>

          <View style={styles.viewText}>
            <FontAwesome
              style={styles.iconStyle}
              name="asterisk"
              size={18}
              color={colors.mainColor}
            />
            <Text style={styles.textStyle}>Nội dung: Not update</Text>
          </View>
                
              <View style={{ width : '100%' ,justifyContent : 'center',alignItems : 'center'}}>
          <TouchableHighlight
                  style={[styles.buttonStyle, {marginBottom: 10}]}
                  underlayColor="#fff"
                  onPress={()=>this.setState({isVisiblePass : !this.state.isVisiblePass})}
                >
                  <Text style={styles.buttonTextStyle}>
                  Cập nhật password
                  </Text>
                </TouchableHighlight>

                  <ModalPassword isVisible={this.state.isVisiblePass}
                  onPressBtn={()=>this.setState({isVisiblePass : !this.state.isVisiblePass})}/>
           
            <TouchableHighlight
                  style={[styles.buttonStyle, {marginBottom: 10}]}
                  underlayColor="#fff"
                  onPress={() => this._logout()}
                >
                  <Text style={styles.buttonTextStyle}>
                    Đăng xuất
                  </Text>
                </TouchableHighlight>
            </View>
        </View>
      );
    }
  };

  _logout = async () => {
    let token = await AsyncStorage.getItem('Token');
      let updateFcmToken = axios.post(`${BASE_URL}/api/users/updateFcmToken`,{
        fcmToken  : ''
      },{
        headers : {
            'vilaki-auth-token' : token
        }
      })
      let removeToken = await AsyncStorage.removeItem('Token');
      this.props.navigation.navigate('ChooselanguageSrceen')
  }

  render () {
    
    
    if (this.state.role == 'Khách hàng') {
      return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex: 1}}>
         
          <HeaderPerson
            ImageView={(`${BASE_URL}${this.state.userdata.avarta}`)}
            onPressSetting={() => this.onPressSettingUser ()}
          />
          <Tab
            numLeft="0"
            textLeft="Mã giảm giá"
            numMid="0"
            textMid="Hóa đơn"
            numRight="0"
            textRight="Điểm"
          />
          {this._renderUser()}
          
               
        </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex: 1}}>
          
          <HeaderPerson
             ImageView={('https://vilakyserverdemo.herokuapp.com'+ this.state.userdata.avarta)}
            onPressSetting={() => this.onPressSettingInterpreter ()}
          />
          <Tab
            numLeft="10"
            textLeft="Số việc nhận"
            numMid="20"
            textMid="Khách hàng"
            numRight="$50.000"
            textRight="Lợi nhuận"
          />
          {this._renderInterpreter ()}
          
        </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 0,
    marginHorizontal: 20,
  },
  textInputStyle: {
    color: '#000',
    fontSize: 18,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom:7
  },
  buttonStyle: {
    width : '90%',
    height : 50,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 5,
    backgroundColor: colors.mainColor,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  Container2: {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  textStyle: {
    fontSize: 18,
    paddingLeft: 10,
  },
  iconStyle: {
    marginLeft: 20,
  },
  viewText: {
    flexDirection: 'row',
    marginTop: 1,
    alignItems: 'center',
    width: '100%',
    height: 62,
  },
  pickerStyle: {
    marginVertical: 10,
  },
  titleInterpreter: {
    marginVertical: 10,
    color: colors.mainColor,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  titleChildInterpreter: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  viewChildInterpreter: {
    marginLeft: 20,
    marginVertical: 25,
  },

  viewTextInterpreter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonInterpreter: {
    marginHorizontal: 5,
    borderRadius: 5,
    height: 50,
    flex: 6,
    backgroundColor: colors.mainColor,
    justifyContent : 'center',
    alignItems : 'center'
  },
  buttonInterpreterText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  maSoTCNStyle: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: 13,
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
});

const mapStateToProps = state => {
  return {
    person: state.person,
  };
};

export default connect (mapStateToProps, null) (User);