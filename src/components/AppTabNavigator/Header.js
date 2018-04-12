import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Container, Content, Left, Right, Body, Header } from 'native-base';

// props
// onMenuPressed () => {}
class CustomHeader extends Component {

    render() {
      console.log(this.props)
        return (
            <Header style={styles.header}>
                <Left>
                  <IconEntypo name="menu" onPress={() => this.props.onMenuPressed() } size={25} style={{ marginLeft:10, color: '#fff' }} />
                </Left>
                <Body style={{ marginLeft: 75 }}>
                  <View style={{ flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '200', marginRight: 3 }}>CookLab</Text>
                    <Image style={{ width: 20, height: 20 }} source={ require('../../assets/image/Logo/logo.png')} />
                  </View>
                </Body>
                <Right>
                  <IconFontAwesome name="camera" onPress={() => this.props.showCameraRoll() }size={20} style={{ marginRight:10, color: '#fff' }} />
                </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#F44336',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })


export default CustomHeader
