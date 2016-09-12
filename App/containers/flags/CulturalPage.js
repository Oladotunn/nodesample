import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
StatusBar
} from 'react-native';

class CulturalPage extends  Component{
  render(){
    return(
      <ScrollView style={{flex:1}}>
        <StatusBar
          hidden={false}
          barStyle="light-content"
        />
        <View style={[styles.listItem]}><Text  style={[styles.listText]}>Alpha Kappa Alpha Soronity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]} selected={true}>Alpha Phi Alpha Fraternity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Delta Sigma Theta Soronity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Iota Phi Theta Fraternity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Kappa Alpha Psi Fraternity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Omega Psi Phi Fraternity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Phi Beta Sigma Fraternity</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Sigma Gamma Rho Soronity</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Zeta Phi Beta Soronity Inc.</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Blerd</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>HBCU Graduate</Text></View>
        <View style={[styles.listItem]}><Text style={[styles.listText]}>Hip-Hop Lover</Text></View>
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
export default CulturalPage
