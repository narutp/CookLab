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
        list : []
    }

    componentDidMount(){
        this.setState({list : this.props.list})
    }

    addDish(){
        tempArray = this.state.list
        tempArray.push({ text: '' })
        this.setState({list : tempArray}, () => {this.props.setRecipeList(this.state.list)})
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                { this.props.list.map((data,index) => {
                    return(
                        <RecipeCard 
                            id={ index }
                            text={ data.text }
                            update={ () => {this.forceUpdate()} }
                        />
                    )
                })}
                <Button onPress={() => this.addDish()} style={styles.addButton}>
                    <Text style={{color : 'white'}}>Add</Text>
                </Button>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        list : state.dishReducer.r_list
    }
}

const mapDispatchToProps = dispatch => ({
    setRecipeList: (list) => {
        dispatch(DishActions.setRecipeList(list))
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
        height: 25
    }
})