import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ScrollView,TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

export default class SingleChat extends Component {
    render() {
        return (
            <View style={{flexDirection:'column',flex:9.5,paddingBottom:50}}>
                <ScrollView style={{paddingTop:64,flex:9}}>
                    <View style={{backgroundColor:'#f9f9f9',padding:12,borderBottomWidth:2,borderBottomColor:'#d2d2d2'}}>
                        <Text style={{color:'#717171',textAlign:'center',marginBottom:12}}>Break the Ice</Text>
                        <Text style={{color:'#959595',textAlign:'center'}}>Who's got the title this year, Warriors or Spurs?</Text>
                    </View>
                    <View style={{flexDirection:'column',paddingLeft:15,paddingRight:15,paddingBottom:15}}>
                        <View style={[{backgroundColor:'transparent',width:200},styles.self]}>
                            <LinearGradient colors={['#74e9cc', '#a1f3e1']} style={[styles.linearGradient]}>
                                <Text style={[styles.textFont]}>I hate to say it, but if Steph doesn't come back 100% it's definitely going to be the spurs</Text>
                                <Text style={[styles.textFont]}></Text>
                            </LinearGradient>
                        </View>
                        <View style={[{backgroundColor:'transparent',width:200},styles.other]}>
                            <LinearGradient colors={['#ececec', '#dadada']} style={[styles.linearGradient]}>
                                <Text style={[styles.textFont]}>I hate to say it, but if Steph doesn't come back 100% it's definitely going to be the spurs</Text>
                                <Text style={[styles.textFont]}></Text>
                            </LinearGradient>
                        </View>
                        <View style={[{backgroundColor:'transparent',width:200},styles.self]}>
                            <LinearGradient colors={['#74e9cc', '#a1f3e1']} style={[styles.linearGradient]}>
                                <Text style={[styles.textFont]}>I hate to say it, but if Steph doesn't come back 100% it's definitely going to be the spurs</Text>
                                <Text style={[styles.textFont]}></Text>
                            </LinearGradient>
                        </View>
                    </View>
                </ScrollView>
                <View style={{flex:0.5,flexDirection:'row',padding:10,backgroundColor:'#eee',justifyContent:'space-between'}}>

                <TextInput
                    style={{height: 30,backgroundColor:'#fff', borderColor: 'gray', borderRadius:4,borderWidth: 1,padding:5,flex:1}}
                    placeholder="message"
                />
                    <Button style={{flex:1,backgroundColor:'transparent',lineHeight:25,marginLeft:5}}>Send</Button>
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