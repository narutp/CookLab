import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class NewfeedTab extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> Hell </Text>
            </View>
        );
    }
}

export default NewfeedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})