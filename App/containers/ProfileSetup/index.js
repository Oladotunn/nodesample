/* @flow */

import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import Container from '@components/Container'

import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import {
    transparentBg,
    primaryFont,
    secondaryFont,
    padding20,
    primaryFontColor,
    modalWhite,
    borderRadius
} from '@theme/colors'
import Dimensions from 'Dimensions';
import Button from 'react-native-button';
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
import AboutDetail from './aboutDetails'
import ThirdView from './whatDoYouLike'
import FourthView from './lookingFor'
import Picker from 'react-native-picker'

let windowWidth = Dimensions.get('window').width;
class ProfileSetUp extends Component {
    constructor(props){
        super(props)
        this.state = {currentView:0,firstAge:18,secondAge:22}
    }
    secondViewNext(){
        this.setState({
            currentView:2
        })
    }
    thirdViewNext(){
        this.setState({
            currentView:3
        })
    }
    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={modalWhite}>
                        <SwipeableViews index={this.state.currentView} onChangeIndex={(index,fromIndex)=> this.setState({currentView:index})}>
                        <View style={styles.wrapper}>
                            <View style={{alignItems:'center'}}>
                                <Image source={require('@images/trible_logo.png')} style={styles.logo}></Image>
                            </View>
                            <View style={{alignItems:'center',marginTop:20}}>
                                <Text style={styles.textColor}>Let's start by setting up your profile s</Text>
                                <Text style={[{marginTop:20},styles.textColor]}>We pulled a few pictures from
                                    your</Text>
                                <Text style={styles.textColor}>Facebook page. When you're happy with</Text>
                                <Text style={styles.textColor}>your set, click next.</Text>
                            </View>
                            <View style={styles.boxWrapper}>
                                <View style={{position:'relative'}}>
                                    <View
                                        style={[{flex:1},styles.boxBgColor,{width:118},borderRadius,{borderWidth:1},{borderColor:'#979797'}]}>
                                    </View>
                                    <Image source={require('@images/Cancel-50.png')} style={styles.cancelIcon}></Image>
                                </View>
                                <View style={[styles.innerBoxWrapper]}>
                                    <View>
                                    <View
                                        style={[styles.innerBox,styles.boxBgColor,borderRadius,{borderWidth:1},{borderColor:'#979797'}]}>
                                    </View>
                                        <Image source={require('@images/Cancel-50.png')}
                                               style={styles.cancelIcon}></Image>
                                    </View>
                                    <View>
                                    <View
                                        style={[styles.innerBox,styles.boxBgColor,borderRadius,{borderWidth:1},{borderColor:'#979797'}]}>
                                    </View>
                                        <Image source={require('@images/Cancel-50.png')}
                                               style={styles.cancelIcon}></Image>
                                    </View>
                                </View>
                                <View style={styles.innerBoxWrapper}>
                                    <View>
                                    <View
                                        style={[styles.innerBox,styles.boxBgColor,borderRadius,{borderWidth:1},{borderColor:'#979797'}]}>
                                    </View>
                                        <Image source={require('@images/Cancel-50.png')}
                                               style={styles.cancelIcon}></Image>
                                    </View>

                                    <View
                                        style={[styles.innerBox,borderRadius,{borderWidth:1},{borderColor:'#D50321'},{justifyContent:'center'},{alignItems:'center'}]}>
                                        <Image source={require('@images/plus.png')}></Image>
                                    </View>
                                </View>
                            </View>
                            <View style={[{alignItems:'center',marginTop:20}]}>
                                {/*<Button
                                    style={[{fontSize: 16, color: '#fff',lineHeight:30},styles.button,borderRadius]}
                                    styleDisabled={{color: 'red'}}
                                    containerStyle={{borderRadius:4}}
                                    onPress={()=>this.setState({currentView:1})}
                                >
                                    Next Step
                                </Button> */}
                                <TouchableOpacity style={[styles.button]} onPress={()=>this.setState({currentView:1})}>
                                    <Text style={{fontSize: 16, color: '#fff',marginTop:10,textAlign:'center'}}>Next Step</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row',flex:1,justifyContent:'center',marginTop:20}}>
                                <Image source={require('@images/activePage.png')}
                                       style={{resizeMode:'contain',marginRight:10}}></Image>
                                <Image source={require('@images/pager.png')}
                                       style={{resizeMode:'contain',marginRight:10}}></Image>
                                <Image source={require('@images/pager.png')}
                                       style={{resizeMode:'contain',marginRight:10}}></Image>
                                <Image source={require('@images/pager.png')} style={{resizeMode:'contain'}}></Image>
                            </View>
                        </View>
                            <View>
                            <AboutDetail callbackParent={this.secondViewNext.bind(this)}/>
                            </View>
                            <View>
                                <ThirdView callbackParent={this.thirdViewNext.bind(this)}/>
                            </View>
                            <View>
                                <FourthView picker={this.picker} picker2={this.picker2} firstAge={this.state.firstAge} secondAge={this.state.secondAge}/>
                            </View>
                        </SwipeableViews>
                    </View>
                </View>
                <Picker
                    pickerTitle="Select Age"
                    pickerCancelBtnText="cancel"
                    pickerBtnText="done"
                    showMask={true}
                    ref={picker => this.picker = picker}
                    onPickerDone={(data)=> this.setState({firstAge:data[0]})}
                    style={{
			height: 300,
			bottom: 0, position: 'absolute'
		}}
                    showDuration={300}
                    pickerData={[18,19,20,21,22,23,24,25,26,27,28,30]}
                    selectedValue={this.state.firstAge}
                />
                <Picker
                    pickerTitle="Select Age"
                    pickerCancelBtnText="cancel"
                    pickerBtnText="done"
                    showMask={true}
                    ref={picker2 => this.picker2 = picker2}
                    onPickerDone={(data)=> this.setState({secondAge:data[0]})}
                    style={{
			height: 300,
			bottom: 0, position: 'absolute'
		}}
                    showDuration={300}
                    pickerData={[18,19,20,21,22,23,24,25,26,27,28,30]}
                    selectedValue={this.state.secondAge}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal1: {
        height: 400,
        backgroundColor: "#fff",
        borderRadius: 3,
        width: (windowWidth - 30)
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    wrapper: {
        flex: 1
    },
    textColor: {
        color: '#9E9E9E'
    },
    boxWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 120,
        marginTop: 20
    },
    boxBgColor: {
        backgroundColor: '#D8D8D8'
    },
    innerBoxWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    innerBox: {
        width: 56,
        height: 56
    },
    button: {
        height: 45,
        width: 115,
        backgroundColor: '#D80324',
        borderRadius: 4,
        borderColor: '#D80324',
        borderWidth: 1
    },
    cancelIcon: {
        width: 20,
        resizeMode: 'contain',
        position: 'absolute',
        right: -3,
        top: -22
    }
})

export default ProfileSetUp
