import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { DrawerNavigator } from 'react-navigation'
import MainScreen from 'src/components/MainScreen'

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
      // <AppDrawerNavigator />
    );
  }
}

const AppStackNavigator = DrawerNavigator({
  Main: {
    screen: MainScreen
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
