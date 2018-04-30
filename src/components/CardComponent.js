import React, { Component } from 'react';
import { ScrollView, Modal, TextInput, Animated, AsyncStorage, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Container, Card, CardItem, Thumbnail, Body, Left, Right, Button, Header, Footer,
Icon } from 'native-base'
import { Text as TextNative } from 'native-base'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFeather from 'react-native-vector-icons/Feather'
import CooklabAxios from '../http/index'
import { ShareDialog } from 'react-native-fbsdk'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'
import CommentCard from './CommentCard'
import Timer from 'react-native-timer'
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment'

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
            isSpinnerVisible: false,
            comment: '',
            commentArr: [],
            profilePic: '',
            userid: '',
            isSpinnerVisible: true
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
                alert('Share success')
                Alert.alert(
                    'Facebook sharing',
                    'Share success',                
                    [
                      {text: 'Ok', onPress: () => console.log('Cancel Pressed!')},
                    ],
                )
            }
            },
            function(error) {
                console.log('Share error: ' + error);
            }
        );
    }

    async componentDidMount() {
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        this.setState({ status: this.props.status, 
            trophy: this.props.trophy, 
            profilePic: this.props.profilePic,
            commentArr: this.props.comments, 
            userid: userid,
            isSpinnerVisible: false
        })
    }

    
    async increaseTrophy () {
        this.setState({ status: !this.state.status, 
            trophy: this.state.trophy+1, 
            isIncreaseTrophy: true 
        })
        // Add animation when click add trophy
        this.springAnimation()
        
        let trophyResponse
        try {
            trophyResponse = await CooklabAxios.put(`/increase_trophy`, {
                userId: this.state.userid,
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

        let trophyResponse
        try {
            trophyResponse = await CooklabAxios.put(`/decrease_trophy`, {
                userId: this.state.userid,
                postId: this.props.postId
            })
        } catch (error) {
            console.log(error)
        }
        console.log(trophyResponse)
    }

    async comment() {
        this.setState({
            isSpinnerVisible: true
        })
        let createCommentResponse
        let isCreateComment = false
        let createNotiResponse

        try {
            createCommentResponse = await CooklabAxios.post(`create_comment`, {
              id_post: this.props.postId,
              id_user: this.state.userid,
              text: this.state.comment
            })
        } catch (error) {
            console.log(error)
        }

        // create notification
        try {
            createNotiResponse = await CooklabAxios.post(`create_notification`, {
                id_post: this.props.postId,
                id_user: this.state.userid,
                id_target: this.props.userid,
                type: 'comment'
            })
        } catch (error) {
            console.log(error)
        }

        let getCommentResponse
        try {
            getCommentResponse = await CooklabAxios.get(`get_comment_by_post?post_id=${this.props.postId}`)
        } catch (error) {
            console.log(error)
        }

        if (getCommentResponse.data != null) {
            this.setState({
                commentArr: getCommentResponse.data,
                isSpinnerVisible: false
            })
        }
    }

    async openModal() {
        let getCommentResponse
        try {
            getCommentResponse = await CooklabAxios.get(`get_comment_by_post?post_id=${this.props.postId}`)
        } catch (error) {
            console.log(error)
        }

        console.log('Get comment', getCommentResponse.data)
        this.setState({
            commentArr: getCommentResponse.data,
            isModalVisible: !this.state.isModalVisible
        })
    }

    navigateToDishDetail() {
        Actions.DishDetail({ idDish: this.props.idDish })
    }

    navigateToUserDetail() {
        console.log('check same user ', this.props.userid + this.state.userid)
        // Check if user that been clicked is your own account
        if (this.props.userid === this.state.userid) {
            Actions.MyDish()
        } else {
            Actions.UserDetail({ idUser: this.props.userid })
        }
    }

    render() {
        console.log('props', this.props)
        return (
            <View style={ styles.container }>
                <Spinner visible={this.state.isSpinnerVisible} 
                // textContent={"Loading..."} 
                // textStyle={{color: 'white'}} 
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        console.log('Modal closed')
                    }}>
                    <Container>
                        <Spinner visible={this.state.isSpinnerVisible} />
                        <Header style={styles.headerModal}>
                            <Left style={{ flex: 1, justifyContent: 'center' }}>
                                <IconIonicons name="ios-arrow-back" onPress={() => {
                                    this.setState({ isModalVisible: !this.state.isModalVisible })
                                }} color={'black'} size={30} style={ styles.backIcon } />
                            </Left>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextNative style={{ fontSize: 13 }}>COMMENT</TextNative>
                            </Body>
                            <Right />
                        </Header>
                        <ScrollView>
                            <View>
                                {this.state.commentArr.map((data, index) => {
                                    return (
                                        <CommentCard 
                                            name={data.name}
                                            comment={data.text}
                                            image={data.image}
                                            // time={moment(data.timestamp).fromNow()}
                                            time={moment(data.timestamp).fromNow()}
                                            // idUser={data.id_user}
                                        />
                                    )
                                })}
                            </View>
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
                                    <Text style={{ fontSize: 12, color: 'blue' }}>POST</Text>
                                </TouchableOpacity>
                            </Right>
                        </Footer>
                    </Container>
                </Modal>
                <Card>
                    <CardItem header style={styles.headerCard}>
                        <Left>
                            <TouchableOpacity onPress={ () => this.navigateToUserDetail() }>
                                <Thumbnail source={{ uri: this.state.profilePic }} style={{ width: 35, height: 35 }}/>
                            </TouchableOpacity>   
                            <Body>
                                <TouchableOpacity onPress={ () => this.navigateToUserDetail() }>
                                    <Text>{this.props.userName} </Text>
                                </TouchableOpacity>
                                <Text note style={{ fontSize: 9 }}>{this.props.date}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody style={{ marginBottom: 5, marginTop: 5}}>
                        {/* <Image source={foodImage[this.props.foodPic]} style={styles.imageCard}/> */}
                        <TouchableOpacity onPress={ () => this.navigateToDishDetail() }>
                            <Image source={{ uri: this.props.foodPic }} style={ styles.imageCard }/>
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
                                <IconMaterialCommunityIcons name='trophy' style={{ color: '#F44336' }} size={22}/>
                            </TouchableOpacity> : 
                            <TouchableOpacity onPress={ () => this.increaseTrophy() } style={ styles.iconContainer }>
                                <IconMaterialCommunityIcons name='trophy-outline' style={{ color: 'black' }} size={22}/>
                            </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={ () => this.openModal() } style={ styles.iconContainer }>
                                <IconMaterialCommunityIcons name="comment-outline" style={{ color: 'black' }} size={22} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => this.shareLinkWithShareDialog() } style={ styles.iconContainer }>
                                <IconFeather name='share-2' style={{ color: 'black' }} size={22}/>
                            </TouchableOpacity>
                        </Left>
                    </CardItem>
                    {/* Horizontal rule */}
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, marginTop: 3, marginBottom: 5, opacity: 0.6 }}></View>
                    <CardItem style={{ height: 10 }}>
                        { this.state.trophy >= 0 && this.state.trophy <= 1 ? 
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.state.trophy } trophy </Text>
                            : <Text style={{ fontSize: 12, fontWeight: '600' }}>{ this.state.trophy } trophies </Text>
                        }
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{ fontSize: 12 }}>
                                <Text style={{ fontWeight: '900' }}>{this.props.userName}{"  "}</Text>
                                { this.props.caption }
                            </Text>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text onPress={ () => this.openModal() } style={{ fontSize: 12, fontWeight: 'bold' }} >more...</Text>
                            </TouchableOpacity>
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
    resizeMode: 'contain',
    height: 300,
    width: Dimensions.get('window').width
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