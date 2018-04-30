import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, Dimensions, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, CardItem, Thumbnail } from 'native-base'
import ImageFactory from 'src/components/ImageFactory'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProgressBarClassic from 'react-native-progress-bar-classic'
import DishImageTable from './DishImageTable'
import BackHeader from '../header/BackHeader'
import CookLabAxios from 'src/http/index'
import Constants from 'src/components/Constants'

class MyDish extends Component {
    
    state = {
        userData : {},
        badgePic : Constants.badgePic,
        badgeName : Constants.badgeName
    }

    async getUser(){
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_user?userId=${userid}`)
        } catch (error){
            console.log(error)
        }
        this.setState({ userData: result.data })
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="MY DISHES" actions="back" />
                <ScrollView style={ styles.container }>
                    <Card style={ styles.profile }>
                        <CardItem style={ styles.profilePicWrapper }>
                            <Thumbnail source={{uri : this.state.userData.photo }} style={ styles.profilePic }/>
                        </CardItem>
                        <CardItem style={ styles.userDetailWrapper }>
                            <Text style={ styles.detailText }>{this.state.userData.name}</Text>
                            <Text style={ styles.detailText }>Points: {this.state.userData.experience}</Text>
                            <Text style={ styles.detailText }>{this.state.badgeName[parseInt(this.state.userData.rank) - 1]}</Text>
                        </CardItem>
                        <CardItem style={ styles.badgePicWrapper }>
                            <Thumbnail source={ this.state.badgePic[parseInt(this.state.userData.rank) - 1] } style={ styles.badgePic } />
                        </CardItem>
                    </Card>
                    <DishImageTable/>
                </ScrollView>
            </View>
            
        )
    }
}

export default MyDish

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    profile: {
        flex: 1,
        flexDirection: 'row'
    },
    profilePicWrapper: {
        marginLeft: 5,
        width: '25%'
    },
    profilePic: {
        width: 55,
        height: 55
    },
    userDetailWrapper: {
        width: '50%',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5
    },
    detailText: {
        alignSelf: 'flex-start',
        fontSize: 12,
        marginBottom: 1
    },
    badgeProgress: {
        width: '100%',
        alignSelf: 'flex-start',
        marginTop: 2
    },
    badgePicWrapper: {
        width: '25%',
        marginRight: 5
    },
    badgePic: {
        width: 55,
        height: 55
    },
    foodImage: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#C0C0C0'
    },
    foodImageTable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10
    },
    foodImageWrapper: {
        width: Dimensions.get('window').width/3,
        height: 120,
        alignItems: 'center'
    }
})