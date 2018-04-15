import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage, TouchableOpacity } from 'react-native'
import ImageFactory from 'src/components/ImageFactory'
import { Card, CardItem, List, ListItem, Header, Tab, Tabs } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import UserCardComponent from 'src/components/sidepages/UserCardComponent'
import CookLabAxios from '../../http/index'
import BackHeader from '../header/BackHeader'
import FriendExpLeaderboard from 'src/components/sidepages/FriendExpLeaderboard'
import GlobalExpLeaderboard from 'src/components/sidepages/GlobalExpLeaderboard'
import FriendDishLeaderboard from 'src/components/sidepages/FriendDishLeaderboard'
import GlobalDishLeaderboard from 'src/components/sidepages/GlobalDishLeaderboard'
import FriendTrophyLeaderboard from 'src/components/sidepages/FriendTrophyLeaderboard'
import GlobalTrophyLeaderboard from 'src/components/sidepages/GlobalTrophyLeaderboard'

class Leaderboard extends Component {

    state = {
        tab : 0
    }

    changeTab() {
        if (this.state.tab != 1)
            this.setState({tab : 1})
        else 
            this.setState({tab : 0})
        console.log(this.state.tab)
    }

    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="LEADERBOARD" actions="sidemenu" />
                <ScrollView style={ styles.container }>
                    {/* <Card style={ styles.chooser }>
                        <CardItem style={ styles.friendWrapper }>
                            <Ionicons name="ios-people" onPress={() => Actions.Leaderboard()} style={ styles.friendIcon } />
                            <Text style={ styles.friendText }>Friends</Text>
                        </CardItem>
                        <CardItem style={ styles.globalWrapper }>
                            <Ionicons name="ios-globe" onPress={() => Actions.Leaderboard()} style={ styles.globalIcon } />
                            <Text style={ styles.globalText }>Global</Text>
                        </CardItem>
                    </Card> */}
                    <Tabs initialPage={0} onChangeTab = {() => this.changeTab()}>
                        <Tab textStyle={ styles.Text } 
                            activeTextStyle={ styles.ActiveText }
                            tabStyle={ styles.tabStyle }
                            activeTabStyle={ styles.activeTabStyle }
                            heading="Friends">
                        </Tab>
                        <Tab textStyle={ styles.Text } 
                             activeTextStyle={ styles.ActiveText }
                             tabStyle={ styles.tabStyle }
                             activeTabStyle={ styles.activeTabStyle }
                            heading="Global">
                        </Tab>
                    </Tabs>
                    <Tabs initialPage={0}>
                        <Tab textStyle={ styles.Text } 
                            activeTextStyle={ styles.ActiveText }
                            tabStyle={ styles.tabStyle }
                            activeTabStyle={ styles.activeTabStyle } 
                            heading="Dish">
                            { this.state.tab == 0 ?
                                <FriendDishLeaderboard /> :
                                <GlobalDishLeaderboard />
                            } 
                        </Tab>
                        <Tab textStyle={ styles.Text } 
                             activeTextStyle={ styles.ActiveText }
                             tabStyle={ styles.tabStyle }
                             activeTabStyle={ styles.activeTabStyle } 
                            heading="Trophy">
                             { this.state.tab == 0 ?
                                <FriendTrophyLeaderboard /> :
                                <GlobalTrophyLeaderboard />
                            } 
                        </Tab>
                        <Tab textStyle={ styles.Text } 
                             activeTextStyle={ styles.ActiveText }
                             tabStyle={ styles.tabStyle }
                             activeTabStyle={ styles.activeTabStyle } 
                            heading="Exp">
                             { this.state.tab == 0 ?
                                <FriendExpLeaderboard /> :
                                <GlobalExpLeaderboard />
                             } 
                        </Tab>
                    </Tabs>
                </ScrollView>
            </View>
        )
    }
}

export default Leaderboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    chooser: {
        // flex: 1,
        flexDirection: 'row',
        // justifyContent: 'flex-start'
    },
    tableHeader: {
        flex: 1,
        flexDirection: 'row'
    },
    friendWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
        borderWidth: 0.25,
        borderColor: '#C0C0C0'
    },
    globalWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
        borderWidth: 0.25,
        borderColor: '#C0C0C0'
    },
    Icon: {
        color: '#3E5AAE',
        fontSize: 15
    },
    Text: {
        color: '#3E5AAE', 
        fontSize: 12, 
        fontWeight: '500' 
    },
    ActiveText: { 
        color: '#3E5AAE', 
        fontSize: 14, 
        fontWeight: 'bold', 
        textDecorationLine: 'underline' 
    },
    tabStyle: {
        backgroundColor: 'white'
    },
    activeTabStyle: {
        backgroundColor: 'white'
    }
})