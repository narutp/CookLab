import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import ImageFactory from 'src/components/ImageFactory'
import ProgressBarClassic from 'react-native-progress-bar-classic'
import PBA from 'react-native-animated-progress-bar'
import BadgeCardComponent from 'src/components/sidepages/BadgeCardComponent'
import Timer from 'react-native-timer'
import Axios from 'react-native-axios'
import CookLabAxios from 'src/http/index'
import BackHeader from '../header/BackHeader'
import Constants from 'src/components/Constants'

class CookingLevel extends Component {

    state = {
        progress: 0,
        userData: {},
        MAX_PROGRESS: 0,
        userBadge: '',
        oldBadge: 0,
        badgeDetail: Constants.badgeDetail
    }

    async getUser(){
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_user?userId=${userid}`)
        } catch (error){
            console.log(error)
        }
        console.log(result.data)
        this.setState({userData: result.data})
        console.log(this.state.userData.experience)
        this.assignProgressValue()
        this.assignNeededValue()
    }

    assignNeededValue() {
        const tempArray = this.state.badgeDetail
        for(i = 0;i < this.state.badgeDetail.length;i++){
            if(i == 0)
                tempArray[i]['needed'] = 0
            else
                tempArray[i]['needed'] = this.state.badgeDetail[i-1].point
        }
        this.setState({ badgeDetail: tempArray })
    }

    assignProgressValue() {
        const tempArray = this.state.badgeDetail
        for (i = 0;i < this.state.badgeDetail.length;i++) {
            if(this.state.badgeDetail[i].point >= this.state.userData.experience){
                this.setState({userBadge: {
                    image: this.state.badgeDetail[i].image ,
                    name: this.state.badgeDetail[i].name ,
                    badgePoint: this.state.badgeDetail[i].point}
                })
                if(i == 0)
                    this.setState({ oldBadge: 0 })
                else
                    this.setState({ oldBadge: this.state.badgeDetail[i-1].point })
                this.setState({ MAX_PROGRESS: ((this.state.userData.experience-this.state.oldBadge)/
                    (this.state.userBadge.badgePoint-this.state.oldBadge)) * 100})
                this.setState({ progress: this.state.MAX_PROGRESS / 100})
                tempArray[i].progress = this.state.progress
                break
            }
            else {
                console.log("In else")
                tempArray[i].progress = 100
            }
        }
        this.setState({ badgeDetail: tempArray })
        console.log("tempArray",tempArray)
        console.log("badgeDetail",this.state.badgeDetail)
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        return (
            <View style={ styles.container }>
                <BackHeader title="LEVEL" actions="sidemenu" />
                <ScrollView style={ styles.container }>
                    <View style={styles.mybadgeComponent}>
                        <Image source={ this.state.userBadge.image } style={ styles.mybadge }/>
                        <Text style={ styles.textBadge }>{ this.state.userBadge.name }</Text>
                        <View style={ styles.badgeProgress }>
                            <PBA 
                                progress={ this.state.progress }
                                backgroundStyle={{backgroundColor: '#FFA500'}}
                                progressStyle={{backgroundColor: 'gold'}}
                                incompleteStyle={{backgroundColor: 'white'}}
                            />
                        </View>
                        <Text style={ styles.yourPoint }>Your Point: { this.state.userData.experience }</Text>
                        <Text style={ styles.badgePoint }>Point for next badge: { this.state.userBadge.badgePoint }</Text>
                    </View>
                        { this.state.badgeDetail.map((data,index) => {
                            return(
                                <BadgeCardComponent 
                                    badgeImage={data.image} 
                                    badgeName={data.name} 
                                    badgeProgress={data.progress} 
                                    point={data.needed} 
                                />
                            )
                        })}
                </ScrollView>
            </View>
        )
    }
}

export default CookingLevel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mybadgeComponent: {
        marginTop: 20
    },
    mybadge: {
        resizeMode: 'stretch',
        height: 100,
        width: 100,
        alignSelf: 'center',
        marginBottom: 10
    },
    textBadge: {
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10
    },
    badgeProgress: {
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10
    },
    yourPoint: {
        fontSize: 13,
        alignSelf: 'center'
    },
    badgePoint: {
        fontSize: 13,
        alignSelf: 'center',
        marginBottom: 5
    }
})