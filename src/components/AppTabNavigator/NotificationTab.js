import React, { Component } from 'react'
import { StyleSheet, View, Text, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import { List, Content, Container, Thumbnail, ListItem, Header, Left, Body, Right, Text as TextNative } from 'native-base'
import AppHeader from '../header/AppHeader'
import socket from '../../socket'
import CooklabAxios from '../../http/index'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'

class NotificationTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetchArr: [],
            userid: '',
            notificationArr: []
        }
    }

    async componentDidMount() {
        const res = await this.fetchNotification()
    }

    async fetchNotification() {
        this.props.readNotification()
        let getUserId
        try {
            getUserId = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }

        this.setState({ userid: getUserId })
        
        let getNotificationResponse
        try {
            getNotificationResponse = await CooklabAxios.get(`get_noti_by_user?user_id=${getUserId}`)
        } catch (error) {
            console.log(error)
        }

        this.setState({ notificationArr: getNotificationResponse.data })
        console.log('get noti: ', getNotificationResponse.data)
    }

    async navigateToComment(post_id) {
        Actions.CommentPage({
            postid: post_id
        })
    }

    // image, name, type, id_post, timestamp
    render() {
        console.log('notification: ', this.state.notificationArr)
        return (
            <Container style={ styles.container }>
                <AppHeader onMenuPressed={ this.props.onMenuPressed } showCameraRoll={ this.props.showCameraRoll }/>
                <View>
                    <ScrollView>
                        { this.state.notificationArr.map( (element, key) => {
                            return (
                                <Content>
                                    <List>
                                        <ListItem>
                                            <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}
                                                onPress={ async() => await this.navigateToComment(element.id_post) }>
                                                <Left style={{ flex: 1 }}>
                                                    <Thumbnail style={ styles.image } source={{ uri: element.image }}/>
                                                </Left>
                                                <Body style={{ flex: 2 }}>
                                                    <Text style={ styles.name }>
                                                        { element.name }
                                                    </Text>
                                                    { element.type === 'comment' ?
                                                        <Text style={ styles.type }>
                                                            commented on your post
                                                        </Text> :
                                                        <Text style={ styles.type }>
                                                            likes your post.
                                                        </Text>
                                                    }
                                                    
                                                </Body>
                                                <Right style={{ flex: 1 }}>
                                                    <Text style={ styles.timestamp }>
                                                        { moment(element.timestamp).fromNow() }
                                                    </Text>
                                                </Right>
                                            </TouchableOpacity>
                                        </ListItem>
                                    </List> 
                                </Content>
                            )    
                        })
                        } 
                    </ScrollView>
                </View>
            </Container>
        )
    }
}

export default NotificationTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 45,
        height: 45
    },
    name: {
        fontSize: 11,
        fontWeight: '500'
    },
    type: {
        fontSize: 11,
    },
    timestamp: {
        fontSize: 10
    }
})