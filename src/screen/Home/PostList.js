import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../../src/component/Header';
import {fonts} from '../../constants/theme';
import dataPostList from '../../utils/dataPostList';
import ItemFlatlistPostList from '../../component/ItemFlatlistPostList';

export default class PostList extends Component {
  static navigationOptions = {header: null};

  _onPressBack = () => {
    this.props.navigation.navigate ('HomeSrceen');
  };
  render () {
    return (
      <SafeAreaView>
        <Header
          hideBars={true}
          title="POST LIST"
          backIcon={true}
          onPressBack={() => this._onPressBack ()}
        />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}
          >
            <TouchableOpacity style={styles.buttonfillter}>
              <Text style={styles.textStyles}>Bất kì lúc nào</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonfillter}>
              <Text style={styles.textStyles}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonfillter}>
              <Text style={styles.textStyles}>Korean</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonfillter}>
              <Text style={styles.textStyles}>Việt Nam</Text>
            </TouchableOpacity>
          </View>
          <Text style={theme.Home.title}>137 result</Text>
          <FlatList
            contentContainerStyle={{marginBottom: 50}}
            data={dataPostList}
            renderItem={({intex, item}) => {
              return <ItemFlatlistPostList item={item} index={intex} />;
            }}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create ({
  buttonfillter: {
    borderColor: '#80DCD9',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textStyles: {
    color: '#80DCD9',
    textAlign: 'center',
    fontFamily: fonts.black,
  },
});
