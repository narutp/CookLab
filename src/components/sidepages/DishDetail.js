import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Dimensions, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Card, CardItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../HttpRequest'
import StarRating from 'react-native-star-rating'
import BackHeader from './BackHeader';

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
            dish_level: '',
            userid: ''
        }
    }

    componentDidMount() {
        this.fetchDish()
    }

    async fetchDish() {
        let getDishResponse
        let getUserid
        try {
            getUserid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        console.log('userid' + getUserid)
        try {
            // id dish from newfeed
            getDishResponse = await CooklabAxios.get(`get_dish?dishId=${this.props.idDish}`)
        } catch (error) {
            console.log(error)
        }
        console.log('Dish detail: ' + getDishResponse.data)
        this.setState({
            // TODO: dish rate that send from back, type is string (need to change to int)
            dish_rate: getDishResponse.data.rate,
            dish_recipe: getDishResponse.data.recipe,
            dish_ingredients: getDishResponse.data.ingredients,
            dish_imageUrl: getDishResponse.data.image,
            dish_name: getDishResponse.data.name,
            dish_description: getDishResponse.data.description,
            dish_level: getDishResponse.data.level,
            userid: getUserid
        })
        console.log('ingre: ' + this.state.dish_ingredients[0])
        console.log('recipe: ' + this.state.dish_recipe)
    }

    onStarRatingPress(rating) {
        this.setState({
            dish_rate: rating
        })
    }
    
    async rateDish() {
        let rateResponse
        try {
            rateResponse = await CooklabAxios.put(`rate_dish`, {
                dish_id: this.props.idDish,
                user_id: this.state.userid,
                rate: this.state.dish_rate
            })
        } catch (error) {
            console.log(error)
        }
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <BackHeader title="Dish"/>
                <ScrollView style={ styles.container }>
                    {/* <View style={ styles.header }>
                        <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MyDish() } size={25} style={ styles.backIcon } />
                    </View> */}
                    <Image source={{ uri: this.state.dish_imageUrl }} style={ styles.dishImage }/>
                    <View style={{ padding: 25 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ marginBottom: 10 }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    halfStarEnabled
                                    iconSet={'FontAwesome'}
                                    emptyStar={'star-o'}
                                    fullStar={'star'}
                                    halfStar={'star-half-empty'}
                                    emptyStarColor={'#F4B706'}
                                    fullStarColor={'#F4B706'}
                                    starStyle={{ marginRight: 5 }}
                                    starSize={30}
                                    rating={this.state.dish_rate}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                            <Text style={ styles.dishName }>{this.state.dish_name}</Text>
                            <Text style={ styles.dishDescription }>{this.state.dish_description}</Text>
                        </View>
                        <View>
                            {/* <Text style={ styles.detailText }>Level: </Text> */}
                            <View style={ styles.subtitleWrapper }>
                                <Text style={ styles.subtitle }>Dish level: {this.state.dish_level}</Text>
                            </View>
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
                    <View>
                        <Button onPress={ () => this.rateDish() } style={ styles.rateButton }>
                            <Text style={{ color: 'black' }}>RATE THE DISH</Text>
                        </Button>
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
    },
    rateButton: {
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})