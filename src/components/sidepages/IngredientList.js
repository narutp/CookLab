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
        i_list : []
    }

    componentDidMount(){
        this.setState({i_list : this.props.i_list})
    }

    addIngredient(){
        tempArray = this.state.i_list
        tempArray.push({ text: '' })
        this.setState({i_list : tempArray},() => {this.updateList()})
    }

    updateList(){
        this.props.setIngredientList(this.state.i_list)
        this.props.update()
    }

    render(){
        return(
            <View style={styles.container}>
                { this.props.i_list.map((data,index) => {
                    return(
                        <IngredientCard 
                            id={ index }
                            text={ data.text }
                            update={ () => {this.forceUpdate()} }
                        />
                    )
                })}
                <Button onPress={() => this.addIngredient()} style={styles.addButton}>
                    <Text style={{color : 'white'}}>Add</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("STATE: ", state)
    return {
        i_list : state.dishReducer.i_list
    }
}

const mapDispatchToProps = dispatch => ({
    setIngredientList: (i_list) => {
        dispatch(DishActions.setIngredientList(i_list))
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
        height: 25,
        marginTop: 10
    }
})