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
    render() {
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
                            tabs={true}>
                            <Scene key="profile" initial component={ProfilePage} title="TRiBL"
                                   navigationBarStyle={{backgroundColor:'#D80324',borderWidth:0}}
                                   titleStyle={{color:'#fff'}}
                                   icon={TabIcon}/>
                            <Scene key="match"  component={PageTwo} title="Match" icon={TabIcon}/>
                            <Scene key="messages"  component={PageTwo} title="Messages" icon={TabIcon}/>
                            <Scene key="settings"  component={PageTwo} title="Settings" icon={TabIcon}/>
                        </Scene>
                </Scene>
                </Scene>
            </Router>
        )
    }
}