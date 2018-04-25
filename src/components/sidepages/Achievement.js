import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import ImageFactory from 'src/components/ImageFactory'
import { Card, CardItem, Thumbnail } from 'native-base'
import AchievementCard from './AchievementCard'
import BackHeader from '../header/BackHeader'
import CookLabAxios from '../../http/index'
import Constants from 'src/components/Constants'

class Achievement extends Component {

    state = {
        currentPlate: 0,
        currentTrophy: 0,
        achievement: Constants.achievement
    }

    async getUser(){
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_trophy_dish?user_id=${userid}`)
            console.log(result.data)
            this.setState({currentPlate : result.data.dish})
            this.setState({currentTrophy : result.data.trophy})
        } catch (error){
            console.log(error)
        }
        this.setCurrentUser()
        console.log(this.state.achievement)
    }

    setCurrentUser(){
        const tempArray = this.state.achievement
        for(i = 0;i < 15;i++){
            if (i < 10)
                tempArray[i]["current"] = this.state.currentPlate
            else
                tempArray[i]["current"] = this.state.currentTrophy
        }
        this.setState({achievement: tempArray})
    }

    componentDidMount(){
        this.getUser()
    }

    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="ACHIEVEMENT" actions="sidemenu" />
                <ScrollView style={ styles.container }>
                    {/* <Thumbnail source={ ImageFactory.user1 } style={ styles.userImage }/> */}
                    <View style={ styles.statWrapper }>
                        <View style={ styles.plateWrapper }>
                            <IconEntypo name="medal" size={30} color={'gold'} style={ styles.plateIcon }/>
                            <Text style={ styles.plateCount }>{this.state.currentPlate}</Text>
                        </View>
                        <View style={ styles.trophyWrapper }>
                            <FontAwesome name="trophy" size={30} color={'gold'} style={ styles.trophyIcon }/>
                            <Text style={ styles.trophyCount }>{this.state.currentTrophy}</Text>
                        </View>
                    </View>
                    <View style={ styles.dummy }/>
                    { this.state.achievement.map((data,index) => {
                        return(
                            <AchievementCard 
                                achImage={data.achImage} 
                                achName={data.achName}
                                achDetail={data.achDetail} 
                                current={data.current}
                                needed={data.needed}
                            />
                        )
                    })}
                </ScrollView>
            </View>
            
        )
    }
}

export default Achievement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userImage: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        marginTop: 10
    },
    statWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    dummy: {
        marginTop: 10
    },
    plateWrapper: {
        alignSelf: 'center',
        width: '50%',
    },
    plateIcon: {
        alignSelf: 'center'
    },
    plateCount: {
        marginTop: 5,
        fontSize: 13,
        alignSelf: 'center'
    },
    trophyWrapper: {
        alignSelf: 'center',
        width: '50%'
    },
    trophyIcon: {
        alignSelf: 'center'
    },
    trophyCount: {
        marginTop: 5,
        fontSize: 13,
        alignSelf: 'center'
    }
})