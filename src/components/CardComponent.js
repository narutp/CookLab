import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';

class CardComponent extends Component {

    render() {
        return (
            <Card style={ styles.container }>
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
                    
                </CardItem>
            </Card>
        );
    }
}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})