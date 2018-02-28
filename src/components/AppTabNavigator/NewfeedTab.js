import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body, Header } from 'native-base';
import CardComponent from '../CardComponent.js'

class NewfeedTab extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <IconEntypo name="menu" size={25} style={{ marginLeft: 10, color: '#fff' }} />
                    </Left>
                    <Body>
                        <Text style={{ color: '#fff' }}>CookLab</Text>
                    </Body>
                    <Right>
                        <IconFontAwesome name="camera" size={20} style={{ marginRight:10, color: '#fff' }} />
                    </Right>
                </Header>
                <Content>
                    <CardComponent love='176' profilePic='1' foodPic='1' />
                    <CardComponent love='71' profilePic='2' foodPic='2' />
                    <CardComponent love='26' profilePic='1' foodPic='3' />
                    <CardComponent love='34' profilePic='2' foodPic='4' />
                    <CardComponent love='102' profilePic='2' foodPic='5' />
                </Content>
            </Container>
        );
    }
}

export default NewfeedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4F4F4F'
  }
})