import React, {Component} from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Text } from 'native-base'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

class BackHeader extends Component {

    render() {
        return (
            <Header style={styles.headerModal}>
                <Left style={{ flex: 1, justifyContent: 'center' }}>
                    
                    { this.props.actions === 'sidemenu' ? 
                    <TouchableOpacity style={{ minWidth: 35, minHeight: 35, justifyContent: 'center' }} onPress={() => {
                        Actions.SideMenu()
                    }}>
                        <IconIonicons name="ios-arrow-back" color={'black'} size={30} style={ styles.backIcon } />
                    </TouchableOpacity> :
                    <TouchableOpacity style={{ minWidth: 35, minHeight: 35, justifyContent: 'center' }} onPress={() => {
                        Actions.pop()
                    }}>
                        <IconIonicons name="ios-arrow-back" color={'black'} size={30} style={ styles.backIcon } />
                    </TouchableOpacity>
                    }
                </Left>
                <Body style={ styles.titleWrapper }>
                    <Text style={ styles.title }>{ this.props.title }</Text>
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
    title: {
        fontSize: 15,
    },
    titleWrapper: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
})