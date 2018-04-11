import React, { Component } from 'react';
import { TextInput, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import CooklabAxios from './HttpRequest/index'

// const FBSDK = require('react-native-fbsdk');
// const {
//   ShareDialog,
// } = FBSDK

// // Build up a shareable link.
// const shareLinkContent = {
//     contentType: 'link',
//     contentUrl: "https://facebook.com",
//     contentDescription: 'Wow, check out this great site!',
// };

class CardComponent extends Component {

    async increaseTrophy () {
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let trophyResponse
        try {
            trophyResponse = await CooklabAxios.put(`/increase_trophy`, {
                userId: userid,
                postId: this.props.postId
            })
        } catch (error) {
            console.log(error)
        }
        console.log(trophyResponse)
    }

    async decreaseTrophy () {
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let trophyResponse
        try {
            trophyResponse = await CooklabAxios.put(`/increase_trophy`, {
                userId: userid,
                postId: this.props.postId
            })
        } catch (error) {
            console.log(error)
        }
        console.log(trophyResponse)
    }

    render() {
        const profileImage = {
            '1': require('../assets/image/Profile/profilePic1.jpg'),
            '2': require('../assets/image/Profile/profilePic2.jpg')
        }

        return (
            <View style={ styles.container }>
                <Card>
                    <CardItem header style={styles.headerCard}>
                        <Left>
                            <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/>
                            <Body>
                                <Text>{this.props.userName} </Text>
                                <Text note style={{ fontSize: 9 }}>{this.props.date}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        {/* <Image source={foodImage[this.props.foodPic]} style={styles.imageCard}/> */}
                        <Image source={{ uri: this.props.foodPic }} style={styles.imageCard} />
                    </CardItem>
                    <CardItem style={styles.footerCard}>
                        <Left>
                            { this.props.status === true ? 
                            <TouchableOpacity onPress={ () => this.decreaseTrophy() } style={{ justifyContent: 'center', alignItems: 'center', width: 15, marginRight: 10 }}>
                                <IconEntypo name='trophy' style={{ color: '#F44336' }} size={15}/>
                            </TouchableOpacity> : 
                            <TouchableOpacity onPress={ () => this.increaseTrophy() } style={{ justifyContent: 'center', alignItems: 'center', width: 15, marginRight: 10 }}>
                                <IconEntypo name='trophy' style={{ color: 'black' }} size={15}/>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 15, marginRight: 10 }}>
                                <IconIonicons name='ios-paper-outline' style={{ color: 'black' }} size={15}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 15, marginRight: 10 }}>
                                <IconIonicons name='md-share' style={{ color: 'black' }} size={15}/>
                            </TouchableOpacity>
                        </Left>
                    </CardItem>
                    <CardItem style={{ height: 10 }}>
                        { this.props.trophy == 1 ? 
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.props.trophy } trophy </Text>
                            : <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.props.trophy } trophies </Text>
                        }
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{ fontSize: 12 }}>
                                <Text style={{ fontWeight: '900' }}>Natanon </Text>
                                { this.props.caption }
                            </Text>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }} >more...</Text>
                            </TouchableOpacity>
                            <TextInput style={ styles.commentInput } placeholder="comment.. " />
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width
  },
  headerCard: {
    height: 45
  },
  imageCard: {
    resizeMode: 'cover',
    height: 250,
    width: '100%'
  },
  footerCard: {
    height: 35
  },
  commentInput: {
      width: '100%',
      fontSize: 9,
      height: 40
  }
})