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
        leaderboard: []
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
                        badgeImage={ImageFactory.chef1} 
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