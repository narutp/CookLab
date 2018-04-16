import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Content, Left, Right, Image, Body, Card, Text, CardItem, Thumbnail, List, ListItem } from 'native-base';

class UserCardComponent extends Component {

    render() {
        return(
            <Content>
                <List style={ styles.card }>
                    {/* <CardItem style={ styles.leftComp }>
                        <Text>{ this.props.rank }</Text>
                        <Thumbnail source={ this.props.userImage } style={ styles.userImage } />
                    </CardItem>
                    <CardItem style={ styles.centerComp }>
                        <Text>{ this.props.userName }</Text>
                    </CardItem>
                    <CardItem style={ styles.rightComp }>
                        <Text style={ styles.point }>{ this.props.point }</Text>
                        <Image source={ this.props.badgeImage } style={ styles.badgeImage } />
                    </CardItem> */}
                    {/* TODO: line bug between list */}
                    <ListItem>
                        <Left style={{ flex: 1 }}>
                            <Text style={{ fontSize: 10 }}>{ this.props.rank }</Text>
                            <Thumbnail source={{ uri: this.props.userImage }} style={ styles.userImage } />
                        </Left>
                        <Body style={{ flex: 2 }}>
                            <Text style={{ fontSize: 12 }}>{ this.props.userName }</Text>
                            <Text style={{ fontSize: 12 }} note>{ this.props.point }{' Pts'}</Text>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <Thumbnail style= {styles.badgeImage } source={ this.props.badgeImage }/>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        )
    }
}

export default UserCardComponent

const styles = StyleSheet.create({
    container: {
        // width: Dimensions.get('window').width,
        flex: 1,
    },
    card: {
        flex: 1
    },
    badgeImage: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    userImage: {
        width: 40,
        height: 40,
        marginLeft: 10
    },
    userName: {
        fontSize: 8,
    }
    // leftComp: {
    //     width: '25%',
    //     justifyContent: 'flex-start'
    // },
    // centerComp: {
    //     width: '50%',
    //     justifyContent: 'flex-start'
    // },
    // rightComp: {
    //     width: '25%',
    //     justifyContent: 'flex-end'
    // },
    // point: {
    //     marginRight: 8
    // }

})