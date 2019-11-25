import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../src/redux/store/configureStore';
import MainContainer from './route';
import firebase from 'react-native-firebase';
import {StatusBar,SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import Booking from './screen/Booking';
import ModalNotification from './component/ModalNotification';

export default class App extends Component {
  state = {
    alertVisible: false,
    errMgs: '',
    titleAlert: ''
  };
  
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log(fcmToken);
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        notification.android.setChannelId('insider').setSound('default');
        firebase.notifications().displayNotification(notification);
        const {title, body} = notification.data;
        console.log(notification)
        if (title && body) {
          this.setState({
            alertVisible: true,
            errMgs: body,
            titleAlert: title,
          });
        }
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification.data;
        if (title && body) {
          this.setState({
            alertVisible: true,
            errMgs: body,
            titleAlert: title,
          });
        }
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification.data;
      if (title && body) {
        this.setState({
          alertVisible: true,
          errMgs: body,
          titleAlert: title,
        });
      }
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(message);
    });
  }
  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel(
      'insider',
      'insider Channel',
      firebase.notifications.Android.Importance.Max,
    );
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
    firebase.notifications().setBadge(0);
    firebase.messaging().subscribeToTopic('default');
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }
  render () {
    const store = configureStore ();
    return (
      <Provider store={store}>
          <MainContainer />
          <ModalNotification
            isVisible={this.state.alertVisible}
            onBackdropPress={() => this.setState({alertVisible: false})}
            message={this.state.errMgs}
            title={this.state.titleAlert}
            onPressCancel={() => this.setState({alertVisible: false})}
          />
      </Provider>
    );
  }
}
