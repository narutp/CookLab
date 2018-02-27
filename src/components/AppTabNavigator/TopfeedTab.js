import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Container, Content } from 'native-base';
import CardComponent from '../CardComponent'

class TopfeedTab extends Component {

    render() {
        return (
          <Container style={styles.container}>
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
})
