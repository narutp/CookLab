import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { Header, Left } from 'native-base'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

class BackHeader extends Component {

    render() {
        return (
            <Header style={styles.headerModal}>
                <Left style={{ flex: 1, justifyContent: 'center' }}>
                    <IconIonicons name="ios-arrow-back" onPress={() => {
                        Actions.MainScreen()
                    }} color={'black'} size={25} style={ styles.backIcon } />
                </Left>
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
})