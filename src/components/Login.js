import React, { Component } from 'react'
import { Dimensions, View, StyleSheet, Image } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import { Button, Text } from 'native-base'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

const {
    LoginButton,
    AccessToken
} = FBSDK

class Login extends Component {
    
    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
            if (result.isCancelled) {
                console.log('Login is cancelled') 
            } else {
                console.log('Login was success' + result.grantedPermissions.toString)
            }
        }, function(error) {
            console.log('An error occured' + error)
            
        })
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
                <View style={ styles.title }>
                    <Text style={ styles.titleText }> CookLab </Text>
                </View>
                <View>
                    <Button style={ styles.button } onPress={ this._fbAuth }>
                        <IconFontAwesome name="facebook-official" style={{ marginLeft: 15 }} size={20} color="#fff" />
                        <Text>Login by Facebook</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default Login

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
        borderColor: 'white', 
        borderWidth: 1,
        backgroundColor: 'black',
        opacity: 0.7
    },
    background: {
        width: '100%',
        height: 400
    },
    button: {
        backgroundColor: '#183C94',
    }
})