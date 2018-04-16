import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Dimensions, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { Card, Icon, Thumbnail, CardItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import StarRating from 'react-native-star-rating'
import BackHeader from '../header/BackHeader'

class UserDetail extends Component {

    constructor(props) {
        super(props)
        this.state ={
            name: '',
            image: '',
        }
    }

    componentDidMount() {
        this.fetchUser()
    }

    async fetchUser() {
        let userResponse
        try {
            userResponse = await CooklabAxios.get(`/get_user?userId=${this.props.idUser}`)
        } catch (error) {
            console.log(error)
        }
        console.log('User detail page: ', userResponse.data)
        this.setState({
            name: userResponse.data.name,
            image: userResponse.data.photo
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="USER ACCOUNT" actions="mainscreen" />
                <ScrollView style={ styles.componentWrapper }>
                    <View style={ styles.imageWrapper }>
                        <Button primary style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Follow </Text>
                            <IconFontAwesome name="plus" style={{ fontSize: 13, color: "#fff", lineHeight: 20 }}/>
                        </Button>
                        <Thumbnail source={{ uri: this.state.image }} style={ styles.profilePic }/>
                    </View>
                    <View style={ styles.nameWrapper }>
                        <Text>{this.state.name}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default UserDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    componentWrapper: {
        padding: 10
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    nameWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    profilePic: {
        width: 150,
        height: 150,
        resizeMode: 'cover'
    }
})