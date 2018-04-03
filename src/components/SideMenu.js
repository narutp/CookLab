import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, Text, Image, View, Button, Alert, AsyncStorage } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk'

class SideMenu extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        picUrl: null
    }
  }

  componentDidMount() {
    this.fetchUser()
  }

  async fetchUser () {
    let userPicUrl = await AsyncStorage.getItem('userPic')

    this.setState({ picUrl: userPicUrl })
    console.log('pic url: ' + this.state.picUrl)

  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout () {
    LoginManager.logOut()
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {/* Profile pic */}
            <View style={{ height: 150, backgroundColor: '#F44336' }}>
              <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: this.state.picUrl }} style={styles.profileImage} />
              </View>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                Home
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('MyDishes')}>
                My dishes
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Settings')}>
                Settings
              </Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <Text style={styles.footerContainer}
              onPress={() => Alert.alert(
                'Log out',
                'Log out from CookLab?',                
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  {text: 'Log out', onPress: () => this.logout()},
                ],
                { cancelable: false }
              )}>Log out
          </Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
navigation: PropTypes.object
};

export default SideMenu;

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: 'white'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    },
    profileImage: {
      // position: 'absolute',
      // top: -40,
      top: '50%',
      width: 80,
      height: 80,
      borderRadius: 37.5,
      borderWidth: 0.5,
      borderColor: 'grey'
    },
})
