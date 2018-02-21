import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base'

class MainScreen extends Component {

    static navigationOptions = {
        headerLeft: <Icon name="person" style={{paddingLeft:10}} />,
        title: "Cooklab",
        headerRight: <Icon ios='ios-camera' android="md-camera" />
    }
    render() {
        return (
            <View style={styles.container}>
                <Text> Hello wedqwdqw </Text>
            </View>
        );
    }
}

export default MainScreen;

const AppTabNavigator = TabNavigator({

    TopfeedTab: {
        screen: TopTab
    },
    NewfeedTab: {
        screen: NewfeedTab
    },
    SearchTab: {
        screen: SearchTab
    },
    ProfileTab: {
        screen: ProfileTab
    }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})