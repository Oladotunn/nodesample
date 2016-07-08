import React, {Component} from 'react';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

import LandingPage from './containers/landingPageContainer/index';
import PageOne from './containers/PageOne'
import PageTwo from './containers/PageTwo';
import ProfileSetup from './containers/ProfileSetup/index'
import ProfileAbout from './containers/ProfileSetup/aboutDetails.js'
import Flags from './containers/flags/index'
import {primaryFontColor,primaryThemeColor,whiteFont} from '@theme/colors'
import TabIcon from '@components/tabIcon'
import ProfilePage from '@containers/profile/profilePage'
import MatchPage from '@containers/profile/match'
import DetailProfilePage from '@containers/profile/detailProfilePage'
const getSceneStyle = () => ({
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
})
 const styles = {
    container: {
        backgroundColor: 'white',
    },
}

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {isProfileEditing:false}
    }
    render() {
        let title = this.props.isProfileEditing ? 'Save':'Edit'
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="modal" component={Modal} >
                <Scene key="root" navigationBarStyle={styles.container}>
                    <Scene key="landingPage" component={LandingPage} initial={true} hideNavBar={true}/>
                    <Scene key="profileSetup" component={ProfileSetup} hideNavBar={true}/>
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
                            <Scene key="profile" initial component={ProfilePage} title="TRiBL"
                                   navigationBarStyle={{backgroundColor:'#D80324'}}
                                   titleStyle={{color:'#fff'}} onRight={()=> console.log('yey')}
                                   rightTitle={title} icon={TabIcon} rightButtonTextStyle={{color:'#fff'}}/>
                            <Scene key="match" navigationBarStyle={{backgroundColor:'#D80324'}} titleStyle={{color:'#fff'}}  component={MatchPage} title="Match" icon={TabIcon} customTitle="TRiBL"/>
                            <Scene key="messages"  component={PageTwo} title="Messages" icon={TabIcon}/>
                            <Scene key="settings"  component={PageTwo} title="Settings" icon={TabIcon}/>
                        </Scene>
                </Scene>
                </Scene>
            </Router>
        )
    }
}