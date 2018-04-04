import React, { Component } from 'react'
import { TextInput, Dimensions, View, StyleSheet, Image, AsyncStorage } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import { Input, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import MainScreen from './MainScreen'
import DrawerRouter from './DrawerRouter'
import CooklabAxios from '../http'
import Axios from 'react-native-axios'
import CookLabAxios from './HttpRequest/index'

const {
    LoginButton,
    AccessToken
} = FBSDK

class Login extends Component {

    async _fbAuth() {
        let result = await LoginManager.logInWithReadPermissions(['public_profile'])
        if (result.isCancelled) {
            console.log('Login is cancelled') 
        } else {
            console.log('Login was success' + result.grantedPermissions.toString)
            
            let data = await AccessToken.getCurrentAccessToken()
                try {
                    await AsyncStorage.setItem('facebookToken', data.accessToken.toString())
                    console.log('Facebook token: ' + data.accessToken.toString())
                } catch (error) {
                    console.log(error)
                }
                // prepare data of user
            this.fetchUser()
            this.props.navigation.navigate('DrawerRouter')
        }

        
        // let result = await CooklabAxios.get('/posts')
        // console.log(result)
    }

    async fetchUser() {
        let value = await AsyncStorage.getItem('facebookToken')
        let result = await Axios.get(`https://graph.facebook.com/v2.11/me?access_token=${ value }&&fields=id,name,picture.type(large)`)
        console.log(result)
        let userName = result.data.name
        let userId = result.data.id
        let userPicUrl = result.data.picture.data.url
        console.log('Get name and id from facebook: ' + userName + ' ' + userId)
        console.log('Photo url: ' + userPicUrl)

        let createUserResponse = await CookLabAxios.post(`/create_user?name=${ userName }`)
        console.log("Create user on database" + createUserResponse)
        // save name and id
        try { 
            await AsyncStorage.setItem('userName', userName) 
            await AsyncStorage.setItem('userId', userId)
            await AsyncStorage.setItem('userPic', userPicUrl)
        } catch (error) {
            console.log(error)
        }

    }
    // _fbAuth() {
    //     var self = this
    //     LoginManager.logInWithReadPermissions(['public_profile', 'user_friends']).then(function(result) {
    //         if(result.isCancelled) {
    //             console.log('Loging was cancelled')
    //         } else {
    //             console.log('Login was a success' + result.grantedPermissions.toString())
    //             AccessToken.getCurrentAccessToken().then(
    //                 (data) => {
    //                     const token = data.accessToken.toString()
    //                     console.log('token', token)
    //                     self.props.loginWithFacebook(token)
    //                     // self.props.getUserFromFacebook(token)
    //                     Actions.tabMenu()
    //                 }
    //             )
    //         }
    //     }, function(error) {
    //         console.log('Login had an error occured')
    //     })
    // }

    render() {
        return (
            <View>
                <Image style={ styles.background } source={ require('../assets/image/Background/backgroundImage.jpg') }/>
                {/* Top part */}
                <View style={ styles.title }>
                    <Text style={ styles.titleText }> CookLab </Text>
                    <Text style={ styles.subtitleText }> Design your dream dishes</Text>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput underlineColorAndroid= "transparent" style={ styles.loginInput } />
                        <TextInput underlineColorAndroid= "transparent" style={ styles.loginInput } />
                    </View>
                    {/* Button */}
                    <View>
                        <Button style={ styles.button }>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[ styles.textButton, styles.simpleTextButton ]}>LOG IN</Text>
                            </View>
                        </Button>
                        <Button style={ styles.facebookButton } onPress={ this._fbAuth.bind(this) }>
                            <IconFontAwesome name="facebook-official" style={{ marginLeft: 10, marginRight: -10 }} size={18} color="#fff" />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={ styles.textButton }>Login by Facebook</Text>
                            </View>
                        </Button>
                    </View>
                </View>
                {/* Bottom part */}
                <View>
                </View>
            </View>
        )
    }
}

export default StackNavigator({
    Login: {
        screen: Login,
    },
    DrawerRouter: {
        screen: DrawerRouter,
    }
}, {
    // see next line
    headerMode: 'none',
}, {
    contentComponent: Login,
});

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30, 
        color: 'white',
    },
    subtitleText: {
        color: 'white', 
        fontSize: 15,
        marginBottom: 50
    },
    loginInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        width: 175,
        height: 35,
        marginTop: 10,
        opacity: 0.8
    },
    background: {
        width: '100%',
        height: 400
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'pink',
        width: 150,
        height: 35,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 10
    },
    facebookButton: {
        backgroundColor: '#183C94',
        width: 150,
        height: 35,
        borderRadius: 5,
    },
    textButton: {
        fontSize: 11
    },
    simpleTextButton: {
        color: 'black'
    }
})