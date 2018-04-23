import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, TextInput, Image, View, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Content, List, ListItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import DishActions from 'src/redux/actions/dish'

class IngredientCard extends Component{

    state = {
        i_list : [],
        _text : ''
    }

    componentDidMount(){
        this.setState({i_list : this.props.i_list})
        this.setState({_text : this.props.text})
    }

    onEdit(text){
        this.setState({_text : text})
        tempArray = this.state.i_list
        tempArray[this.props.id].text = text
        this.setState({i_list : tempArray}, () => {this.updateList()})
    }

    onCancel(){
        tempArray = this.state.i_list
        tempArray.splice(this.props.id,1)
        this.setState({i_list : tempArray}, () => {this.updateList()})
    }

    updateList(){
        this.props.setIngredientList(this.state.i_list) 
        this.props.update()
    }

    render(){
        return(
            <Content>
                <List style={styles.i_list}>
                    <ListItem>
                    <Left style={{flex : 1}}>
                        <Text>{this.props.id+1}</Text>
                    </Left>
                    <Body style={{flex : 5}}>
                        <TextInput 
                            onChangeText={(text) => this.onEdit(text)}
                            placeholder="Enter Ingredient"
                            autoCapitalize="none"
                            maxLength={50}
                            value={this.state._text}
                            style={styles.textinput}
                        />
                    </Body>
                    <Right style={{flex : 1}}>
                        <TouchableOpacity onPress={() => this.onCancel()}>
                            <MaterialCommunityIcons name="window-close" style={styles.delete}/>
                        </TouchableOpacity>
                    </Right>
                    </ListItem>
                </List>
            </Content>
        )
    }

}

const mapStateToProps = state => ({
    i_list : state.dishReducer.i_list
})

const mapDispatchToProps = dispatch => ({
    setIngredientList: (i_list) => {
        dispatch(DishActions.setIngredientList(i_list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard)

const styles = StyleSheet.create({
    i_list: {
        flex: 1
    },
    textinput: {
        fontSize: 13
    },
    delete: {
        fontSize: 20
    }
})