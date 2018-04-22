import React, { Component } from 'react';
import { Linking, StyleSheet, ScrollView, Dimensions, Text, Image, View, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import ImageFactory from 'src/components/ImageFactory';
import BackHeader from '../header/BackHeader'

const width = Dimensions.get('window').width
class Aboutus extends Component {
    
    render(){
        return(
            <View style={{ flex: 1 }}>
                <BackHeader title="ABOUT US" actions="sidemenu" />
                <ScrollView style={ styles.container }>
                    <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="ios-people" size={90} />
                    </View>
                    {/* Horizontal rule */}
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, marginTop: 5 }}></View>
                    <View style={ styles.wrapper }>
                        <Text style={ styles.collaborators }>Collaborators</Text>
                        <View style={ styles.devWrapper }>
                            <Text style={ styles.dev }>Narut Poovorakit</Text>
                            <Text style={ styles.dev }>Natanon Poonawagul</Text>
                            <Text style={ styles.dev }>Supanat Pokturng</Text>
                        </View>
                    </View>
                    
                    <View style={ styles.wrapper }>
                        <Text style={ styles.collaborators }>Credits</Text>
                            <View style={ styles.devWrapper }>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={ styles.dev }>
                                        Icons made by 
                                    </Text>
                                    <Text style={{color: 'blue'}}
                                        onPress={() => Linking.openURL("https://www.flaticon.com/authors/those-icons")}>
                                        {' '}ThoseIcon, Flaticon
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        licensed by
                                    </Text>
                                    <Text style={{color: 'blue'}}
                                        onPress={() => Linking.openURL("http://creativecommons.org/licenses/by/3.0/")}>
                                        "http://creativecommons.org/licenses/by/3.0/"
                                    </Text>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            </View>
        )
    }
}

export default Aboutus

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    aboutus: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: 20,
    },
    wrapper: {
        marginTop: 20
    },
    logoWrapper: {
        marginTop: 10,
        alignSelf: 'center'
    },
    collaborators: {
        marginTop: 5,
        marginLeft: 20,
        fontSize: 15,
        fontWeight: '500'
    },
    devWrapper: {
        marginTop: 5,
        marginLeft: 40
    },
    dev: {
        marginBottom: 5,
        fontSize: 14,
    },
})