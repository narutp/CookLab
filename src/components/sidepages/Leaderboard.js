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
import LeaderboardCard from './LeaderboardCard';

class Leaderboard extends Component {

    state = {
        toptab : 0,
        btmtab : 0,
        leaderboard : []
    }

    assignValueDish(){
        tempArray = this.state.leaderboard
        for (i = 0;i < tempArray.length;i++){
            tempArray[i]["point"] = this.state.leaderboard[i].count
        }
        this.setState({leaderboard : tempArray})
    }

    assignValueTrophy(){
        tempArray = this.state.leaderboard
        for (i = 0;i < tempArray.length;i++){
            tempArray[i]["point"] = this.state.leaderboard[i].trophies
        }
        this.setState({leaderboard : tempArray})
    }

    assignValueExp(){
        tempArray = this.state.leaderboard
        for (i = 0;i < tempArray.length;i++){
            tempArray[i]["point"] = this.state.leaderboard[i].experience
            tempArray[i]["image"] = this.state.leaderboard[i].photo
        }
        this.setState({leaderboard : tempArray})
    }

    async getFriendDishLeaderboard() {
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_most_post?user_id=${userid}`)
            this.setState({leaderboard : result.data})
            this.assignValueDish()
        } catch(error) {
            console.log(error)
        }
    } 

    async getGlobalDishLeaderboard() {
        try{
            result = await CookLabAxios.get(`/get_most_post`)
            this.setState({leaderboard : result.data})
            this.assignValueDish()
        } catch(error) {
            console.log(error)
        }
    } 

    async getFriendTrophyLeaderboard() {
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_most_trophy?user_id=${userid}`)
            this.setState({leaderboard : result.data})
            this.assignValueTrophy()
        } catch(error) {
            console.log(error)
        }
    } 

    async getGlobalTrophyLeaderboard() {
        try{
            result = await CookLabAxios.get(`/get_most_trophy`)
            this.setState({leaderboard : result.data})
            this.assignValueTrophy()
        } catch(error) {
            console.log(error)
        }
    } 

    async getFriendExpLeaderboard() {
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_most_rank?user_id=${userid}`)
            this.setState({leaderboard : result.data})
            this.assignValueExp()
        } catch(error) {
            console.log(error)
        }
    } 

    async getGlobalExpLeaderboard() {
        try{
            result = await CookLabAxios.get(`/get_most_rank`)
            this.setState({leaderboard : result.data})
            this.assignValueExp()
        } catch(error) {
            console.log(error)
        }
    } 

    changeTabTop(obj) {
        this.setState({toptab : obj.i})
    }

    changeTabBtm(obj) {
        this.setState({btmtab : obj.i})
    }

    componentDidMount(){
        this.getFriendDishLeaderboard()
    }

    componentWillUpdate(nextProps, nextState){
        console.log("Old : ",this.state," New : ",nextState)
        if (this.state.toptab != nextState.toptab){ 
            this.changeTabBtm({i : nextState.btmtab})
            console.log("ChangeTop Top : ",nextState.toptab," Btm : ",nextState.btmtab)
        }
        if (this.state.toptab != nextState.toptab || this.state.btmtab != nextState.btmtab){
            if (nextState.btmtab == 0 && nextState.toptab == 0)
                this.getFriendDishLeaderboard()
            else if (nextState.btmtab == 0 && nextState.toptab == 1)
                this.getGlobalDishLeaderboard()
            else if (nextState.btmtab == 1 && nextState.toptab == 0)
                this.getFriendTrophyLeaderboard()
            else if (nextState.btmtab == 1 && nextState.toptab == 1)
                this.getGlobalTrophyLeaderboard()
            else if (nextState.btmtab == 2 && nextState.toptab == 0)
                this.getFriendExpLeaderboard()
            else if (nextState.btmtab == 2 && nextState.toptab == 1)
                this.getGlobalExpLeaderboard()
            console.log("ChangeBtm Top : ",nextState.toptab," Btm : ",nextState.btmtab)
        }
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
                    <Tabs initialPage={0} onChangeTab = {(obj) => this.changeTabTop(obj)}>
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
                    <Tabs initialPage={0} onChangeTab = {(obj) => this.changeTabBtm(obj)}>
                        <Tab textStyle={ styles.Text } 
                            activeTextStyle={ styles.ActiveText }
                            tabStyle={ styles.tabStyle }
                            activeTabStyle={ styles.activeTabStyle } 
                            heading="Dish">
                            <LeaderboardCard leaderboard = {this.state.leaderboard} />
                        </Tab>
                        <Tab textStyle={ styles.Text } 
                             activeTextStyle={ styles.ActiveText }
                             tabStyle={ styles.tabStyle }
                             activeTabStyle={ styles.activeTabStyle } 
                            heading="Trophy">
                             <LeaderboardCard leaderboard = {this.state.leaderboard} />
                        </Tab>
                        <Tab textStyle={ styles.Text } 
                             activeTextStyle={ styles.ActiveText }
                             tabStyle={ styles.tabStyle }
                             activeTabStyle={ styles.activeTabStyle } 
                            heading="Exp">
                             <LeaderboardCard leaderboard = {this.state.leaderboard} />
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