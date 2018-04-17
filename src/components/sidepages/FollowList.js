import React, {Component} from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Button, Right, Thumbnail, Text } from 'native-base'
import BackHeader from '../header/BackHeader'

class FollowList extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
                                        <Thumbnail style={{ width: 40, height: 40 }} source={{ uri: element.photo }} />
                                    </Left>
                                    <Body>
                                        <Text style={{ fontSize: 12 }}>{element.name}</Text>
                                    </Body>
                                    <Right>
                                        <Button light style={ styles.button }>
                                            <Text style={{ color: 'black', fontSize: 11 }}>Following</Text>
                                        </Button>
                                        <Button primary style={ styles.button }>
                                            <Text style={{ color: 'white', fontSize: 11 }}>Follow</Text>
                                        </Button>
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
        marginTop: 10
    },
    button: {
        padding: 5,
        width: 80,
        height: 30
    }
})