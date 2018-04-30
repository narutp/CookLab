import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Image, AsyncStorage } from 'react-native'
import { Card, CardItem, Left, Body, Right, Thumbnail } from 'native-base'
import CooklabAxios from '../../http/index'
import { Actions } from 'react-native-router-flux'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

class SearchCardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            level: '',
            rating: '',
            userid: ''
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
        })
    }

    async fetchUser() {
        let getUserId
        try {
            getUserId = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }

        let userResponse
        try {
            userResponse = await CooklabAxios.get(`get_user?userId=${this.props.id}`)
        } catch (error) {
            console.log(error)
        }
        this.setState({
            userid: getUserId 
        })
    }

    navigateToDishDetail() {
        Actions.DishDetail({ idDish: this.props.id })
    }

    navigateToUserDetail() {
        // check same user
        if (this.state.userid === this.props.id) {
            Actions.MyDish()
        } else {       
            Actions.UserDetail({ idUser: this.props.id })
        }
    }

    render() {
        return (
            <View>
                { this.props.type === 'dish' ?
                    <TouchableOpacity onPress={ () => this.navigateToDishDetail() }>
                        <Card>
                            <CardItem>
                                <Left style={{ flex: 2 }}>
                                    <Image source={{ uri: this.props.image }} style={ styles.image }/>
                                    <Body>
                                        <Text>{this.props.name}</Text>
                                        <Text note style={{ fontSize: 10 }}>{'Dish level '}{this.state.level}</Text>
                                    </Body>
                                </Left>
                                <Right style={{ flex: 1 }}>
                                    <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text note>Rating</Text>
                                        <Text style={{ fontWeight: '400' }}>{this.state.rating}{'/5'}</Text>
                                    </Body>
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={ () => this.navigateToUserDetail() }>
                        <Card>
                            <CardItem>
                                <Left style={{ flex: 2 }}>
                                    <Image source={{ uri: this.props.image }} style={ styles.image }/>
                                    <Body>
                                        <Text>{this.props.name}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <IconFontAwesome name="user" size={20} />
                                    </Body>
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default SearchCardComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    image: {
        width: 60,
        height: 60
    }
})