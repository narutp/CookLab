import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';

class CardComponent extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <Card>
                    <CardItem header style={styles.headerCard}>
                        <Left>
                            <Thumbnail source={require
                            ('../assets/image/Profile/profilePic1.jpg')} style={{ width: 30, height: 30 }}/>
                            <Body>
                                <Text>Natanon </Text>
                                <Text note style={{ fontSize: 9 }}>April 27, 2018</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../assets/image/Food/food1.jpeg')} style={styles.imageCard}/>
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
                        <Text style={{ fontSize: 12, fontWeight: '500' }}> 102 love</Text>
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