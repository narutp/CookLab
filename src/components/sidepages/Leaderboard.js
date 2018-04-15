import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button } from 'react-native';
import ImageFactory from 'src/components/ImageFactory';
import { Card, CardItem } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import UserCardComponent from 'src/components/sidepages/UserCardComponent';
import CookLabAxios from 'src/components/HttpRequest/index'

class Leaderboard extends Component {

    state = {
        leaderboard: []
    }

    async getLeaderboard(){
        try{
            result = await CookLabAxios.get(`/get_most_post`)
            this.setState({leaderboard: result.data})
        } catch(error) {
            console.log(error)
        }
        console.log("Result ",result.data)
        console.log("State", this.state.leaderboard)
    } 

    componentDidMount(){
        this.getLeaderboard()
    }

    render() {
        return(
            <ScrollView style={ styles.container }>
                <View style={styles.header}>
                    <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MainScreen() } size={25} style={ styles.backIcon } />
                </View>
                <Card style={ styles.chooser }>
                    <CardItem style={ styles.friendWrapper }>
                        <Ionicons name="ios-people" onPress={() => Actions.Leaderboard()} style={ styles.friendIcon } />
                        <Text style={ styles.friendText }>Friends</Text>
                    </CardItem>
                    <CardItem style={ styles.globalWrapper }>
                        <Ionicons name="ios-globe" onPress={() => Actions.Leaderboard()} style={ styles.globalIcon } />
                        <Text style={ styles.globalText }>Global</Text>
                    </CardItem>
                </Card>
                <Text style={ styles.leaderboard }>LeaderBoard</Text>
                { this.state.leaderboard.map((data, index) => {
                    return(
                        <UserCardComponent 
                            rank={ index+1 } 
                            badgeImage={ImageFactory.chef1} 
                            userImage={ImageFactory.user2} 
                            userName={ data.name } 
                            point={ data.count }
                        />
                    )
                })}
            </ScrollView>
        )
    }
}

export default Leaderboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#F44336'
    },
    backIcon: {
        marginLeft: 10, 
        marginTop: 6,
        color: 'white' 
    },
    chooser: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    leaderboard: {
        fontSize: 24,
        alignSelf: 'center'
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
    friendIcon: {
        color: '#7f0000',
        fontSize: 30
    },
    globalIcon: {
        color: '#7f0000',
        fontSize: 30
    },
    friendText: {
        fontSize: 18,
        marginLeft: 8
    },
    globalText: {
        fontSize: 18,
        marginLeft: 8
    }
})