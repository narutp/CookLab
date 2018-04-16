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
                        <Thumbnail source={{ uri: this.state.image }} style={ styles.profilePic }/>
                        <Button style={ styles.addButton }>
                            <IconFontAwesome name="user-plus" style={{ color: "#fff" }}/>
                        </Button>
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
        flex: 1,
        flexDirection: 'row',
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
        width: 200,
        height: 200,
        resizeMode: 'cover'
    },
    addButton: {
        backgroundColor: 'grey', 
        marginLeft: 5, 
        width: 25, 
        height: 25, 
        padding: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})