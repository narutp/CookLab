import React, {Component} from 'react'
import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Button, Right, Thumbnail, Text } from 'native-base'
import BackHeader from '../header/BackHeader'
import CooklabAxios from '../../http/index'

class FollowList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFollow: true
        }
    }

    async followUser(targetId) {
        let getUserId
        try {
            getUserId = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let followResponse
        try {
            followResponse = await CooklabAxios.put(`follow`, {
                userId: getUserId,
                targetId: targetId
            })
        } catch (error) {
            console.log(error)
        }
        console.log('Follow response: ', followResponse.data)
        if (followResponse.data === 'follow') {
            this.setState({
                isFollow: true
            })
        } else {
            this.setState({
                isFollow: false
            })
        }
    }

    render() {
        console.log('Follow list page: ', this.props.data)
        return (
            <Container style={ styles.container }>
                <BackHeader title="FOLLOWING" actions="profiletab" />
                { this.props.data.map( (element) => {
                    return (
                        <Content style={ styles.listWrapper }>
                            <List>
                                <ListItem avatar>
                                    <Left>
                                        <Thumbnail style={{ width: 45, height: 40 }} source={{ uri: element.photo }} />
                                    </Left>
                                    <Body>
                                        <Text style={{ fontSize: 12 }}>{element.name}</Text>
                                    </Body>
                                    <Right>
                                        { this.state.isFollow === true ? 
                                            <Button onPress={ () => this.followUser(element._id) } light style={ styles.button }>
                                                <Text style={{ color: 'black', fontSize: 9 }}>Following</Text>
                                            </Button> :
                                            <Button onPress={ () => this.followUser(element._id) } primary style={ styles.button }>
                                                <Text style={{ color: 'white', fontSize: 9 }}>Follow</Text>
                                            </Button>
                                        }
                                    </Right>
                                </ListItem>
                            </List>
                        </Content>
                    )
                })}
            </Container>
        )
    }
}

export default FollowList

const styles = StyleSheet.create({
    container: {   
        flex: 1     
    },
    listWrapper: {
        marginTop: 10,
        marginBottom: 5
    },
    button: {
        padding: 2,
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})