import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, CardItem, Thumbnail } from 'native-base'
import ImageFactory from 'src/components/ImageFactory'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProgressBarClassic from 'react-native-progress-bar-classic'
import DishImageTable from './DishImageTable'
import BackHeader from '../header/BackHeader'

class MyDish extends Component {
    
    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="My dishes" actions="sidemenu" />
                <ScrollView style={ styles.container }>
                    <Card style={ styles.profile }>
                        <CardItem style={ styles.profilePicWrapper }>
                            <Thumbnail source={ ImageFactory.user1 } style={ styles.profilePic }/>
                        </CardItem>
                        <CardItem style={ styles.userDetailWrapper }>
                            <Text style={ styles.detailText }>NarutP</Text>
                            <Text style={ styles.detailText }>Points: 56000</Text>
                            <Text style={ styles.detailText }>Juniorcook III</Text>
                            <View style={ styles.badgeProgress }><ProgressBarClassic progress={40}/></View>
                        </CardItem>
                        <CardItem style={ styles.badgePicWrapper }>
                            <Thumbnail source={ ImageFactory.juniorcook3 } style={ styles.badgePic } />
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
        width: 70,
        height: 70
    },
    userDetailWrapper: {
        width: '50%',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5
    },
    detailText: {
        alignSelf: 'flex-start',
        fontSize: 14,
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
        width: 70,
        height: 70
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