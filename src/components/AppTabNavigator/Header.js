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
        return (
            <Header style={styles.header}>
              <Left>
                <IconEntypo name="menu" onPress={() => this.props.onMenuPressed() } size={25} style={{ marginLeft:10, color: '#fff' }} />
              </Left>
              <Body>
                <Text style={{ color: '#fff' }}>CookLab</Text>
              </Body>
              <Right>
                <IconFontAwesome name="camera" size={20} style={{ marginRight:10, color: '#fff' }} />
              </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#4F4F4F'
    }
  })
  

export default CustomHeader