import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, CardItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import RecipeCard from './RecipeCard'
import DishActions from 'src/redux/actions/dish'

class RecipeList extends Component{
    
    state = {
        r_list : []
    }

    componentDidMount(){
        this.setState({r_list : this.props.r_list})
    }

    addRecipe(){
        tempArray = this.state.r_list
        tempArray.push({ text: '' })
        this.setState({r_list : tempArray}, () => {this.updateList()})
    }

    updateList(){
        this.props.setRecipeList(this.state.r_list)
        this.props.update()
    }

    render(){
        return(
            <View style={styles.container}>
                { this.props.r_list.map((data,index) => {
                    return(
                        <RecipeCard 
                            id={ index }
                            text={ data.text }
                            update={ () => {this.forceUpdate()} }
                        />
                    )
                })}
                <Button onPress={() => this.addRecipe()} style={styles.addButton}>
                    <Text style={{color : 'white'}}>Add</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        r_list : state.dishReducer.r_list
    }
}

const mapDispatchToProps = dispatch => ({
    setRecipeList: (r_list) => {
        dispatch(DishActions.setRecipeList(r_list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 10
    },
    addButton: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 40,
        height: 25,
        marginTop: 10
    }
})