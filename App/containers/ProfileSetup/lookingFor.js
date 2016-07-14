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
class FourthPage extends Component{
    constructor(props){
        super(props)
        this.state = {gender:''}
    }

    render() {
        return (
            <View>
                <View style={{paddingLeft:10}}>
                    <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:10}}>
                    <Text style={styles.textColor}>What are you looking for?</Text>
                </View>
                <View style={[styles.buttonGroup,{paddingLeft:20,paddingRight:20}]}>
                    
                    <Button containerStyle={{flex:1}} onPress={()=> this.setState({gender:'men'})} style={[styles.selectButton,{marginRight:15,height:45,lineHeight:33,color:this.state.gender == 'men' ? '#da1636':'#696969',borderColor: this.state.gender == 'men' ?'#da1636':'#696969',borderWidth:1},borderRadius]}>
                        Men
                    </Button>
                    <Button containerStyle={{flex:1}} onPress={()=> this.setState({gender:'women'})} style={[styles.selectButton,{marginLeft:15,height:45,lineHeight:33,color:this.state.gender == 'women' ? '#da1636':'#696969',borderColor:this.state.gender == 'women' ?'#da1636':'#696969'},borderRadius]}>
                        Women
                    </Button>

                </View>
                <Text style={[{textAlign:'center',marginTop:30},styles.textColor]}>Aged:</Text>
                <View style={[styles.buttonGroup,{marginTop:15}]}>
                    <Button onPress={()=> this.props.picker.toggle()} style={[styles.selectButton,{marginRight:15,height:45,lineHeight:33,color:'#696969',width:74},borderRadius]}>
                        {this.props.firstAge}
                    </Button>
                    <Button onPress={()=> this.props.picker2.toggle()} style={[styles.selectButton,{marginLeft:15,height:45,lineHeight:33,color:'#696969',width:74},borderRadius]}>
                        {this.props.secondAge}
                    </Button>
                </View>
                <Text style={[{textAlign:'center',marginTop:30,marginBottom:15},styles.textColor]}>Located in:</Text>
                <TouchableOpacity style={styles.list} >
                    <Text style={{color:'#595959'}}>Houston,TX</Text>
                    <Image source={require('@images/Forward-32.png')} style={styles.forwardArrow}></Image>
                </TouchableOpacity>
                <View style={[{alignItems:'center',marginTop:20}]}>
                    <Button style={[{fontSize: 16, color: '#fff',lineHeight:30,overflow: 'hidden'},styles.button,borderRadius]}
                        styleDisabled={{color: 'red'}}
                        onPress={()=>Actions.main()}>
                        Next Step
                    </Button>
                </View>
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
                    <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                    <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                    <Image source={require('@images/pager.png')} style={{resizeMode:'contain',marginRight:10}}></Image>
                    <Image source={require('@images/activePage.png')} style={{resizeMode:'contain'}}></Image>
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
    buttonGroup:{
    flexDirection:'row',
       justifyContent:'center',
        marginTop:30
    },
    selectButton:{
        borderColor:'#595959',
        borderWidth:1,
        fontSize:16,
        flex:1
    },
    list:{
        flexDirection:'row',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#9E9E9E',
        padding:10,
        justifyContent:'space-between',
        alignItems:'center'
    },forwardArrow:{
        width:20,
        height:20
    }
})

export default FourthPage
