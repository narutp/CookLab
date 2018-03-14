import React, { Component } from 'react'
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'

class Login extends Component {
    
    // _fbAuth() {
    //     LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
    //         if (result.isCancelled) {
    //             console.log('Login is cancelled')
    //         } else {
    //             console.log('Login was success' + result.grantedPermissions.toString)
    //         }
    //     }, function(error) {
    //         console.log('An error occured' + error)
            
    //     })
    // }

    render() {
        return (
            <View>
                <Image style={ styles.background } source={ require('../assets/image/Background/backgroundImage.jpg') }/>
                <View style={ styles.title }>
                    <Text style={ styles.titleText }> CookLab </Text>
                </View>
                {/* <View>
                    <TouchableOpacity onpress={ this._fbAuth() }></TouchableOpacity>
                </View> */}
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

})