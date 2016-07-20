/* @flow */

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Container from '@components/Container';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';
const { FBLoginManager } = require('react-native-facebook-login');


import {transparentBg,primaryFont,secondaryFont,padding20,primaryFontColor} from '@theme/colors';
class LandingPage extends Component{
  _loginWithFB() {
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        // Actions.profileSetup
        console.log("Login data: ", data);
      } else {
        console.log("Error: ", data);
      }
    });
  }
  render() {
    return (
      <View style={styles.imageContainer}>
        <StatusBar
          hidden={true}
        />
        <Image style={styles.bgImage} source={require('@images/splash.png')}>
          <View style={styles.content}>
            <View style={[styles.upperPart,styles.center]}>
              <Image source={require('@images/logo.png')} style={styles.logo}></Image>
              <Text style= {[transparentBg,secondaryFont,{marginTop:40},{color:'#fff'}]}>The dating app for people</Text>
              <Text style= {[transparentBg,secondaryFont,{color:'#fff'}]}>of all <Text style={[primaryFontColor]}>colors</Text> and <Text style={[primaryFontColor]}>cultures</Text>.</Text>
            </View>
            <View style={[styles.lowerPart,styles.center]}>
              <TouchableOpacity
                style={[
                  {
                    borderWidth:1,
                    borderColor:'#fff',
                    justifyContent:'center',
                    flexDirection:"column",alignItems:'center'},
                    padding20
                ]}
                onPress={this._loginWithFB}>
                <Text style={[transparentBg,styles.whiteColor,primaryFont,{textAlign:'center'}]} >
                  Connect With Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer:{
    flex:1,
    alignItems:'stretch'
  },
  bgImage:{
    flex:1,
    width: null,
    height: null,
    backgroundColor:'#000'
  },
  content:{
    flex:1,
    flexDirection:'column',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  upperPart:{
    flex:3
  },
  lowerPart:{
    flex:1
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  whiteColor:{
    color:'#fff'
  },
  logo:{
    width:200,
    resizeMode:'contain'
  }
})

export default LandingPage
