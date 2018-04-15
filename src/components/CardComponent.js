import React, { Component } from 'react';
import { ScrollView, Modal, TextInput, Animated, AsyncStorage, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Container, Card, CardItem, Thumbnail, Body, Left, Right, Button, Header, Footer,
Icon } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import CooklabAxios from './HttpRequest/index'
import { ShareDialog } from 'react-native-fbsdk'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'
import CommentCard from './CommentCard'
import Timer from 'react-native-timer'

class CardComponent extends Component {

    constructor(props) {
        super(props)
        this.springValue = new Animated.Value(1)
        this.iconAnimated = new Animated.Value(1)
        // Build up a shareable link.
        const shareLinkContent = {
            contentType: 'photo',
            photos: [{
                imageUrl: this.props.foodPic,
                userGenerated: false, 
                hashtag: '#cooklab',
                quote: '#cooklab',
            }]
        };
        this.state = {
            trophy: '',
            status: '',
            shareLinkContent: shareLinkContent,
            isIncreaseTrophy: false,
            isModalVisible: false,
            comment: '',
        }
    }

    springAnimation() {
        this.springValue.setValue(1)
        this.iconAnimated.setValue(0.5)
        Animated.spring(
            this.iconAnimated, {
                toValue: 1,
                friction: 1
            }
        ).start()
        Animated.spring(
            this.springValue, {
                toValue: 1,
                friction: 1
            }
        ).start()
    }

    async loginFacebook() {
        let result = await LoginManager.logInWithReadPermissions(['public_profile'])
        if (result.isCancelled) {
            console.log('Login is cancelled') 
        } else {
            console.log('Login was success' + result.grantedPermissions.toString)
            
            let data = await AccessToken.getCurrentAccessToken()
                try {
                    await AsyncStorage.setItem('facebookToken', data.accessToken.toString())
                    console.log('Facebook token: ' + data.accessToken.toString())
                } catch (error) {
                    console.log(error)
                }
            this.shareLinkWithShareDialog()
        }
    }

    async shareLinkWithShareDialog() {
        let facebookToken
        try {
            facebookToken = await AsyncStorage.getItem('facebookToken')
        } catch(error) {
            console.log(error)
        }
        console.log('facebook token when click share: ' + facebookToken)
        // check if user didn't login by facebook
        if (facebookToken === null) {
            this.loginFacebook()
        }
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
        this.props.comments.forEach(element => {
            console.log(element)
        });
        // console.log('argaperogkapeorg' + this.props.comments)
        this.setState({ status: this.props.status, trophy: this.props.trophy })
    }

    async increaseTrophy () {
        this.setState({ status: !this.state.status, 
            trophy: this.state.trophy+1, 
            isIncreaseTrophy: true 
        })
        // Add animation when click add trophy
        this.springAnimation()
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
        Timer.setTimeout(
            'timer', () => {
                this.setState({ isIncreaseTrophy: false })
            }, 5000
        )
        Timer.clearInterval('timer')
    }

    async decreaseTrophy () {
        this.setState({ status: !this.state.status, 
            trophy: this.state.trophy-1, 
            isIncreaseTrophy: false  
        })
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

    async comment() {
        let createCommentResponse
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        try {
            createCommentResponse = await CooklabAxios.post(`create_comment`, {
              id_post: this.props.postId,
              id_user: userid,
              text: this.state.comment
            })
        } catch (error) {
            console.log(error)
        }
    }

    navigateDishDetail() {
        console.log('ininininin')
        Actions.DishDetail({ idDish: this.props.idDish })
    }

    render() {
        const profileImage = {
            '1': require('../assets/image/Profile/profilePic1.jpg'),
            '2': require('../assets/image/Profile/profilePic2.jpg')
        }

        return (
            <View style={ styles.container }>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Container>
                        <Header style={styles.headerModal}>
                            <Left>
                                <IconIonicons name="ios-arrow-back" onPress={() => {
                                    this.setState({ isModalVisible: !this.state.isModalVisible })
                                }} color={'black'} size={25} style={ styles.backIcon } />
                            </Left>
                            <Body>
                                <Text>Comment</Text>
                            </Body>
                        </Header>
                        <ScrollView>
                        {this.props.comments.map((data, index) => {
                            return (
                                <CommentCard 
                                    name={data.name}
                                    comment={data.text}
                                    profilePic={this.props.profilePic}
                                />
                            )
                        })}
                            {/* <Card style={ styles.modal }>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={profileImage[this.props.profilePic]} style={{ width: 30, height: 30 }}/>
                                        <Body>
                                            <Text>Natanon</Text>
                                            <Text>Hello hello hello</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card> */}
                        </ScrollView>
                        <Footer style={styles.footerModal}>
                            <Body style={{ paddingLeft: 5 }}>
                                <TextInput 
                                    multiline={true}
                                    numberOfLines={2}
                                    style={styles.commentModal} 
                                    onChangeText={ (text) => this.setState({comment: text}) } 
                                    placeholder="Add comment.." 
                                />
                            </Body>
                            <Right style={{ paddingRight: 10 }}>
                                <TouchableOpacity onPress={ () => this.comment() }>
                                    <Text style={{ color: 'blue' }}>POST</Text>
                                </TouchableOpacity>
                            </Right>
                        </Footer>
                    </Container>
                </Modal>
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
                        <TouchableOpacity onPress={ () => this.navigateDishDetail() }>
                            <Image source={{ uri: this.props.foodPic }} style={{ resizeMode: 'cover',
                                height: 250,
                                width: Dimensions.get('window').width
                            }} />
                        </TouchableOpacity>
                        { this.state.isIncreaseTrophy === true && 
                            <Animated.View style={{ position: 'absolute', left: '42%', transform: [{scale: this.iconAnimated}] }}>
                                <IconIonicons name='md-trophy' style={{ color: 'white' }} size={70}/>
                            </Animated.View>
                        }
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
                            <TouchableOpacity onPress={ () => this.setState({ isModalVisible: !this.state.isModalVisible}) } style={ styles.iconContainer }>
                                <IconMaterialCommunityIcons name="comment-outline" style={{ color: 'black' }} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => this.shareLinkWithShareDialog() } style={ styles.iconContainer }>
                                <IconFeather name='share-2' style={{ color: 'black' }} size={18}/>
                            </TouchableOpacity>
                        </Left>
                    </CardItem>
                    <CardItem style={{ height: 10 }}>
                        { this.state.trophy >= 0 && this.state.trophy <= 1 ? 
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
                                <Text onPress={ () => this.setState({ isModalVisible: !this.state.isModalVisible}) } style={{ fontSize: 12, fontWeight: 'bold' }} >more...</Text>
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
  },
  modal: {
    padding: 10
  },
  headerModal: {
    backgroundColor: 'white'
  },
  backIcon: {
    marginLeft: 10
  },
  footerModal: {
    backgroundColor: 'white',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
  },
  commentModal: {
    backgroundColor: 'white',
    width: 300
  }
})