import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';

class CardComponent extends Component {

    render() {
        const profileImage = {
            '1': require('../assets/image/Profile/profilePic1.jpg'),
            '2': require('../assets/image/Profile/profilePic2.jpg')
        }
        const foodImage = {
            '1': require('../assets/image/Food/food1.jpg'),
            '2': require('../assets/image/Food/food2.jpg'),
            '3': require('../assets/image/Food/food3.jpg'),
            '4': require('../assets/image/Food/food4.jpg'),
            '5': require('../assets/image/Food/food5.jpg'),
            '6': require('../assets/image/Food/food6.jpg'),
            '7': require('../assets/image/Food/food7.jpg'),
            '8': require('../assets/image/Food/food8.jpg'),
            '9': require('../assets/image/Food/food9.jpg')
        }

        return (
            <View style={ styles.container }>
                <Card>
                    <CardItem header style={styles.headerCard}>
                        <Left>
                            <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/>
                            <Body>
                                <Text>Natanon </Text>
                                <Text note style={{ fontSize: 9 }}>April 27, 2018</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        {/* <Image source={foodImage[this.props.foodPic]} style={styles.imageCard}/> */}
                        <Image source={{ uri: this.props.foodPic }} style={styles.imageCard} />
                    </CardItem>
                    <CardItem style={styles.footerCard}>
                        <Left>
                            <Button transparent>
                                <IconIonicons name='md-heart-outline' style={{ color: 'black' }} size={15}/>
                            </Button>
                            <Button transparent>
                                <IconIonicons name='ios-paper-outline' style={{ color: 'black' }} size={15}/>
                            </Button>
                            <Button transparent>
                                <IconIonicons name='md-share' style={{ color: 'black' }} size={15}/>
                            </Button>
                        </Left>
                    </CardItem>
                    <CardItem style={{ height: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: '500' }}>{this.props.love} love </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{ fontSize: 12 }}>
                                <Text style={{ fontWeight: '900' }}>Natanon </Text>
                                Beautiful lunch :p #lunch #whataniceday #thailand #withfriends
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
    resizeMode: 'stretch',
    height: 250,
    width: '100%'
  },
  footerCard: {
    height: 35
  }
})