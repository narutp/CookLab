import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body, Header } from 'native-base';

class ProfileTab extends Component {

    render() {
        return (
            <View style={styles.container}>
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
            </View>
        );
    }
}

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
      backgroundColor: '#4F4F4F'
  }
})