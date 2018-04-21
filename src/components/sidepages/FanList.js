import React, {Component} from 'react'
import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Button, Right, Thumbnail, Text } from 'native-base'
import BackHeader from '../header/BackHeader'
import CooklabAxios from '../../http/index'

class FanList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            status: this.props.data.status,
            fanArr: []
        }
    }

    componentDidMount() {
        this.setState({
            fanArr: this.props.data
        })
    }

    async followUser(targetId) {
        let getUserId
        try {
            getUserId = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let fanResponse
        try {
            fanResponse = await CooklabAxios.put(`follow`, {
                userId: getUserId,
                targetId: targetId
            })
        } catch (error) {
            console.log(error)
        }
        console.log('Follow response: ', fanResponse.data)

        const newState = this.state.fanArr.map(element => {
            if (element._id === targetId) {
                element.status = fanResponse.data === 'follow'
            }
            return element
        })
        this.setState({ fanArr: newState })
    }

    render() {
        console.log('Fan list page: ', this.props.data)
        return (
            <Container style={ styles.container }>
                <BackHeader title="FANS" actions="mainscreen" />
                <Content style={ styles.listWrapper }>
                { this.state.fanArr.map( (element, index) => {
                    return (
                        <List>
                            <ListItem key={index} avatar>
                                <Left>
                                    <Thumbnail style={{ width: 45, height: 40 }} source={{ uri: element.photo }} />
                                </Left>
                                <Body>
                                    <Text style={{ fontSize: 12 }}>{element.name}</Text>
                                </Body>
                                <Right>
                                    { element.status === true ? 
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
                    )
                })}
                </Content>
            </Container>
        )
    }
}

export default FanList

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