import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';
import NewfeedTab from './AppTabNavigator/NewfeedTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import TopfeedTab from './AppTabNavigator/TopfeedTab'

class MainScreen extends Component {
    state = {
        selectedTab: 'home'
    };

    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() => <Icon name="star" />}
                    renderSelectedIcon={() => <Icon name="star" color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <TopfeedTab />
                </TabNavigator.Item>
                <TabNavigator.Item 
                    selected={this.state.selectedTab === 'newfeed'}
                    title="NewFeed"
                    renderIcon={() => <Icon name="newspaper-o" />}
                    renderSelectedIcon={() => <Icon name="newspaper-o" color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'newfeed' })}>
                    <NewfeedTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'search'}
                    title="Search"
                    renderIcon={() => <Icon name="search" />}
                    renderSelectedIcon={() => <Icon name="search" color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'search' })}>
                    <SearchTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="Profile"
                    renderIcon={() => <Icon name="user" color="#666"/>}
                    renderSelectedIcon={() => <Icon name="user" color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'profile' })}>
                    <ProfileTab />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})