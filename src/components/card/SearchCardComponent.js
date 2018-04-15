import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card, CardItem, Left, Body, Right, Thumbnail } from 'native-base'
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
        console.log(this.props.dishId)
        try {
            dishResponse = await CooklabAxios.get(`get_dish?dishId=${this.props.dishId}`)
        } catch (error) {
            console.log(error)
        }
        console.log('dish search' + dishResponse.data)
        this.setState({
            level: dishResponse.data.level,
            rating: dishResponse.data.rate,
            image: this.props.image,
            name: this.props.name
        })
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Left style={{ flex: 2 }}>
                        <Image source={{ uri: this.state.image }} style={{ width: 50, height: 50 }}/>
                        <Body>
                            <Text>{this.state.name}</Text>
                            <Text note style={{ fontSize: 10 }}>{'Dish level '}{this.state.level}</Text>
                        </Body>
                    </Left>
                    <Right style={{ flex: 1 }}>
                        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: '500' }}>{this.state.rating}{'/5'}</Text>
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