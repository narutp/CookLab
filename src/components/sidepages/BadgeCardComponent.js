import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Left } from 'native-base';
import ProgressBarClassic from 'react-native-progress-bar-classic';

class BadgeCardComponent extends Component {

    render() {
       return(
        <View style={ styles.container }>
            <Card style={ styles.card }>
                <CardItem style={ styles.imageWrapper }>
                    <Image source={ this.props.badgeImage } style={ styles.badgeImage }/>
                </CardItem>
                <CardItem style={ styles.detail }>
                    <Text style={ styles.badgeName }>{ this.props.badgeName }</Text>
                    <View style={ styles.badgeProgress }><ProgressBarClassic valueStyle={'none'} progress={ this.props.badgeProgress } /></View>
                    <Text style={ styles.point }>Point needed : { this.props.point }</Text>
                </CardItem>
            </Card>
        </View>
       );
    }

}

export default BadgeCardComponent

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width
    },
    card: {
        flex: 1,
        flexDirection: 'row'
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    imageWrapper: {
        marginLeft: 10,
        width: '25%',
        height: 100
    },
    badgeName: {
        marginLeft: 20,
        marginBottom: 7,
        alignSelf: 'flex-start',
        fontSize: 12
    },
    badgeImage: {
        width: 50,
        height: 50
    },
    badgeProgress: {
        width: '90%',
        alignSelf: 'center'
    },
    point: {
        color: 'gray',
        marginLeft: 15,
        alignSelf: 'flex-start',
        fontSize: 12
    }
})