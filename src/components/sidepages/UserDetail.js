import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Dimensions, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconFeather from 'react-native-vector-icons/Feather'
import { Card, Icon, Thumbnail, CardItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import StarRating from 'react-native-star-rating'
import BackHeader from '../header/BackHeader'

let {width, height} = Dimensions.get('window')

class UserDetail extends Component {

    constructor(props) {
        super(props)
        this.state ={
            name: '',
            image: '',
            picCollection: [],
            isFollow: false
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

        let getUserId
        try {
            getUserId = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }

        let ourUserResponse
        try {
            ourUserResponse = await CooklabAxios.get(`/get_user?userId=${getUserId}`)
        } catch (error) {
            console.log(error)
        }

        // Check if this user already been followed or not
        if (ourUserResponse.data.followings.indexOf(this.props.idUser) > -1) {
            this.setState({
                isFollow: true
            })
        }

        this.setState({
            name: userResponse.data.name,
            image: userResponse.data.photo
        })

        let userPostResponse
        try {
            userPostResponse = await CooklabAxios.get(`get_user_post?user_id=${this.props.idUser}`)
        } catch (error) {
            console.log(error)
        }    
        this.setState({
            picCollection: userPostResponse.data
        })
    }

    generateImage = () => {
        return this.state.picCollection.map((element, index) => {
            console.log(element)
            return (
                <View key={index} style={[{ width: (width)/3 }, { height: (width)/3 }]}>
                    <Image style={{ flex: 1, width: undefined, height: undefined }}
                    source={{ uri: element.image}}
                    />
                </View>
            )
        })
    }

    async followUser() {
        let getUserId
        try {
            getUserId = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let followResponse
        try {
            followResponse = await CooklabAxios.put(`follow`, {
                userId: getUserId,
                targetId: this.props.idUser
            })
        } catch (error) {
            console.log(error)
        }
        console.log('Follow response: ', followResponse.data)
        this.setState({
            isFollow: followResponse.data
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="USER ACCOUNT" actions="mainscreen" />
                <ScrollView style={ styles.componentWrapper }>
                    <View style={ styles.imageWrapper }>
                        <Thumbnail source={{ uri: this.state.image }} style={ styles.profilePic }/>
                    </View>
                    <View style={ styles.nameWrapper }>
                        <Text style={ styles.name }>{this.state.name}</Text>
                        { this.state.isFollow === false ? 
                            <Button primary onPress={ () => this.followUser() } style={ styles.addButton }>
                                <IconFeather name="user-plus" style={{ color: "white" }}/>
                            </Button> :
                            <Button success onPress={ () => this.followUser() } style={ styles.addButton }>
                                <IconFeather name="user-check" style={{ color: "white" }}/>
                            </Button>
                        }
                    </View>
                    <View style={ styles.postWrapper }>
                        { this.generateImage() }
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
        marginTop: 10,
        padding: 0
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    name: {
        fontWeight: '500'
    },
    nameWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    postWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    profilePic: {
        width: Dimensions.get('window').width/2,
        height: 200,
        resizeMode: 'cover'
    },
    addButton: {
        // backgroundColor: 'grey', 
        marginLeft: 5, 
        width: 25, 
        height: 25, 
        padding: 5, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})