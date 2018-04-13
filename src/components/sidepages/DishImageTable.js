import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, Image, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import ImageFactory from 'src/components/ImageFactory'
import DishActions from 'src/redux/actions/dish'

class DishImageTable extends Component {

    showDetail(imageSource){
        console.log("In showDetail")
        this.props.setImageSource(imageSource)
        Actions.DishDetail()
    }

    render(){
        return(
            <View style={ styles.foodImageTable }>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food1)}><Image source={ ImageFactory.food1 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food2)}><Image source={ ImageFactory.food2 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food3)}><Image source={ ImageFactory.food3 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food4)}><Image source={ ImageFactory.food4 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food5)}><Image source={ ImageFactory.food5 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food6)}><Image source={ ImageFactory.food6 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food7)}><Image source={ ImageFactory.food7 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food8)}><Image source={ ImageFactory.food8 } style={ styles.foodImage }/></TouchableOpacity>
                <TouchableOpacity style={ styles.foodImageWrapper } onPress={() => this.showDetail(ImageFactory.food9)}><Image source={ ImageFactory.food9 } style={ styles.foodImage }/></TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setImageSource: (imageSource) => {
        dispatch(DishActions.setImageSource(imageSource))
    }
})

export default connect(null, mapDispatchToProps)(DishImageTable)

const styles = StyleSheet.create({
    foodImage: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#C0C0C0'
    },
    foodImageTable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10
    },
    foodImageWrapper: {
        width: Dimensions.get('window').width/3,
        height: 120,
        alignItems: 'center'
    }
})