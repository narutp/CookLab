import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body, Header, Card, CardItem } from 'native-base';

let images = [
    require('../../assets/image/Food/food1.jpg'),
    require('../../assets/image/Food/food2.jpg'),
    require('../../assets/image/Food/food3.jpg'),
    require('../../assets/image/Food/food4.jpg'),
    // require('../../assets/image/Food/food5.jpg'),
    // require('../../assets/image/Food/food6.jpg'),
    // require('../../assets/image/Food/food7.jpg'),
    // require('../../assets/image/Food/food8.jpg'),
    // require('../../assets/image/Food/food9.jpg'),
]

let {width, height} = Dimensions.get('window')
class ProfileTab extends Component {

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

    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <IconEntypo name="menu" size={25} style={{ marginLeft: 10, color: '#fff' }} />
                    </Left>
                    <Body>
                        <Text style={{ color: '#fff' }}>CookLab</Text>
                    </Body>
                    <Right>
                        <IconFontAwesome name="camera" size={20} style={{ marginRight:10, color: '#fff' }} />
                    </Right>
                </Header>
                
                <View>
                    {/* Cover image */}
                    <Image source={require('../../assets/image/CoverImage/coverImage1.jpg')} style={styles.coverImage} />
                    {/* Profile image */}
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/image/Profile/profilePic1.jpg')} style={styles.profileImage} />
                    </View>
                </View>
                <View style={ styles.body }>
                    {/* User's name */}
                    <View style={{ alignItems: 'center' }}>
                        <Text>NarutNrp</Text>
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