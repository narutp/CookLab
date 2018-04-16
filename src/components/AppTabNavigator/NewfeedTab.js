import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AppHeader from '../header/AppHeader'
import { Container, Content, Left, Right, Body } from 'native-base';
import CardComponent from '../CardComponent.js'
import CooklabAxios from '../../http/index'
import moment from 'moment'

class NewfeedTab extends Component {

    componentDidMount() {
        this.fetchPost()
    }

    async fetchPost() {
        let userid
        let feedResponse
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        console.log('newfeed' + userid)
        try {
            feedResponse = await CooklabAxios.get(`/feeds?userId=${userid}`)
            this.setState({feedResponse: feedResponse.data})
            let newDate
            feedResponse.data.forEach(element => {
                console.log(element)
            });
        } catch (error) {
            console.log(error)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            feedResponse: [],
            user: ''
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <AppHeader onMenuPressed={ this.props.onMenuPressed } showCameraRoll={ this.props.showCameraRoll } />
                <Content>
                    {this.state.feedResponse.map((data, index) => {
                        return (
                            <CardComponent 
                                trophy={data.trophies} 
                                profilePic={data.photo} 
                                foodPic={data.image} 
                                caption={data.caption}
                                date={moment.utc(data.timestamp).format("MMMM Do YYYY, h:mm a")}
                                userName={data.user_name}
                                postId={data._id}
                                status={data.status}
                                comments={data.comments}
                                idDish={data.id_dish}
                             />
                        )
                    })}
                    {/* <CardComponent love='176' profilePic='1' foodPic='1' />
                    <CardComponent love='71' profilePic='2' foodPic='2' />
                    <CardComponent love='26' profilePic='1' foodPic='3' />
                    <CardComponent love='34' profilePic='2' foodPic='4' />
                    <CardComponent love='102' profilePic='2' foodPic='5' /> */}
                </Content>
            </Container>
        )
    }
}

export default NewfeedTab;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4F4F4F'
  }
})
