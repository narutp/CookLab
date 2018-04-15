import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, CardItem, Left, Body, Right } from 'native-base'
import CooklabAxios from '../../http/index'

class SearchCardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            level: '',
            rating: '',
            image: ''
        }
    }

    componentDidMount() {
        this.fetchDish()
    }

    async fetchDish() {
        let dishResponse
        try {
            dishResponse = await CooklabAxios.get(`get_dish?dishId=${this.props.dishId}`)
        } catch (error) {
            console.log(error)
        }
        console.log('dish search' + dishResponse.data)
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        {/* <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/> */}
                        <Body>
                            <Text>{this.props.name}</Text>
                            <Text note style={{ fontSize: 9 }}>{'Dish level '}{this.props.level}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.rating}{'/5'}</Text>
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