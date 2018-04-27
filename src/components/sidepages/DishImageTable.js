import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import ImageFactory from 'src/components/ImageFactory'
import DishActions from 'src/redux/actions/dish'
import CookLabAxios from 'src/http/index'

class DishImageTable extends Component {

    state = {
        dishes : []
    }

    async getUserDish(){
        let userid = await AsyncStorage.getItem('userid')
        try{
            result = await CookLabAxios.get(`/get_user_dish?user_id=${userid}`)
            this.setState({ dishes : result.data })
            console.log(this.state.dishes)
        } catch (error){
            console.log(error)
        }
    }

    componentDidMount(){
        this.getUserDish()
    }

    showDetail(data){
        console.log("In showDetail")
        this.props.setImageSource({uri: data.image})
        this.props.setDishDetail(data)
        Actions.DishDetail()
    }

    render(){
        return(
            <View style={ styles.foodImageTable }>
                { this.state.dishes.map((data, index) => {
                    return(
                        <TouchableOpacity style={ styles.foodImageWrapper } 
                            onPress={() => this.showDetail(data)}>
                            <Image source={ {uri : data.image} } 
                                style={ styles.foodImage }/>
                        </TouchableOpacity> 
                    )  
                })}
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setImageSource: (imageSource) => {
        dispatch(DishActions.setImageSource(imageSource))
    },
    setDishDetail: (list) => {
        dispatch(DishActions.setDishDetail(list))
    }
})

export default connect(null, mapDispatchToProps)(DishImageTable)

const styles = StyleSheet.create({
    foodImage: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#C0C0C0'
    },
    foodImageTable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10
    },
    foodImageWrapper: {
        width: Dimensions.get('window').width/3,
        height: 120,
        alignItems: 'center'
    }
})