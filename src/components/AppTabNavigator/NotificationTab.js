import React, { Component } from 'react'
import { StyleSheet, View, Text, AsyncStorage, ScrollView } from 'react-native'
import { List, Thumbnail, ListItem, Header, Left, Body, Right, Text as TextNative } from 'native-base'
import AppHeader from '../header/AppHeader'
import socket from '../../socket'
import CooklabAxios from '../../http/index'

class NotificationTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetchArr: [],
            userid: '',
            notificationArr: []
        }
    }

    componentDidMount() {
        this.fetchNotification()
    }

    async fetchNotification() {
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
    }

    // image, name, type, id_post, timestamp
    render() {
        return (
            <View style={ styles.container }>
                <AppHeader onMenuPressed={ this.props.onMenuPressed } showCameraRoll={ this.props.showCameraRoll }/>
                <ScrollView>
                    { this.state.notificationArr.map( (element, key) => {
                    <List>
                        <ListItem>
                            <Left style={{ flex: 1 }}>
                                <Thumbnail source={{ uri: element.image }}/>
                            </Left>
                            <Body style={{ flex: 2 }}>
                                <Text>
                                    { element.name }
                                </Text>
                                <Text>
                                    { element.type }
                                </Text>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                { element.timestamp }
                            </Right>
                        </ListItem>
                    </List>        
                   })
                   } 
                </ScrollView>
            </View>
        )
    }
}

export default NotificationTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})