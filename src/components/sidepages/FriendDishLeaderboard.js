import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage } from 'react-native'
import ImageFactory from 'src/components/ImageFactory'
import { Card, CardItem, List, ListItem, Header, Tab, Tabs } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import UserCardComponent from 'src/components/sidepages/UserCardComponent'
import CookLabAxios from '../../http/index'
import BackHeader from '../header/BackHeader'

class FriendDishLeaderboard extends Component {

    state = {
        leaderboard: [],
        badgePic : [ImageFactory.consumer1,ImageFactory.consumer2,ImageFactory.consumer3,
            ImageFactory.homecook1,ImageFactory.homecook2,ImageFactory.homecook3,
            ImageFactory.juniorcook1,ImageFactory.juniorcook2,ImageFactory.juniorcook3,
            ImageFactory.cook1,ImageFactory.cook2,ImageFactory.cook3,
            ImageFactory.chef1,ImageFactory.chef2,ImageFactory.chef3 ]
    }

    async getLeaderboard() {
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_most_post?user_id=${userid}`)
            console.log("Result ",result.data)
            this.setState({leaderboard: result.data})
        } catch(error) {
            console.log(error)
        }
        console.log("State", this.state.leaderboard)
    } 

    componentDidMount() {
        this.getLeaderboard()
    }
    
    render() {
        return (
            <View>
            { this.state.leaderboard.map((data, index) => {
                return(
                    <UserCardComponent 
                        rank={ index+1 } 
                        badgeImage={ this.state.badgePic[parseInt(data.rank) - 1]} 
                        userImage={ data.image } 
                        userName={ data.name } 
                        point={ data.count }
                    />
                )
            })}
            </View>
        )
    }
}

export default FriendDishLeaderboard

const styles = StyleSheet.create({
    container: {
    }
})