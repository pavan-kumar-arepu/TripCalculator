/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import AppNavigation from './navigation/appNavigation';
import HomeScreen from './screens/HomeScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default App;
