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
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(1) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(1)}><Text style={[this.state.likes.indexOf(1) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Sports</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(2) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(2)}><Text style={[this.state.likes.indexOf(2) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Art</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(3) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(3)}><Text style={[this.state.likes.indexOf(3) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Fitness</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(4) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(4)}><Text style={[this.state.likes.indexOf(4) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Food</Text></TouchableOpacity>
                </View>
                <View style={[styles.buttonGroups]}>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(5) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(5)}><Text style={[this.state.likes.indexOf(5) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Literature</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(6) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(6)}><Text style={[this.state.likes.indexOf(6) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Movies</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(7) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(7)}><Text style={[this.state.likes.indexOf(7) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Theator</Text></TouchableOpacity>
                </View>

                <View style={[styles.buttonGroups]}>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(8) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(8)}><Text style={[this.state.likes.indexOf(8) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Fashion</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(9) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(9)}><Text style={[this.state.likes.indexOf(9) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Technology</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(10) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(10)}><Text style={[this.state.likes.indexOf(10) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Politics</Text></TouchableOpacity>
                    </View>

                <View style={[styles.buttonGroups]}>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(11) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(11)}><Text style={[this.state.likes.indexOf(11) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Music</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(12) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(12)}><Text style={[this.state.likes.indexOf(12) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Travel</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.checkboxButton,this.state.likes.indexOf(13) > -1 ? styles.activeButton:null]} onPress={()=> this.pushLikes(13)}><Text style={[this.state.likes.indexOf(13) > -1 ? styles.activeButtonTextColor:styles.buttonTextColor]}>Video Games</Text></TouchableOpacity>
                    </View>
                <View style={[{alignItems:'center',marginTop:20}]}>
                    {/*<Button
                        style={[{fontSize: 16, color: '#fff',lineHeight:30,overflow: 'hidden'},styles.button,borderRadius]}
                        styleDisabled={{color: 'red'}}
                        onPress={()=>this.setState({currentView:1})}
                        onPress={()=> {this.props.callbackParent()}}
                    >
                        Next Step
                    </Button>*/}
                    <TouchableOpacity style={[styles.button]} onPress={()=> {this.props.callbackParent()}}>
                        <Text style={{fontSize: 16, color: '#fff',marginTop:10,textAlign:'center'}}>Next Step</Text>
                    </TouchableOpacity>
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
        color:'#59345F',
        fontSize:12,
    },
    checkboxButton:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:12,
        paddingRight:12,
        borderColor:'#59345F',
        borderWidth:1,
        borderRadius:4,
        overflow:'hidden'
    },
    activeButton:{
        backgroundColor:'#59345F'
    },
    activeButtonTextColor:{
        color:'#fff',
        fontSize:12
    }
})

export default ThirdPage
