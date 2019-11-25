import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
//Srceen
import Chooselanguage from './screen/Chooselanguage';
import Signin from './screen/Login/Signin';
import Welcome from './screen/Welcome';
//BottomNavigation
import Home from './screen/Home/Home';
import PostJob from './screen/Home/PostJob';
import PostList from './screen/Home/PostList';
import Message from './screen/Home/Message/Message';
import Chat from './screen/Home/Message/Chat';
import BookHistory from './screen/BookHistory/BookHistory';
import BookHistoryDetail from './screen/BookHistory/BookHistoryDetial';
import News from './screen/News/News';
import NewsDetails from './screen/News/NewsDetails';
import User from './screen/User/User';
import Interpreter from './screen/Interpreter/Interpreter';
import InterpreterDetails from './screen/Interpreter/InterpreterDetails';
import ConfirmBill from './screen/ConfirmBill';
import Booking from './screen/Booking';

import Ionicons from 'react-native-vector-icons/Ionicons';
import BookingStatusList from './screen/BookingStatusList';

const ChildInterpreterDetailsStack = createStackNavigator (
  {
    BookingSrceen: Booking,
    ConfirmBillSrceen: ConfirmBill,
    BookingStatusScreen: BookingStatusList,
  },
  {
    header: null,
    headerMode: 'none',
  }
);

const InterpreterDetailsStack = createStackNavigator (
  {
    InterpreterDetailsSrceen: InterpreterDetails,
    ChildInterpreterDetailsStack: ChildInterpreterDetailsStack,
  },
  {
    header: null,
    headerMode: 'none',
  }
);

const InterpreterStack = createStackNavigator (
  {
    InterpreterSrceen: Interpreter,
    InterpreterDetailsStack: InterpreterDetailsStack,
  },
  {
    header: null,
    headerMode: 'none',
  }
);

const NewStack = createStackNavigator ({
  NewsSrceen: News,
  NewsDetialSrceen: NewsDetails,
});

const MessageStack = createStackNavigator (
  {
    MessageSrceen: Message,
    ChatSrceen: Chat,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);
const HomeStack = createStackNavigator (
  {
    HomeSrceen: Home,
    MessageStack: MessageStack,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const BookHistoryStack = createStackNavigator (
  {
    BookHistoryScreen: BookHistory,
    BookHistoryDetailScreen: BookHistoryDetail,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const DrawerNav = createBottomTabNavigator (
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {tabBarLabel: 'Home'},
    },
    InterpreterStack: {
      screen: InterpreterStack,
      navigationOptions: {tabBarLabel: 'Interpreter'},
    },
    UserSrceen: {
      screen: User,
      navigationOptions: {tabBarLabel: 'User'},
    },
    BookHistoryStack: {
      screen: BookHistoryStack,
      navigationOptions: {tabBarLabel: 'BookHistory'},
    },
    NewStack: {
      screen: NewStack,
      navigationOptions: {tabBarLabel: 'News'},
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;

        if (routeName === 'HomeStack') {
          iconName = Platform.OS === 'ios' ? `ios-home` : 'md-home';
        } else if (routeName === 'InterpreterStack') {
          iconName = Platform.OS === 'ios' ? `ios-people` : 'md-people';
        } else if (routeName === 'UserSrceen') {
          iconName = Platform.OS === 'ios' ? `ios-contact` : 'md-contact';
        } else if (routeName === 'BookHistoryStack') {
          iconName = Platform.OS === 'ios' ? `ios-time` : 'md-time';
        } else if (routeName === 'NewStack') {
          iconName = Platform.OS === 'ios' ? `ios-paper` : 'md-paper';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#50BAB6',
      inactiveTintColor: '#ADD8E6',
      adaptive: false
    },
  }
);

const DrawerNav2 = createBottomTabNavigator (
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: {tabBarLabel: 'Home'},
    },
    InterpreterStack: {
      screen: InterpreterStack,
      navigationOptions: {tabBarLabel: 'HistoryBooked'},
    },
    UserSrceen: {
      screen: User,
      navigationOptions: {tabBarLabel: 'User'},
    },
    BookHistoryStack: {
      screen: BookHistoryStack,
      navigationOptions: {tabBarLabel: 'BookHistory'},
    },
    NewStack: {
      screen: NewStack,
      navigationOptions: {tabBarLabel: 'News'},
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'HomeStack') {
          iconName = Platform.OS === 'ios' ? `ios-home` : 'md-home';
        } else if (routeName === 'InterpreterStack') {
          iconName = Platform.OS === 'ios'
            ? `ios-albums`
            : 'md-albums';
        } else if (routeName === 'UserSrceen') {
          iconName = Platform.OS === 'ios' ? `ios-contact` : 'md-contact';
        } else if (routeName === 'BookHistoryStack') {
          iconName = Platform.OS === 'ios' ? `ios-time` : 'md-time';
        } else if (routeName === 'NewStack') {
          iconName = Platform.OS === 'ios' ? `ios-paper` : 'md-paper';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#50BAB6',
      inactiveTintColor: '#ADD8E6',
    },
  }
);
const StackNav = createSwitchNavigator ({
  WelcomeSrceen: Welcome,
  ChooselanguageSrceen: Chooselanguage,
  SigninSrceen: Signin,
  DrawerNav: DrawerNav,
  DrawerNav2: DrawerNav2,
});

const MainContainer = createAppContainer (StackNav);
export default MainContainer;
