import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import Container from '@components/Container'

import {
    View,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {
    transparentBg,
    primaryFont,
    secondaryFont,
    padding20,
    primaryFontColor,
    modalWhite,
    borderRadius,
} from '@theme/colors'
import Dimensions from 'Dimensions';
import Button from 'react-native-button';


let windowWidth = Dimensions.get('window').width;
class ThirdPage extends Component{
    constructor(props){
        super(props)
        this.state = {likes:[]}
        this.pushLikes = this.pushLikes.bind(this)
    }
    pushLikes(id){
        let newArray;
        newArray = this.state.likes
        let index = newArray.indexOf(id)

        if(index > -1){
        newArray.splice(index,1)
        }else{
            newArray.push(id)
        }

        this.setState({likes:newArray})
    }
    render() {
        return (
            <View>
                <View style={{paddingLeft:10}}>
                    <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:10}}>
                    <Text style={styles.textColor}>What do you like?</Text>
                </View>
                <View style={[styles.buttonGroups]}>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(1) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(1) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(1)}>Sports</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(2) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(2) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(2)}>Art</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(3) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(3) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(3)}>Fitness</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(4) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(4) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(4)}>Food</Button>
                </View>
                <View style={[styles.buttonGroups]}>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(5) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(5) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(5)}>Literature</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(6) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(6) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(6)}>Movies</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(7) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(7) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(7)}>Theator</Button>
                </View>

                <View style={[styles.buttonGroups]}>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(8) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(8) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(8)}>Fashion</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(9) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(9) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(9)}>Technology</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(10) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(10) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(10)}>Politics</Button>
                    </View>

                <View style={[styles.buttonGroups]}>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(11) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(11) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(11)}>Music</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(12) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(12) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(12)}>Travel</Button>
                    <Button style={[styles.checkboxButton,this.state.likes.indexOf(13) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor,this.state.likes.indexOf(13) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(13)}>Video Games</Button>
                    </View>
                <View style={[{alignItems:'center',marginTop:20}]}>
                    <Button
                        style={[{fontSize: 16, color: '#fff',lineHeight:30,overflow: 'hidden'},styles.button,borderRadius]}
                        styleDisabled={{color: 'red'}}
                        onPress={()=>this.setState({currentView:1})}
                        onPress={()=> {this.props.callbackParent()}}
                    >
                        Next Step
                    </Button>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
                    <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                    <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                    <Image source={require('@images/activePage.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                    <Image source={require('@images/pager.png')} style={{resizeMode:'contain'}}></Image>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgb(0,0,0)',
        alignSelf:'stretch',
        justifyContent: 'center'
    },
    logo:{
        width:50,
        height:50,
        resizeMode:'contain'
    },
    wrapper:{
        flex:1
    },
    textColor:{
        color:'#9E9E9E'
    },
    button:{
        height:45,
        width:115,
        backgroundColor:'#D80324',
        borderRadius:4,
        borderColor:'#D80324',
        borderWidth:1
    },
    buttonGroups:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30,
        paddingLeft:20,
        paddingRight:20
    },
    buttonTextColor:{
        color:'#59345F'
    },
    checkboxButton:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:12,
        paddingRight:12,
        borderColor:'#59345F',
        borderWidth:1,
        fontSize:12,
        borderRadius:4,
        overflow:'hidden'
    },
    activeButton:{
        backgroundColor:'#59345F'
    },
    activeButtonTextColor:{
        color:'#fff'
    }
})

export default ThirdPage
