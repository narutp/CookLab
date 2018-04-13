import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail } from 'native-base';

class UserCardComponent extends Component {

    render() {
        return(
            <View style={ styles.container }>
                <Card style={ styles.card }>
                    <CardItem style={ styles.leftComp }>
                        <Text>{ this.props.rank }</Text>
                        <Thumbnail source={ this.props.userImage } style={ styles.userImage } />
                    </CardItem>
                    <CardItem style={ styles.centerComp }>
                        <Text>{ this.props.userName }</Text>
                    </CardItem>
                    <CardItem style={ styles.rightComp }>
                        <Text style={ styles.point }>{ this.props.point }</Text>
                        <Image source={ this.props.badgeImage } style={ styles.badgeImage } />
                    </CardItem>
                </Card>
            </View>
        )
    }
}

export default UserCardComponent

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        height: 70
    },
    badgeImage: {
        width: 40,
        height: 40,
    },
    userImage: {
        width: 50,
        height: 50,
        marginLeft: 8
    },
    leftComp: {
        width: '25%',
        justifyContent: 'flex-start'
    },
    centerComp: {
        width: '50%',
        justifyContent: 'flex-start'
    },
    rightComp: {
        width: '25%',
        justifyContent: 'flex-end'
    },
    point: {
        marginRight: 8
    }

})