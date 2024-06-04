import React, { useEffect }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootStack from './navigators/RootStack';
import { Provider } from 'react-redux';
import { store } from './redux/store';
export default function App() {

  return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
  );
}

