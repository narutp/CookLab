import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Body, Left, Right } from 'native-base'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'
import TabNavigator from 'react-native-tab-navigator'
import NewfeedTab from './AppTabNavigator/NewfeedTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import TopfeedTab from './AppTabNavigator/TopfeedTab'

// This is mainscreen
class MainScreen extends Component {
    state = {
        selectedTab: 'home'
    };

    constructor(props) {
        super(props)
        this.showDrawerMenuBinded = this.showDrawerMenu.bind(this)
        this.showCameraRoll = this.showCameraRoll.bind(this)
    }

    // static navigationOptions = {
    //     header: null,
    //     headerLeft: <IconEntypo name="menu" size={25} style={{ marginLeft:10 }} />,
    //     title: "Cooklab",
    //     headerRight: <IconFontAwesome name="camera" size={20} style={{ marginRight:10 }} />
    // }

    showDrawerMenu() {
        this.props.navigation.navigate('DrawerOpen')
    }

    showCameraRoll() {
      console.log("open camera roll");
        this.props.navigation.navigate('Cameraroll')
    }

    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
                    renderIcon={() => <IconFontAwesome name="star" size={15} />}
                    renderSelectedIcon={() => <IconFontAwesome name="star" size={15} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <TopfeedTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll }/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'newfeed'}
                    title="NewFeed"
                    renderIcon={() => <IconEntypo name="newsletter" size={15} />}
                    renderSelectedIcon={() => <IconEntypo name="newsletter" size={15} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'newfeed' })}>
                    <NewfeedTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll }/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'search'}
                    title="Search"
                    renderIcon={() => <IconFontAwesome name="search" size={15} />}
                    renderSelectedIcon={() => <IconFontAwesome name="search" size={15} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'search' })}>
                    <SearchTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="Profile"
                    renderIcon={() => <IconFontAwesome name="user" size={15} color="#666"/>}
                    renderSelectedIcon={() => <IconFontAwesome name="user" size={15} color="#3496f0" />}
                    onPress={() => this.setState({ selectedTab: 'profile' })}>
                    <ProfileTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll }/>
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
