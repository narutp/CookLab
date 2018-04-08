import React, { Component } from 'react'
import { ImageBackground, View, Text, StyleSheet, TextInput } from 'react-native'
import { Button } from 'native-base'

class Register extends Component {

    render() {
        return (
            <ImageBackground style={ styles.backgroundImage } source={ require('../assets/image/Background/registerBg.jpg') }>
                <View style={ styles.titleContainer }>
                    <Text style={ styles.title }>REGISTRATION</Text>
                </View>
                <View style={ styles.formContainer }>
                    <Text style={ styles.formContent }>Name</Text>
                    <TextInput style={ styles.formInput } underlineColorAndroid= "transparent"/>
                    <Text style={ styles.formContent }>Username</Text>
                    <TextInput style={ styles.formInput } underlineColorAndroid= "transparent"/>
                    <Text style={ styles.formContent }>Email</Text>
                    <TextInput style={ styles.formInput } underlineColorAndroid= "transparent"/>
                    <Text style={ styles.formContent }>Password</Text>
                    <TextInput style={ styles.formInput } underlineColorAndroid= "transparent"/>
                    <Text style={ styles.formContent }>Re-password</Text>
                    <TextInput style={ styles.formInput } underlineColorAndroid= "transparent"/>

                    <View style={ styles.buttonContainer }>
                        <Button style={{ 
                            width: 100, backgroundColor: '#EB5757', borderColor: 'white',
                            borderRadius: 5, borderWidth: 1, marginRight: 15
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>BACK</Text>
                            </View>
                        </Button>
                        <Button style={{ 
                            width: 100, backgroundColor: '#6FCF97', borderColor: 'white',
                            borderRadius: 5, borderWidth: 1 
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>REGISTER</Text>
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