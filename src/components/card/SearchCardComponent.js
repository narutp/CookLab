import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import { Card, CardItem, Left, Body, Right, Thumbnail } from 'native-base'
import CooklabAxios from '../../http/index'
import { Actions } from 'react-native-router-flux'

class SearchCardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            level: '',
            rating: '',
            image: '',
            id: '',
        }
    }

    componentDidMount() {
        // Check type of card
        if (this.props.type === 'dish') {
            this.fetchDish()
        } else {
            this.fetchUser()
        }
    }

    async fetchDish() {
        let dishResponse
        try {
            dishResponse = await CooklabAxios.get(`get_dish?dishId=${this.props.id}`)
        } catch (error) {
            console.log(error)
        }
        console.log('dish search' + dishResponse.data)
        this.setState({
            level: dishResponse.data.level,
            rating: dishResponse.data.rate,
            image: this.props.image,
            name: this.props.name,
            id: this.props.id
        })
    }

    async fetchUser() {
        let userResponse
        try {
            userResponse = await CooklabAxios.get(`get_user?userId=${this.props.id}`)
        } catch (error) {
            console.log(error)
        }
        this.setState({
            image: this.props.image,
            name: this.props.name,
            id: this.props.id
        })
    }

    navigateToDishDetail() {
        Actions.DishDetail({ idDish: this.state.id })
    }

    render() {
        return (
            <TouchableOpacity onPress={ () => this.navigateToDishDetail() }>
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
            </TouchableOpacity>
        )
    }
}

export default SearchCardComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
})