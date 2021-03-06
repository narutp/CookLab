import React, { Component } from 'react'
import { ScrollView, TextInput, Platform, Modal, TouchableHighlight, TouchableOpacity, Alert, StyleSheet, Text, View, Image, Dimensions, AsyncStorage } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import AppHeader from '../header/AppHeader'
import { Button, Container, Content, Left, Right, Body, Card, CardItem, Input } from 'native-base'
import CooklabAxios from '../../http/index'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from '../../firebase'
import { Actions } from 'react-native-router-flux'

let images = [
    require('../../assets/image/Food/food1.jpg'),
    require('../../assets/image/Food/food2.jpg'),
    require('../../assets/image/Food/food3.jpg'),
]

let {width, height} = Dimensions.get('window')

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

class ProfileTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: '',
            picUrl: null,
            coverPicUrl: null,
            isModalVisible: false,
            uploadURL: null,
            uploadCoverURL: null,
            picCollection: [],
            userid: '',
            followingCount: 0,
            fansCount: 0
        }
    }
    
    generateImage = () => {
        return this.state.picCollection.map((element, index) => {
            return (
                <View key={index} style={[{ width: (width)/3 }, { height: (width)/3 }]}>
                    <Image style={{ flex: 1, width: undefined, height: undefined }}
                    source={{ uri: element.image}}
                    />
                </View>
            )
        })
    }

    async componentDidMount() {
        this.fetchUser()
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.uploadURL != nextState.uploadURL) {
            this.uploadProfilePic(nextState.uploadURL)
        }
        if (this.state.uploadCoverURL != nextState.uploadCoverURL) {
            this.uploadCoverPic(nextState.uploadCoverURL)
        }
    }

    async uploadProfilePic(url) {
        let uploadResponse
        try {
            uploadResponse = await CooklabAxios.put(`update_user`, {
                userId: this.state.userid,
                photo: url
            })
        } catch (error) {
            console.log(error)
        }
        this.setState({
            picUrl: url
        })
    }

    async uploadCoverPic(url) {
        let uploadResponse
        try {
            uploadResponse = await CooklabAxios.put(`update_user`, {
                userId: this.state.userid,
                cover: url
            })
        } catch (error) {
            console.log(error)
        }
        this.setState({
            coverPicUrl: url
        })
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
        let userResponse
        let userid = await AsyncStorage.getItem('userid')
        try {
            userResponse = await CooklabAxios.get(`/get_user?userId=${userid}`)
        } catch(error) {
            console.log(error)
        }
        // check username by facebook is null
        // then, get user data that login normally
        if (userNameFB === null) {
            // get profile picture            
            try {
                user_name = await AsyncStorage.getItem('name')
                console.log('in' + user_name)
            } catch (error) {
                console.log(error)
            }
            if (userResponse.data.photo != null) {
                this.setState({ name: user_name, picUrl: userResponse.data.photo })
            } else {
                this.setState({ name: user_name })
            }    
        } else {
            this.setState({ name: userNameFB, picUrl: userPicUrlFB })
        }

        let userPostResponse
        try {
            userPostResponse = await CooklabAxios.get(`get_user_post?user_id=${userid}`)
        } catch (error) {
            console.log(error)
        }
        
        this.setState({
            picCollection: userPostResponse.data,
            userid: userid,
            coverPicUrl: userResponse.data.cover
        })

        let followResponse
        try {
            followResponse = await CooklabAxios.get(`get_following_and_fan?user_id=${this.state.userid}`)
            this.setState({
                followingCount: followResponse.data.following.length,
                fansCount: followResponse.data.fan.length
            })
        } catch (error) {
            console.log(error)
        }

    }

    editName () {
        console.log('Toggle modal')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    async saveName () {
        console.log('Save name success')
        this.setState({ isModalVisible: !this.state.isModalVisible })
        let saveNameResponse
        try {
            saveNameResponse = await CooklabAxios.put(`/update_user`, {
                userId: this.state.userid,
                name: this.state.name
            })
        } catch (error) {
            
        }
    }

    chooseImage(type) {
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
                if (type === 'profile') {
                    uploadImage(response.uri)
                    .then(url => this.setState({ uploadURL: url }))
                    .catch(error => console.log(error))
                } else {
                    uploadImage(response.uri)
                    .then(url => this.setState({ uploadCoverURL: url }))
                    .catch(error => console.log(error))
                }
            }
        });
    }

    async openFollowFanList(type) {
        let response
        try {
            response = await CooklabAxios.get(`get_following_and_fan?user_id=${this.state.userid}`)
            console.log('get follow and fan: ', response.data)
            
            if (type === 'following') {
                Actions.FollowList({ data: response.data.following })
            } else {
                Actions.FanList({ data: response.data.fan })
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                </View>
                <ScrollView>
                    {/* Cover image */}
                    <TouchableOpacity onPress={ () => this.chooseImage('cover') }>
                        <Image source={{ uri: this.state.coverPicUrl }} style={styles.coverImage} />
                    </TouchableOpacity>
                    {/* Profile image */}
                    <View style={{ marginBottom: 5, marginTop: 5, }}>
                        { this.state.picUrl === null ? 
                            <TouchableOpacity onPress={ () => this.chooseImage('profile')} style={{ alignItems: 'center' }}>
                                <Image source={require('../../assets/image/Profile/profilePic.png')} style={ styles.profileImage }/>
                            </TouchableOpacity> : 
                            <TouchableOpacity onPress={ () => this.chooseImage('profile')} style={{ alignItems: 'center' }}>
                                <Image source={{ uri: this.state.picUrl }} style={styles.profileImage} />
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={ styles.body }>
                        {/* User's name */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '300' }}>{ this.state.name }</Text>
                            <IconMaterial onPress={() => this.editName()} name="edit" style={{ textAlign: 'center', marginLeft: 5 }} /> 
                        </View>
                        {/* Horizontal rule */}
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, marginTop: 5 }}></View>
                        {/* Following | Fans */}
                        <View style={ styles.followPanel }>
                            <TouchableOpacity onPress={ () => this.openFollowFanList('following') } style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 12 }}>Following</Text>
                                <Text style={{ color: 'gray', fontSize: 11 }}>{ this.state.followingCount }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => this.openFollowFanList('fans') } style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 12 }}>Fans</Text>
                                <Text style={{ color: 'gray', fontSize: 11 }}>{ this.state.fansCount }</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Image */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            { this.generateImage() }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}



export default ProfileTab

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
    width: '100%',
    marginBottom: 5
  },
  followPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    // position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    width: 100,
    height: 100,
    zIndex: 99,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  body: {
      top: 0,
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
