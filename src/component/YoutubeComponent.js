import React, {Component} from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import YouTube from 'react-native-youtube';
export default class YoutubeComponent extends Component {
  render() {
    const {ytbId} = this.props;
    if (Platform.OS !== 'ios') {
      return (
        <WebView
          style={{alignSelf: 'stretch', height: 300}}
          source={{
            uri: `https://www.youtube.com/embed/${ytbId}?controls=1&showinfo=0`,
          }}
        />
      );
    } else {
      return (
        <YouTube
          apiKey="AIzaSyA6h4BSXw04F-ZWrSVyQYl1QNRX7ibcECE"
          videoId={ytbId}
          style={{alignSelf: 'stretch', height: 300}}
        />
      );
    }
  }
}
