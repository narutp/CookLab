import React, { Component } from 'react'
import { TextInput, Modal, TouchableHighlight, TouchableOpacity, Alert, StyleSheet, Text, View, Image, Dimensions, AsyncStorage } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import AppHeader from '../header/AppHeader'
import { Button, Container, Content, Left, Right, Body, Card, CardItem, Input } from 'native-base'
import CooklabAxios from '../../http/index'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
// import firebase from '../../firebase'

let images = [
    require('../../assets/image/Food/food1.jpg'),
    require('../../assets/image/Food/food2.jpg'),
    require('../../assets/image/Food/food3.jpg'),
]

let {width, height} = Dimensions.get('window')

// const storage = firebase.storage()

// const uploadImage = (uri, mime = 'application/octet-stream') => {
//   // Prepare Blob support
//   const Blob = RNFetchBlob.polyfill.Blob
//   const fs = RNFetchBlob.fs
//   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//   window.Blob = Blob
//   return new Promise((resolve, reject) => {
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    
//     const sessionId = new Date().getTime()
//     let uploadBlob = null
//     const imageRef = storage.ref('images').child(`${sessionId}.jpeg`)

//     fs.readFile(uploadUri, 'base64')
//       .then((data) => {
//         return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//         uploadBlob = blob
//         return imageRef.put(blob, { contentType: mime })
//       })
//       .then(() => {
//         uploadBlob.close()
//         return imageRef.getDownloadURL()
//       })
//       .then((url) => {
//         console.log('url:' + url)
//         resolve(url)
//       })
//       .catch((error) => {
//         reject(error)
//     })
//   })
// }

class ProfileTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: '',
            picUrl: null,
            isModalVisible: false,
            uploadURL: ''
        }
    }
    
    generateImage = () => {
        return images.map((image, index) => {
            console.log(image)
            return (
                <View key={index} style={[{ width: (width)/3 }, { height: (width)/3 }]}>
                    <Image style={{ flex: 1, width: undefined, height: undefined }}
                    source={image}
                    />
                </View>
            )
        })
    }

    componentDidMount() {
        this.fetchUser()
    }

    async fetchUser () {
        // login by facebook
        let userNameFB
        let userPicUrlFB
        try {
            userNameFB = await AsyncStorage.getItem('userName')
            userPicUrlFB = await AsyncStorage.getItem('userPic')
        } catch (error) {
            console.log(error)
        }
        
        // login normal
        let user_name
        // check username by facebook is null
        // then, get user data that login normally
        if (userNameFB == null) {
            try {
                user_name = await AsyncStorage.getItem('name')
                console.log('in' + user_name)
            } catch (error) {
                console.log(error)
            }
            this.setState({name: user_name})
        } else {
            this.setState({name: userNameFB, picUrl: userPicUrlFB})
        }
        console.log('name: ' + this.state.name)
        console.log('pic url: ' + this.state.picUrl)

    }

    editName () {
        console.log('Toggle modal')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    async saveName () {
        console.log('Save name success')
        this.setState({ isModalVisible: !this.state.isModalVisible })
        // let response = await CooklabAxios('')
        let userid = await AsyncStorage.getItem('userid')
        let temp = this.state.name
        let saveNameResponse
        try {
            saveNameResponse = await CooklabAxios.put(`/update_user`, {
                userId: userid,
                name: this.state.name
            })
        } catch (error) {
            
        }
    }

    chooseImage() {
        var options = {
            title: 'Select Avatar',
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
                uploadImage(response.uri)
                .then(url => this.setState({ uploadURL: url }))
                .catch(error => console.log(error))
                // saveProfileImageUri(response.uri)
                // this.props.setImageSource(response.uri)
                // Actions.StatusPosting()
            }
        });
    }

    // async saveProfileImageUri(uri) {
    //     let userid = await AsyncStorage.getItem('userid')
    //     let saveImageResponse
    //     try {
    //         saveImageResponse = await CooklabAxios.put(`/update_user`, {
    //             userId: userid,
                
    //         })
    //     } catch (error) {
            
    //     }
    // }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader onMenuPressed={ this.props.onMenuPressed } showCameraRoll={ this.props.showCameraRoll } />
                
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.isModalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={ styles.modal }>
                            <View>
                                <Text>Edit name</Text>
                                <TextInput onChangeText={ (text) => this.setState({name: text}) } placeholder={this.state.name} />

                                <View style={{ flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center', }}>
                                    <Button style={ styles.cancelButton }
                                        onPress={() => {
                                            this.setState({ isModalVisible: !this.state.isModalVisible })
                                        }}>
                                        <Text>Cancel</Text>
                                    </Button>

                                    <Button style={ styles.saveNameButton }
                                        onPress={() => this.saveName()}>
                                        <Text>Save</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {/* Cover image */}
                    <Image source={require('../../assets/image/CoverImage/coverImage1.jpg')} style={styles.coverImage} />
                    {/* Profile image */}
                    <View style={{ alignItems: 'center' }}>
                        {/* { this.state.picUrl === null ? 
                            <TouchableOpacity onPress={ () => chooseImage()}>
                                <Image source={require('../../assets/image/Profile/profilePic.png')} style={ styles.profileImage }/>
                            </TouchableOpacity> : 
                            <TouchableOpacity onPress={ () => chooseImage()}>
                                <Image source={{ uri: this.state.picUrl }} style={styles.profileImage} />
                            </TouchableOpacity>
                        } */}
                        <TouchableOpacity onPress={ () => chooseImage()}>
                                <Image source={{ uri: this.state.picUrl }} style={styles.profileImage} />
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={ styles.body }>
                    {/* User's name */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>{ this.state.name }</Text>
                        <IconMaterial onPress={() => this.editName()} name="edit" style={{ textAlign: 'center', marginLeft: 5 }} /> 
                    </View>
                    {/* Horizontal rule */}
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, marginTop: 5 }}></View>
                    {/* Following | Fans */}
                    <View style={ styles.followPanel }>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 12 }}>Following</Text>
                            <Text style={{ color: 'gray', fontSize: 11 }}>53</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 12 }}>Followers</Text>
                            <Text style={{ color: 'gray', fontSize: 11 }}>231</Text>
                        </View>
                    </View>
                    {/* Image */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        { this.generateImage() }
                    </View>
                </View>
            </View>
        );
    }
}



export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width
  },
  modal: {
    padding: 30
  },
  header: {
    backgroundColor: '#4F4F4F'
  },
  coverImage: {
    // position: 'absolute',
    // resizeMode: 'stretch',
    height: 170,
    width: '100%'
  },
  followPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    position: 'absolute',
    top: -40,
    width: 80,
    height: 80,
    borderRadius: 37.5,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  body: {
      top: 50,
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
  saveNameButton: {
    width: 100, 
    padding: 5, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6FCF97', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
})
