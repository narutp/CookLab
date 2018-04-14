import React, { Component } from 'react'
import { ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage, Dimensions, Platform, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { Container, Button, Content, Left, Right, Body } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import CooklabAxios from '../HttpRequest/index'
import { Actions } from 'react-native-router-flux'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from '../../firebase/'
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
        caption: '',
        isModalVisible: false,
        dishName: '',
        dishDescription: '',
        calories: '',
        ingredients: '',
        recipe: '',
        level: '',
        isMyDish: false,
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

    openDishDetail() {
      this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    async createDish(uploadURL) {
      let createResponse

      // Not my dish (normal post)
      if (this.state.isMyDish === false) {
        try {
          createResponse = await CooklabAxios.post(`/create_dish`, {
            image: uploadURL,
            type: 'normal'
          })
        } catch(error) {
          console.log(error)
        }
      } else {
        // My dish (include dish details)
        try {
          createResponse = await CooklabAxios.post(`/create_dish`, {
            image: uploadURL,
            type: 'mydish',
            name: this.state.dishName,
            description: this.state.dishDescription,
            ingredient_str: this.state.ingredients,
            recipe_str: this.state.recipe,
            level: this.state.level
          })
        } catch (error) {
          console.log(error)
        }
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
          Actions.MainScreen()
      } catch(error) {
        console.log(error)
      }
    }

    saveDishDetail() {
      if (this.state.dishName != '' &&
        this.state.dishDescription != '' &&
        this.state.ingredients != '' &&
        this.state.recipe != '') {
          this.setState({ isMyDish: true, isModalVisible: !this.state.isModalVisible })
        } else {
          this.setState({ isMyDish: false, isModalVisible: !this.state.isModalVisible })
        }
    }

    render() {
        return(
          <View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isModalVisible}
                onRequestClose={() => {
                    // alert('Modal has been closed.');
                }}>
                <View style={ styles.modal }>
                  <ScrollView>
                    <View>
                      <Text style={{ fontSize: 14 }}>Dish details</Text>
                      <TextInput 
                        autoCapitalize='none'
                        value={this.state.dishName}
                        onChangeText={ (text) => this.setState({dishName: text}) }
                        style={styles.dishName} placeholder="Dish name..." />
                      <TextInput 
                        multiline={true}
                        numberOfLines={3}
                        value={this.state.dishDescription}
                        onChangeText={ (text) => this.setState({dishDescription: text}) } 
                        autoCapitalize='none'
                        style={styles.dishDescription} placeholder="Dish description..." />
                      <TextInput 
                        multiline={true} 
                        value={this.state.calories}
                        onChangeText={ (text) => this.setState({calories: text}) }
                        autoCapitalize='none'
                        style={styles.dishName} placeholder="Calories..." />
                      <Text style={{ fontSize: 14 }}>Ingredients</Text>
                      <TextInput 
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.ingredients}
                        onChangeText={ (text) => this.setState({ingredients: text}) }
                        style={styles.dishRecipe} 
                        placeholder="1 tablespoon oil" />
                      <Text style={{ fontSize: 14 }}>Recipe (Step by step)</Text>
                      <TextInput 
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.recipe}
                        onChangeText={ (text) => this.setState({recipe: text}) }
                        style={styles.dishRecipe} 
                        placeholder="1. Cook the noodles in boiling water.." />
                      <Text style={{ fontSize: 14 }}>Level of food</Text>
                      <Picker
                        selectedValue={this.state.level}
                        style={{ height: 20, width: 50, marginBottom: 20 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({level: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                      </Picker>  
                      <View style={{ flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center', }}>
                        <Button style={ styles.cancelButton }
                            onPress={() => {
                                this.setState({ isModalVisible: !this.state.isModalVisible, isMyDish: false })
                            }}>
                            <Text>Cancel</Text>
                        </Button>

                        <Button style={ styles.saveDishButton }
                            onPress={() => this.saveDishDetail()}>
                            <Text>Save</Text>
                        </Button>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </Modal>
              <TextInput onChangeText={(text) => this.setState({caption: text})} 
                multiline autoCapitalize='none'
                underlineColorAndroid= "transparent"  
                placeholder={"Write caption..."}
                style = {styles.textInput} maxLength={150}>
              </TextInput>
              <Image source={{uri: this.props.imageSource}} style={styles.imageCard}/>
              <Button onPress={ () => this.openDishDetail() } style={styles.dishDetailButton}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.whiteText}>DISH DETAILS</Text>
                </View>
              </Button>
              <Button onPress={ () => this.pickImage() } style={styles.postButton}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.postLabel}>POST</Text>
                </View>
              </Button>
              {/* <Button title="Dish details" onPress={ () => this.openDishDetail() } style={styles.dishDetailButton}></Button>
              <Button title="Post" onPress={ () => this.pickImage() } style={styles.postButton}></Button> */}
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
    resizeMode: 'cover',
    height: 250,
    width: '100%'
  },
  dishDetailButton: {
    borderWidth: 0.5,
    backgroundColor: '#F2994A',
    width: '100%'
  },
  whiteText: {
    color: 'white'
  },
  dishName: {
    height: 40,
  },
  dishDescription: {
    height: 80,
  },
  dishRecipe: {
    height: 150,
  },
  postLabel: {
    color: 'white'
  },
  postButton: {
    borderWidth: 0.5,
    backgroundColor: '#6FCF97',
    width: '100%'
  },
  cancelButton: {
    width: 100,
    padding: 5, 
    borderWidth: 1,
    borderColor: '#F44336', 
    backgroundColor: 'white',
    marginRight: 10, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  saveDishButton: {
    width: 100, 
    padding: 5, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6FCF97', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modal: {
    padding: 30
  }
})
