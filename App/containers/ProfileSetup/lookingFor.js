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
import AppStore from '../../app-store';
import { connect } from 'react-redux';
import {
  updateLookingForCriteriaAction,
} from '../../action-creators';
import _ from 'lodash';
import SyncDataToServer from '../../sync-to-server';

let windowWidth = Dimensions.get('window').width;
class LookingFor extends Component{
  constructor(props){
    super(props);
    this._saveUserAppState = _.bind(this._saveUserAppState,this);
    this._getActiveColor = _.bind(this._getActiveColor,this);
    this._getAge = _.bind(this._getAge,this);
    this._toggleGender = _.bind(this._toggleGender,this);
  }

  _saveUserAppState() {
    SyncDataToServer(true);
    Actions.main();
  }

  _getActiveColor(gender) {
    return gender === this.props.userInfo.lookingFor.gender ? '#da1636':'#696969';
  }

  _getAge() {
    return this.props.userInfo.lookingFor;
  }

  _toggleGender(gender) {
    if (gender === this.props.userInfo.lookingFor.gender) return false;
    this.props.dispatchUpdateCriteria({
      criteria: 'gender',
      value: gender,
    });
  }

  render() {
    return (
      <View>
        <View style={{paddingLeft:10}}>
          <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
        </View>
        <View style={{alignItems:'center',marginTop:10}}>
          <Text style={styles.textColor}>What are you looking for?</Text>
        </View>
        <View style={[styles.buttonGroup,{paddingLeft:20,paddingRight:20}]}>

          <TouchableOpacity
            onPress={()=> this._toggleGender('Men')}
            style={[
              styles.selectButton,
              {marginLeft:15,height:45,borderColor:this._getActiveColor('Men'),borderWidth:1},
              ,borderRadius]}>
            <Text style={{ fontSize:16,lineHeight:33,color:this._getActiveColor('Men'),textAlign:'center',marginTop:10}}>
              Men
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> this._toggleGender('Women')}
            style={[
              styles.selectButton,
              {marginLeft:15,height:45,borderColor:this._getActiveColor('Women')},
              borderRadius]}>
              <Text style={{ fontSize:16,lineHeight:33,color:this._getActiveColor('Women'),textAlign:'center',marginTop:10}}>
                Women
              </Text>
          </TouchableOpacity>

        </View>
        <Text style={[{textAlign:'center',marginTop:30},styles.textColor]}>Aged:</Text>
        <View style={[styles.buttonGroup,{marginTop:15}]}>
          <TouchableOpacity onPress={()=> this.props.picker.toggle()} style={[{borderColor:'#595959',
            borderWidth:1,marginRight:15,height:45,width:74},borderRadius]}>
            <Text style={{lineHeight:33,color:'#696969',textAlign:'center',marginTop:10}}>
              {this._getAge().minAge}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.props.picker2.toggle()} style={[{borderColor:'#595959',
            borderWidth:1,marginLeft:15,height:45,width:74},borderRadius]}>
            <Text style={{lineHeight:33,color:'#696969',textAlign:'center',marginTop:10}}>
              {this._getAge().maxAge}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[{textAlign:'center',marginTop:30,marginBottom:15},styles.textColor]}>Located in:</Text>
        <TouchableOpacity style={styles.list} >
          <Text style={{color:'#595959'}}>Houston,TX</Text>
          <Image source={require('@images/Forward-32.png')} style={styles.forwardArrow}></Image>
        </TouchableOpacity>
        <View style={[{alignItems:'center',marginTop:20}]}>
          <TouchableOpacity style={[styles.button]} onPress={this._saveUserAppState}>
            <Text style={{fontSize: 16, color: '#fff',marginTop:10,textAlign:'center'}}>Next Step</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
          <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
          <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
          <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
          <Image source={require('@images/activePage.png')} style={{resizeMode:'contain'}}></Image>
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
  buttonGroup:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:30
  },
  selectButton:{
    borderColor:'#595959',
    borderWidth:1,
    flex:1
  },
  list:{
    flexDirection:'row',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#9E9E9E',
    padding:10,
    justifyContent:'space-between',
    alignItems:'center'
  },forwardArrow:{
    width:20,
    height:20
  }
})

const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUpdateCriteria: options => dispatch(updateLookingForCriteriaAction(options))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LookingFor);
