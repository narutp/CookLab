import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body, Header } from 'native-base';
import CardComponent from '../CardComponent'

class TopfeedTab extends Component {

    render() {
        return (
          <Container style={styles.container}>
            <Header style={styles.header}>
              <Left>
                <IconEntypo name="menu" size={25} style={{ marginLeft:10, color: '#fff' }} />
              </Left>
              <Body>
                <Text style={{ color: '#fff' }}>CookLab</Text>
              </Body>
              <Right>
                <IconFontAwesome name="camera" size={20} style={{ marginRight:10, color: '#fff' }} />
              </Right>
            </Header>
            <Content>
              <CardComponent love='776' profilePic='2' foodPic='8' />
              <CardComponent love='1023' profilePic='1' foodPic='9' />
              <CardComponent love='2600' profilePic='2' foodPic='7' />
              <CardComponent love='3412' profilePic='1' foodPic='6' />
              <CardComponent love='1877' profilePic='1' foodPic='3' />
            </Content>
          </Container>
        );
    }
}

export default TopfeedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4F4F4F'
  }
})
