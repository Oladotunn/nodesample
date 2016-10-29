/* @flow */

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import Container from '@components/Container';
import {
  View,
  Alert,
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
  updateUserLocationAction,
  updateFbReadyAction,
  updateFbCredsAction,
  updateUserBioAction,
  updateProfilePictureAlbumDetailsAction,
  hydrateUserAction,
  hydrateFbAction,
  hydrateProfilePicturesAction,
} from '../../action-creators';
import moment from 'moment';
import {transparentBg,primaryFont,secondaryFont,padding20,primaryFontColor} from '@theme/colors';
import { FBLoginManager } from 'react-native-facebook-login';
const Spinner = require('react-native-spinkit');



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
    fetch(`https://graph.facebook.com/v2.7/me/?access_token=${token}&fields=name,gender,birthday,education,work,albums`)
    .then(data => data.json())
    .then(response => {
      const {
        name,
        birthday,
        education,
        work,
        albums,
        gender,
      } = response;
      const profilePictureAlbum = _.find(albums.data, data => data.name === 'Profile Pictures');
      this.props.dispatchUpdateProfileAlbumDetails(profilePictureAlbum);
      this.props.dispatchUpdateUserBio({
        name,
        education,
        work,
        gender,
        birthday: moment(new Date(birthday)).toISOString(),
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
        this._hydrateUserAppState(data);
      } else {
        console.log("Error (Facebook): ", error);
        // Alert.alert(
        //   'Error',
        //   error,
        //   [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ]
        // );
        this.setState({ ready: false });
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
    console.log('got user state');
    console.log(`url is: ${this.props.appConfig.server}/hydrateUserAppState/${facebook.credentials.userId}`);
    fetch(`${this.props.appConfig.server}/hydrateUserAppState/${facebook.credentials.userId}`)
    .then(data => data.json())
    .then(serverState => {
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
      console.log('error from serverState');
      console.log(err);
      Alert.alert(
        'Error',
        err,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
      this.setState({ ready: false });
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
    this.getUserLocation();
  }

  getUserLocation() {
    const onError = error => {
      console.log('Printing out Error');
      alert(JSON.stringify(error));
    }
    const onSuccess = position => {
      const { longitude: long, latitude: lat } = position.coords;
      const key = 'AIzaSyCME0Djvh-kJRAOk9fArpF_ubt_fWX4Dbg';
      const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&components=locality&key=${key}`;

      fetch(`${reverseGeocodingUrl}`)
      .then(data => data.json())
      .then(res => {
        const { results } = res;
        const cityObj = _.find(results[0].address_components, component => {
          return component.types.includes('locality') && component.types.includes('political');
        });
        const { long_name: city } = cityObj;
        const userLocation = { city, lat, long };

        this.props.dispatchUpdateUserLocation(userLocation);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          err,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        );
        this.setState({ ready: false });
      });
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }
    navigator.geolocation.getCurrentPosition(onSuccess,onError,options);
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <StatusBar hidden/>
        <Image style={styles.bgImage} source={require('@images/splash.png')}>
          <View style={styles.content}>
            <View style={[styles.upperPart,styles.center]}>
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
    // backgroundColor:'#000'
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
    dispatchUpdateUserBio: userBio => dispatch(updateUserBioAction(userBio)),
    dispatchUpdateUserLocation: userLocation => dispatch(updateUserLocationAction(userLocation))
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
