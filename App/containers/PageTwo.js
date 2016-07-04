import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
    componentDidMount(){
        console.log('page two')
    }
    render() {
        return (
            <View style={{margin: 128}}>
                <Text onPress={Actions.pageOne}>This is Page2!</Text>
            </View>
        )
    }
}