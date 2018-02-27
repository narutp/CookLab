import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

class TopfeedTab extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.user_wrapper}>
                  <Image
                  style={styles.profilepic}
                  source={require('src/assets/image/Profile/profilePic1.jpg')}
                  />
                  <Text style={styles.username}> NatanonP </Text>
                </View>
                <View style={styles.image_wrapper}>
                  <Image
                  style={styles.postpic}
                  source={require('src/assets/image/Food/food1.jpeg')}/>
                </View>
                <View style={styles.action_wrapper}>
                  <IconIonicons name='md-heart-outline' style={styles.action_icon}/>
                  <IconIonicons name='ios-paper-outline' style={styles.action_icon}/>
                  <IconIonicons name='md-share' style={styles.action_icon}/>
                </View>
                <View style={styles.detail_wrapper}>
                  <Text style={styles.love_text}> 20,123,498 likes </Text>
                  <View style={styles.post_wrapper}>
                    <Text style={styles.name_text}> NatanonP</Text>
                    <Text style={styles.post_text}> Proudly present!</Text>
                    <Text style={styles.hashtag_text}> #lovedessert #2018 </Text>
                  </View>
                </View>
                <View style={styles.comment_wrapper}>
                  <Text style={styles.comment_count}> view all 250 comments </Text>
                </View>
            </View>
        );
    }
}

export default TopfeedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  profilepic: {
    width: 35,
    height: 35,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 17
  },
  username: {
    alignSelf: 'center'
  },
  user_wrapper: {
    flexDirection: 'row',
    width: "100%",
    borderBottomWidth: 0.5
  },
  postpic: {
    height: "100%",
    width: "100%",
  },
  image_wrapper: {
    flexDirection: 'row',
    width: "100%",
    height: "40%",
  },
  action_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    height: "7%",
    backgroundColor: "#F2F2F2"
  },
  detail_wrapper: {
    marginVertical: 6,
    marginHorizontal: 6,
  },
  post_wrapper: {
    flexDirection: 'row'
  },
  comment_wrapper: {
    marginVertical: 6,
    marginHorizontal: 6
  },
  love_text: {
    fontSize: 12
  },
  name_text: {
    fontSize: 12
  },
  post_text: {
    fontSize: 12,
    color: "#A9A9A9"
  },
  hashtag_text: {
    fontSize: 12
  },
  comment_count: {
    fontSize: 12,
    color: "#A9A9A9"
  },
  action_icon: {
    marginLeft: 10,
    fontSize: 27
  }
})
