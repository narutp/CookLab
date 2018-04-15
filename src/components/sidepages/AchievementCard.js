import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Left } from 'native-base';

class AchievementCard extends Component {
    
    render(){
        return(
            <View style={ styles.container }>
                <Card style={ styles.card }>
                    <CardItem style={ styles.imageWrapper }>
                        <Image source={ this.props.achImage } style={ styles.achImage }/>
                    </CardItem>
                    <CardItem style={ styles.detail }>
                        <Text style={ styles.achDetail }>{ this.props.achName }</Text>
                        <Text style={ styles.achDetail }>{ this.props.achDetail }</Text>
                        <Text style={ styles.achDetail }>{ this.props.current } / {this.props.needed}</Text>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

export default AchievementCard

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        padding: 10
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    achDetail: {
        marginLeft: 15,
        marginBottom: 7
    },
    imageWrapper: {
        width: '25%',
        height: '100%'
    },
    achImage: {
        width: 70,
        height: 70
    }
})