import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';

class CardComponent extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <Card>
                    <CardItem header style={styles.headerCard}>
                        <Left>
                            <Thumbnail source={require
                            ('../assets/image/tan.jpg')} style={{ width: 35, height: 35 }}/>
                            <Body>
                                <Text>Natanon </Text>
                                <Text note style={{ fontSize: 10 }}>April 27, 2018</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../assets/image/food.jpg')} style={styles.imageCard}/>
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
    height: 50
  },
  imageCard: {
    resizeMode: 'stretch',
    height: 200,
    width: '100%'
  },
})