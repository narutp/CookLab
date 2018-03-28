import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar  } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import MainScreen from 'src/components/MainScreen'
import MyDishes from 'src/components/AppDrawerNavigator/MyDishes'
import SideMenu from 'src/components/SideMenu'
import Router from './src/components/DrawerRouter'
import Login from './src/components/Login'
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
    StatusBar.setHidden(true)
  }

  render() {
    return (
      <Login />
      // <AppDrawerNavigator />
      //  <Router />
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
