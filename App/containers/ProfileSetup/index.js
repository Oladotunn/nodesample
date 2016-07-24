/* @flow */

import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import Container from '@components/Container'

import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    transparentBg,
    primaryFont,
    secondaryFont,
    padding20,
    primaryFontColor,
    modalWhite,
    borderRadius
} from '@theme/colors'
import Dimensions from 'Dimensions';
import Button from 'react-native-button';
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
import AboutDetail from './aboutDetails'
import ThirdView from './whatDoYouLike'
import FourthView from './lookingFor'
import Picker from 'react-native-picker'
import _ from 'lodash';

let windowWidth = Dimensions.get('window').width;
class ProfileSetUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView:0,
      firstAge:18,
      secondAge:22,
      profilePictureObjects: [],
      removedPhotos: [],
      chosenPhotos: [],
      numberOfProfilePictures: 0,
    };
    this._getProfilePictureUrls = _.bind(this._getProfilePictureUrls, this);
    this._buildProfilePictureBoxes = _.bind(this._buildProfilePictureBoxes, this);
    this._getCoverPhoto = _.bind(this._getCoverPhoto, this);
    this._buildColumn = _.bind(this._buildColumn, this);
    this._getPlusElement = _.bind(this._getPlusElement, this);
    this._removeProfilePicture = _.bind(this._removeProfilePicture, this);
    this._addProfilePicture = _.bind(this._addProfilePicture, this);
    this._getSubProfilePictures = _.bind(this._getSubProfilePictures, this);
  }

  _removeProfilePicture(url) {
    const { chosenPhotos: oldChosenPhotos, removedPhotos: oldRemovedPhotos } = this.state;
    if (oldChosenPhotos.length === 1) return false;

    const chosenPhotos = _.filter(oldChosenPhotos, photo => photo.picture !== url);
    const removedPhotos = _.union(oldRemovedPhotos, [url]);
    this.setState({ chosenPhotos, removedPhotos });
  }

  _addProfilePicture() {
    const {
      profilePictureObjects,
      chosenPhotos: oldChosenPhotos,
      removedPhotos: oldRemovedPhotos
    } = this.state;
    const newPhotos = _.filter(profilePictureObjects, obj => {
      return !oldRemovedPhotos.includes(obj.picture) && !_.map(oldChosenPhotos, 'picture').includes(obj.picture)
    });
    if (newPhotos.length) {
      const chosenPhotos = _.union(oldChosenPhotos, [newPhotos[0]]);
      this.setState({
        chosenPhotos,
      });
    } else {
      const chosenPhotos = _.union(oldChosenPhotos, [oldRemovedPhotos[0]]);
      const removedPhotos = _.slice(oldRemovedPhotos, 1); 
      this.setState({
        chosenPhotos,
        removedPhotos,
      });
    }
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
    const { chosenPhotos } = this.state;
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
    const { userData } = this.props;
    const { id: profilePictureAlbumId } = userData.profilePictureAlbum;
    const { token } = userData.credentials;
    fetch(`https://graph.facebook.com/${profilePictureAlbumId}/photos?access_token=${token}&fields=picture`)
    .then(pictureData => pictureData.json())
    .then(pictureData => {
      const { data: profilePictureObjects } = pictureData;
      const chosenPhotos = _.take(profilePictureObjects, 5); 
      this.setState({
        profilePictureObjects,
        chosenPhotos,
        numberOfProfilePictures: profilePictureObjects.length
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  _buildProfilePictureBoxes() {
    const { chosenPhotos } = this.state;
    let useDefault = false;
    const profilePictures = [];
    const subProfilePictures = [];
    if (!chosenPhotos.length) useDefault = true;
    const uri = useDefault ? '@images/Cancel-50.png' : this.state.chosenPhotos[0].picture; 
    profilePictures.push(
      this._getCoverPhoto({ uri })
    );
    profilePictures.push(this._getSubProfilePictures());
    return profilePictures;
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
            <View style={modalWhite}>
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
                     <FourthView picker={this.picker} picker2={this.picker2} firstAge={this.state.firstAge} secondAge={this.state.secondAge}/>
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
               onPickerDone={(data)=> this.setState({firstAge:data[0]})}
               style={{
                 height: 300,
                 bottom: 0, position: 'absolute'
               }}
               showDuration={300}
               pickerData={[18,19,20,21,22,23,24,25,26,27,28,30]}
               selectedValue={this.state.firstAge}
             />
             <Picker
               pickerTitle="Select Age"
               pickerCancelBtnText="cancel"
               pickerBtnText="done"
               showMask={true}
               ref={picker2 => this.picker2 = picker2}
               onPickerDone={(data)=> this.setState({secondAge:data[0]})}
               style={{
                 height: 300,
                 bottom: 0, position: 'absolute'
               }}
               showDuration={300}
               pickerData={[18,19,20,21,22,23,24,25,26,27,28,30]}
               selectedValue={this.state.secondAge}
             />
           </Container>
      )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal1: {
        height: 400,
        backgroundColor: "#fff",
        borderRadius: 3,
        width: (windowWidth - 30)
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    wrapper: {
        flex: 1
    },
    textColor: {
        color: '#9E9E9E'
    },
    boxWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 120,
        marginTop: 20
    },
    boxBgColor: {
        backgroundColor: '#D8D8D8'
    },
    innerBoxWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    innerBox: {
        width: 56,
        height: 56
    },
    button: {
        height: 45,
        width: 115,
        backgroundColor: '#D80324',
        borderRadius: 4,
        borderColor: '#D80324',
        borderWidth: 1
    },
    cancelIcon: {
        width: 20,
        resizeMode: 'contain',
        position: 'absolute',
        right: -3,
        top: -22
    }
})

export default ProfileSetUp
