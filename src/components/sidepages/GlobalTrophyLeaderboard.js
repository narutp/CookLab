import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage } from 'react-native'
import ImageFactory from 'src/components/ImageFactory'
import { Card, CardItem, List, ListItem, Header, Tab, Tabs } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import UserCardComponent from 'src/components/sidepages/UserCardComponent'
import CookLabAxios from '../../http/index'
import BackHeader from '../header/BackHeader'
import DishActions from 'src/redux/actions/dish'
import { connect } from 'react-redux'

class GlobalTrophyLeaderboard extends Component {

    state = {
        badgePic : [ImageFactory.consumer1,ImageFactory.consumer2,ImageFactory.consumer3,
            ImageFactory.homecook1,ImageFactory.homecook2,ImageFactory.homecook3,
            ImageFactory.juniorcook1,ImageFactory.juniorcook2,ImageFactory.juniorcook3,
            ImageFactory.cook1,ImageFactory.cook2,ImageFactory.cook3,
            ImageFactory.chef1,ImageFactory.chef2,ImageFactory.chef3 ]
    }

    async getLeaderboard() {
        try{
            result = await CookLabAxios.get(`/get_most_trophy`)
            this.props.setGlobalTrophyLeaderboard(result.data)
        } catch(error) {
            console.log(error)
        }
        console.log("Result ",result.data)
        console.log("State", this.props.leaderboard)
    } 

    async componentWillMount() {
        if(this.props.leaderboard.length == 0)
            await this.getLeaderboard()
        console.log("renderGTL")
    }

    async componentWillUpdate() {
        if(this.props.leaderboard.length == 0)
            await this.getLeaderboard()
        console.log("renderGTL")
    }
    
    render() {
        return (
            <View>
            { this.props.leaderboard.map((data, index) => {
                return(
                    <UserCardComponent 
                        rank={ index+1 } 
                        badgeImage={ this.state.badgePic[parseInt(data.rank) - 1]} 
                        userImage={ data.image } 
                        userName={ data.name } 
                        point={ data.trophies }
                    />
                )
            })}
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setGlobalTrophyLeaderboard: (leaderboard) => {
        dispatch(DishActions.setGlobalTrophyLeaderboard(leaderboard))
    }
})

const mapStateToProps = state => ({
    leaderboard: state.dishReducer.GTleaderboard
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTrophyLeaderboard)

const styles = StyleSheet.create({
    container: {
    }
})