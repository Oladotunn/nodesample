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
import _ from 'lodash';
import AppStore from '../../app-store';
import { connect } from 'react-redux';
import {
  updateFbReadyAction,
  updateFbCredsAction,
  updateUserBioAction,
  updateProfilePictureAlbumDetailsAction,
  hydrateUserAction,
  hydrateFbAction,
  hydrateProfilePicturesAction,
} from '../../action-creators';
const { FBLoginManager } = require('react-native-facebook-login');
const Spinner = require('react-native-spinkit');



import {transparentBg,primaryFont,secondaryFont,padding20,primaryFontColor} from '@theme/colors';
class LandingPage extends Component{
  constructor(props) {
    super(props);
    this._getUserPictures = _.bind(this._getUserPictures, this);
    this._loginWithFB = _.bind(this._loginWithFB, this);
    this._getActionComponent = _.bind(this._getActionComponent, this);
    this._hydrateUserAppState = _.bind(this._hydrateUserAppState, this);
    this.state = {
      ready: false,
    };
  }

  _getUserPictures(token) {
    fetch(`https://graph.facebook.com/v2.7/me/?access_token=${token}&fields=name,birthday,education,work,albums`)
    .then(data => data.json())
    .then(response => {
      const {
        name,
        birthday,
        education,
        work,
        albums,
      } = response;
      const profilePictureAlbum = _.find(albums.data, data => data.name === 'Profile Pictures');
      this.props.dispatchUpdateProfileAlbumDetails(profilePictureAlbum);
      this.props.dispatchUpdateUserBio({
        name,
        birthday,
        education,
        work,
      });
      Actions.profileSetup();
    })
    .catch(err => {
      console.log(`could not get Facebook photos: ${err}`);
    });
  }

  _loginWithFB() {
    this.setState({ ready: false });
    FBLoginManager.loginWithPermissions([
      'email',
      'user_friends',
      'user_education_history',
      'user_work_history',
      'user_religion_politics',
      'user_birthday'
    ], (error, data) => {
      if (!error) {
        this.props.dispatchUpdateFbCreds(data.credentials);
        this._getUserPictures(data.credentials.token);
      } else {
        console.log("Error (Facebook): ", data);
      }
    });
  }

  _getActionComponent() {
    if (!this.state.ready) {
      return (
        <Spinner
          size={50}
          style={
            {
              justifyContent:'center',
              alignSelf: 'center',
            }
          }
          type='CircleFlip'
          color='#FF0000'
        />
      ); 
    } 
    return (
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
        <Text
          style={[transparentBg,styles.whiteColor,primaryFont,{textAlign:'center'}]} >
          Connect With Facebook
        </Text>
      </TouchableOpacity>
    );
  }

  _hydrateUserAppState(facebook) {
    fetch(`${this.props.appConfig.server}/hydrateUserAppState/${facebook.credentials.userId}`)
    .then(data => data.json())
    .then(serverState => {
      // console.log(serverState);
      if (!serverState) {
        this.props.dispatchUpdateFbCreds(facebook.credentials);
        this._getUserPictures(facebook.credentials.token);
      } else {
        const { userAppState } = serverState;
        this.props.dispatchHydrateUser(userAppState.userInfo);
        this.props.dispatchHydrateFb(userAppState.facebook);
        this.props.dispatchHydrateProfilePictures(userAppState.profilePictures);
        _.delay(Actions.main, 5000);
      }
    })
    .catch(err => {
      console.log(`error: ${err}`);
    })
  }

  componentWillMount() {
    FBLoginManager.getCredentials((error, data) => {
      if (!error) {
        this._hydrateUserAppState(data);
      } else {
        this.setState({ ready: true });
      }
    });
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <StatusBar hidden/>
        <Image style={styles.bgImage} source={require('@images/splash.png')}>
          <View style={styles.content}>
            <View style={[styles.upperPart,styles.center]}>
              <Image source={require('@images/logo.png')} style={styles.logo}></Image>
              <Text style= {[transparentBg,secondaryFont,{marginTop:40},{color:'#fff'}]}>The dating app for people</Text>
              <Text style= {[transparentBg,secondaryFont,{color:'#fff'}]}>of all <Text style={[primaryFontColor]}>colors</Text> and <Text style={[primaryFontColor]}>cultures</Text>.</Text>
            </View>
            <View style={[styles.lowerPart,styles.center]}>
              { this._getActionComponent() }
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

const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchHydrateUser: userAppState => dispatch(hydrateUserAction(userAppState)),
    dispatchHydrateFb: userAppState => dispatch(hydrateFbAction(userAppState)),
    dispatchHydrateProfilePictures: userAppState => dispatch(hydrateProfilePicturesAction(userAppState)),
    dispatchUpdateFbCreds: creds => dispatch(updateFbCredsAction(creds)),
    dispatchUpdateProfileAlbumDetails: profileAlbum => {
      dispatch(updateProfilePictureAlbumDetailsAction(profileAlbum));
    }, 
    dispatchUpdateUserBio: userBio => dispatch(updateUserBioAction(userBio))
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
