import PropTypes from 'prop-types'
import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, ScrollView, Text, Image, View, Button, Alert, AsyncStorage } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'
import { Header } from 'native-base'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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

  async logout () {
    LoginManager.logOut()
    try {
      // await AsyncStorage.removeItem('facebookToken')
      await AsyncStorage.clear()
      // await AsyncStorage.removeItem('userid')
    } catch (error) {
      console.log(error)
    }
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
                <IconFontAwesome name="home" /> Home 
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.Achievement()}>
                <IconFontAwesome name="flask" /> Achievement
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.CookingLevel()}>
                <IconFontAwesome name="rocket" /> Cooking Level
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.Leaderboard()}>
                <IconFontAwesome name="trello" /> Leaderboard
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.MyDish()}>
                <IconMaterialCommunityIcons name="food" /> My Dishes
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={() => Actions.Aboutus()}>
                <IconFontAwesome name="user" /> About us
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
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row'
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
