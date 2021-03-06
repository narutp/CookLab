import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Card, CardItem, Container, Header, Footer, Body, Item, Input, Icon, Button, Text } from 'native-base'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import SearchCardComponent from '../card/SearchCardComponent'
import CooklabAxios from '../../http/index'

class SearchTab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            resultArr: [],
            isSearch: false,
        }
    }

    async searchDish() {
       console.log(this.state.searchText)
       let searchResponse
       try {
           searchResponse = await CooklabAxios.get(`search?text=${this.state.searchText}`)
       } catch (error) {
           console.log(error)
       }
       console.log(searchResponse.data)
       this.setState({resultArr: searchResponse.data, isSearch: true})
       console.log(this.state.isSearch)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Current state', this.state.resultArr)
        console.log('Next State :', nextState.resultArr)
        return this.state.resultArr != nextState.resultArr
    }

    render () {
        console.log('log array', this.state.resultArr)
        return (
            <View style={styles.container}>
                <Header searchBar rounded style={styles.searchBar}>
                    <Item>
                        <Icon name="ios-search" size={25} style={{ color: '#F44336' }} />
                        <Input onChangeText={ (text) => this.setState({searchText: text}) } placeholder="Search..." />
                        <TouchableOpacity onPress={ async() => await this.searchDish() }>
                            <Icon name="paper-plane" size={25} style={{ color: '#F44336' }} />
                        </TouchableOpacity>
                    </Item>
                </Header>
                { this.state.isSearch === true ?
                    <ScrollView>
                        { this.state.resultArr.map( (element) => {
                            console.log('render with: ' + element)
                            return (
                                <SearchCardComponent 
                                    name={element.name}
                                    image={element.image}
                                    type={element.type}
                                    id={element._id}
                                 />
                            )
                        })}
                    </ScrollView>  
                :
                <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.9 }}>
                    <IconIonicons name="ios-search" size={120} />
                    <Text style={{ color: 'grey' }}>Search for users or dishes</Text>
                </Body>
                }
                <Footer style={{ backgroundColor: 'white' }} />
            </View>
        )
    }
}

export default SearchTab;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fbfbfb',
    // justifyContent: 'center',
  },
  searchBar: {
    width: '100%',
    backgroundColor: 'white'
  },
  image1: {
    left: 0,
    width: '100%',
    height: 150,
  }
})