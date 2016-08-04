import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  NativeModules,
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {borderRadius} from '@theme/colors'
import { connect } from 'react-redux';
import EditProfileInputModal from './edit-profile-input-dialog';
import moment from 'moment';
import {
  updateUserEthnicityAction,
  updateUserReligionAction,
  updateUserTwitterAction,
} from '../../action-creators';
const { TwitterSignin } = NativeModules;

let topPadding = 64;
if(Platform.OS =='android'){
  topPadding = 54
}

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _getLargePic(picId) {
    const {token} = this.props.facebook.credentials;
    fetch(`https://graph.facebook.com/v2.7/${picId}/picture?redirect=false&access_token=${token}`)
    .then(data => data.json())
    .then( ({ data }) => {
      const oldState = this.state;
      oldState[picId] = data.url;
      this.setState({ ...oldState })
    })
    .catch(err => {
      console.log(`Error here: ${err}`)
    })
  }

  _saveToStore() {
    const {
      twitter,
      instagram,
      ethnicity,
      religion,
    } = this.state;

    if (twitter) this.props.dispatchUpdateTwitter(twitter);
    if (religion) this.props.dispatchUpdateReligion(religion);
    if (ethnicity) this.props.dispatchUpdateReligion(ethnicity);
  }

  _getInstagramHandle() {

  }

  _getTwitterHandle() {
    TwitterSignin.logIn(
      'fssXaegjxfYwUNlK070WUBejv',
      'TAXZncan8E2ISC6holmiHXOsepjSCFQLiD3dhnR4FzKix37QAJ',
      (error, loginData) => {
        if (!error) {
          this.setState({ twitter: loginData });
        } else {
          Alert.alert('Invalid login', 'Unable to login');
        }
    });
  }

  _storeEthnicity(event) {
    const { text: ethnicity } = event.nativeEvent;
    this.setState({ ethnicity });
    Actions.pop();
  }

  _storeReligion(event) {
    const { text: religion } = event.nativeEvent;
    this.setState({ religion });
    Actions.pop();
  }

  componentWillMount() {
    const { chosenPhotos } = this.props.profilePictures;
    _.forEach(chosenPhotos, photo => this._getLargePic(photo.id));
  }

  _renderProfilePictures() {
    const { chosenPhotos } = this.props.profilePictures;
    return _.map(chosenPhotos, photo => {
      return (
        <View key={photo.picture}>
          <Image source={{uri: this.state[photo.id] }}
            style={[{width: null, height: null,flex:1},styles.sliderImages]} />
        </View>
      );
    })
  }

  _getUserDetails() {
    const { name, birthday } = this.props.userInfo.bio;
    const age = moment().year() - moment(new Date(birthday)).year();
    return `${name}, ${age}`;
  }
  _getInterests() {
    const { chosenLikes } = this.props.userInfo.interests;
    return _.map(chosenLikes, like => {
      return (
        <Text key={like} style={[styles.fontColor]}>{like}</Text>
      );
    });
  }

  _getUserBio() {
    return this.props.userInfo.bio.text;
  }
  _getFlags() {
    const {flags} = this.props.userInfo;
    return _.map(flags, flag => {
      if (!flag.name) return null;
      const source = {uri: flag.picture};
      return (
        <Image key={flag.name} source={source} style={[styles.flag,borderRadius]}></Image>
      );
    });
  }
  render() {
    return (
      <ScrollView vertical={true} contentContainerStyle={{paddingTop:topPadding,paddingBottom:90}}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        <View style={{flex:3}}>
          <IndicatorViewPager
            style={{height:200,flex:1}}
            indicator={this._renderDotIndicator()}>
            {this._renderProfilePictures()}
          </IndicatorViewPager>
          <View style={{position:'absolute',bottom:30,left:20,backgroundColor:'transparent'}}>
            <Text style={{color:'#fff',fontSize:20}}>{this._getUserDetails()}</Text>
            <Text style={{color:'#fff',fontSize:20}}>Houston,TX</Text>
          </View>
          <View style={styles.countries}>
            {this._getFlags()}
          </View>
        </View>
        <View style={{flex:7}}>
          <View style={{paddingBottom:15,paddingTop:15,paddingLeft:15,paddingRight:15,backgroundColor:'#FFFFFF'}}>
            <Text style={[styles.fontColor]}>{this._getUserBio()}</Text>
          </View>
          <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}}>
            <TouchableOpacity
              onPress={this._getInstagramHandle}
              style={{
                flex:1,
                flexDirection:'row',
                paddingLeft:15,
                paddingBottom:15,paddingTop:15,borderRightWidth:1,borderColor:'#eee'}}>
              <Image source={require('@images/Instagram-Filled-50.png')}
                style={{width:20,height:20,marginRight:10}}></Image>
              <Text style={[styles.fontColor,styles.editLink]}>Add Account</Text>
            </TouchableOpacity>
            <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15}}>
              <Image source={require('@images/Twitter-Filled-50.png')} style={{width:20,height:20,marginRight:10}}>
              </Image>
              <Text onPress={this._getTwitterHandle} style={[styles.fontColor,styles.editLink]}>
                Add Account
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text>ETHNICITY</Text>
              <Text style={[styles.fontColor,styles.editLink]}
                onPress={() => Actions.customModal({ 
                  component: () => <EditProfileInputModal placeholder='Ethnicity'
                    saveAction={this._storeEthnicity} />
                  })}>
                  Edit ethnicity
                </Text>
              </View>
            <View style={styles.listItem}>
              <Text>EDUCATION</Text>
              <Text style={[styles.fontColor]}>Howard University</Text>
            </View>
            <View style={styles.listItem}>
              <Text>OCCUPATION</Text>
              <Text style={[styles.fontColor]}>CEO</Text>
            </View>
            <View style={styles.listItem}>
              <Text>RELIGION</Text>
              <Text style={[styles.fontColor,styles.editLink]}
                onPress={() => Actions.customModal({ 
                  component: () => <EditProfileInputModal placeholder='Ethnicity'
                    saveAction={this._storeReligion} />
                  })}
                >
                  Edit religion
                </Text>
            </View>
            <View style={styles.listItem}>
              <Text>INTERESTS</Text>
              {this._getInterests()}
            </View>
            <View style={styles.listItem}>
              <Text>On Saturday you can find me...</Text>
              <Text style={[styles.fontColor,styles.editLink]}>Answer this question</Text>
            </View>
            <View style={styles.listItem}>
              <Text>If I had to eat the same thing for every meal...</Text>
              <Text style={[styles.fontColor,styles.editLink]}>Answer this question</Text>
            </View>
            <View>
              <Text>If i could do one thing in life again...</Text>
              <Text style={[styles.fontColor,styles.editLink]}>Answer this question</Text>
            </View>
          </View>
        </View>
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
  },
  editLink:{
    color:'#db203c'
  }
});
const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUpdateEthnicity: ethnicity => dispatch(updateUserEthnicityAction(ethnicity)),
    dispatchUpdateReligion: religion => dispatch(updateUserReligionAction(religion)),
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfilePage);
