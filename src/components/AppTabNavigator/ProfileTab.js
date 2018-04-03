import React, { Component } from 'react'
import { TextInput, Modal, TouchableHighlight, TouchableOpacity, Alert, StyleSheet, Text, View, Image, Dimensions, AsyncStorage } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import Header from './Header'
// import Modal from 'react-native-modal'
import { Container, Content, Left, Right, Body, Card, CardItem, Input } from 'native-base'
import CooklabAxios from '../HttpRequest/index'

let images = [
    require('../../assets/image/Food/food1.jpg'),
    require('../../assets/image/Food/food2.jpg'),
    require('../../assets/image/Food/food3.jpg'),
    // require('../../assets/image/Food/food4.jpg'),
    // require('../../assets/image/Food/food5.jpg'),
    // require('../../assets/image/Food/food6.jpg'),
    // require('../../assets/image/Food/food7.jpg'),
    // require('../../assets/image/Food/food8.jpg'),
    // require('../../assets/image/Food/food9.jpg'),
]

let {width, height} = Dimensions.get('window')
class ProfileTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            id: '',
            picUrl: null,
            isModalVisible: false
        }
    }
    

    generateImage = () => {
        return images.map((image, index) => {

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
        let userName = await AsyncStorage.getItem('userName')
        let userPicUrl = await AsyncStorage.getItem('userPic')

        this.setState({name: userName, picUrl: userPicUrl})
        console.log('name: ' + this.state.name)
        console.log('pic url: ' + this.state.picUrl)

    }

    editName () {
        console.log('Toggle modal')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    saveName () {
        console.log('Save name success')
        this.setState({ isModalVisible: !this.state.isModalVisible })
        // let response = await CooklabAxios('')
    }

    render() {
        return (
            <View style={styles.container}>
                <Header onMenuPressed={ this.props.onMenuPressed } />
                
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
                            <TextInput placeholder="Input something" />

                            <TouchableHighlight
                                onPress={() => {
                                    this.setState({ isModalVisible: !this.state.isModalVisible })
                                }}>
                                <Text>Cancel</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => this.saveName()}>
                                <Text>Save</Text>
                            </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    {/* Cover image */}
                    <Image source={require('../../assets/image/CoverImage/coverImage1.jpg')} style={styles.coverImage} />
                    {/* Profile image */}
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: this.state.picUrl }} style={styles.profileImage} />
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
  }
})