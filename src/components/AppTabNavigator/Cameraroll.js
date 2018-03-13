import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';
import { Container, Content, Left, Right, Body, Header } from 'native-base';

class Cameraroll extends Component {
  constructor(props) {
    super(props)
    this.loadImage = this.loadImage.bind(this)
  }
  loadImage(){
      console.log("loadImage called");
      CameraRoll.getPhotos({
          first: 20,
          assetType: 'Photos'
      })
      .then(r => {
          this.setState({ photos: r.edges });
      })
      .catch((err) => {
          //Error Loading Images
      });
  };

  render() {
    console.log(this.loadImage);
      return (
          <View onLoad={this.loadImage}>
          <ScrollView>
          {this.state.photos.map((p, i) => {
          return (
              <Image
              key={i}
              style={{
                width: 300,
                height: 100,
              }}
              source={{ uri: p.node.image.uri }}
              />
          );
        })}
      </ScrollView>
      </View>
  );
  }
}

export default StackNavigator({
  Cameraroll: {
    screen: Cameraroll
  }
}, {
  contentComponent: Cameraroll,
  drawerWidth: 300
});
