import React, {Component} from 'react';
import {Text, View, Modal, TouchableOpacity, SafeAreaView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
moment.suppressDeprecationWarnings = true;

export default class ModalCalendar extends Component {
  render () {
    const {selectedStartDate, selectedEndDate} = this.props;
    const minDate = new Date ();
    const startDate = selectedStartDate
      ? selectedStartDate.toString ()
      : moment ().toDate.toString ();
    const endDate = selectedEndDate
      ? selectedEndDate.toString ()
      : moment ().toDate.toString ();
    return (
      
        <Modal
          visible={this.props.isVisible}
          animationType="slide"
          transparent={false}
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
                  <View>
                    <Text style={{fontSize: 20, color: 'white'}}>
                      Ngày bắt đầu
                    </Text>
                    <Text style={{fontSize: 50, color: 'white'}}>
                      {moment (startDate).format ('DD/MM')}
                    </Text>
                  </View>
                  <View style={{marginLeft: 40}}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                      Ngày kết thúc
                    </Text>
                    <Text style={{fontSize: 50, color: 'white'}}>
                      {moment (endDate).format ('DD/MM')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#50BAB6"
              selectedDayTextColor="#FFFFFF"
              onDateChange={this.props.onDateChange}
            />
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
