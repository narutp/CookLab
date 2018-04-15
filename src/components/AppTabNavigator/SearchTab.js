import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Card, CardItem, Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import SearchCardComponent from '../card/SearchCardComponent';

class SearchTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchText: ''
        }
    }

    searchDish() {
        console.log(this.state.searchText)
    }

    render () {
        return (
            <View style={styles.container}>
                <Header searchBar rounded style={styles.searchBar}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input onChangeText={ (text) => this.setState({searchText: text}) } placeholder="Search" />
                        <TouchableOpacity onPress={ () => this.searchDish() }>
                            <Icon name="paper-plane" />
                        </TouchableOpacity>
                    </Item>
                    {/* <Button transparent>
                        <TextInput>Search</TextInput>
                    </Button> */}
                </Header>
                <ScrollView>
                    <SearchCardComponent />
                </ScrollView>
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