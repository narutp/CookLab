import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import ImageFactory from 'src/components/ImageFactory';

class Aboutus extends Component {
    
    render(){
        return(
            <ScrollView style={ styles.container }>
                <View style={ styles.header }>
                    <Ionicons name="ios-arrow-back" onPress={() =>  Actions.MainScreen() } size={25} style={ styles.backIcon } />
                </View>
                <Text style={ styles.aboutus }>About us..</Text>
                <View style={ styles.logoWrapper }>
                    <Image source={ ImageFactory.logo } style={ styles.logoImage }/>
                    <Text style={ styles.cooklab }>CookLab</Text>
                </View>
                <Text style={ styles.thanks }>Thanks for using our application.</Text>
                <Text style={ styles.collaborators }>Collaborators</Text>
                <View style={ styles.devWrapper }>
                    <Text style={ styles.dev }>Narut Poovorakit</Text>
                    <Text style={ styles.dev }>Natanon Poonawagul</Text>
                    <Text style={ styles.dev }>Supanat Pokturng</Text>
                </View>
            </ScrollView>
        )
    }
}

export default Aboutus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF7F50'
    },
    header: {
        backgroundColor: '#F44336'
    },
    backIcon: {
        marginLeft: 10, 
        marginTop: 6,
        color: 'white' 
    },
    aboutus: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: 30,
        color: 'white'
    },
    logoWrapper: {
        marginTop: 10,
        alignSelf: 'center'
    },
    logoImage: {
        width: 125,
        height: 125,
        alignSelf: 'center'
    },
    cooklab: {
        fontSize: 44,
        color: 'white',
        alignSelf: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },
    collaborators: {
        marginTop: 5,
        marginLeft: 20,
        fontSize: 30,
        color: 'white'
    },
    devWrapper: {
        marginTop: 5,
        marginLeft: 40
    },
    dev: {
        marginBottom: 5,
        fontSize: 27,
        color: 'white'
    },
    thanks: {
        marginTop: 5,
        fontSize: 30,
        color: 'white',
        alignSelf: 'center',
        marginBottom: 10
    }
})