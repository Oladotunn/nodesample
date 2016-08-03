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
import { connect } from 'react-redux';
import {
  updateUserLikeAction,
} from '../../action-creators';


let windowWidth = Dimensions.get('window').width;
class WhatDoYouLike extends Component{
  constructor(props){
    super(props)
  }

  _renderLikes(index, end) {
    const { likes, chosenLikes } = this.props.userInfo.interests;
    return _.map(likes.slice(index, end), (like, index) => {
      return (
        <TouchableOpacity
          key={like}
          style={[styles.checkboxButton,chosenLikes.includes(like) ? styles.activeButton:null]}
          onPress={()=> this.props.dispatchUpdateUserLike(like)}>
          <Text style={[chosenLikes.includes(like) ? styles.activeButtonTextColor:styles.buttonTextColor]}>
            {like}
          </Text>
        </TouchableOpacity>
      )
    });
  }

  render() {
    return (
      <View>
        <View style={{paddingLeft:10}}>
          <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
        </View>
        <View style={{alignItems:'center',marginTop:10}}>
          <Text style={styles.textColor}>What do you like?</Text>
        </View>
        <View style={[styles.buttonGroups]}>
          {this._renderLikes(0, 4)}
        </View>
        <View style={[styles.buttonGroups]}>
          {this._renderLikes(4, 7)}
        </View>

        <View style={[styles.buttonGroups]}>
          {this._renderLikes(7, 10)}
        </View>

        <View style={[styles.buttonGroups]}>
          {this._renderLikes(10, 13)}
        </View>
        <View style={[{alignItems:'center',marginTop:20}]}>
          {/*<Button
             style={[{fontSize: 16, color: '#fff',lineHeight:30,overflow: 'hidden'},styles.button,borderRadius]}
             styleDisabled={{color: 'red'}}
             onPress={()=>this.setState({currentView:1})}
             onPress={()=> {this.props.callbackParent()}}
             >
             Next Step
             </Button>*/}
             <TouchableOpacity style={[styles.button]} onPress={()=> {this.props.callbackParent()}}>
               <Text style={{fontSize: 16, color: '#fff',marginTop:10,textAlign:'center'}}>Next Step</Text>
             </TouchableOpacity>
           </View>
           <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
             <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
             <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
             <Image source={require('@images/activePage.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
             <Image source={require('@images/pager.png')} style={{resizeMode:'contain'}}></Image>
           </View>
         </View>
    )
  }
}
const styles = StyleSheet.create({
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
    buttonGroups:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30,
        paddingLeft:20,
        paddingRight:20
    },
    buttonTextColor:{
        color:'#59345F',
        fontSize:12,
    },
    checkboxButton:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:12,
        paddingRight:12,
        borderColor:'#59345F',
        borderWidth:1,
        borderRadius:4,
        overflow:'hidden'
    },
    activeButton:{
        backgroundColor:'#59345F'
    },
    activeButtonTextColor:{
        color:'#fff',
        fontSize:12
    }
})

const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUpdateUserLike: like => dispatch(updateUserLikeAction(like)),
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatDoYouLike);
