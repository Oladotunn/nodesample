import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
    componentDidMount(){
        console.log(this.props.navigationState)
        this.props.navigationState.title = 'Edit'
    }
    render() {
        return (
            <View style={{margin: 128}}>
                <Text onPress={Actions.pageTwo}>This is PageOne!</Text>
            </View>
        )
    }
}