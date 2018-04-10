import React, { Component } from 'react'
import { AsyncStorage, Dimensions, Platform, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { Container, Content, Left, Right, Body } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import CooklabAxios from '../HttpRequest/index'

import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

// Init Firebase
const config = {
  apiKey: "AIzaSyAD6vYOiblwoSmVI95GmCbV0WkgJLdTQR0",
  authDomain: "cooklab-cb6c0.firebaseio.com",
  storageBucket: "cooklab-cb6c0.appspot.com",
}
firebase.initializeApp(config)
const storage = firebase.storage()



const uploadImage = (uri, mime = 'application/octet-stream') => {
  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}.jpeg`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log('url:' + url)
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

class StatusPosting extends Component {
    constructor(props) {
      super(props)
      this.state = {
        uploadURL: '',
        caption: ''
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (this.state.uploadURL != nextState.uploadURL) {
        this.createDish(nextState.uploadURL)
      }
    }

    pickImage() {
      uploadImage(this.props.imageSource)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
      // this.createDish()
    }

    async createDish(uploadURL) {
      let createResponse
      try {
          createResponse = await CooklabAxios.post(`/create_dish`, {
          image: uploadURL
        })
      } catch(error) {
        console.log(error)
      }
      console.log('create dish by sending pic url with id dish: ' + createResponse.data)
      this.createPost(createResponse.data, uploadURL)
    }

    async createPost(idDish, url) {
      let userid = await AsyncStorage.getItem('userid')
      console.log('get id from st' + userid)
      let createPostResponse
      try {
          createPostResponse = await CooklabAxios.post(`/create_post`, {
          id_dish: idDish,
          id_user: userid,
          image: url,
          caption: this.state.caption
        })
      } catch(error) {
        console.log(error)
      }
    }

    render() {
        return(
            <View>
              <TextInput onChangeText={(text) => this.setState({caption: text})} 
                multiline autoCapitalize='none' 
                placeholder={"Write something..."}
                style = {styles.textInput} maxLength={150}>
              </TextInput>
              <Image source={{uri: this.props.imageSource}} style={styles.imageCard}/>
              <Button title="Post" onPress={ () => this.pickImage() } style={styles.postButton}></Button>
              {/* <Button title="Post" style={styles.postButton}></Button> */}
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
    height: 300,
    width: '100%'
  },
  postButton: {
    borderWidth: 0.5,
    backgroundColor: 'blue',
    alignSelf: 'flex-end'
  }
})
