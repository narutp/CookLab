import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Image, View, Dimensions, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Card, CardItem, Left, Right, Header, Button, Body } from 'native-base'
import CooklabAxios from '../../http/index'
import StarRating from 'react-native-star-rating'
import BackHeader from '../header/BackHeader'

class UserDetail extends Component {

    render() {
        return (
            <View>
                <Text>User detail</Text>
            </View>
        )
    }
}

export default UserDetail

const styles = StyleSheet.create({

})