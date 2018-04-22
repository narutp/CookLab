import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Header, Left, Body, Right, Text as TextNative } from 'native-base'
import AppHeader from '../header/AppHeader'

class NotificationTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetchArr: []
        }
    }

    componentDidMount() {
        this.fetchNotification()
    }

    async fetchNotification() {
        let fetchResponse
        try {
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <AppHeader onMenuPressed={ this.props.onMenuPressed } showCameraRoll={ this.props.showCameraRoll }/>
                <ScrollView>
                </ScrollView>
            </View>
        )
    }
}

export default NotificationTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})