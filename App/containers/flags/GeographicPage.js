import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import  SearchBar from 'react-native-search-bar';
import { Container, Header, InputGroup, Input, Icon, Button } from 'native-base';
import myTheme from '@nativeBaseTheme/myTheme';
import countryList from 'countries-list';
import _ from 'lodash';
import {
  updateUserFlagAction
} from '../../action-creators';
import {Actions} from 'react-native-router-flux';

class GeographicPage extends Component {
  constructor(props){
    super(props)
    this.state = {showsCancelButton:false};
    this._renderAfricanCountries = _.bind(this._renderAfricanCountries, this);
    this._updateFlagData = _.bind(this._updateFlagData, this);
  }


  _getAfricanCountries() {
    return _.filter(countryList.countries,country => country.continent === 'AF')
  }

  _updateFlagData({ picture, name }) {
    const { flagIndex: index } = this.props;
    const flag = { picture, name };
    this.props.dispatchUpdateFlag({ flag, index });
    Actions.pop();
  }

  _renderAfricanCountries() {
    const africanCountries = _.sortBy(this._getAfricanCountries(), 'name');
    return  _.map(africanCountries, (country,index) => {
      const c = _.pickBy(countryList.countries, countryFromList => countryFromList.name === country.name); 
      const countryCode = _.keys(c)[0].toLowerCase();
      const picture = `http://www.geonames.org/flags/x/${countryCode}.gif`;
      const source = {uri: picture};
      return (
        <TouchableOpacity
          key={country.name}
          onPress={() => this._updateFlagData({ picture, name: country.name })}>
          <View style={[styles.listItem]}>
            <Text style={[styles.listText]}>{country.name}</Text>
            <Image source={source} style={[styles.flag]} ></Image>
          </View>
        </TouchableOpacity>
      );
    });
  }


  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        {
          Platform.OS =='android' ?
            <Header searchBar rounded theme={myTheme} >
              <InputGroup>
                <Input placeholder="Search" />
              </InputGroup>
              <Button transparent>
                Search
              </Button>
            </Header>
            :
              <SearchBar
                ref='searchBar'
                placeholder='Search'
                onCancelButtonPress={() => this.setState({showsCancelButton: false})}
                onFocus={() => this.setState({showsCancelButton: true})}
                showsCancelButton={this.state.showsCancelButton}
              />

            }

            <ScrollView style={{flex:1}}>
              <TouchableOpacity style={[styles.listItem,styles.sectionHeader]} onPress={(e)=> console.log(e)}>
                <Text style={[styles.boldFonts,styles.listText]}>
                  The Americas
                </Text>
              </TouchableOpacity>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Angola
                </Text>
                <Image  source={require('@images/country/angola.png')} style={[styles.flag]}></Image>

              </View>
              <View style={[styles.listItem]}>
                <Text  style={[styles.listText]}>
                  Barbados
                </Text>
                <Image  source={require('@images/country/barbados.png')} style={[styles.flag]}></Image>
              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Brazil
                </Text>
                <Image  source={require('@images/country/brazil.png')} style={[styles.flag]}></Image>

              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Colombia
                </Text>
                <Image  source={require('@images/country/colombia.png')} style={[styles.flag]}></Image>
              </View>

              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Cuba
                </Text>
                <Image  source={require('@images/country/cuba.png')} style={[styles.flag]}></Image>
              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Dominican Republic
                </Text>
              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Haiti
                </Text>
              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Jamaica
                </Text>
              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  Trinidad and Tobago
                </Text>
              </View>
              <View style={[styles.listItem]}>
                <Text style={[styles.listText]}>
                  United States
                </Text>
              </View>
              <View style={[styles.listItem,styles.sectionHeader]}>
                <Text style={[styles.boldFonts,styles.listText]}>
                  Africa
                </Text>
              </View>
              {this._renderAfricanCountries()}
            </ScrollView>
          </View>
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
        fontSize:18
    },
    sectionHeader:{
        backgroundColor:'#F4F4F4'
    },
    boldFonts:{
        fontWeight:'bold'
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

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(GeographicPage);
