import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Hello wedqwdqw </Text>
            </View>
        );
    }
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})