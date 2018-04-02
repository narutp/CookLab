import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TextField, View, Image, Button } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Container, Content, Left, Right, Body } from 'native-base';
import { StackNavigator } from 'react-navigation';
import DishReducer from 'src/redux/reducers/dishReducer';
import { connect } from 'react-redux'

class StatusPosting extends Component {

    render() {
        return(
            <View style={ styles.container }>
                <TextField></TextField>
                <Image source={this.props.imageSource} style={styles.imageCard}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    imageSource: state.DishReducer.imageSource
})

export default connect(mapStateToProps)(StatusPosting)

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width
  },
  imageCard: {
    resizeMode: 'stretch',
    height: 250,
    width: '100%'
  }
})
