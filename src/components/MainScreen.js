import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Body, Left, Right } from 'native-base'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'
import TabNavigator from 'react-native-tab-navigator'
import NewfeedTab from './AppTabNavigator/NewfeedTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import SearchTab from './AppTabNavigator/SearchTab'
import NotificationTab from './AppTabNavigator/NotificationTab'
import TopfeedTab from './AppTabNavigator/TopfeedTab'
import ImagePicker from 'react-native-image-picker'
import StatusPosting from './sidepages/StatusPosting'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import DishActions from 'src/redux/actions/dish'

// This is mainscreen
class MainScreen extends Component {
    state = {
        selectedTab: 'newfeed'
    };

    constructor(props) {
        super(props)
        this.showDrawerMenuBinded = this.showDrawerMenu.bind(this)
        this.showCameraRoll = this.showCameraRoll.bind(this)
    }

    
    showDrawerMenu() {
        console.log(this.props)
        Actions.SideMenu()
    }

    showCameraRoll() {
      var options = {
        title: 'Select Avatar',
        maxWidth: 700,
        maxHeight: 700,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          this.props.setImageSource(response.uri)
          Actions.StatusPosting()
        }
      });
    }

    render() {
        return (
            <TabNavigator style={styles.container}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'newfeed'}
                    selectedTitleStyle={{ color: "#FFBF00" }}
                    renderIcon={() => <IconEntypo name="newsletter" size={16} />}
                    renderSelectedIcon={() => <IconEntypo name="newsletter" size={15} color="#F44336" />}
                    onPress={() => this.setState({ selectedTab: 'newfeed' })}>
                    {/* url profile image get from status post  */}
                    <NewfeedTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll } />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{ color: "#FFBF00" }}
                    renderIcon={() => <IconFontAwesome name="star" size={15} />}
                    renderSelectedIcon={() => <IconFontAwesome name="star" size={15} color="#F44336" />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    <TopfeedTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll }/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'search'}
                    selectedTitleStyle={{ color: "#FFBF00" }}
                    renderIcon={() => <IconFontAwesome name="search" size={20} />}
                    renderSelectedIcon={() => <IconFontAwesome name="search" size={20} color="#F44336" />}
                    onPress={() => this.setState({ selectedTab: 'search' })}>
                    <SearchTab/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'notification'}
                    selectedTitleStyle={{ color: "#FFBF00" }}
                    renderIcon={() => <IconEntypo name="notification" size={15} color="#666"/>}
                    renderSelectedIcon={() => <IconEntypo name="notification" size={15} color="#F44336" />}
                    onPress={() => this.setState({ selectedTab: 'notification' })}>
                    <NotificationTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll }/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    selectedTitleStyle={{ color: "#FFBF00" }}
                    renderIcon={() => <IconFontAwesome name="user" size={15} color="#666"/>}
                    renderSelectedIcon={() => <IconFontAwesome name="user" size={15} color="#F44336" />}
                    onPress={() => this.setState({ selectedTab: 'profile' })}>
                    <ProfileTab onMenuPressed={ this.showDrawerMenuBinded } showCameraRoll={ this.showCameraRoll }/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setImageSource: (imageSource) => {
        dispatch(DishActions.setImageSource(imageSource))
    }
})

export default connect(null, mapDispatchToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
