import React, { Component } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, ScrollView, Picker, Modal, 
  TouchableHighlight, AsyncStorage, Dimensions, Platform, StyleSheet, Text, 
  TextInput, View, Image, Switch } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { 
  Text as TextNative, Itemm, Form, Input, Header, 
  Container, Button, Content, Left, Right, Body, Footer, Item, Label 
} from 'native-base'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import CooklabAxios from '../../http/index'
import { Actions } from 'react-native-router-flux'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from '../../firebase/'
import BackHeader from '../header/BackHeader'
import Spinner from 'react-native-loading-spinner-overlay'
import Timer from 'react-native-timer'
import { FormLabel, FormInput } from 'react-native-elements'
import IngredientList from 'src/components/sidepages/IngredientList'
import RecipeList from 'src/components/sidepages/RecipeList'

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
        isSpinnerVisible: false,
        dishName: '',
        dishDescription: '',
        calories: '',
        ingredients: '',
        recipe: '',
        level: '',
        isMyDish: false,
        privateDish: false
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (this.state.uploadURL != nextState.uploadURL) {
        this.createDish(nextState.uploadURL)
      }
    }

    pickImage() {
      // Timer.setInterval(() => {
      //   this.setState({
      //     isSpinnerVisible: !this.state.isSpinnerVisible
      //   })
      // }, 3000)
      // Timer.setInterval(
      //   'Spinner', () => {
      //       this.setState({
      //         isSpinnerVisible: !this.state.isSpinnerVisible
      //       })
      //   }, 3000
      // )
      // const spinner = setInterval(() => {
      //   this.setState({
      //     isSpinnerVisible: !this.state.isSpinnerVisible
      //   })
      // },3000)
      this.setState({
        isSpinnerVisible: true
      })
      uploadImage(this.props.imageSource)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
      // Timer.setTimeout(()=>Timer.clearInterval('Spinner'),3000)
      // clearInterval(interval)
      // setTimeout(() => {
      //   // clearInterval(spinner)
      //   this.setState({ isSpinnerVisible: !this.state.isSpinnerVisible })
      // }, 3000)
    }

    openDishDetail() {
      this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    async createDish(uploadURL) {
      let createResponse
      let userid = await AsyncStorage.getItem('userid')
      // Not my dish (normal post)
      if (this.state.isMyDish === false) {
        try {
          createResponse = await CooklabAxios.post(`/create_dish`, {
            image: uploadURL,
            type: 'normal',
            id_user: userid
          })
        } catch(error) {
          console.log(error)
        }
      } else {
        // My dish (include dish details)

        // Check if user click private dish
        if (this.state.privateDish) {
          try {
            createResponse = await CooklabAxios.post(`/create_dish`, {
              image: uploadURL,
              type: 'private',
              id_user: userid,
              name: this.state.dishName,
              description: this.state.dishDescription,
              ingredient_str: this.state.ingredients,
              recipe_str: this.state.recipe,
              level: this.state.level
            })
            alert('in')
          } catch (error) {
            console.log(error)
          }
        } else {
          try {
            createResponse = await CooklabAxios.post(`/create_dish`, {
              image: uploadURL,
              type: 'mydish',
              id_user: userid,
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
      this.setState({
        isSpinnerVisible: false
      })
      this.navigateToMainScreen()
    }

    navigateToMainScreen() {
      Actions.MainScreen()
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
          <View style={{ flex: 1 }} >
            <BackHeader title="POST" actions="mainscreen" />
            <Spinner visible={this.state.isSpinnerVisible} 
              // textContent={"Loading..."} 
              // textStyle={{color: 'white'}} 
            />
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
                    <View style={ styles.modalTitleWrapper }>
                      <Text style={ styles.modalTitle }>
                        Dish name
                      </Text>
                      <TextInput
                        autoCapitalize='none'
                        underlineColorAndroid='lightgrey'
                        value={this.state.dishName}
                        onChangeText={ (text) => this.setState({dishName: text}) }
                        style={styles.dishName} />
                    </View>
                    <View style={ styles.modalTitleWrapper }>
                      <Text style={ styles.modalTitle }>
                        Dish description
                      </Text>
                      <TextInput 
                        multiline={true}
                        underlineColorAndroid='lightgrey'
                        numberOfLines={3}
                        value={this.state.dishDescription}
                        onChangeText={ (text) => this.setState({dishDescription: text}) } 
                        autoCapitalize='none'
                        style={styles.dishDescription} />
                    </View>
                    <View style={ styles.modalTitleWrapper }>
                      <Text style={ styles.modalTitle }>
                        Calories
                      </Text>
                      <TextInput 
                        multiline={true} 
                        underlineColorAndroid='lightgrey'
                        value={this.state.calories}
                        onChangeText={ (text) => this.setState({calories: text}) }
                        autoCapitalize='none'
                        style={styles.dishName} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={ styles.modalTitle }>
                        Private dish
                      </Text>
                      <View>
                        <Switch
                          onValueChange={(value) => this.setState({privateDish: !this.state.privateDish})}
                          value={this.state.privateDish}
                          onTintColor={'#F44336'} 
                          style={{ marginLeft: 10 }}
                        />
                      </View>
                    </View>
                    <View style={ styles.modalTitleWrapper }>
                      <Text style={ styles.modalTitle }>
                        Ingredients
                      </Text>
                      <IngredientList />
                    </View>
                    <View style={ styles.modalTitleWrapper }>
                      <Text style={ styles.modalTitle }>
                        Recipe
                      </Text>
                      <RecipeList />
                    </View>
                    <View style={ styles.modalTitleWrapper }>
                      <Text style={ styles.modalTitle }>
                        Level of food
                      </Text>
                      <Picker
                        selectedValue={this.state.level}
                        style={{ height: 20, width: 50, marginBottom: 20 }}
                        itemStyle={{ fontSize: 12 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({level: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                      </Picker>  
                    </View>
                    
                    <View style={{ flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 10
                    }}>
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
            <Header style={ styles.captionHeader }>
              <Input onChangeText={(text) => this.setState({caption: text})} 
                multiline autoCapitalize='none'
                underlineColorAndroid= "transparent"  
                placeholder={"Write caption..."}
                style = {styles.textInput} maxLength={150}>
              </Input>
            </Header>
            <Content>
              <Image source={{uri: this.props.imageSource}} style={styles.imageCard}/>
              <Button onPress={ () => this.openDishDetail() } style={styles.dishDetailButton}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <IconMaterialCommunityIcons name="food" size={25} />
                  <Text style={styles.whiteText}> CREATE MY DISH</Text>
                </View>
              </Button>
            </Content>
            <Footer style={ styles.footer }>
              <TouchableOpacity onPress={ () => this.pickImage() } style={styles.postWrapper}>
                <Text style={styles.postLabel}>POST</Text>
              </TouchableOpacity>
            </Footer>
          </View>
        )
    }
}

const mapStateToProps = state => ({
    imageSource: state.dishReducer.imageSource
})

export default connect(mapStateToProps, null)(StatusPosting)

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white'
  },
  captionHeader: {
    backgroundColor: 'white',
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90
  },
  textInput: {
    width: '100%',
    padding: 5,
    height: 80,
    fontSize: 14,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 13
  },
  modalTitleWrapper: {
    marginTop: 10,
    marginBottom: 10
  },
  imageCard: {
    resizeMode: 'contain',
    height: 300,
    width: '100%'
  },
  dishDetailButton: {
    backgroundColor: 'white',
    width: '100%'
  },
  whiteText: {
    color: 'black',
    fontSize: 12
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
    color: 'white',
    fontSize: 13
  },
  postWrapper: {
    backgroundColor: '#F44336',
    width: '100%',
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
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
  },
  footer: {
    backgroundColor: '#F44336'
  }
})
