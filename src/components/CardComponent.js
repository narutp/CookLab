import React, { Component } from 'react';
import { TextInput, AsyncStorage, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import CooklabAxios from './HttpRequest/index'
import { ShareDialog } from 'react-native-fbsdk'

class CardComponent extends Component {

    constructor(props) {
        super(props)
        // Build up a shareable link.
        const shareLinkContent = {
            contentType: 'photo',
            photos: [{
                imageUrl: this.props.foodPic,
                userGenerated: false, 
                hashtag: '#cooklab',
                quote: '#cooklab'
            }]
        };
        this.state = {
            trophy: '',
            status: '',
            shareLinkContent: shareLinkContent
        }
    }

    shareLinkWithShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function(canShow) {
            if (canShow) {
                return ShareDialog.show(tmp.state.shareLinkContent);
            }
            }
        ).then(
            function(result) {
            if (result.isCancelled) {
                console.log('Share cancelled');
            } else {
                alert('Share success');
            }
            },
            function(error) {
                console.log('Share error: ' + error);
            }
        );
    }

    componentDidMount() {
        this.setState({ status: this.props.status, trophy: this.props.trophy })
    }

    async increaseTrophy () {
        this.setState({ status: !this.state.status, trophy: this.state.trophy+1 })
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let trophyResponse
        try {
            trophyResponse = await CooklabAxios.put(`/increase_trophy`, {
                userId: userid,
                postId: this.props.postId
            })
        } catch (error) {
            console.log(error)
        }
        console.log(trophyResponse)
    }

    async decreaseTrophy () {
        this.setState({ status: !this.state.status, trophy: this.state.trophy-1 })
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        let trophyResponse
        try {
            trophyResponse = await CooklabAxios.put(`/decrease_trophy`, {
                userId: userid,
                postId: this.props.postId
            })
        } catch (error) {
            console.log(error)
        }
        console.log(trophyResponse)
    }

    render() {
        const profileImage = {
            '1': require('../assets/image/Profile/profilePic1.jpg'),
            '2': require('../assets/image/Profile/profilePic2.jpg')
        }

        return (
            <View style={ styles.container }>
                <Card>
                    <CardItem header style={styles.headerCard}>
                        <Left>
                            <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/>
                            <Body>
                                <Text>{this.props.userName} </Text>
                                <Text note style={{ fontSize: 9 }}>{this.props.date}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        {/* <Image source={foodImage[this.props.foodPic]} style={styles.imageCard}/> */}
                        <Image source={{ uri: this.props.foodPic }} style={styles.imageCard} />
                    </CardItem>
                    <CardItem style={styles.footerCard}>
                        <Left>
                            { this.state.status === true ? 
                            <TouchableOpacity onPress={ () => this.decreaseTrophy() } style={ styles.iconContainer }>
                                <IconIonicons name='md-trophy' style={{ color: '#F44336' }} size={18}/>
                            </TouchableOpacity> : 
                            <TouchableOpacity onPress={ () => this.increaseTrophy() } style={ styles.iconContainer }>
                                <IconIonicons name='md-trophy' style={{ color: 'black' }} size={18}/>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity style={ styles.iconContainer }>
                                <IconMaterialCommunityIcons name="comment-outline" style={{ color: 'black' }} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => this.shareLinkWithShareDialog() } style={ styles.iconContainer }>
                                <IconFeather name='share-2' style={{ color: 'black' }} size={18}/>
                            </TouchableOpacity>
                        </Left>
                    </CardItem>
                    <CardItem style={{ height: 10 }}>
                        { this.state.trophy > 0 && this.state.trophy <= 1 ? 
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.state.trophy } trophy </Text>
                            : <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.state.trophy } trophies </Text>
                        }
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{ fontSize: 12 }}>
                                <Text style={{ fontWeight: '900' }}>Natanon </Text>
                                { this.props.caption }
                            </Text>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }} >more...</Text>
                            </TouchableOpacity>
                            <TextInput style={ styles.commentInput } placeholder="comment.. " />
                        </Body>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width
  },
  headerCard: {
    height: 45
  },
  imageCard: {
    resizeMode: 'cover',
    height: 250,
    width: '100%'
  },
  footerCard: {
    height: 35
  },
  commentInput: {
      width: '100%',
      fontSize: 10,
      height: 40
  },
  iconContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 20, 
    height: 20,
    marginRight: 10
  }
})