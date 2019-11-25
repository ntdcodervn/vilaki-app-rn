import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../src/redux/store/configureStore';
import MainContainer from './route';
// import firebase from 'react-native-firebase';
import {StatusBar,SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import Booking from './screen/Booking';

export default class App extends Component {
  // async getToken () {
  //   let fcmToken = await AsyncStorage.getItem ('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging ().getToken ();
  //     if (fcmToken) {
  //       await AsyncStorage.setItem ('fcmToken', fcmToken);
  //     }
  //   }
  //   console.log (fcmToken);
  // }

  // async checkPermission () {
  //   const enabled = await firebase.messaging ().hasPermission ();
  //   if (enabled) {
  //     this.getToken ();
  //   } else {
  //     this.requestPermission ();
  //   }
  // }

  // async requestPermission () {
  //   try {
  //     await firebase.messaging ().requestPermission ();
  //     this.getToken ();
  //   } catch (error) {
  //     console.log ('permission rejected');
  //   }
  // }

  // async createNotificationListeners () {
  //   firebase.notifications ().onNotification (notification => {
  //     notification.android.setChannelId ('insider').setSound ('default');
  //     firebase.notifications ().displayNotification (notification);
  //   });
  // }

  // componentDidMount () {
  //   const channel = new firebase.notifications.Android.Channel (
  //     'insider',
  //     'insider channel',
  //     firebase.notifications.Android.Importance.Max
  //   );
  //   firebase.notifications ().android.createChannel (channel);
  //   this.checkPermission ();
  //   this.createNotificationListeners ();
  // }
  render () {
    const store = configureStore ();
    return (
      <Provider store={store}>
        {/* <SafeAreaView style={{flex : 1}}> */}
          <MainContainer />
        {/* </SafeAreaView> */}
      </Provider>
    );
  }
}
