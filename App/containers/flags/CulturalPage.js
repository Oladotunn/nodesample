import React,{Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Cultures from './fraternities';
import _ from 'lodash';
import {
  updateUserFlagAction
} from '../../action-creators';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

class CulturalPage extends  Component{
  constructor(props){
    super(props);
    this._updateFlagData = _.bind(this._updateFlagData, this);
  }
  _updateFlagData({ picture, name }) {
    const { flagIndex: index } = this.props;
    const flag = { picture, name };
    this.props.dispatchUpdateFlag({ flag, index });
    Actions.pop();
  }
  _renderCultures() {
    return _.map(_.sortBy(Cultures, 'name'), culture => {
      const {flag: picture, name } = culture;
      return (
        <TouchableOpacity
          key={name}
          onPress={() => this._updateFlagData({ picture, name })}>
        <View style={[styles.listItem]}>
          <Text  style={[styles.listText]}>{name}</Text>
          <Image source={{ uri: picture }} style={[styles.flag]} ></Image>
        </View>
      </TouchableOpacity>
      )
    });
  }
  render(){
    return(
      <ScrollView style={{flex:1}}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        {this._renderCultures()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listItem:{
    paddingTop:10,
    paddingLeft:15,
    paddingBottom:10,
    paddingRight:45,
    borderTopWidth:1,
    borderColor:'#CCCCCC',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems: 'center'
  },
  listText:{
    fontSize:16
  },
  flag:{
    width:45,
    height:30
  }
})
const mapStateToProps = state => {
  return {
    ...state,
  }
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUpdateFlag: flagInformation => dispatch(updateUserFlagAction(flagInformation)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CulturalPage);
