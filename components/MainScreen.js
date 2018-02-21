import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base'
// import { TabNavigator } from 'react-navigation'
import TabNavigator from 'react-native-tab-navigator';
import NewfeedTab from './AppTabNavigator/NewfeedTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import TopfeedTab from './AppTabNavigator/TopfeedTab'

class MainScreen extends Component {
    state = {
        selectedTab: 'home'
    };

    // static navigationOptions = {
    //     headerLeft: <Icon name="person" style={{paddingLeft:10}} />,
    //     title: "Cooklab",
    //     headerRight: <Icon ios='ios-camera' android="md-camera" />
    // }
    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() => <Icon name="person" />}
                    renderSelectedIcon={() => <Icon name="person" />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <TopfeedTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'newfeed'}
                    title="NewFeed"
                    renderIcon={() => <Icon ios='ios-camera' android="md-camera" />}
                    renderSelectedIcon={() => <Icon ios='ios-camera' android="md-camera" />}
                    onPress={() => this.setState({ selectedTab: 'newfeed' })}>
                    <NewfeedTab />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

export default MainScreen;

// const AppTabNavigator = TabNavigator({

//     TopfeedTab: {
//         screen: TopfeedTab
//     },
//     NewfeedTab: {
//         screen: NewfeedTab
//     },
//     SearchTab: {
//         screen: SearchTab
//     },
//     ProfileTab: {
//         screen: ProfileTab
//     }
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})