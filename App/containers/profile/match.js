import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {borderRadius} from '@theme/colors'
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import AppStore from '../../app-store';
import _ from 'lodash';
const Spinner = require('react-native-spinkit');

let topPadding = 64;
if (Platform.OS =='android'){
  topPadding = 54
}

class MatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      matchCursor: null,
      potentialMatchIds: [],
      potentialMatchDetails: [],
    };
    this._getUserDetails = _.bind(this._getUserDetails, this);
    this._renderActiveElement = _.bind(this._renderActiveElement, this);
    this._getPotentialMatchesForUser = _.bind(this._getPotentialMatchesForUser, this);
  }

  componentWillMount() {
    this._getPotentialMatchesForUser();
  }

  _getPotentialMatchesForUser() {
    const userAppState = AppStore.getState();
    if (!userAppState) return false;

    fetch(`${userAppState.appConfig.server}/getMatchesFor/${userAppState.facebook.credentials.userId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userAppState)
    })
    .then(potentialMatchIds => this.setState({ potentialMatchIds: potentialMatchIds.json() }))
    .then(() => {
      _.forEach(this.state.potentialMatchIds, userId => {
        this._getUserDetails({ userId, userAppState });
      })
    })
    .catch(err => console.log(`Error getting potential matches: ${err}`))
  }

  _getUserDetails({ userId, userAppState }) {
    fetch(`${userAppState.appConfig.server}/getUserDetails/${userAppState.facebook.credentials.userId}`)
    .then(res => res.json())
    .then(userDetails => {
      const { potentialMatchDetails: oldMatches } = this.state;
      this.setState({
        potentialMatchDetails: [
          ...oldMatches,
          userDetails,
        ]
      });
    })
    .catch(err => console.log(`error : ${err}`))
  }

  _renderBannerImage() {
    return (
      <TouchableOpacity key='bannerImage' style={{flex:6}} onPress={()=> Actions.matchDetail()}>
        <Image source={{uri: 'http://static0.passel.co/wp-content/uploads/2016/07/08113512/2016-07-04-abigail-keenan-barnimages-005-1024x683-760x507.jpg'}}
          style={[{width: null, height: null,flex:1}]} >
          <View style={{position:'absolute',bottom:30,left:20,backgroundColor:'transparent'}}>
            <Text style={{color:'#fff',fontSize:20}}>Lisa, 27</Text>
            <Text style={{color:'#fff',fontSize:20}}>Houston,TX</Text>
          </View>
          <View style={styles.countries}>
            <Image source={require('@images/country/angola.png')} style={[styles.flag,borderRadius]}></Image>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }

  _renderUserBio() {
    return (
      <View style={{backgroundColor:'#FFFFFF',padding:15}}>
        <Text style={[styles.fontColor]}>Amateur model. Expert scientist</Text>
      </View>
    );
  }

  _renderMutualFriends() {
    return (
      <View style={[styles.list,{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}]}>
        <Text  style={[{lineHeight:25,marginRight:10},styles.fontColor]}>Mututal Friends:</Text>
        <Image source={require('@images/first.png')} style={{width:40,height:40,marginRight:10}}></Image>
        <Image source={require('@images/second.png')} style={{width:40,height:40,marginRight:10}}></Image>
        <Image source={require('@images/third.png')} style={{width:40,height:40,marginRight:10}}></Image>
        <Image source={require('@images/fourth.png')} style={{width:40,height:40,marginRight:10}}></Image>
        <Image source={require('@images/first.png')} style={{width:40,height:40,marginRight:10}}></Image>
      </View>
    );
  }

  _renderUserSocial() {
    return (
      <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}}>
        <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15,borderRightWidth:1,borderColor:'#eee'}}>
          <Image source={require('@images/Instagram-Filled-50.png')}
            style={{width:20,height:20,marginRight:10}}>
          </Image>
          <Text style={styles.fontColor}>@_LisaLisaLisa</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15}}>
          <Image source={require('@images/Twitter-Filled-50.png')} style={{width:20,height:20,marginRight:10}}>
          </Image>
          <Text style={styles.fontColor}>@_LisaSays</Text>
        </View>
      </View>
    );
  }

  _renderMatchAndPassButtons() {
    return (
      <View style={{paddingTop:12,paddingBottom:12,flexDirection:'row',justifyContent:'center',paddingLeft:30,paddingRight:30}}>
        <LinearGradient colors={['#E80438', '#D2021D']} style={[styles.linearGradient,{marginRight:15}]}>
          <Button
            containerStyle={{flex:1,backgroundColor:'transparent',paddingTop:12,paddingBottom:12}}
            style={[{fontSize: 21, color: '#fff',lineHeight:30}]}>
            PASS
          </Button>
        </LinearGradient>

        <LinearGradient colors={['#EAFFD8', '#E6FFD1']} style={[styles.linearGradient,{marginLeft:15}]}>
          <Button
            containerStyle={{backgroundColor:'transparent',paddingTop:12,paddingBottom:12}}
            style={[{fontSize: 21, color: '#333',lineHeight:30}]}>
            MATCH
          </Button>
        </LinearGradient>
      </View>
    );
  }

  _renderActiveElement() {
    const { potentialMatchDetails } = this.state;

    if (!potentialMatchDetails.length) {
      return [
        this._renderBannerImage(),
        <View key='summaryDetails' style={{flex:4,paddingBottom:160}}>
          { this._renderUserBio() }
          { this._renderMutualFriends() }
          { this._renderUserSocial() }
          { this._renderMatchAndPassButtons() }
        </View>
      ]
    } else {
      return (
        <View style={
          { flex: 1}
        }>
        <Spinner
          size={100}
          style={
            {
              justifyContent:'center',
              alignSelf: 'center',
            }
          }
          type='CircleFlip'
          color='#FF0000'
        />
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView vertical={true} contentContainerStyle={{paddingTop:topPadding,flexDirection:'column',flex:1}}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        { this._renderActiveElement() }
      </ScrollView>

    )
  }
  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={4}
        dotStyle={{backgroundColor:'#E6DFDE',marginRight:15}}
        selectedDotStyle={{backgroundColor:'#D0021B',marginRight:15}}
        containerStyle={{position:'absolute',bottom:10}}

      />
    );
  }
}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
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
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchHydrateUser: userAppState => dispatch(hydrateUserAction(userAppState)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPage);
