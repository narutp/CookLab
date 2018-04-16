import PropTypes from 'prop-types'
import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, ScrollView, Text, Image, View, Button, Alert, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native'
import { Card } from 'native-base'
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
          <View style={ styles.sideMenuTable }>
            <TouchableOpacity onPress={() => Actions.MainScreen()}>
              <Card style={styles.navSectionStyle}>
                <View style={styles.contentView}>
                <IconFontAwesome style={styles.navIconStyle} name="home" />
                <Text style={styles.navItemStyle}>Home</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.Achievement()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome style={styles.navIconStyle} name="flask" />
                <Text style={styles.navItemStyle}>Achievement</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.CookingLevel()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome style={styles.navIconStyle} name="rocket" />
                <Text style={styles.navItemStyle}>Cooking Level</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={ styles.sideMenuTable }>
            <TouchableOpacity onPress={() => Actions.Leaderboard()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome style={styles.navIconStyle} name="trello" />
                <Text style={styles.navItemStyle}>Leaderboard</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.MyDish()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconMaterialCommunityIcons style={styles.navIconStyle} name="food" /> 
                <Text style={styles.navItemStyle}>My Dishes</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.Aboutus()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome style={styles.navIconStyle} name="user" /> 
                <Text style={styles.navItemStyle}>About us</Text>
                </View>
              </Card>
            </TouchableOpacity>
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
    sideMenuTable: {
        width: Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 100,
        marginTop: 10
    },
    contentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navItemStyle: {
        alignSelf: 'center',
        fontSize: 16
    },
    navIconStyle: {
        alignSelf: 'center',
        fontSize: 35
    },
    navSectionStyle: {
        width: (Dimensions.get('window').width*3)/10,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 8
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
