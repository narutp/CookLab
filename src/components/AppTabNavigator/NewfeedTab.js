import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from 'native-base';
import CardComponent from '../CardComponent.js'

class NewfeedTab extends Component {

    render() {
        return (
            <Container style={styles.container}>
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
})