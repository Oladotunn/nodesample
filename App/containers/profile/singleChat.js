import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ScrollView,TextInput,Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import AppStore from '../../app-store';
import { ws } from '../../app-reducers';
import { connect } from 'react-redux';
let topPadding = 64;
if (Platform.OS =='android'){
  topPadding = 54
}

class SingleChat extends Component {
  constructor(props) {
    super(props);
    this._sendMessage = _.bind(this._sendMessage, this);
    this._subscribeToConversationUpdates = _.bind(this._subscribeToConversationUpdates, this);
    this.state = {
      userAppState: AppStore.getState(),
      currentMessage: '',
      conversation: {
        iceBreakQuestion: '',
      }
    } 
  }

  componentWillMount() {
    this._fetchMessages();
  }

  _fetchMessages() {
    const { userAppState } = this.state;
    const { otherUser } = this.props;

    if (!userAppState) return false;

    const { userId } = userAppState.facebook.credentials;
    fetch(`${userAppState.appConfig.server}/getConversationBetween/${userId}/${otherUser}`)
    .then(res => res.json())
    .then(({ conversation }) => {
      this.setState({ conversation})
      this._subscribeToConversationUpdates({ conversation })
    })
    .catch(err => {
      console.log(err);
    })
  }

  _subscribeToConversationUpdates({ conversation }) {
    ws.onmessage = (({ data }) => {
      const { type, conversation: newConversationState } = JSON.parse(data);
      console.log(type);
      console.log(conversation.conversationId);
      if (type !== conversation.conversationId) return false;
      console.log('newConversationState');

      this.setState({ conversation: newConversationState });
    }); 
  }

  _renderMessages() {
    const { userAppState } = this.state;
    const { userId } = userAppState.facebook.credentials;
    return _.map(this.state.conversation.messages, (message,n) => {
      const messageStyle = styles[message._from === userId ? 'self' : 'other' ];
      return (
        <View key={`message${n}`} style={[{backgroundColor:'transparent',width:200}, messageStyle]}>
          <LinearGradient colors={['#74e9cc', '#a1f3e1']} style={[styles.linearGradient]}>
            <Text style={[styles.textFont]}>
              {message._text}
            </Text>
            <Text style={[styles.textFont]}>
            </Text>
          </LinearGradient>
        </View>
      )
    });
  }

  _sendMessage() {
    console.log('on presss')
    const { messageBox } = this.refs;
    const { currentMessage: text } = this.state;
    if (!text) return false;

    const { userAppState } = this.state;
    const { userId } = userAppState.facebook.credentials;
    const { otherUser } = this.props;

    fetch(`${userAppState.appConfig.server}/newMessage/${userId}/${otherUser}/${text}`)
    .then(res => res.json())
    .then(({ conversation }) => this.setState({ conversation}))
    messageBox.clear();
  }

  render() {
    const { conversation } = this.state;
    return (
      <View style={{flexDirection:'column',flex:9.5,paddingBottom:50}}>
        <ScrollView style={{paddingTop:topPadding,flex:9}}>
          <View style={{backgroundColor:'#f9f9f9',padding:12,borderBottomWidth:2,borderBottomColor:'#d2d2d2'}}>
            <Text style={{color:'#717171',textAlign:'center',marginBottom:12}}>Break the Ice</Text>
            <Text style={{color:'#959595',textAlign:'center'}}>
              {conversation.iceBreakQuestion}
            </Text>
          </View>
          <View style={{flexDirection:'column',paddingLeft:15,paddingRight:15,paddingBottom:15}}>
            {this._renderMessages()}
          </View>
        </ScrollView>
        <View style={{flex:0.5,flexDirection:'row',padding:10,backgroundColor:'#eee',justifyContent:'space-between'}}>

          <TextInput
            ref='messageBox'
            onChangeText={currentMessage => this.setState({ currentMessage })}
            style={{
              height: 30,
              backgroundColor:'#fff',
              borderColor: 'gray', borderRadius:4,borderWidth: 1,padding:5,flex:1}}
            placeholder="message"
          />
          <Button
            onPress={this._sendMessage}
            style={{flex:1,backgroundColor:'transparent',lineHeight:25,marginLeft:5}}>
            Send
          </Button>
        </View>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    padding:10
  },
  self:{
    alignSelf:'flex-end',
    marginTop:15,
    borderRadius:4,
    overflow:'hidden'
  },
  other:{
    alignSelf:'flex-start',
    marginTop:15,
    borderRadius:4,
    overflow:'hidden'
  },
  textFont:{
    color:'#566360'
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

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleChat);
