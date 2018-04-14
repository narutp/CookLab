import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, Text, Image, View, Button, Alert, AsyncStorage } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { Header } from 'native-base';
import IconEntypo from 'react-native-vector-icons/Entypo';

class SideMenu extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        picUrl: null
    }
  }

  // componentDidMount() {
  //   this.fetchUser()
  // }

  // async fetchUser () {
  //   let userPicUrl = await AsyncStorage.getItem('userPic')

  //   this.setState({ picUrl: userPicUrl })
  //   console.log('pic url: ' + this.state.picUrl)

  // }

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
          <View style={styles.header}>
              <IconEntypo name="menu" onPress={() =>  Actions.MainScreen() } size={25} style={{ marginLeft:10, marginTop: 25,color: '#fff' }} />
          </View>
        <ScrollView>
          <View>
            {/* Profile pic */}
            <View style={{ height: 150, backgroundColor: '#F33336' }}>
              {/* <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: this.state.picUrl }} style={styles.profileImage} />
              </View> */}
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.MainScreen()}>
                Home
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.Achievement()}>
                Achievement
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.CookingLevel()}>
                CookingLevel
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.Leaderboard()}>
                Leaderboard
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.MyDish()}>
                MyDish
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.Aboutus()}>
                About us
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
    header: {
        backgroundColor: '#F44336'
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
