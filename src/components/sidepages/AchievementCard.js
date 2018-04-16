import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Left } from 'native-base';

class AchievementCard extends Component {
    
    state = {
        current: this.props.current,
        needed: this.props.needed
    }

    render(){
        return(
            <View style={ styles.container }>
                { parseInt(this.props.current) < parseInt(this.props.needed) ?
                    <Card style={ styles.cardDone }>
                    <CardItem style={ styles.imageWrapper }>
                        <Image source={ this.props.achImage } style={ styles.achImage }/>
                    </CardItem>
                    <CardItem style={ styles.detail }>
                        <Text style={[ styles.achDetail, styles.achName ]}>{ this.props.achName }</Text>
                        <Text style={ styles.achDetail }>{ this.props.achDetail }</Text>
                        <Text style={ styles.achDetail }>{ this.props.current } / {this.props.needed}</Text>
                    </CardItem>
                    </Card> :
                    <Card style={ styles.card }>
                    <CardItem style={ styles.imageWrapper }>
                        <Image source={ this.props.achImage } style={ styles.achImage }/>
                    </CardItem>
                    <CardItem style={ styles.detail }>
                        <Text style={[ styles.achDetail, styles.achName ]}>{ this.props.achName }</Text>
                        <Text style={ styles.achDetail }>{ this.props.achDetail }</Text>
                        <Text style={ styles.achDetail }>{ this.props.current } / {this.props.needed}</Text>
                    </CardItem>
                    </Card>
                }
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
        height: 90,
        padding: 10
    },
    cardDone: {
        flex: 1,
        flexDirection: 'row',
        height: 90,
        padding: 10,
        opacity: 0.15
    },
    detail: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    achDetail: {
        marginLeft: 15,
        marginBottom: 7,
        fontSize: 12
    },
    achName: {
        fontSize: 13,
        fontWeight: '500'
    },
    imageWrapper: {
        width: '25%',
        height: '100%',
    },
    achImage: {
        width: 50,
        height: 50,
    }
})