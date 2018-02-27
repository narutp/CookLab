import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';

class CardComponent extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require
                            ('../assets/image/tan.jpg')} />
                            <Body>
                                <Text>Natanon </Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../assets/image/food.jpg')} style={styles.imageBody}/>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flex: 1,
    width: Dimensions.get('window').width
    // flexDirection: 'row',
    // alignItems: 'stretch',
    // justifyContent: 'center',
  },
  imageBody: {
    resizeMode: 'stretch',
    height: 200,
    width: '100%'
  },
})