import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Card, CardItem } from 'native-base'

class SearchCardComponent extends Component {

    render() {
        return (
            <Card>
                <CardItem>
                    <Text>Hello</Text>
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