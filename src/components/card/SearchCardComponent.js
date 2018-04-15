import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, CardItem, Left, Body, Right } from 'native-base'

class SearchCardComponent extends Component {

    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        {/* <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/> */}
                        <Body>
                            <Text>Big spinach hamburger</Text>
                            <Text note style={{ fontSize: 9 }}>Dish level 2</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>3/5</Text>
                        </Body>
                    </Right>
                </CardItem>
            </Card>
        )
    }
}

export default SearchCardComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
})