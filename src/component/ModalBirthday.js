import React, {Component} from 'react';
import {Text, View, Modal, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;
import {colors} from '../constants/theme'

export default class ModalCalendar extends Component {
    
  render () {
    const {birthdaySelect} = this.props;
    console.log(birthdaySelect)
    const birthday = birthdaySelect 
      ? birthdaySelect
      : moment();
    return (
        <Modal
          visible={this.props.isVisible}
        >
          <SafeAreaView>
            <View style={{backgroundColor: '#50BAB6', height: '30%'}}>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={this.props.goBack}
              >
                <Text style={{color: 'white', fontSize: 20}}>Back</Text>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', marginTop: '5%'}}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <View style={{marginLeft: 40}}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                      Ngày Sinh
                    </Text>
                    <Text style={{fontSize: 50, color: 'white'}}>
                      {moment (birthday).format ('DD/MM/YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <CalendarPicker onDateChange={this.props.onDateChange} selectedDayColor={colors.mainColor}/>
            <View style={{marginTop: 52, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#50BAB6',
                  width: 100,
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={this.props.goBack}
              >
                <Text style={{fontSize: 20, color: 'white'}}>Ok</Text>
              </TouchableOpacity>
            </View>

            </SafeAreaView>
        </Modal>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
      backgroundColor: '#FFFFFF',
      marginTop: 100,
    },
    headerStyle: {
      backgroundColor: '#051325',
      height: 50,
    },
  });
