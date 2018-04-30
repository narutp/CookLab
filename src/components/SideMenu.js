import PropTypes from 'prop-types'
import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, ScrollView, Text, Image, View, Button, Alert, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native'
import { Card, Left, Body, Right, Text as TextNative } from 'native-base'
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
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <IconEntypo name="menu" onPress={() =>  Actions.MainScreen() } size={30} style={{ color: '#F44336', marginLeft: 10 }} />
          </Left>
          <Body>
            <TextNative style={styles.textCooklab}>COOKLAB</TextNative>
          </Body>
          <Right/>
        </Header>
        <ScrollView>
          <View style={ styles.sideMenuTable }>
            <TouchableOpacity onPress={() => Actions.MainScreen()}>
              <Card style={styles.navSectionStyle}>
                <View style={styles.contentView}>
                <IconFontAwesome size={120} style={styles.navIconStyle} name="home" />
                <Text style={styles.navItemStyle}>Home</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.Achievement()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome size={120} style={styles.navIconStyle} name="flask" />
                <Text style={styles.navItemStyle}>Achievement</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={ styles.sideMenuTable }>
            <TouchableOpacity onPress={() => Actions.CookingLevel()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome size={120} style={styles.navIconStyle} name="rocket" />
                <Text style={styles.navItemStyle}>Cooking Level</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.Leaderboard()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome size={120} style={styles.navIconStyle} name="trello" />
                <Text style={styles.navItemStyle}>Leaderboard</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={ styles.sideMenuTable }>
            <TouchableOpacity onPress={() => Actions.MyDish()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconMaterialCommunityIcons size={120} style={styles.navIconStyle} name="food" /> 
                <Text style={styles.navItemStyle}>My Dishes</Text>
                </View>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.Aboutus()}>
              <Card style={styles.navSectionStyle}>
              <View style={styles.contentView}>
                <IconFontAwesome size={120} style={styles.navIconStyle} name="user" /> 
                <Text style={styles.navItemStyle}>About CookLab</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={ styles.footerWrapper }>
          <Text style={ styles.footerText }
              onPress={() => Alert.alert(
                'Log out',
                'Log out from CookLab?',                
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  {text: 'Log out', onPress: () => this.logout()},
                ],
                { cancelable: false }
              )}>
              <IconEntypo name="log-out" /> Log out
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
        backgroundColor: '#fff',
    },
    textCooklab: { 
        color: 'black', 
        fontSize: 16, 
        fontWeight: '100',  
        alignSelf: 'center'
    },
    sideMenuTable: {
        width: Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 135,
        marginTop: 10,
        justifyContent: 'space-around'
    },
    contentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navItemStyle: {
        alignSelf: 'center',
        fontSize: 13
    },
    navIconStyle: {
        alignSelf: 'center',
        fontSize: 35,
        color: '#4F504B'
    },
    navSectionStyle: {
        width: (Dimensions.get('window').width*4)/10,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft: 15,
        marginRight: 15,
    },
    sectionHeadingStyle: {
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    footerText: {
        padding: 20,
        backgroundColor: 'lightgrey',
        fontSize: 13,
    },
    footerWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,
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
