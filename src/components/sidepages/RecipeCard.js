import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, TextInput, Image, View, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Content, List, ListItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import DishActions from 'src/redux/actions/dish'

class RecipeCard extends Component{

    state = {
        r_list : [],
        _text : ''
    }

    componentDidMount(){
        this.setState({r_list : this.props.r_list})
        this.setState({_text : this.props.text})
    }

    onEdit(text){
        this.setState({_text : text})
        tempArray = this.state.r_list
        tempArray[this.props.id].text = text
        this.setState({r_list : tempArray}, () => {this.updateList()})
    }

    onCancel(){
        tempArray = this.state.r_list
        tempArray.splice(this.props.id,1)
        this.setState({r_list : tempArray}, () => {this.updateList()})
    }

    updateList(){
        this.props.setRecipeList(this.state.r_list) 
        this.props.update()
    }

    render(){
        return(
            <Content>
                <List style={styles.r_list}>
                    <ListItem>
                    <Left style={{flex : 1}}>
                        <Text>{this.props.id+1}</Text>
                    </Left>
                    <Body style={{flex : 5}}>
                        <TextInput 
                            onChangeText={(text) => this.onEdit(text)}
                            placeholder="Enter Recipe"
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
    r_list : state.dishReducer.r_list
})

const mapDispatchToProps = dispatch => ({
    setRecipeList: (r_list) => {
        dispatch(DishActions.setRecipeList(r_list))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard)

const styles = StyleSheet.create({
    r_list: {
        flex: 1
    },
    textinput: {
        fontSize: 13
    },
    delete: {
        fontSize: 20
    }
})