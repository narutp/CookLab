import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { Card, CardItem, Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

class SearchTab extends Component {

    render () {
        return (
            <View style={styles.container}>
                <Header searchBar rounded style={styles.searchBar}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <View>
                    {/* <Image source={require('../../assets/image/Food/food1.jpg')} style={styles.image1} /> */}
                </View>
                <View>
                    {/* <Image source={require('../../assets/image/Food/food5.jpg')} style={styles.image1} /> */}
                </View>
                <View>
                    {/* <Image source={require('../../assets/image/Food/food7.jpg')} style={styles.image1} /> */}
                </View>
                <View>
                    {/* <Image source={require('../../assets/image/Food/food9.jpg')} style={styles.image1} /> */}
                </View>
            </View>
        );
    }
}

export default SearchTab;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },
  searchBar: {
    width: '100%',
  },
  image1: {
    left: 0,
    width: '100%',
    height: 150,
  }
})