import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Messages extends Component {
    render() {
        return (
            <ScrollView style={{paddingTop:64}}>
                {/*new matches*/}
                <View style={{paddingTop:22,paddingBottom:12,paddingLeft:13,paddingRight:13}}>
                   <Text style={[styles.titleFontColor]}>New Matches</Text>
                    <TouchableOpacity onPress={()=>Actions.singleChat({title:'Lisa',rightButtonImage:require('@images/messages/m1.png')})}>
                   <Image source={require('@images/messages/m1.png')} style={{marginTop:17,marginBottom:50}}></Image></TouchableOpacity>
                   <Text style={[styles.titleFontColor]}>Conversations</Text>
               </View>

                {/* conversations list*/}
                <View style={{paddingBottom:50}}>
                    <View style={[{backgroundColor:'#75e8c7'},styles.listItem]}>
                        <Image style={{flex:0.5}} source={require('@images/messages/m2.png')}></Image>
                        <View style={{flex:9.5,paddingLeft:15,paddingTop:5,paddingBottom:5,paddingRight:5,backgroundColor:'#fff'}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>
                                Janet Simpson
                            </Text>
                                <Text>11:12AM</Text>
                            </View>
                            <Text style={[styles.messageFontColor,{marginTop:5}]}>Yeah,yeah- we'll see lol. What part of Ohio are you from?</Text>
                        </View>
                    </View>
                    <View style={[{backgroundColor:'#59345f'},styles.listItem]}>
                        <Image style={{flex:0.5}} source={require('@images/messages/m3.png')}></Image>
                        <View style={{flex:9.5,paddingLeft:15,paddingTop:5,paddingBottom:5,paddingRight:5,backgroundColor:'#fff'}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>
                                   Renee
                                </Text>
                                <Text>10:00AM</Text>
                            </View>
                            <Text style={[styles.messageFontColor,{marginTop:5}]}>Hey, what's up?</Text>
                        </View>
                    </View>
                    <View style={[{backgroundColor:'#fff782'},styles.listItem]}>
                        <Image style={{flex:0.5}} source={require('@images/messages/m4.png')}></Image>
                        <View style={{flex:9.5,paddingLeft:15,paddingTop:5,paddingBottom:5,paddingRight:5,backgroundColor:'#fff'}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>
                                    Jean Grey
                                </Text>
                                <Text>10:00AM</Text>
                            </View>
                            <Text style={[styles.messageFontColor,{marginTop:5}]}>I have lived in houston for about 5 years now. You?</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    titleFontColor:{
        color:'#808080',
        fontSize:18
    },
    messageFontColor:{
        color:'#575757'
    },
    darkFonts:{
        color:'#676767'
    },
    listItem:{
        flexDirection:'row',justifyContent:'flex-start',borderTopWidth:1,borderColor:'#eee',flexWrap:'wrap',flex:1,paddingLeft:15,
    }
})