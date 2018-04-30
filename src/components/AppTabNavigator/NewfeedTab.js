import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, AsyncStorage, RefreshControl } from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import AppHeader from '../header/AppHeader'
import { Container, Content, Left, Right, Body } from 'native-base'
import CardComponent from '../CardComponent.js'
import CooklabAxios from '../../http/index'
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay'

class NewfeedTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedResponse: [],
            user: '',
            refreshing: false,
            isSpinnerVisible: false,
        }
    }

    async componentDidMount() {
        this.setState({
            isSpinnerVisible: true
        })
        let fetch = await this.fetchPost()
    }

    async fetchPost() {
        let userid
        let feedResponse
        try {
            userid = await AsyncStorage.getItem('userid')
        } catch (error) {
            console.log(error)
        }
        try {
            feedResponse = await CooklabAxios.get(`/feeds?userId=${userid}`)
            this.setState({feedResponse: feedResponse.data})
            let newDate
            feedResponse.data.forEach(element => {
                console.log(element)
            });
        } catch (error) {
            console.log(error)
        }
        this.setState({
            isSpinnerVisible: false
        })
    }

    _onRefresh() {
        this.setState({
            refreshing: true
        })

        this.fetchPost().then(() => {
            this.setState({refreshing: false})
        })
    }

    render() {
        console.log('sapefomapwoef', this.state.feedResponse)
        return (
            <Container style={styles.container}>
                <Spinner visible={this.state.isSpinnerVisible}
                // textContent={"Loading..."} 
                // textStyle={{color: 'white'}} 
                />
                <AppHeader onMenuPressed={ this.props.onMenuPressed } showCameraRoll={ this.props.showCameraRoll } />
                    <View>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                        }>
                            {this.state.feedResponse.map((data, index) => {
                                return (
                                    <CardComponent 
                                        trophy={data.trophies} 
                                        profilePic={data.photo}
                                        foodPic={data.image} 
                                        caption={data.caption}
                                        date={moment(data.timestamp).format("MMMM Do YYYY, h:mm a")}
                                        userName={data.user_name}
                                        postId={data._id}
                                        status={data.status}
                                        comments={data.comments}
                                        idDish={data.id_dish}
                                        userid={data.id_user}
                                        type={data.type}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
            </Container>
        )
    }
}

export default NewfeedTab;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4F4F4F'
  }
})
