import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import ImageFactory from 'src/components/ImageFactory';
import ProgressBarClassic from 'react-native-progress-bar-classic';
import BadgeCardComponent from 'src/components/sidepages/BadgeCardComponent';
import Timer from 'react-native-timer'
import Axios from 'react-native-axios'
import CookLabAxios from 'src/components/HttpRequest/index'

class CookingLevel extends Component {

    state = {
        progress: 0,
        userData: {},
        MAX_PROGRESS: 0,
        badgeDetail: [ {image: ImageFactory.consumer1 ,name:'Consumer I', point:0, progress:0}, 
                       {image: ImageFactory.consumer2 ,name:'Consumer II', point:40, progress:0},
                       {image: ImageFactory.consumer3 ,name:'Consumer III', point:80, progress:0},
                       {image: ImageFactory.homecook1 ,name:'Homecook I', point:150, progress:0},
                       {image: ImageFactory.homecook2 ,name:'Homecook II', point:270, progress:0},
                       {image: ImageFactory.homecook3 ,name:'Homecook III', point:400, progress:0},
                       {image: ImageFactory.juniorcook1 ,name:'Juniorcook I', point:550, progress:0},
                       {image: ImageFactory.juniorcook2 ,name:'Juniorcook II', point:720, progress:0},
                       {image: ImageFactory.juniorcook3 ,name:'Juniorcook III', point:900, progress:0},
                       {image: ImageFactory.cook1 ,name:'Cook I', point:1400, progress:0},
                       {image: ImageFactory.cook2 ,name:'Cook II', point:2000, progress:0},
                       {image: ImageFactory.cook3 ,name:'Cook III', point:2900, progress:0},
                       {image: ImageFactory.chef1 ,name:'Chef I', point:4500, progress:0},
                       {image: ImageFactory.chef2 ,name:'Chef II', point:6900, progress:0},
                       {image: ImageFactory.chef3 ,name:'Chef III', point:10000, progress:0} ]
    };

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
        this.progressRunning()
        this.assignProgressValue()
    }

    progressRunning() {
        this.state.MAX_PROGRESS = ((this.state.userData.experience-80)/(150-80)) * 100
        Timer.setInterval(
            'Progress', () => {
                this.setState({progress:this.state.progress+2})
                if(this.state.progress>=this.state.MAX_PROGRESS){
                    Timer.clearInterval('Progress')
                }
            }, 10
          )
    }

    assignProgressValue(){
        const tempArray = this.state.badgeDetail
        for (i = 0;i < this.state.badgeDetail.length;i++){
            if(this.state.badgeDetail[i].point >= this.state.MAX_PROGRESS){
                console.log("In if", this.state.MAX_PROGRESS ,"Point " ,this.state.badgeDetail[i].point)
                tempArray[i].progress = Math.ceil(this.state.MAX_PROGRESS)
                break
            }
            else{
                console.log("In else")
                tempArray[i].progress = 100
            }
        }
        this.setState({ badgeDetail: tempArray })
        console.log("tempArray",tempArray)
        console.log("badgeDetail",this.state.badgeDetail)
    }

    componentDidMount(){
        this.getUser()
    }

    render(){

        return(
            <ScrollView style={ styles.container }>
                <View style={styles.header}>
                    <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MainScreen() } size={25} style={ styles.backIcon } />
                </View>
                <View style={ styles.headTextWrapper }>
                    <Text style={ styles.headText }>CookingLevel</Text>
                </View>
                <View style={styles.mybadgeComponent}>
                    <Image source={ImageFactory.consumer3} style={ styles.mybadge }/>
                    <Text style={ styles.textBadge }>Consumer III</Text>
                    <View style={ styles.badgeProgress }><ProgressBarClassic progress={this.state.progress} /></View>
                    <Text style={ styles.yourPoint }>Your Point: { this.state.userData.experience }</Text>
                    <Text style={ styles.badgePoint }>Point for next badge: 150</Text>
                </View>
                    { this.state.badgeDetail.map((data,index) => {
                        return(
                            <BadgeCardComponent 
                                badgeImage={data.image} 
                                badgeName={data.name} 
                                badgeProgress={data.progress} 
                                point={data.point} 
                            />
                        )
                    })}
            </ScrollView>
        );
    }
}

export default CookingLevel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backIcon: {
        marginLeft: 10, 
        marginTop: 6,
        color: 'white' 
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