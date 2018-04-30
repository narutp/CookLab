import React, { Component } from 'react'
import { Modal, Dimensions, ImageBackground, View, Text, StyleSheet, TextInput } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import ConfigAxios from '../http/index'
import { Container, Right, Left, Body } from 'native-base'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import ValidationComponent from 'react-native-form-validator'

class Register extends ValidationComponent {

    constructor (props) {
        super(props)
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            rePassword: '',
            isModalVisible: false
        }
    }

    async register () {
        this.validate({
            name: {minlength: 2, maxlength: 7, required: true},
            email: {email: true},
            username: {minlength: 2, maxlength: 7, required: true},
            password: {required: true},
            rePassword: {required: true}
        })

        let registerResponse
        try {
            registerResponse = await ConfigAxios.post(`/create_user`, {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        } catch (error) {
            console.log(error)
        }
        console.log('aaaa', this.isFormValid())
        if (registerResponse.data === true && this.isFormValid() === true) {
            Actions.Login()
        } else {
            // alert(this.getErrorsInField('name') + '\n' + this.getErrorsInField('email') +
            //     this.getErrorsInField('username') +
            //     this.getErrorsInField('password') +
            //     this.getErrorsInField('rePassword')
            // )
            alert('Please input all of the form in correct format')
        }
        console.log(registerResponse)
    }

    render() {
        return (
            <ImageBackground style={ styles.backgroundImage } source={ require('../assets/image/Background/registerBg.jpg') }>
                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        this.setState({ isModalVisible: !this.state.isModalVisible })
                }}>
                    <View style={{flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{ padding: 15, backgroundColor: 'white', height: 300, width: 300 }}>
                            <Container>
                                <View style={{ }}>
                                    <IconFontAwesome name="close" size={15} color={'red'}/>
                                </View>
                                <Text>{ this.getErrorsInField('name') + '\n'}</Text>
                                <Text>{ this.getErrorsInField('email') + '\n'}</Text>
                                <Text>{ this.getErrorsInField('username') + '\n'}</Text>
                                <Text>{ this.getErrorsInField('password') + '\n'}</Text>
                                <Text>{ this.getErrorsInField('rePassword') + '\n'}</Text>
                                
                            </Container>
                        </View>
                    </View>
                </Modal> */}
                <View style={ styles.titleContainer }>
                    <Text style={ styles.title }>REGISTRATION</Text>
                </View>
                <View style={ styles.formContainer }>
                    <Text style={ styles.formContent }>Name* (3-8 Characters)</Text>
                    <TextInput style={ styles.formInput } 
                        underlineColorAndroid= "transparent"
                        onChangeText={(text) => this.setState({name: text})}
                    />
                    <Text style={ styles.formContent }>Email</Text>
                    <TextInput style={ styles.formInput } 
                        underlineColorAndroid= "transparent"
                        onChangeText={(text) => this.setState({email: text})}
                    />
                    <Text style={ styles.formContent }>Username* (3-8 Characters)</Text>
                    <TextInput style={ styles.formInput }
                        underlineColorAndroid= "transparent"
                        onChangeText={(text) => this.setState({username: text})}
                    />
                    <Text style={ styles.formContent }>Password*</Text>
                    <TextInput style={ styles.formInput } 
                        secureTextEntry={true}
                        underlineColorAndroid= "transparent"
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <Text style={ styles.formContent }>Re-password*</Text>
                    <TextInput style={ styles.formInput } 
                        secureTextEntry={true}
                        underlineColorAndroid= "transparent"
                        onChangeText={(text) => this.setState({rePassword: text})}
                    />

                    <View style={ styles.buttonContainer }>
                        <Button style={{ 
                            width: 100, backgroundColor: '#EB5757', borderColor: 'white',
                            borderRadius: 5, borderWidth: 1, marginRight: 15
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text onPress={ () => Actions.Login() }>BACK</Text>
                            </View>
                        </Button>
                        <Button style={{ 
                            width: 100, backgroundColor: '#6FCF97', borderColor: 'white',
                            borderRadius: 5, borderWidth: 1 
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text onPress={ () => this.register() }>REGISTER</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    container: {
        padding: 50
    },
    formContainer: {
    },
    formContent: {
        color: 'white'
    },
    formInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        marginBottom: 10
    },
    titleContainer: {
        marginBottom: 25,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    title: {
        color: 'white'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    backgroundImage: {
        flex: 1,
        padding: 50,
        // justifyContent: 'center',
        // alignItems: 'center'
        // resizeMode: 'stretch',
    }
})