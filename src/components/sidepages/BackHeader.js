import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { Header, Left, Body, Right, Text } from 'native-base'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

class BackHeader extends Component {

    render() {
        return (
            <Header style={styles.headerModal}>
                <Left style={{ flex: 1, justifyContent: 'center' }}>
                    <IconIonicons name="ios-arrow-back" onPress={() => {
                        this.props.action
                    }} color={'black'} size={25} style={ styles.backIcon } />
                </Left>
                <Body style={ styles.titleWrapper }>
                    <Text>{ this.props.title }</Text>
                </Body>
                <Right />
            </Header>
        )
    }
}

export default BackHeader

const styles = StyleSheet.create({
    headerModal: {
        backgroundColor: 'white',
    },
    backIcon: {
        marginLeft: 10
    },
    titleWrapper: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
})