import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ScrollView,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import _ from 'lodash';

let topPadding = 64
let bottomPadding = 50

if(Platform.OS =='android'){
  topPadding = 54
  bottomPadding = 100
}
const { FBLoginManager } = require('react-native-facebook-login');

class Settings extends Component {
  _logout() {
    FBLoginManager.logout(() => {
      Actions.landingPage();
    });
  }

  _getGender() {
    const { gender } = this.props.userInfo.bio;
    if (!gender) return 'N/A';
    return _.capitalize(gender);
  }

  _getAgePreference() {
    const { lookingFor } = this.props.userInfo;
    return `${lookingFor.minAge} to ${lookingFor.maxAge}`;
  }

  _getGenderPreference() {
    const { lookingFor } = this.props.userInfo;
    return `${lookingFor.gender}`;
  }

  _getUserLocation() {
    return this.props.userInfo.bio.location.city;
  }

  render() {
    return (
      <ScrollView style={{paddingTop:topPadding}}>
        {/*main section*/}
        <View style={{paddingBottom:bottomPadding}}>
          <View style={[styles.title]}><Text>Preferences</Text></View>
          <View style={[styles.listItem]}>
            <Text>I am a</Text>
            <Text style={{color:'#d91434'}}>{this._getGender()}</Text>
          </View>
          <View style={[styles.listItem]}>
            <Text>Interested in</Text>
            <Text style={{color:'#d91434'}}>{this._getGenderPreference()}</Text>
          </View>
          <View style={[styles.listItem]}>
            <Text>Located in</Text>
            <Text style={{color:'#d91434'}}>{this._getUserLocation()}</Text>
          </View>
          <View style={[styles.listItem]}>
            <Text>Search Radius</Text>
            <Text style={{color:'#d91434'}}>10 miles</Text>
          </View>
          <View style={[styles.listItem]}>
            <Text>Aged</Text>
            <Text style={{color:'#d91434'}}>{this._getAgePreference()}</Text>
          </View>
          <View style={[styles.borderTop]}>
            <View style={[styles.title]}><Text>Notifications</Text></View></View>
          <View style={[styles.listItem]}>
            <Text>Push Notifications</Text>
            <Text style={{color:'#d91434'}}>On</Text>
          </View>
          <View style={[styles.listItem]}>
            <Text>App Sounds</Text>
            <Text style={{color:'#d91434'}}>On</Text>
          </View>

          <View style={[styles.borderTop]}>
            <View style={[styles.title]}><Text >Profile</Text></View></View>
          <View style={[styles.listItem]}>
            <Text>Account Type</Text>
            <Text style={{color:'#d91434'}}>PRO</Text>
          </View>
          <View style={[styles.listItem,{borderBottomWidth:1}]}>
            <Text>Visibility</Text>
            <Text style={{color:'#d91434'}}>Public</Text>
          </View>
          <View style={{paddingTop:15,paddingBottom:20,backgroundColor:'#f4f4f4'}}>
            <LinearGradient colors={['#E80438', '#D2021D']} style={[styles.linearGradient]}>
              <Button
                onPress={this._logout}
                containerStyle={{flex:1,backgroundColor:'transparent',paddingTop:10,paddingBottom:10,borderRadius:0}}
                style={[{fontSize: 15, color: '#fff',lineHeight:20}]}>
                LOGOUT
              </Button>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  title:{
    paddingTop:15,
    paddingLeft:15,
    paddingBottom:10,
    backgroundColor:'#f4f4f4'

  },
  listItem:{
    padding:15,
    borderTopWidth:1,
    borderColor:'#d1d1d1',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  borderTop:{
    borderTopWidth:1,
    borderColor:'#d1d1d1',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }

})

const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
