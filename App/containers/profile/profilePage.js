import React, { Component } from 'react';
import {
    View,
    Text,
ScrollView,
    StyleSheet,
Image,
    StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

class ProfilePage extends Component {
    
    render() {
        return (
                <ScrollView contentContainerStyle={{flex:1,paddingTop:64}}>
                    <StatusBar
                        hidden={false}
                        barStyle="light-content"
                    />
                    <View style={{flex:4}}>
                        <IndicatorViewPager
                            style={{height:200,flex:1}}
                            indicator={this._renderDotIndicator()}>
                            <View>
                                <Image source={{uri: 'https://images.unsplash.com/photo-1465326117523-6450112b60b2'}}
                                       style={[{width: 400, height: 400},styles.sliderImages]} />
                            </View>
                            <View>
                                <Image source={{uri: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1'}}
                                       style={[{width: 400, height: 400},styles.sliderImages]} />
                            </View>
                            <View>
                                <Image source={{uri: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1'}}
                                       style={[{width: 400, height: 400},styles.sliderImages]} />
                            </View>
                            <View>
                                <Image source={{uri: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1'}}
                                       style={[{width: 400, height: 400},styles.sliderImages]} />
                            </View>
                        </IndicatorViewPager>
                        <View style={{position:'absolute',bottom:30,left:20,backgroundColor:'transparent'}}>
                            <Text style={{color:'#fff',fontSize:20}}>David Okafor, 27</Text>
                            <Text style={{color:'#fff',fontSize:20}}>Houston,TX</Text>
                        </View>
                        <View>
                            <Image source={{}}></Image><Image source={{}}></Image><Image source={{}}></Image>
                        </View>
                    </View>
                <View style={{flex:6}}>
                    <Text>Lower</Text>
                </View>
                </ScrollView>

        )
    }
    _renderDotIndicator() {
        return (
            <PagerDotIndicator
                pageCount={4}
                dotStyle={{backgroundColor:'#E6DFDE',marginRight:15}}
                selectedDotStyle={{backgroundColor:'#D0021B',marginRight:15}}
                containerStyle={{position:'absolute',bottom:10}}

            />
        );
    }

}

const styles = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    sliderImages:{
        flex:1,

        resizeMode:'stretch'
    }
});
export default ProfilePage