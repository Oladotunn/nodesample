/* @flow */

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Container from '@components/Container'

import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native'
import {transparentBg,primaryFont,secondaryFont,padding20,primaryFontColor} from '@theme/colors'
import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;
class FacebookImages extends Component{

  render() {
    return (
      <Container>
        <View style={styles.container}>
            <Text>Second View</Text>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1:{
    height: 400,
    backgroundColor: "#fff",
    borderRadius:3,
    width:(windowWidth-30)
  },
  container:{
    flex:1,
    backgroundColor:'rgb(0,0,0)',
    alignSelf:'stretch'
  }
})

export default FacebookImages
