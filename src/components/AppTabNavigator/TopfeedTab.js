import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body } from 'native-base';
import CardComponent from '../CardComponent'
import Header from './Header'
import MainScreen from '../MainScreen'

class TopfeedTab extends Component {

    render() {
        return (
          <Container style={ styles.container }>
            <Header onMenuPressed={ this.props.onMenuPressed } />
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
