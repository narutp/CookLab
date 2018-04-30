import React, { Component } from 'react';
import { StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Container, Content, Left, Right, Body, Header, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

// props
// onMenuPressed () => {}
class AppHeader extends Component {

    render() {
        return (
            <Header style={styles.header}>
                {/* Add flex = 1 for centered the title */}
                <Left style={{ flex: 1 }}>
                  {/* <IconEntypo name="menu" onPress={() => this.props.onMenuPressed() } size={25} style={{ marginLeft:10, color: '#F44336' }} /> */}
                  <TouchableOpacity style={{ minWidth: 35, minHeight: 35, justifyContent: 'center' }} onPress={() => Actions.SideMenu() }>
                    <IconIonicons name="ios-apps" size={25} style={{ marginLeft:10, color: '#F44336' }} />
                  </TouchableOpacity>
                </Left>
                <Body style={ styles.titleWrapper }>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '100' }}>COOKLAB</Text>
                </Body>
                <Right>
                    <TouchableOpacity style={{ minWidth: 30, minHeight: 30, justifyContent: 'center' }} onPress={() => this.props.showCameraRoll() }>
                        <IconFontAwesome name="camera" size={20} style={{ marginRight:10, color: '#F44336' }} />
                    </TouchableOpacity>
                </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
    //   backgroundColor: '#FFBF00',
        backgroundColor: '#fbfbfb'
    },
    titleWrapper: {
      justifyContent: 'center', 
      alignItems: 'center'
    }
  })


export default AppHeader
