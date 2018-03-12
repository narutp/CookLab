import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Login extends Component {
    
    render() {
        return (
            <View>
                <Text style={ styles.title }> CookLab </Text>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center'
    }
})