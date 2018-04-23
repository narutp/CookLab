import React, { Component } from 'react';
import { ScrollView, Modal, TextInput, Animated, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Container, Card, CardItem, Thumbnail, Body, Left, Right, Button, Header, Footer,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import CooklabAxios from '../http/index'
import { ShareDialog } from 'react-native-fbsdk'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

class CommentCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            comment: '',
        }
    }

    componentDidMount() {
        this.setState({ name: this.props.name, comment: this.props.comment })
    }

    render () {
        return (
            <View style={ styles.modal }>
                <CardItem>
                    <Left style={{ flex: 6 }}>
                        <Thumbnail source={{ uri: this.props.image }} style={{ width: 35, height: 35 }}/>
                        <Body>
                            <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{this.props.name}</Text>
                            <Text style={{ fontSize: 11 }}>{this.props.comment}</Text>
                            
                        </Body>
                    </Left>
                    <Body />
                    <Right style={{ flex: 2 }}>
                        <Text style={ styles.time }>
                            { this.props.time }
                        </Text>
                    </Right>
                </CardItem>
            </View>
        )
    }
}

export default CommentCard

const styles = StyleSheet.create({
    modal: {
        padding: 3,
        margin: 0,
        height: 60
    },
    time: {
        fontSize: 10,
        color: 'grey'
    }
})