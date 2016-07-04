/* @flow */

import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Container from '@components/Container'

import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {
    transparentBg,
    primaryFont,
    secondaryFont,
    padding20,
    primaryFontColor,
    modalWhite,
    borderRadius,
} from '@theme/colors'
import Dimensions from 'Dimensions';
import Button from 'react-native-button';

let windowWidth = Dimensions.get('window').width;
class AboutDetails extends Component{
  containerTouched(event) {
    this.refs.textInput.blur();
    return false;
  }
  render() {
    return (
              <View onStartShouldSetResponder={this.containerTouched.bind(this)} style={{paddingBottom:10}}>
                <View style={{paddingLeft:10}}>
                  <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:10}}>
                  <Text style={styles.textColor}>Tell us about yourself.</Text>
                </View>
                <View style={{marginTop:20,paddingLeft:10,paddingRight:10}}>
                  <TextInput
                      multiline={true}
                      returnKeyType={'next'}
                      style={[{height: 90, borderColor: 'gray', borderWidth: 1,fontSize:14,padding:10,justifyContent:'center'},borderRadius]}
                      placeholder="Type your bio here"
                      ref="textInput"
                      onSubmitEditing={this.containerTouched.bind(this)}
                      blurOnSubmit={true}/>
                </View>
                <View style={{alignItems:'center',marginTop:20,marginBottom:20}}>
                  <Text style={styles.textColor}>What do you represent?</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.list}  onPress={()=>Actions.flags({title:"Flags" })}>
                    <Text style={styles.textColor}>Add a flag</Text>
                    <Image source={require('@images/Forward-32.png')} style={styles.forwardArrow}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.list}  onPress={()=>Actions.flags({title:"Flags" })}>
                    <Text style={styles.textColor}>Add a flag</Text>
                    <Image source={require('@images/Forward-32.png')} style={styles.forwardArrow}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.list,{borderBottomWidth:1}]}  onPress={()=>Actions.flags({title:"Flags" })}>
                    <Text style={styles.textColor}>Add a flag</Text>
                    <Image source={require('@images/Forward-32.png')} style={styles.forwardArrow}></Image>
                  </TouchableOpacity>
                </View>

                <View style={[{alignItems:'center',marginTop:20}]}>
                  <Button
                      containerStyle={{borderRadius:4}}
                      style={[{fontSize: 16, color: '#fff',lineHeight:30,overflow: 'hidden'},styles.button,borderRadius]}
                      styleDisabled={{color: 'red'}}
                      onPress={()=> {this.props.callbackParent()}}
                  >
                    Next Step
                  </Button>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
                  <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                  <Image source={require('@images/activePage.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                  <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                  <Image source={require('@images/pager.png')} style={{resizeMode:'contain'}}></Image>
                </View>
              </View>
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
    alignSelf:'stretch',
    justifyContent: 'center'
  },

  logo:{
    width:50,
    height:50,
    resizeMode:'contain'
  },
  wrapper:{
    flex:1
  },
  textColor:{
    color:'#9E9E9E'
  },
  button:{
    height:45,
    width:115,
    backgroundColor:'#D80324',
    borderRadius:4,
    borderColor:'#D80324',
    borderWidth:1
  },
  cancelIcon:{
    width:20,
    resizeMode:'contain',
    position:'absolute',
    right:-10,
    top:-20
  },
  list:{
    flexDirection:'row',
    borderTopWidth:1,
    borderColor:'#9E9E9E',
    padding:10,
    justifyContent:'space-between',
    alignItems:'center'
  },
  modalWhite:{
    backgroundColor:'#fff',
    paddingTop:10,
    paddingBottom:10,
    margin:20
  },
  forwardArrow:{
    width:20,
    height:20
  }
})

export default AboutDetails
