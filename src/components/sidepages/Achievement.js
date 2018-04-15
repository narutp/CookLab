import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import ImageFactory from 'src/components/ImageFactory'
import { Card, CardItem, Thumbnail } from 'native-base'
import AchievementCard from './AchievementCard'
import BackHeader from '../header/BackHeader'

class Achievement extends Component {
    
    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="ACHIEVEMENT" actions="sidemenu" />
                <ScrollView style={ styles.container }>
                    {/* <Thumbnail source={ ImageFactory.user1 } style={ styles.userImage }/> */}
                    <View style={ styles.statWrapper }>
                        <View style={ styles.plateWrapper }>
                            <IconEntypo name="medal" size={30} color={'gold'} style={ styles.plateIcon }/>
                            <Text style={ styles.plateCount }>150</Text>
                        </View>
                        <View style={ styles.trophyWrapper }>
                            <FontAwesome name="trophy" size={30} color={'gold'} style={ styles.trophyIcon }/>
                            <Text style={ styles.trophyCount }>890</Text>
                        </View>
                    </View>
                    <View style={ styles.dummy }/>
                    <AchievementCard achImage={ImageFactory.plates1} achName='Plates maker I' achDetail='Make 10 plates' current='150' needed='10'/>
                    <AchievementCard achImage={ImageFactory.plates2} achName='Plates maker II' achDetail='Make 25 plates' current='150' needed='25'/>
                    <AchievementCard achImage={ImageFactory.plates3} achName='Plates maker III' achDetail='Make 50 plates' current='150' needed='50'/>
                    <AchievementCard achImage={ImageFactory.plates4} achName='Plates maker IV' achDetail='Make 100 plates' current='150' needed='100'/>
                    <AchievementCard achImage={ImageFactory.plates5} achName='Plates maker V' achDetail='Make 250 plates' current='150' needed='250'/>
                    <AchievementCard achImage={ImageFactory.plates6} achName='Plates maker VI' achDetail='Make 500 plates' current='150' needed='500'/>
                    <AchievementCard achImage={ImageFactory.plates7} achName='Plates maker VII' achDetail='Make 1000 plates' current='150' needed='1000'/>
                    <AchievementCard achImage={ImageFactory.plates8} achName='Plates maker VIII' achDetail='Make 2500 plates' current='150' needed='2500'/>
                    <AchievementCard achImage={ImageFactory.plates9} achName='Plates maker IX' achDetail='Make 5000 plates' current='150' needed='5000'/>
                    <AchievementCard achImage={ImageFactory.plates10} achName='Plates maker X' achDetail='Make 10000 plates' current='150' needed='10000'/>
                    <AchievementCard achImage={ImageFactory.trophy1} achName='Trophies acquire I' achDetail='Got 100 trophies' current='890' needed='100'/>
                    <AchievementCard achImage={ImageFactory.trophy2} achName='Trophies acquire II' achDetail='Got 1000 trophies' current='890' needed='1000'/>
                    <AchievementCard achImage={ImageFactory.trophy3} achName='Trophies acquire III' achDetail='Got 10000 trophies' current='890' needed='10000'/>
                    <AchievementCard achImage={ImageFactory.trophy4} achName='Trophies acquire IV' achDetail='Got 100000 trophies' current='890' needed='100000'/>
                    <AchievementCard achImage={ImageFactory.trophy5} achName='Trophies acquire V' achDetail='Got 1000000 trophies' current='890' needed='1000000'/>
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