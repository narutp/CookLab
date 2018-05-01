import React, { Component } from 'react'
import { ScrollView, Modal, TextInput, Animated, AsyncStorage, TouchableHighlight, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import BackHeader from './header/BackHeader'
import Spinner from 'react-native-loading-spinner-overlay'
import { Container, Card, CardItem, Thumbnail, Body, Left, Right, Button, Header, Footer, Text as TextNative, Icon } from 'native-base'
import CooklabAxios from '../http'
import CommentCard from './CommentCard'
import moment from 'moment'

class CommentPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isSpinnerVisible: false,
            commentArr: [],
            comment: '',
            userid: ''
        }
    }

    async componentDidMount() {
        console.log('aaaaaa', this.props.postid)
        this.setState({
            isSpinnerVisible: true
        })
        let res = await this.fetchComment()
    }

    async fetchComment() {
        let userid
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }

        this.setState({ userid: userid })
        let getCommentResponse
        try {
            getCommentResponse = await CooklabAxios.get(`get_comment_by_post?post_id=${this.props.postid}`)
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

    async comment() {
        this.setState({
            isSpinnerVisible: true
        })
        let createCommentResponse
        let isCreateComment = false
        let createNotiResponse

        try {
            createCommentResponse = await CooklabAxios.post(`create_comment`, {
              id_post: this.props.postid,
              id_user: this.state.userid,
              text: this.state.comment
            })
        } catch (error) {
            console.log(error)
        }

        // create notification
        // try {
        //     createNotiResponse = await CooklabAxios.post(`create_notification`, {
        //         id_post: this.props.postid,
        //         id_user: this.state.userid,
        //         id_target: this.props.userid,
        //         type: 'comment'
        //     })
        // } catch (error) {
        //     console.log(error)
        // }

        let getCommentResponse
        try {
            getCommentResponse = await CooklabAxios.get(`get_comment_by_post?post_id=${this.props.postid}`)
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

    render() {
        return (
            <Container>
                <Spinner visible={this.state.isSpinnerVisible} />
                <BackHeader title="Comment" />
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
                        <TouchableOpacity onPress={ async() => await this.comment() }>
                            <Text style={{ fontSize: 12, color: 'blue' }}>POST</Text>
                        </TouchableOpacity>
                    </Right>
                </Footer>
            </Container>
        )
    }
}

export default CommentPage

const styles = StyleSheet.create({
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