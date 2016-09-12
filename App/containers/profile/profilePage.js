import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {borderRadius} from '@theme/colors';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import AppStore from '../../app-store';
import getLargeFacebookPhoto from '../../helpers/facebook/getLargePhoto';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

let topPadding = 64;
if(Platform.OS =='android'){
  topPadding = 54
}

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this._getLargePic = _.bind(this._getLargePic, this);
    this._getActiveUser = _.bind(this._getActiveUser, this);
    this._matchActiveUser = _.bind(this._matchActiveUser, this);
    this._passActiveUser = _.bind(this._passActiveUser, this);
    this._getMutualFriends = _.bind(this._getMutualFriends, this);
    this.state = {
    };
  }
  _getLargePic({ data, picId }) {
    const oldState = this.state;
    oldState[picId] = data.url;
    this.setState({ ...oldState })
  }

  componentWillMount() {
    const { chosenPhotos } = this._getActiveUser().profilePictures;
    const {token} = this._getActiveUser().facebook.credentials;
    const callback = this._getLargePic;

    _.forEach(chosenPhotos, photo => {
      const { id: picId } = photo;
      getLargeFacebookPhoto({ picId, token, callback });
    });

    if (this.props.isForMatching) {
      const { userId, token } = this.props.userForMatching.facebook.credentials;
      this._getMutualFriends({ userId, token });
    }
  }

  _renderProfilePictures() {
    const { chosenPhotos } = this._getActiveUser().profilePictures;
    return _.map(chosenPhotos, photo => {
      return (
        <View key={photo.picture}>
          <Image source={{uri: this.state[photo.id] }}
            style={[{width: null, height: null,flex:1},styles.sliderImages]} />
        </View>
      );
    })
  }

  _getTwitterHandle() {
    const { twitter } = this._getActiveUser().userInfo;
    if (!twitter) return 'Add Account';

    return `@${twitter.userName}`;
  }

  _getInstagramHandle() {
    const { instagram } = this._getActiveUser().userInfo;
    if (!instagram) return 'Add Account';

    return `@${instagram.username}`;
  }

  _getEthnicity() {
    const { ethnicity } = this._getActiveUser().userInfo;
    if (!ethnicity) return 'Add Ethnicity';

    return ethnicity;
  }

  _getWork() {
    const { work } = this._getActiveUser().userInfo;
    if (!work) return 'N/A';
    return 'placeholder';

    // return work;
  }

  _getReligion() {
    const { religion } = this._getActiveUser().userInfo;
    if (!religion) return 'Add Religion';

    return religion;
  }

  _getEducation() {
    const { education } = this._getActiveUser().userInfo.bio;
    if (!education) return 'N/A';
    const mostRecent = _.orderBy(education, entry => {
      if (entry.year) return parseInt(entry.year.name);
      return 0;
    },'desc')[0];

    return mostRecent.school.name;
  }

  _getUserDetails() {
    const { name, birthday } = this._getActiveUser().userInfo.bio;
    const age = moment().year() - moment(new Date(birthday)).year();
    return `${name}, ${age}`;
  }

  _getInterests() {
    const { chosenLikes } = this._getActiveUser().userInfo.interests;
    return _.map(chosenLikes, like => {
      return (
        <Text key={like} style={[styles.fontColor]}>{like}</Text>
      );
    });
  }

  _getUserBio() {
    return this._getActiveUser().userInfo.bio.text;
  }

  _getActiveUser() {
    if (this.props.isForMatching && this.props.userForMatching) this.props;

    return this.props.isForMatching ? this.props.userForMatching : this.props;
  }

  _getFlags() {
    const {flags} = this._getActiveUser().userInfo;
    return _.map(flags, flag => {
      if (!flag.name) return null;
      const source = {uri: flag.picture};
      return (
        <Image key={flag.name} source={source} style={[styles.flag,borderRadius]}></Image>
      );
    });
  }

  _getMutualFriends({ userId, token }) {
    fetch(`https://graph.facebook.com/v2.7/${userId}/?access_token=${token}&fields=context.fields%28mutual_friends.fields%28name,picture%29%29`)
    .then(response => response.json())
    .then(data => {
      const { data: mutual_friends } = data.context.mutual_friends;
      this.setState({ mutual_friends });
    })
    .catch(err => {
      console.log(`error mutual_friends: ${err}`)
    })
  }

  _renderQuestions() {
    const {questions} = this._getActiveUser().userInfo;
    return _.map(questions, questionObj => {
      return (
        <View key={questionObj.question} style={styles.listItem}>
          <Text>{questionObj.question}</Text>
          <Text style={[styles.fontColor]}>
            {questionObj.answer || 'Answer this question'}
          </Text>
        </View>
      )
    })
  }

  _renderMutualFriends() {
    const activeUser = this._getActiveUser();
    const { userId: activeUserId, token } = activeUser.facebook.credentials;
    const { mutual_friends } = this.state;

    if (!this.isForMatching) return false;
    if (mutual_friends && !mutual_friends.length) return false;


    return (
      <View style={[styles.list,{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}]}>
        <Text  style={[{lineHeight:25,marginRight:10},styles.fontColor]}>Mututal Friends:</Text>
        {
          _.map(mutual_friends, friend => {
            return (
              <Image key={friend.name} source={{ uri: friend.picture.data.url }}
                style={{width:40,height:40,marginRight:10}}>
              </Image>
              )
          })
        }
      </View>
    );
  }

  _matchActiveUser() {
    const activeUser = this._getActiveUser();
    const userAppState = AppStore.getState();
    const { userId: appUserId } = userAppState.facebook.credentials;
    fetch(`${userAppState.appConfig.server}/userxWantsToMatchUserY/${appUserId}/${activeUser.appUserId}`)
    Actions.matchPreview({ overrideAndPopPotentialUsers: true });
    Actions.pop({
      refresh: {
        overrideAndPopPotentialUsers: true
      }
    });
  }

  _passActiveUser() {
    Actions.pop({
      refresh: {
        overrideAndPopPotentialUsers: true
      }
    });
  }

  _renderMatchAndPassButtons() {
    if (!this.props.isForMatching) return false;

    const activeUser = this._getActiveUser();
    return (
      <View style={{paddingTop:12,paddingBottom:12,flexDirection:'row',justifyContent:'center',paddingLeft:30,paddingRight:30}}>
        <LinearGradient colors={['#E80438', '#D2021D']} style={[styles.linearGradient,{marginRight:15}]}>
          <Button
            onPress={this._passActiveUser}
            containerStyle={{flex:1,backgroundColor:'transparent',paddingTop:12,paddingBottom:12}}
            style={[{fontSize: 21, color: '#fff',lineHeight:30}]}>
            PASS
          </Button>
        </LinearGradient>

        <LinearGradient colors={['#EAFFD8', '#E6FFD1']} style={[styles.linearGradient,{marginLeft:15}]}>
          <Button
            onPress={this._matchActiveUser}
            containerStyle={{backgroundColor:'transparent',paddingTop:12,paddingBottom:12}}
            style={[{fontSize: 21, color: '#333',lineHeight:30}]}>
            MATCH
          </Button>
        </LinearGradient>
      </View>
    );
  }

  render() {
    return (
      <ScrollView vertical={true} contentContainerStyle={{paddingTop:topPadding}}>
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
        <View style={{flex:7,paddingBottom:100}}>
          <View style={[{paddingBottom:15,paddingTop:15,paddingLeft:15,paddingRight:15}]}>
            <Text style={[{backgroundColor:'#FFFFFF'},styles.fontColor]}>
              {this._getUserBio()}
          </Text>
        </View>
        {this._renderMutualFriends()}
          <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#eee',flexDirection:'row'}}>
            <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15,borderRightWidth:1,borderColor:'#eee'}}>
              <Image source={require('@images/Instagram-Filled-50.png')}
                style={{width:20,height:20,marginRight:10}}>
              </Image>
              <Text style={styles.fontColor}>{this._getInstagramHandle()}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row',paddingLeft:15,paddingBottom:15,paddingTop:15}}>
              <Image source={require('@images/Twitter-Filled-50.png')} style={{width:20,height:20,marginRight:10}}>
              </Image>
              <Text style={styles.fontColor}>
                {this._getTwitterHandle()}
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text>ETHNICITY</Text>
              <Text style={[styles.fontColor]}>{this._getEthnicity()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>EDUCATION</Text>
              <Text style={[styles.fontColor]}>{this._getEducation()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>OCCUPATION</Text>
              <Text style={[styles.fontColor]}>{this._getWork()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>RELIGION</Text>
              <Text style={[styles.fontColor]}>{this._getReligion()}</Text>
            </View>
            <View style={styles.listItem}>
              <Text>INTERESTS</Text>
              {this._getInterests()}
            </View>
            { this._renderQuestions()}
          </View>
          {this._renderMatchAndPassButtons()}
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
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
