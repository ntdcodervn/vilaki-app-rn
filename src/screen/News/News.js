import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, FlatList , SafeAreaView} from 'react-native';
import Header from '../../component/Header';
import ItemFlatlistNews from '../../component/ItemFlatlistNews';
import {dataNews} from '../../utils/dataNews';
import TextInputComponent from '../../component/TextInput';
import {fonts} from '../../constants/theme';

export default class News extends Component {
  static navigationOptions = {header: null};
  constructor (props) {
    super (props);
    this.state = {
      keyword: '',
    };
  }

  _onChangeValue = (stateName, value) => {
    switch (stateName) {
      case 'Search':
        this.setState ({keyword: value});
        break;
    }
  };
  onPressItem = () => {
    this.props.navigation.navigate ('NewsDetialSrceen');
  };
  render () {
    return (
      <SafeAreaView>
        <Header hideBars={true} title="News" />
        <TextInputComponent
          searchForm={true}
          nameIcon="search"
          placeholder={'Search here'}
          value={this.state.keyword}
          onChangeText={value => this._onChangeValue ('Search', value)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom:10
          }}
        >
          <TouchableOpacity style={styles.buttonfillter}>
            <Text style={styles.textStyles}>Lãng mạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonfillter}>
            <Text style={styles.textStyles}>Yên tĩnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonfillter}>
            <Text style={styles.textStyles}>Thành phố</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textHeader}>TIN TỨC NỔI BẬT</Text>
          <FlatList
            data={dataNews}
            contentContainerStyle={{paddingBottom: 350}}
            renderItem={({item, index}) => {
              return (
                <ItemFlatlistNews
                  item={item}
                  index={index}
                  onPressNewsDT={() => this.onPressItem ()}
                />
              );
            }}
          />
        </View>
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
  textHeader: {
    fontSize: 20,
    paddingLeft: 10,
    color: 'black',
  },
});
