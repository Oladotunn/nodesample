import React, {Component} from 'react';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

import LandingPage from './containers/landingPageContainer/index';
import PageOne from './containers/PageOne';
import PageTwo from './containers/PageTwo';
import ProfileSetUp from './containers/ProfileSetup/index.js';
import ProfileAbout from './containers/ProfileSetup/aboutDetails.js';
import Flags from './containers/flags/index';
import {primaryFontColor,primaryThemeColor,whiteFont} from '@theme/colors';
import TabIcon from '@components/tabIcon';
import ProfilePage from '@containers/profile/profilePage';
import MatchPage from '@containers/profile/match';
import DetailProfilePage from '@containers/profile/detailProfilePage';
import Messages from '@containers/profile/messages.js';
import Settings from '@containers/profile/settings.js';
import SingleChat from '@containers/profile/singleChat.js';
import SingleMatch from '@containers/profile/singleMatch.js';
import EditProfilePage from '@containers/profile/editProfilePage.js';
import { Provider } from 'react-redux';
import AppStore from './app-store';

const getSceneStyle = () => ({
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
});
const styles = {
  container: {
    backgroundColor: 'white',
  },
};

export default class App extends Component {
  constructor(props){
    super(props)

  }
  render() {
    return (
      <Provider store={AppStore}>
      <Router getSceneStyle={getSceneStyle}>
        <Scene key="modal" component={Modal} >
          <Scene key="root" navigationBarStyle={styles.container}>
            <Scene key="landingPage" component={LandingPage} initial={true} hideNavBar={true}/>
            <Scene key="profileSetup" component={ProfileSetUp} hideNavBar={true}/>
            <Scene key="profileAbout" component={ProfileAbout} hideNavBar={true}/>
            <Scene key="flags" component={Flags} backTitle="Back" 
              hideNavBar={false}
              navigationBarStyle={primaryThemeColor}
              titleStyle={whiteFont}
              backButtonTextStyle={whiteFont}
              backButtonImage={require('@images/Back-50.png')}
            />
            <Scene
              key="main"
              tabs={true} tabBarStyle={{backgroundColor:'#fff',borderTopWidth:1,borderColor:'#eeeeee'}}>
              <Scene key="profile" initial  title="TRiBL"
                navigationBarStyle={primaryThemeColor}
                titleStyle={{color:'#fff'}}
                icon={TabIcon} >
                <Scene key="profileMain" component={ProfilePage} rightTitle='Edit' title="TRiBL" onRight={()=> Actions.profileEdit({type:'replace'})} rightButtonTextStyle={{color:'#fff'}}/>
                <Scene key="profileEdit" component={EditProfilePage} rightTitle='Save' title="TRiBL" customTitle="Edit" onRight={()=> Actions.profileMain({type:'replace'})} rightButtonTextStyle={{color:'#fff'}}/>

              </Scene>
              <Scene key="match" navigationBarStyle={primaryThemeColor} titleStyle={{color:'#fff'}} title="Match" icon={TabIcon} customTitle="TRiBL">
                <Scene key="matchPreview"  component={MatchPage}  customTitle="TRiBL" />
                <Scene key="matchDetail" component={SingleMatch} customTitle="TRiBL" onRight={()=>{}} rightButtonImage="" rightButtonIconStyle={{width:30,height:30}}  hideNavBar={false} backButtonTextStyle={whiteFont} backTitle="Back" backButtonImage={require('@images/Back-50.png')}/>
              </Scene>
              <Scene key="messages"  title="Messages"   navigationBarStyle={primaryThemeColor} titleStyle={{color:'#fff'}} icon={TabIcon}>
                <Scene key="chatList" component={Messages} title="Messages" />
                <Scene key="singleChat" component={SingleChat} onRight={()=>{}} rightButtonImage="" rightButtonIconStyle={{width:30,height:30,borderRadius:15}} title="Messages"  hideNavBar={false} backButtonTextStyle={whiteFont} backTitle="Back" backButtonImage={require('@images/Back-50.png')}/>
              </Scene>
              <Scene key="settings" navigationBarStyle={primaryThemeColor} titleStyle={{color:'#fff',fontSize:20}}  component={Settings} title="Settings" icon={TabIcon}/>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    </Provider>
    )
  }
}
