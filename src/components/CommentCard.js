import React, { Component } from 'react';
import { ScrollView, Modal, TextInput, Animated, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Container, Card, CardItem, Thumbnail, Body, Left, Right, Button, Header, Footer,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import CooklabAxios from './HttpRequest/index'
import { ShareDialog } from 'react-native-fbsdk'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'

class CommentCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            comment: ''
        }
    }

    componentDidMount() {
        this.setState({ name: this.props.name, comment: this.props.comment })
    }

    render () {
        return (
            // TODO: profile pic
            // TODO: click comment didn't re-render the page and show the new one 
            <View style={ styles.modal }>
                <CardItem>
                    <Left>
                        {/* <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/> */}
                        <Body>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{this.state.name}</Text>
                            <Text style={{ fontSize: 11 }}>{this.state.comment}</Text>
                            <View style={{ marginTop: 3, borderBottomColor: 'black', borderBottomWidth: 1 }}></View>
                        </Body>
                    </Left>
                </CardItem>
            </View>
        )
    }
}

export default CommentCard

const styles = StyleSheet.create({
    modal: {
        padding: 5,
        margin: 0,
        height: 60
    }
})