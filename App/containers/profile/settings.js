import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

export default class Settings extends Component {
    render() {
        return (
            <ScrollView style={{paddingTop:64}}>
                {/*main section*/}
                <View style={{paddingBottom:50}}>
                    <Text style={[styles.title]}>Preferences</Text>
                    <View style={[styles.listItem]}>
                        <Text>I am a</Text>
                        <Text style={{color:'#d91434'}}>Man</Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text>Interested in</Text>
                        <Text style={{color:'#d91434'}}>Women</Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text>Located in</Text>
                        <Text style={{color:'#d91434'}}>Houston,TX</Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text>Search Radius</Text>
                        <Text style={{color:'#d91434'}}>10 miles</Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text>Aged</Text>
                        <Text style={{color:'#d91434'}}>24 to 27</Text>
                    </View>
                    <View style={[styles.borderTop]}>
                    <Text style={[styles.title]}>Notifications</Text></View>
                    <View style={[styles.listItem]}>
                        <Text>Push Notifications</Text>
                        <Text style={{color:'#d91434'}}>On</Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text>App Sounds</Text>
                        <Text style={{color:'#d91434'}}>On</Text>
                    </View>

                    <View style={[styles.borderTop]}>
                        <Text style={[styles.title]}>Profile</Text></View>
                    <View style={[styles.listItem]}>
                        <Text>Account Type</Text>
                        <Text style={{color:'#d91434'}}>PRO</Text>
                    </View>
                    <View style={[styles.listItem,{borderBottomWidth:1}]}>
                        <Text>Visibility</Text>
                        <Text style={{color:'#d91434'}}>Public</Text>
                    </View>
                    <View style={{paddingTop:15,paddingBottom:15,backgroundColor:'#f4f4f4'}}>
                    <LinearGradient colors={['#E80438', '#D2021D']} style={[styles.linearGradient]}>
                        <Button
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