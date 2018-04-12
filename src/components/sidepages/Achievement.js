import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import ImageFactory from 'src/components/ImageFactory';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import BadgeCardComponent from 'src/components/sidepages/BadgeCardComponent';
import Timer from 'react-native-timer'

const MAX_PROGRESS = 40

class Achievement extends Component {

    state = {
        progress: 0
    };

    progressRunning() {
        Timer.setInterval(
            'Progress', () => {
                this.setState({progress:this.state.progress+1})
                if(this.state.progress>=MAX_PROGRESS){
                    Timer.clearInterval('Progress')
                }
            }, 10
          )
    }

    componentDidMount(){
        this.progressRunning()
    }

    render(){

        return(
            <ScrollView style={ styles.container }>
                <View style={styles.header}>
                    <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MainScreen() } size={25} style={ styles.backIcon } />
                </View>
                <View style={ styles.headTextWrapper }>
                    <Text style={ styles.headText }>Achievement</Text>
                </View>
                <View style={styles.mybadgeComponent}>
                    <Image source={ImageFactory.juniorcook3} style={ styles.mybadge }/>
                    <Text style={ styles.textBadge }>Gold Junior Cook</Text>
                    <View style={ styles.badgeProgress }><ProgressBarClassic progress={this.state.progress} /></View>
                    <Text style={ styles.yourPoint }>Your Point: 56000</Text>
                    <Text style={ styles.badgePoint }>Point for next badge: 90000</Text>
                </View>
                    <BadgeCardComponent badgeImage={ImageFactory.consumer1} badgeName='Green Consumer' badgeProgress={100} point='100' timer='1'/>
                    <BadgeCardComponent badgeImage={ImageFactory.consumer2} badgeName='Blue Consumer' badgeProgress={100} point='500' timer='2'/>
                    <BadgeCardComponent badgeImage={ImageFactory.consumer3} badgeName='Gold Consumer' badgeProgress={100} point='1000' timer='3'/>
                    <BadgeCardComponent badgeImage={ImageFactory.homecook1} badgeName='Green Homecook' badgeProgress={100} point='2500' timer='4'/>
                    <BadgeCardComponent badgeImage={ImageFactory.homecook2} badgeName='Blue Homecook' badgeProgress={100} point='5000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.homecook3} badgeName='Gold Homecook' badgeProgress={100} point='10000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.juniorcook1} badgeName='Green Juniorcook' badgeProgress={100} point='20000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.juniorcook2} badgeName='Blue Juniorcook' badgeProgress={100} point='50000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.juniorcook3} badgeName='Gold Juniorcook' badgeProgress={40} point='90000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.cook1} badgeName='Green Cook' badgeProgress={0} point='140000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.cook2} badgeName='Blue Cook' badgeProgress={0} point='210000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.cook3} badgeName='Gold Cook' badgeProgress={0} point='320000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.chef1} badgeName='Green Chef' badgeProgress={0} point='550000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.chef2} badgeName='Blue Chef' badgeProgress={0} point='750000'/>
                    <BadgeCardComponent badgeImage={ImageFactory.chef3} badgeName='Gold Chef' badgeProgress={0} point='1000000'/>
            </ScrollView>
        );
    }
}

export default Achievement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backIcon: {
        marginLeft: 10, 
        marginTop: 20 
    },
    headText: {
        alignSelf: 'center',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 10
    },
    headTextWrapper: {
        borderWidth: 0.5
    },
    header: {
        backgroundColor: '#F44336'
    },
    mybadgeComponent: {
        marginTop: 20
    },
    mybadge: {
        resizeMode: 'stretch',
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginBottom: 10
    },
    textBadge: {
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    badgeProgress: {
        width: '60%',
        alignSelf: 'center',
        marginBottom: 5
    },
    yourPoint: {
        fontSize: 16,
        alignSelf: 'center'
    },
    badgePoint: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 5
    }
})