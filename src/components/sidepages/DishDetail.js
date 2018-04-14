import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card, CardItem } from 'native-base'

class DishDetail extends Component{
    
    render(){
        return(
            <ScrollView style={ styles.container }>
                <View style={ styles.header }>
                    <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MyDish() } size={25} style={ styles.backIcon } />
                </View>
                <Card>
                    <CardItem style={ styles.dishNameWrapper }><Text style={ styles.dishName }>DishName</Text></CardItem>
                </Card>
                <Image source={this.props.imageSource} style={ styles.dishImage }/>
                <View style={ styles.detail }>
                    <Text style={ styles.detailText }>Type: </Text>
                    <Text style={ styles.detailText }>Level: </Text>
                    <Text style={ styles.detailText }>Description: </Text>
                    <Text style={ styles.detailText }>Ingredients: </Text>
                    <Text style={ styles.detailText }>Recipe: </Text>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    imageSource: state.dishReducer.imageSource
})

export default connect(mapStateToProps, null)(DishDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#F44336'
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