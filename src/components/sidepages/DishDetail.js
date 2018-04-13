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
                <Text>detail1...</Text>
                <Text>detail2...</Text>
                <Text>detail3...</Text>
                <Text>detail4...</Text>
                <Text>detail5...</Text>
                <Text>detail6...</Text>
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
    }
})