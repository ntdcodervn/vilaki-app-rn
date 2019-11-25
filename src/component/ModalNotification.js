import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors, fonts, sizes} from '../constants/theme';
export default class ModalNotification extends Component {
  render() {
    return (
      <Modal {...this.props}>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>
            {this.props.title ? this.props.title : 'Thông báo'}
          </Text>
          <Text style={styles.mgsContent}>{this.props.message}</Text>
          <TouchableOpacity onPress={() => this.props.onPressCancel()}>
            <Text style={styles.submitBtn}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffffe6',
  },
  contentTitle: {
    fontSize: sizes.textBase,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
  submitBtn: {
    padding: 10,
    backgroundColor: '#F26F21',
    color: '#fff',
    fontFamily: fonts.regular,
    fontSize: sizes.textBase,
    textAlign: 'center',
    borderRadius: 4,
  },
  mgsContent: {
    fontSize: sizes.textBase,
    marginVertical: 15,
    textAlign: 'center',
  },
});