import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Button } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body } from 'native-base';
import { StackNavigator } from 'react-navigation'

class StatusPosting extends Component {

    render() {
        console.log("in");
        return(
            <Container style={ styles.container }>
                <TextField></TextField>
                <Image source={this.props.imageSource} style={styles.imageCard}/>
            </Container>
        );
    }
}



export default StatusPosting

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width
  },
  imageCard: {
    resizeMode: 'stretch',
    height: 250,
    width: '100%'
  }
})
