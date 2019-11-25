import React, {Component} from 'react';
import Header from '../../../src/component/Header';
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import PickerSelect from '../../../src/component/PickerSelect';
import theme, {fonts, colors, sizes} from '../../constants/theme';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import ImagePickerList from 'react-native-image-crop-picker';
import {FlatList} from 'react-native-gesture-handler';
import ItemFlatlistImageDescription
  from '../../../src/component/ItemFlatlistImageDescription';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalCalendar from '../../component/ModalCalendar';

export default class PostJob extends Component {
  static navigationOptions = {header: null};
  constructor (props) {
    super (props);
    this.state = {
      title: null,
      serviceId: '',
      locationId: '',
      selectedStartDate: moment ().toDate (),
      selectedEndDate: moment ().toDate (),
      isVisible: false,
      thumbnailUri: null,
      imageSourceArray: [],
      imageSourceviewarray: [],
      description: 'Hi my name is Asley Tidale, I am a interpreter online, I have 3 language so please contact me, and follow my infomation',
    };
    this._deleteImageList = this._deleteImageList.bind (this);
  }
  _onChangeText = (type, value) => {
    switch (type) {
      case 'title':
        this.setState ({title: value});
        break;
      case 'service':
        this.setState ({service: value});
        break;
      case 'location':
        this.setState ({location: value});
        break;
    }
  };

  _onChangeService = value => {
    this.setState ({serviceId: value});
  };

  _onChangeLocation = value => {
    this.setState ({locationId: value});
  };

  _onPressBack = () => {
    this.props.navigation.navigate ('HomeSrceen');
  };

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

  _renderImage = () => {
    if (this.state.thumbnailUri === null) {
      return (
        <Image
          source={require ('../../../src/assets/images/minhan.jpg')}
          style={{
            marginHorizontal: 90,
            width: 150,
            height: 150,
          }}
        />
      );
    } else {
      return (
        <Image
          source={{uri: this.state.thumbnailUri}}
          style={{
            marginHorizontal: 90,
            width: 150,
            height: 150,
          }}
        />
      );
    }
  };

  _handleChooseImage = () => {
    const options = {};
    ImagePicker.launchImageLibrary (options, response => {
      if (response.uri) {
        this.setState ({thumbnailUri: response.uri});
        console.log ('response thumbnail' + response.uri);
      }
    });
  };

  _handleChooseListImage = () => {
    ImagePickerList.openPicker ({
      width: 200,
      height: 200,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      multiple: true,
    }).then (response => {
      let tempArray = [];
      this.setState ({imageSourceArray: response});
      console.log ('responseimagearray' + this.state.ImageSource);
      response.forEach (item => {
        let image = {
          uri: item.path,
        };
        tempArray.push (image);
        this.setState ({imageSourceviewarray: tempArray});
      });
    });
  };

  _deleteImageList = index => {
    const {imageSourceviewarray} = this.state;
    this.setState ({update: !this.state.update});
    return imageSourceviewarray.splice (index, 1);
  };

  _viewImageFlatlist () {
    return (
      <FlatList
        data={this.state.imageSourceviewarray}
        keyExtractor={index => index}
        horizontal={true}
        renderItem={({index, item}) => {
          return (
            <View>
              <ItemFlatlistImageDescription
                item={item}
                index={index}
                onPress={() => this._deleteImageList (index)}
              />
            </View>
          );
        }}
      />
    );
  }

  _viewImage () {
    return this.state.imageSourceviewarray.map (function (image, index) {
      keyExtractor = {index};
      return (
        <ScrollView horizontal={true}>
          <Image
            source={{uri: image.uri}}
            style={{
              width: 120,
              height: 150,
              marginHorizontal: 100,
              marginBottom: 10,
              position: 'relative',
            }}
          />
          <View style={{position: 'absolute', top: -2, right: 100}}>
            <TouchableOpacity onPress={() => this._deleteImageList (image)}>
              <Ionicons name="md-trash" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    });
  }

  render () {
    const {selectedStartDate, selectedEndDate} = this.state;
    const startDate = selectedStartDate
      ? selectedStartDate.toString ()
      : moment ().toDate.toString ();
    const endDate = selectedEndDate
      ? selectedEndDate.toString ()
      : moment ().toDate.toString ();

    return (
      <SafeAreaView>
        <Header
          hideBars={true}
          title="POST JOB"
          backIcon={true}
          onPressBack={() => this._onPressBack ()}
        />
        <ScrollView style={{marginBottom: 60}}>
          <View style={styles.formView}>
            <View style={{marginBottom: 20}}>

              {this._renderImage ()}

              <TouchableOpacity
                style={styles.buttonChoiceDateStyle}
                onPress={() => this._handleChooseImage ()}
              >
                <Text style={styles.buttonDateTextStyle}>
                  Choice thumbnail image
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={styles.titleTextStyle}>Title</Text>
              <TextInput
                style={styles.textInputStyle}
                placeholder="enter title"
                placeholderTextColor="#000"
                value={this.state.diachi}
                onChangeText={value => this._onChangeText ('title', value)}
              />
            </View>

            <TouchableOpacity onPress={() => this.setState ({isVisible: true})}>
              <View style={styles.dateStyle}>
                <View style={styles.dateStartStyle}>
                  <Text style={styles.dateTextStyle}>
                    Ngày bắt đầu
                  </Text>
                  <Text style={styles.dateNumStyle}>
                    {moment (startDate).format ('DD/MM/YYYY')}
                  </Text>
                </View>

                <View style={{marginHorizontal: 35}}>
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

            <ModalCalendar
              selectedStartDate={this.state.selectedStartDate}
              selectedEndDate={this.state.selectedEndDate}
              isVisible={this.state.isVisible}
              onDateChange={this.onDateChange}
              goBack={() => this.setState ({isVisible: false})}
            />

            <PickerSelect
              style={{marginVertical: 15}}
              title="Service"
              value={this.state.serviceId}
              onChangeValue={this._onChangeService}
              data={[
                {label: 'SERVICE 1', value: '1'},
                {label: 'SERVICE 2', value: '2'},
              ]}
            />

            <PickerSelect
              title="Location"
              style={{marginBottom: 15}}
              value={this.state.locationId}
              onChangeValue={this._onChangeLocation}
              data={[
                {label: 'Việt Nam', value: '3'},
                {label: 'Korea', value: '4'},
                {label: 'American', value: '4'},
              ]}
            />

            <Text style={styles.titleTextStyle}>Description Job</Text>
            <Text>{this.state.description}</Text>

            <TouchableOpacity
              style={[styles.buttonChoiceDateStyle, {marginTop: 20}]}
              onPress={() => this._handleChooseListImage ()}
            >
              <Text style={styles.buttonDateTextStyle}>
                Choice list image
              </Text>
            </TouchableOpacity>

            {this._viewImageFlatlist ()}
            {/* {this._viewImage ()} */}

            <TouchableHighlight
              style={styles.buttonStyle}
              underlayColor="#fff"
              onPress={() => {
                this.props.navigation.navigate ('PostListSrceen');
              }}
            >
              <Text style={styles.buttonTextStyle}>
                POST JOB
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create ({
  formView: {
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 15,
  },
  textInputStyle: {
    color: '#000',
    fontSize: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  textDescription: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: 25,
    marginHorizontal: 90,
    borderRadius: 20,
    backgroundColor: colors.mainColor,
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  titleTextStyle: {
    color: colors.black,
    fontSize: sizes.textBase + 1,
    fontFamily: fonts.bold,
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
  },
  dateEndStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
