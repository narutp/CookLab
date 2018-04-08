import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, Image, Button } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { Container, Content, Left, Right, Body } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'

class StatusPosting extends Component {

    render() {
        return(
            <View>
              <TextInput multiline autoCapitalize='none' placeholder={"Write something..."}
              style = {styles.textInput} maxLength={150}></TextInput>
              <Image source={{uri: this.props.imageSource}} style={styles.imageCard}/>
              <Button title="Post" style={styles.postButton}></Button>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    imageSource: state.dishReducer.imageSource
})

export default connect(mapStateToProps, null)(StatusPosting)

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width
  },
  textInput: {
    height: 70,
    backgroundColor: 'white'
  },
  imageCard: {
    resizeMode: 'stretch',
    height: 250,
    width: '100%'
  },
  postButton: {
    borderWidth: 0.5,
    backgroundColor: 'blue',
    alignSelf: 'flex-end'
  }
})
