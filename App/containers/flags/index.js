import React from 'react';
import {
  Text,
  View,
  Platform
} from 'react-native';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import GeographicPage from '@containers/flags/GeographicPage';
import CulturalPage from '@containers/flags/CulturalPage';
let topPadding = 64;

if (Platform.OS =='android'){
  topPadding = 54;
} else{
  topPadding = 64;
}

export default React.createClass({
  render() {
    return(
      <ScrollableTabView style={{marginTop:topPadding}} tabBarActiveTextColor="#DA0327" tabBarBackgroundColor="#F4F4F4" tabBarUnderlineColor="#DA0327" scrollWithoutAnimation={true} tabBarTextStyle={{marginTop:10}}>
        <GeographicPage tabLabel="Geographic" />
        <CulturalPage tabLabel="Cultural" />
      </ScrollableTabView>
    )
  }
});
