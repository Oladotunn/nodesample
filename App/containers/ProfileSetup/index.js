/* @flow */

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Container from '@components/Container';

import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  transparentBg,
  primaryFont,
  secondaryFont,
  padding20,
  primaryFontColor,
  modalWhite,
  borderRadius
} from '@theme/colors';
import Dimensions from 'Dimensions';
import Button from 'react-native-button';
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
import AboutDetail from './aboutDetails'
import ThirdView from './whatDoYouLike'
import LookingFor from './lookingFor'
import Picker from 'react-native-picker'
import styles from './styles';
import _ from 'lodash';
import AppStore from '../../app-store';
import { connect } from 'react-redux';
import {
  initProfilePictureAction,
  addProfilePictureAction,
  deleteProfilePictureAction,
  updateLookingForCriteriaAction,
} from '../../action-creators';

let windowWidth = Dimensions.get('window').width;
class ProfileSetUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView:0,
      firstAge:18,
      secondAge:22,
    };
    this._getProfilePictureUrls = _.bind(this._getProfilePictureUrls, this);
    this._buildProfilePictureBoxes = _.bind(this._buildProfilePictureBoxes, this);
    this._getCoverPhoto = _.bind(this._getCoverPhoto, this);
    this._buildColumn = _.bind(this._buildColumn, this);
    this._getPlusElement = _.bind(this._getPlusElement, this);
    this._updateAge = _.bind(this._updateAge, this);
    this._removeProfilePicture = _.bind(this._removeProfilePicture, this);
    this._addProfilePicture = _.bind(this._addProfilePicture, this);
    this._getSubProfilePictures = _.bind(this._getSubProfilePictures, this);
  }

  _removeProfilePicture(url) {
    this.props.dispatchDeleteProfilePicture(url);
  }

  _addProfilePicture() {
    this.props.dispatchAddProfilePicture();
  }

  _updateAge(key, age) {
    const { lookingFor } = this.props.userInfo;
    if (key === 'minAge' && age > lookingFor.maxAge) return false;
    if (key === 'maxAge' && age < lookingFor.minAge) return false;

    this.props.dispatchUpdateCriteria({
      criteria: key,
      value: age,
    });
  }

  _getCoverPhoto(source) {
    return (
      <View style={{position:'relative'}} key='coverPhoto'>
        <View
          style={[{flex:1},
            styles.boxBgColor,{width:118},borderRadius,{borderWidth:1},{borderColor:'#979797'}]}
          >
            <Image source={source}
              style={[{flex:1},
                styles.boxBgColor,{width:118},borderRadius,{borderWidth:1},{borderColor:'#979797'}]}
                resizeMode="contain">
              </Image>
            </View>
            <TouchableOpacity
              style={[{ position: 'absolute', top: 0, right: 0 }]} 
              onPress={() => this._removeProfilePicture(source.uri)}>
              <Image source={require('@images/Cancel-50.png')} style={styles.cancelIcon}>
              </Image>
            </TouchableOpacity>
          </View>
    );
  }

  _getSubProfilePictures() {
    const { chosenPhotos } = this.props.profilePictures;
    const subPhotos = _.tail(chosenPhotos);
    const numOfCols = _.ceil(subPhotos.length + 1 / 2) < 2 ? 1 : 2; 
    const cols = [];
    _.times(numOfCols, col => {
      const photos = _.take(_.slice(subPhotos, col * 2), 2);
      const photoLinks = _.map(photos, 'picture');
      cols.push(this._buildColumn(photoLinks, col + 1));
    });
    return cols;
  }

  _getPlusElement() {
    return (
      <View
        key='plusElement'
        style={[styles.innerBox,borderRadius,{borderWidth:1},{borderColor:'#D50321'},{justifyContent:'center'},{alignItems:'center'}]}>
        <TouchableOpacity onPress={this._addProfilePicture}>
          <Image source={require('@images/plus.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }

  _buildColumn(photos, columnNum) {
    const children = [];
    _.times(photos.length, index => {
      children.push(
        <View key={`${index} - child`}>
          <View
            style={[styles.innerBox,styles.boxBgColor,borderRadius,{borderWidth:1},{borderColor:'#979797'}]}
          >
            <Image
              style={[styles.innerBox,styles.boxBgColor,borderRadius,{borderWidth:1},{borderColor:'#979797'}]}
              source={{ uri: photos[index] }} >
            </Image>
          </View>
          <TouchableOpacity onPress={() => this._removeProfilePicture(photos[index])}
            style={[{ position: 'absolute', top: 0, right: 0 }]} 
          >
          <Image source={{ uri: photos[index] }}
            source={require('@images/Cancel-50.png')}
            style={styles.cancelIcon}>
          </Image>
        </TouchableOpacity>
        </View>
      );
    });

    if (photos.length < 2  || (photos.length < 2) && (columnNum === 2)) children.push(this._getPlusElement());
    return (
      <View style={styles.innerBoxWrapper}>
        {children}
      </View>
    );
  }

  _getProfilePictureUrls() {
    const { profilePictureAlbumDetails } = this.props.profilePictures;
    const { id: profilePictureAlbumId } = profilePictureAlbumDetails;
    const { token } = this.props.facebook.credentials;
    fetch(`https://graph.facebook.com/${profilePictureAlbumId}/photos?access_token=${token}&fields=picture`)
    .then(pictureData => pictureData.json())
    .then(pictureData => {
      const { data: profilePictureObjects } = pictureData;
      this.props.dispatchInitProfilePictures(profilePictureObjects);
    })
    .catch(err => {
      console.log(err);
    });
  }

  _buildProfilePictureBoxes() {
    const { chosenPhotos } = this.props.profilePictures;
    let useDefault = false;
    const profilePictureElements = [];
    const subProfilePictures = [];
    if (!chosenPhotos.length) useDefault = true;
    const uri = useDefault ? '@images/Cancel-50.png' : chosenPhotos[0].picture; 
    profilePictureElements.push(
      this._getCoverPhoto({ uri })
    );
    profilePictureElements.push(this._getSubProfilePictures());
    return profilePictureElements;
  }

  componentWillMount() {
    this._getProfilePictureUrls();
  }

  secondViewNext(){
    this.setState({
      currentView:2
    });
  }

  thirdViewNext(){
    this.setState({
      currentView:3
    });
  }
    render() {
      const profilePictures = this._buildProfilePictureBoxes();
      return (
        <Container>
          <View style={styles.container}>
            <View style={[modalWhite]}>
              <SwipeableViews index={this.state.currentView} onChangeIndex={(index,fromIndex)=> this.setState({currentView:index})}>
                <View style={styles.wrapper}>
                  <View style={{alignItems:'center'}}>
                    <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
                  </View>
                  <View style={{alignItems:'center',marginTop:20}}>
                    <Text style={styles.textColor}>Let's start by setting up your profile s</Text>
                    <Text style={[{marginTop:20},styles.textColor]}>We pulled a few pictures from
                      your</Text>
                    <Text style={styles.textColor}>Facebook page. When you're happy with</Text>
                    <Text style={styles.textColor}>your set, click next.</Text>
                  </View>
                  <View style={styles.boxWrapper}>
                    { profilePictures }
                  </View>
                  <View style={[{alignItems:'center',marginTop:20}]}>
                    <TouchableOpacity style={[styles.button]} onPress={()=>this.setState({currentView:1})}>
                      <Text style={{fontSize: 16, color: '#fff',marginTop:10,textAlign:'center'}}>Next Step</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
                       <Image source={require('@images/activePage.png')}
                         style={{resizeMode:'contain',marginRight:10}}></Image>
                       <Image source={require('@images/pager.png')}
                         style={{resizeMode:'contain',marginRight:10}}></Image>
                       <Image source={require('@images/pager.png')}
                         style={{resizeMode:'contain',marginRight:10}}></Image>
                       <Image source={require('@images/pager.png')} style={{resizeMode:'contain'}}></Image>
                     </View>
                   </View>
                   <View>
                     <AboutDetail callbackParent={this.secondViewNext.bind(this)}/>
                   </View>
                   <View>
                     <ThirdView callbackParent={this.thirdViewNext.bind(this)}/>
                   </View>
                   <View>
                     <LookingFor picker={this.picker} picker2={this.picker2} />
                   </View>
                 </SwipeableViews>
               </View>
             </View>
             <Picker
               pickerTitle="Select Age"
               pickerCancelBtnText="cancel"
               pickerBtnText="done"
               showMask={true}
               ref={picker => this.picker = picker}
               onPickerDone={data => this._updateAge('minAge', data[0])}
               style={{
                 height: 300,
                 bottom: 0, position: 'absolute'
               }}
               showDuration={300}
               pickerData={[18,19,20,21,22,23,24,25,26,27,28,30]}
               selectedValue={this.props.userInfo.lookingFor.minAge}
             />
             <Picker
               pickerTitle="Select Age"
               pickerCancelBtnText="cancel"
               pickerBtnText="done"
               showMask={true}
               ref={picker2 => this.picker2 = picker2}
               onPickerDone={data => this._updateAge('maxAge', data[0])}
               style={{
                 height: 300,
                 bottom: 0, position: 'absolute'
               }}
               showDuration={300}
               pickerData={[18,19,20,21,22,23,24,25,26,27,28,30]}
               selectedValue={this.props.userInfo.lookingFor.maxAge}
             />
           </Container>
      )
    }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchAddProfilePicture: () => dispatch(addProfilePictureAction()),
    dispatchInitProfilePictures: profilePictures => dispatch(initProfilePictureAction(profilePictures)),
    dispatchDeleteProfilePicture: url => dispatch(deleteProfilePictureAction(url)),
    dispatchUpdateCriteria: options => dispatch(updateLookingForCriteriaAction(options))
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSetUp);
