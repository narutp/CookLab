import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { DrawerNavigator } from 'react-navigation'
import MainScreen from 'src/components/MainScreen'
import MyDishes from 'src/components/AppDrawerNavigator/MyDishes'
import SideMenu from 'src/components/SideMenu'
import Router from 'src/routes/index'
import Login from './src/components/Login'
import SplashScreen from 'react-native-splash-screen'
import socket from './src/socket'

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide()
    StatusBar.setHidden(true)
    socket.on('notify', () => {
      AsyncStorage.setItem('notification', true)
    })
  }

  render() {
    return (
      //<Login />
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
