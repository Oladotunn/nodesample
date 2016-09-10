import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {borderRadius} from '@theme/colors'
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import ProfilePage from './profilePage';
let topPadding;
if(Platform.OS =='android'){
  topPadding = 54
}else{
  topPadding=64
}
class SingleMatch extends Component {
  render() {
    return <ProfilePage isForMatching userForMatching={this.props.userForMatching} />
  }

}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  sliderImages:{
    flex:1,

    resizeMode:'stretch'
  },
  countries:{
    position:'absolute',
    bottom:15,
    right:0,
    flexDirection:'row'
  },
  flag:{
    width:40,
    height:30,
    marginRight:5,
    overflow:'hidden'
  },
  fontColor:{
    color:'#656565'
  },
  list:{
    padding:15
  },
  listItem:{
    marginBottom:15
  }
});
export default SingleMatch
