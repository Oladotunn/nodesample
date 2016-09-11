import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppStore from '../../app-store';
import moment from 'moment';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAppState: AppStore.getState(),
      conversations: [],
      otherUsers: [],
    }
    this._renderNewMatches = _.bind(this._renderNewMatches, this);
  }

  componentWillMount() {
    this._getConversationsForUser();
  }

  _getConversationsForUser() {
    const { userAppState } = this.state;
    const { userId } = userAppState.facebook.credentials;       
    fetch(`${userAppState.appConfig.server}/getConversationsForUser/${userId}`)
    .then(res => res.json())
    .then(({ conversations }) => {
      this.setState({ conversations });

      return Promise.all(
        _.map(conversations, conversation => {
          const otherUser = _.without(conversation.members, userId)[0];
          return fetch(`${userAppState.appConfig.server}/getUserDetails/${otherUser}`)
          .then(userDetails => userDetails.json())
        })
      );
    })
    .then(otherUsers => {
      this.setState({ otherUsers })
    })
    .catch(err => {
      console.log(err);
    })
  }

  _getRandomHexColor() {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);;
  }

  _getNewMatches() {
    return _.filter(this.state.conversations , conversation => {
      return !conversation.messages.length;
    })
  }

  _renderConversationBlock({ conversation }) {
    const { userAppState, otherUsers } = this.state;
    if (!otherUsers.length) return null;

    const { userId } = userAppState.facebook.credentials;       
    const otherUserId = _.without(conversation.members, userId)[0];
    const otherUserDetails = _.find(otherUsers, otherUserObject => {
      return otherUserObject.userAppState.facebook.credentials.userId === otherUserId; 
    })

    const {
      userInfo,
      profilePictures,
    } = otherUserDetails.userAppState;
    const lastMessageIndex = conversation.messages.length - 1;
    const lastMessage = conversation.messages[lastMessageIndex];
    return (
      <TouchableOpacity
        key={conversation.conversationId}
        onPress={()=> Actions.singleChat({
          title: userInfo.bio.name,
          rightButtonImage: {uri:profilePictures.chosenPhotos[0].picture},
          otherUser: otherUserId
        })}>
        <View style={[{backgroundColor: this._getRandomHexColor()},styles.listItem]}>
          <Image 
            style={{flex:0.5}}
            source={{ uri: profilePictures.chosenPhotos[0].picture }}
          >
        </Image>
          <View style={{flex:9.5,paddingLeft:15,paddingTop:5,paddingBottom:5,paddingRight:5,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>
                {userInfo.bio.name}
              </Text>
              <Text>{moment(lastMessage.timestamp).format('hh:mmA')}</Text>
            </View>
            <Text style={[styles.messageFontColor,{marginTop:5}]}>
              {lastMessage._text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderConversations() {
    const conversations = _.map(this.state.conversations , conversation => {
      if (conversation.messages.length) return this._renderConversationBlock({ conversation });
      return null;
    });

    const isConversationsEmpty = !this.state.conversations.length;
    const newMatches = this._getNewMatches();
    const hasStartedAtLeastOneConversation = _.differenceBy(this.state.conversations, newMatches, 'conversationId').length; 
    if (isConversationsEmpty || !hasStartedAtLeastOneConversation ) {
      return (
        <Text style={[styles.titleFontColor, { marginLeft: 10 }]}>
          No Conversations
        </Text>
      )
    }

    return [
      <Text key='header' style={[styles.titleFontColor]}>Conversations</Text>,
      conversations
    ];
  }
  _renderNewMatches() {
    const newMatches = this._getNewMatches();
    if (!newMatches.length) return null;

    const { userAppState, otherUsers } = this.state;
    const { userId } = userAppState.facebook.credentials;       

    return [
      <Text key='newMatchHeader' style={[styles.titleFontColor]}>New Matches</Text>,
        <ScrollView key='newMatchScrollView' horizontal >
          {
            _.map(newMatches, newMatchConversation => {
              const otherUserId = _.without(newMatchConversation.members, userId)[0];
              const newMatch = _.find(otherUsers, otherUserObject => {
                return otherUserObject.userAppState.facebook.credentials.userId === otherUserId; 
              })

              if (!newMatch) return null;

              return(
                <TouchableOpacity
                  key={newMatch.userAppState.facebook.credentials.userId}
                  onPress={()=>Actions.singleChat({
                    otherUser: otherUserId,
                    title: newMatch.userAppState.userInfo.bio.name,
                    rightButtonImage: {uri: newMatch.userAppState.profilePictures.chosenPhotos[0].picture }
                  })}>
                  <Image
                    source={{ uri: newMatch.userAppState.profilePictures.chosenPhotos[0].picture }}
                    style={{
                      borderRadius: 35,
                      marginTop:17,
                      marginRight: 5,
                      marginBottom:50,
                      width: 75,
                      height: 75, 
                    }}>
                  </Image>
                </TouchableOpacity>
                );
            })
          }
        </ScrollView>
    ]; 
  }

  render() {
    return (
      <ScrollView style={{paddingTop:64}}>
        {/*new matches*/}
        <View style={{paddingTop:22,paddingBottom:12,paddingLeft:13,paddingRight:13}}>
          {this._renderNewMatches()}
        </View>

        {/* conversations list*/}
        <View style={{paddingBottom:50}}>
          { this._renderConversations() }
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  titleFontColor:{
    color:'#808080',
    fontSize:18
  },
  messageFontColor:{
    color:'#575757'
  },
  darkFonts:{
    color:'#676767'
  },
  listItem:{
    flexDirection:'row',justifyContent:'flex-start',borderTopWidth:1,borderColor:'#eee',flexWrap:'wrap',flex:1,paddingLeft:15,
  }
})
