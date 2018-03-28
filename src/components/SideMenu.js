import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, Text, Image, View, Button, Alert } from 'react-native';

class SideMenu extends Component {
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout () {
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
                <Image source={require('../assets/image/Profile/profilePic1.jpg')} style={styles.profileImage} />
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
                'Alert Title',
                'alertMessage',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  {text: 'OK', onPress: () => this.logout()},
                ],
                { cancelable: false }
              )}>
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
