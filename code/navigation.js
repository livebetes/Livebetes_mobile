import React from 'react';

import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image
  } from 'react-native';
  import {createAppContainer, createSwitchNavigator} from 'react-navigation';
  import {createStackNavigator} from 'react-navigation-stack';

 import Home from './screens/Home.js';

  const AllNavigation = createStackNavigator({
    Home:Home,
  },{
      headerMode: 'none',
  });

  const fullNavigation = createSwitchNavigator({
    AllNavigation: AllNavigation,
});

export default createAppContainer(fullNavigation);