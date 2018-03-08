import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { DrawerNavigator } from 'react-navigation'
import MainScreen from 'src/components/MainScreen'
import MyDishes from 'src/components/AppDrawerNavigator/MyDishes'
import SideMenu from 'src/components/SideMenu'
import Router from './src/components/DrawerRouter'

export default class App extends React.Component {
  render() {
    console.log('gg')

    return (
      // <AppDrawerNavigator />
      <Router />
    );
  }
}

// const AppDrawerNavigator = DrawerNavigator({
//   Home: {
//     screen: MainScreen
//   },
//   MyDishes: {
//     screen: MyDishes
//   }
// }, {
//   contentComponent: SideMenu,
//   drawerWidth: 200,
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
