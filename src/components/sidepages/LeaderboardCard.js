import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage, TouchableOpacity } from 'react-native'
import ImageFactory from 'src/components/ImageFactory'
import { Card, CardItem, List, ListItem, Header, Tab, Tabs } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import UserCardComponent from 'src/components/sidepages/UserCardComponent'
import CookLabAxios from '../../http/index'
import Constants from 'src/components/Constants'

class LeaderboardCard extends Component {

    state = {
        badgePic : Constants.badgePic
    }

    render() {
        return(
            <View>
            { this.props.leaderboard.map((data, index) => {
                return(
                    <UserCardComponent 
                        rank={ index+1 } 
                        badgeImage={ this.state.badgePic[parseInt(data.rank) - 1]} 
                        userImage={ data.image } 
                        userName={ data.name } 
                        point={ data.point }
                    />
                )
            })}
            </View>
        )
    }

}
export default LeaderboardCard