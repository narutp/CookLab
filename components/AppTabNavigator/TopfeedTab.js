import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class TopfeedTab extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> TopfeedTab </Text>
            </View>
        );
    }
}

export default TopfeedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})