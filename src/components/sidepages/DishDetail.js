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
            dish_recipe: [],
            dish_ingredients: [],
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
        console.log('ingre: ' + this.state.dish_ingredients[0])
        console.log('recipe: ' + this.state.dish_recipe)
    }
    render(){
        return(
            <View>
                <Header style={styles.headerModal}>
                    <Left style={{ flex: 1, justifyContent: 'center' }}>
                        <IconIonicons name="ios-arrow-back" onPress={() => {
                            Actions.MainScreen()
                        }} color={'black'} size={25} style={ styles.backIcon } />
                    </Left>
                </Header>
                <ScrollView style={ styles.container }>
                    {/* <View style={ styles.header }>
                        <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MyDish() } size={25} style={ styles.backIcon } />
                    </View> */}
                    <Image source={{ uri: this.state.dish_imageUrl }} style={ styles.dishImage }/>
                    <View style={{ padding: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={ styles.dishName }>{this.state.dish_name}</Text>
                            <Text style={ styles.dishDescription }>{this.state.dish_description}</Text>
                        </View>
                        <View>
                            {/* <Text style={ styles.detailText }>Level: </Text> */}
                            <View style={ styles.subtitleWrapper }>
                                <Text style={ styles.subtitle }>Ingredients</Text>
                                { this.state.dish_ingredients.map(element => {
                                    return <Text style={ styles.detailText }>{element}{"\n"}</Text>
                                })}
                                {/* <Text style={ styles.detailText }>{this.state.dish_ingredients}</Text> */}
                            </View>
                            <View style={ styles.subtitleWrapper }>
                                <Text style={ styles.subtitle }>Recipes</Text>
                                { this.state.dish_recipe.map(element => {
                                    return <Text style={ styles.detailText }>{element}{"\n"}</Text>
                                })}
                            </View>
                        </View>
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
        backgroundColor: 'white',
    },
    headerModal: {
        backgroundColor: 'white',
    },
    backIcon: {
        marginLeft: 10
    },
    backIcon: {
        marginLeft: 10, 
        marginTop: 6,
        color: 'black' 
    },
    dishName: {
        fontSize: 16,
        fontWeight: '800'
    },
    dishDescription: {
        fontSize: 13,
        fontWeight: '500'
    },
    dishImage: {
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        height: 250,
        marginBottom: 5
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 10
    },
    subtitleWrapper: {
        marginBottom: 15
    },
    detail: {
        marginLeft: 10
    },
    detailText: {
        fontSize: 12
    }  
})