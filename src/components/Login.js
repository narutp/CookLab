import React, { Component } from 'react'
import { TextInput, Dimensions, View, StyleSheet, Image, AsyncStorage } from 'react-native'
import FBSDK, { LoginManager } from 'react-native-fbsdk'
import { Input, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import MainScreen from './MainScreen'
import DrawerRouter from './DrawerRouter'
import CooklabAxios from '../http'
import Register from './Register'
import Axios from 'react-native-axios'
import CookLabAxios from './HttpRequest/index'
import { Actions } from 'react-native-router-flux'

const {
    LoginButton,
    AccessToken
} = FBSDK

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

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
            Actions.MainScreen()
        }
        // let result = await CooklabAxios.get('/posts')
        // console.log(result)
    }

    async fetchUser() {
        let value = await AsyncStorage.getItem('facebookToken')
        console.log('value' + value);
        
        let result = await Axios.get(`https://graph.facebook.com/v2.11/me?access_token=${ value }&&fields=id,name,picture.type(large)`)
        console.log(result)
        let userName = result.data.name
        let userId = result.data.id
        let userPicUrl = result.data.picture.data.url
        console.log('Get name and id from facebook: ' + userName + ' ' + userId)
        console.log('Photo url: ' + userPicUrl)

        let createUserResponse = await CookLabAxios.post(`/create_user`, { 
            name: userName,
            username: userName 
        })
        console.log("Create user on database" + createUserResponse)
        // save name and id
        try { 
            AsyncStorage.setItem('userName', userName) 
            AsyncStorage.setItem('userId', userId)
            AsyncStorage.setItem('userPic', userPicUrl)
        } catch (error) {
            console.log(error)
        }

    }

    async login() {
        console.log('Login normal')
        console.log('Username: ' + this.state.username)
        console.log('Password: ' + this.state.password)
        if (this.state.username != null) {
            let loginResponse
            try { 
                loginResponse = await CookLabAxios.post(`/login`, {
                    username: this.state.username,
                    password: this.state.password 
                })
            } catch (error) {
                console.log(error)
            }
            console.log(loginResponse.data)
            if (loginResponse.data === true) {
                var getUserResponse
                try {
                    getUserResponse = await CookLabAxios.get(`/get_user?username=${this.state.username}`)     
                } catch(error) {
                    console.log(error)
                }
                let userid = getUserResponse.data
                console.log(userid)
                if (userid != null) {
                    try {
                        await AsyncStorage.setItem('userid', userid)
                        
                    } catch (error) {
                        console.log(error)
                    }
                }
                Actions.MainScreen()
            } else {
                // login failed
                // TODO: add alert login fail
            }
        } else {
            console.log('Input something before login')
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <Image style={ styles.background } source={ require('../assets/image/Background/backgroundImage.jpg') }/>
                {/* Top part */}
                <View style={[ styles.title, styles.topContainer ]}>
                    <Text style={ styles.titleText }> CookLab </Text>
                    <Text style={ styles.subtitleText }> Design your dream dishes</Text>
                    <View style={{ marginBottom: 10 }}>
                        <TextInput onChangeText={(text) => this.setState({username: text})} 
                            underlineColorAndroid= "transparent" 
                            style={ styles.loginInput }
                            placeholder="Name.." 
                        />
                        <TextInput onChangeText={(text) => this.setState({password: text})} 
                            underlineColorAndroid= "transparent" 
                            style={ styles.loginInput }
                            secureTextEntry={true} 
                            placeholder="Password.."
                        />
                    </View>
                    {/* Button */}
                    <View>
                        <Button style={ styles.button } onPress={() => this.login()}>
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
                <View style={ styles.bottomContainer }>
                    <View>
                        {/* <Text style={ styles.bottomLabel }>
                            Bring the ingredients or cooking materials for show your meal
                        </Text> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={ styles.bottomLabel }>
                                Cooking and show your meal 
                            </Text>
                            <Text style={ styles.bottomLabel }>
                                Join us now
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Button style={styles.registerButton}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text onPress={ () => Actions.Register() } style={styles.textButton}>REGISTER</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
    },
    topContainer: {
        marginBottom: 200,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
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
        fontSize: 40, 
        fontWeight: 'bold',
        color: 'white',
    },
    subtitleText: {
        color: 'white', 
        fontSize: 15,
        marginBottom: 50
    },
    loginInput: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 5,
        width: 220,
        height: 35,
        marginTop: 10,
        opacity: 0.9
    },
    background: {
        width: '100%',
        height: 400
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        width: 150,
        height: 35,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10
    },
    registerButton: {
        backgroundColor: '#F44336',
        borderWidth: 1,
        borderColor: 'white',
        width: 150,
        height: 35,
        borderRadius: 5,
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
    },
    bottomContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    bottomLabel: {
        fontSize: 13,
        marginBottom: 10
    }
})