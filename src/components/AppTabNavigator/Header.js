import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { Container, Content, Left, Right, Body, Header } from 'native-base';
import ImagePicker from 'react-native-image-picker';

// props
// onMenuPressed () => {}
class CustomHeader extends Component {

    openImage(){
      var options = {
        title: 'Select Avatar',
        customButtons: [
          {name: 'fb', title: 'Choose Photo from Facebook'},
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          console.log(response.uri);
        }
      });
    }

    render() {
      console.log(this.props)
        return (
            <Header style={styles.header}>
              <Left>
                <IconEntypo name="menu" onPress={() => this.props.onMenuPressed() } size={25} style={{ marginLeft:10, color: '#fff' }} />
              </Left>
              <Body>
                <Text style={{ color: '#fff' }}>CookLab</Text>
              </Body>
              <Right>
                <IconFontAwesome name="camera" onPress={() => this.openImage() }size={20} style={{ marginRight:10, color: '#fff' }} />
              </Right>
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#F44336'
    }
  })


export default CustomHeader
