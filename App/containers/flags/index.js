import React from 'react';
import {
    Text,
View
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import GeographicPage from '@containers/flags/GeographicPage'
import CulturalPage from '@containers/flags/CulturalPage'


export default React.createClass({
    render() {
        return(
            <ScrollableTabView style={{marginTop:64}} tabBarActiveTextColor="#DA0327" tabBarBackgroundColor="#F4F4F4" tabBarUnderlineColor="#DA0327" scrollWithoutAnimation={true} tabBarTextStyle={{lineHeight:40}}>
                <GeographicPage tabLabel="Geographic" />
                <CulturalPage tabLabel="Cultural" />

            </ScrollableTabView>
        )
    }
});