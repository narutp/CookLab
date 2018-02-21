import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base'
import { TabNavigator } from 'react-navigation'
import NewfeedTab from './AppTabNavigator/NewfeedTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import TopfeedTab from './AppTabNavigator/TopfeedTab'

class MainScreen extends Component {

    static navigationOptions = {
        headerLeft: <Icon name="person" style={{paddingLeft:10}} />,
        title: "Cooklab",
        headerRight: <Icon ios='ios-camera' android="md-camera" />
    }
    render() {
        return (
            <AppTabNavigator />
        );
    }
}

export default MainScreen;

const AppTabNavigator = TabNavigator({

    TopfeedTab: {
        screen: TopfeedTab
    },
    NewfeedTab: {
        screen: NewfeedTab
    },
    SearchTab: {
        screen: SearchTab
    },
    ProfileTab: {
        screen: ProfileTab
    }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})