import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
<<<<<<< HEAD:components/MainScreen.js
import IconEntypo from 'react-native-vector-icons/Entypo'
=======
>>>>>>> Top Feed Mockup:src/components/MainScreen.js
import TabNavigator from 'react-native-tab-navigator';
import NewfeedTab from './AppTabNavigator/NewfeedTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import TopfeedTab from './AppTabNavigator/TopfeedTab'

// This is mainscreen
class MainScreen extends Component {
    state = {
        selectedTab: 'home'
    };

    static navigationOptions = {
        headerLeft: <IconEntypo name="menu" size={25} style={{ marginLeft:10 }} />,
        title: "Cooklab",
        headerRight: <IconFontAwesome name="camera" size={20} style={{ marginRight:10 }} />
    }
    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="Home"
<<<<<<< HEAD:components/MainScreen.js
                    renderIcon={() => <IconFontAwesome name="star" size={15} />}
                    renderSelectedIcon={() => <IconFontAwesome name="star" size={15} color="#3496f0" />}
=======
                    renderIcon={() => <IconFontAwesome name="star" />}
                    renderSelectedIcon={() => <IconFontAwesome name="star" color="#3496f0" />}
>>>>>>> Top Feed Mockup:src/components/MainScreen.js
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <TopfeedTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'newfeed'}
                    title="NewFeed"
<<<<<<< HEAD:components/MainScreen.js
                    renderIcon={() => <IconEntypo name="newsletter" size={15} />}
                    renderSelectedIcon={() => <IconEntypo name="newsletter" size={15} color="#3496f0" />}
=======
                    renderIcon={() => <IconFontAwesome name="newspaper-o" />}
                    renderSelectedIcon={() => <IconFontAwesome name="newspaper-o" color="#3496f0" />}
>>>>>>> Top Feed Mockup:src/components/MainScreen.js
                    onPress={() => this.setState({ selectedTab: 'newfeed' })}>
                    <NewfeedTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'search'}
                    title="Search"
<<<<<<< HEAD:components/MainScreen.js
                    renderIcon={() => <IconFontAwesome name="search" size={15} />}
                    renderSelectedIcon={() => <IconFontAwesome name="search" size={15} color="#3496f0" />}
=======
                    renderIcon={() => <IconFontAwesome name="search" />}
                    renderSelectedIcon={() => <IconFontAwesome name="search" color="#3496f0" />}
>>>>>>> Top Feed Mockup:src/components/MainScreen.js
                    onPress={() => this.setState({ selectedTab: 'search' })}>
                    <SearchTab />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="Profile"
<<<<<<< HEAD:components/MainScreen.js
                    renderIcon={() => <IconFontAwesome name="user" size={15} color="#666"/>}
                    renderSelectedIcon={() => <IconFontAwesome name="user" size={15} color="#3496f0" />}
=======
                    renderIcon={() => <IconFontAwesome name="user" color="#666"/>}
                    renderSelectedIcon={() => <IconFontAwesome name="user" color="#3496f0" />}
>>>>>>> Top Feed Mockup:src/components/MainScreen.js
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
