import React, {
    PropTypes,
} from 'react';
import {
    Text,
    Image,
    View
} from 'react-native';

const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
};

let imageTag = function(props){
    switch (props.title){
        case 'TRiBL':
            if(props.selected){
                return(
                    <Image source={require('@images/icons/user-active.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }else{
                return(
                    <Image source={require('@images/icons/user.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }
        case 'Match':
            if(props.selected){
                return(
                    <Image source={require('@images/icons/heart-active.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }else{
                return(
                    <Image source={require('@images/icons/heart.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }
        case 'Messages':
            if(props.selected){
                return(
                    <Image source={require('@images/icons/message-active.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }else{
                return(
                    <Image source={require('@images/icons/message.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }
        case 'Settings':
            if(props.selected){
                return(
                    <Image source={require('@images/icons/settings-active.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }else{
                return(
                    <Image source={require('@images/icons/settings.png')} style={{width:20,height:20,resizeMode:'contain'}}></Image>
                )
            }
    }
}
const TabIcon = (props) => (
    <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1}}>
        {imageTag(props)}
        <Text
            style={{ color: props.selected ? '#db203c' : '#a0a0a0' }}
        >
            {props.title == 'TRiBL' ? 'Profile' : props.title}
        </Text>
    </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;