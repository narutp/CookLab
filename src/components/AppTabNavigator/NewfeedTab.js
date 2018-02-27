import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from 'native-base';
import CardComponent from '../CardComponent.js'

class NewfeedTab extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <CardComponent />
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