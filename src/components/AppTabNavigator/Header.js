import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, CameraRoll } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import { StackNavigator } from 'react-navigation';
import { Container, Content, Left, Right, Body, Header } from 'native-base';
import Cameraroll from './Cameraroll';


class CustomHeader extends Component {
  constructor(props) {
    super(props)
    this._handleButtonPress = this._handleButtonPress.bind(this)
  }
  _handleButtonPress() {
    // console.log(CameraRoll())
     CameraRoll.getPhotos({
         first: 20,
         assetType: 'Photos',
       })
       .then(r => {
         this.setState({ photos: r.edges });
       })
       .catch((err) => {
          //Error Loading Images
       });
     };

    render() {
        return (
            <Header style={styles.header}>
              <Left>
                <IconEntypo name="menu" onPress={() => this.props.onMenuPressed() } size={25} style={{ marginLeft:10, color: '#fff' }} />
              </Left>
              <Body>
                <Text style={{ color: '#fff' }}>CookLab</Text>
              </Body>
              <Right>
                <IconFontAwesome name="camera" onPress={this._handleButtonPress} size={20} style={{ marginRight:10, color: '#fff' }} />
              </Right>
            </Header>
        )
    }

}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#4F4F4F'
    }
  })


export default CustomHeader
