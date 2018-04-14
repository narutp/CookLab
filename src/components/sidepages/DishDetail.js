import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Button, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Card, CardItem, Left, Right, Header, Body } from 'native-base'
import CooklabAxios from '../HttpRequest'

class DishDetail extends Component{
    
    constructor(props) {
        super(props)
        console.log('id dish' + this.props.idDish)
        this.state = {
            dish_rate: '',
            dish_recipe: '',
            dish_ingredients: '',
            dish_imageUrl: '',
            dish_name: '',
            dish_description: '',
            dish_level: ''
        }
    }

    componentDidMount() {
        this.fetchDish()
    }

    async fetchDish() {
        let getDishResponse
        try {
            // id dish from newfeed
            getDishResponse = await CooklabAxios.get(`get_dish?dishId=${this.props.idDish}`)
        } catch (error) {
            console.log(error)
        }
        console.log('Dish detail: ' + getDishResponse.data)
        this.setState({
            dish_rate: getDishResponse.data.rate,
            dish_recipe: getDishResponse.data.recipe,
            dish_ingredients: getDishResponse.data.ingredients,
            dish_imageUrl: getDishResponse.data.image,
            dish_name: getDishResponse.data.name,
            dish_description: getDishResponse.data.description,
            dish_level: getDishResponse.data.level
        })
    }
    render(){
        return(
            <View>
                <Header style={styles.headerModal}>
                    <Left>
                        <IconIonicons name="ios-arrow-back" onPress={() => {
                            Action.MainScreen()
                        }} color={'black'} size={25} style={ styles.backIcon } />
                    </Left>
                    <Body>
                        <Text>Dish</Text>
                    </Body>
                </Header>
                <ScrollView style={ styles.container }>
                    {/* <View style={ styles.header }>
                        <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MyDish() } size={25} style={ styles.backIcon } />
                    </View> */}
                    <Image source={{ uri: this.state.dish_imageUrl }} style={ styles.dishImage }/>
                    <Card>
                        <CardItem style={ styles.dishNameWrapper }><Text style={ styles.dishName }>{this.state.dish_name}</Text></CardItem>
                    </Card>
                    <View style={ styles.detail }>
                        <Text style={ styles.detailText }>Type: </Text>
                        <Text style={ styles.detailText }>Level: </Text>
                        <Text style={ styles.detailText }>Description: </Text>
                        <Text style={ styles.detailText }>Ingredients: </Text>
                        <Text style={ styles.detailText }>Recipe: </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    imageSource: state.dishReducer.imageSource
})

export default connect(mapStateToProps, null)(DishDetail)

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white'
    },
    headerModal: {
        backgroundColor: 'white'
    },
    backIcon: {
        marginLeft: 10
    },
    backIcon: {
        marginLeft: 10, 
        marginTop: 6,
        color: 'white' 
    },
    dishNameWrapper: {
        width: Dimensions.get('window').width
    },
    dishName: {
        fontSize: 24
    },
    dishImage: {
        width: Dimensions.get('window').width,
        height: 250
    },
    detail: {
        marginLeft: 10
    },
    detailText: {
        fontSize: 18
    }  
})