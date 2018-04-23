import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, CardItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import IngredientCard from './IngredientCard'
import DishActions from 'src/redux/actions/dish'

class IngredientList extends Component{
    
    state = {
        list : []
    }

    componentDidMount(){
        this.setState({list : this.props.list})
    }

    addDish(){
        tempArray = this.state.list
        tempArray.push({ text: '' })
        this.setState({list : tempArray}, () => {this.props.setIngredientList(this.state.list)})
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                { this.props.list.map((data,index) => {
                    return(
                        <IngredientCard 
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
    console.log("STATE: ", state)
    return {
        list : state.dishReducer.i_list
    }
}

const mapDispatchToProps = dispatch => ({
    setIngredientList: (list) => {
        dispatch(DishActions.setIngredientList(list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(IngredientList)

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