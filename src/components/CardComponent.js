import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'

class CardComponent extends Component {

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
                                <Text>Natanon </Text>
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
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 10, marginRight: 10 }}>
                                <IconEntypo name='trophy' style={{ color: 'black' }} size={15}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 10, marginRight: 10 }}>
                                <IconIonicons name='ios-paper-outline' style={{ color: 'black' }} size={15}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 10, marginRight: 10 }}>
                                <IconIonicons name='md-share' style={{ color: 'black' }} size={15}/>
                            </TouchableOpacity>
                        </Left>
                    </CardItem>
                    <CardItem style={{ height: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.props.love } love </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{ fontSize: 12 }}>
                                <Text style={{ fontWeight: '900' }}>Natanon </Text>
                                { this.props.caption }
                            </Text>
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
  }
})