import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import  SearchBar from 'react-native-search-bar'

class GeographicPage extends Component {
    constructor(props){
        super(props)
        this.state = {showsCancelButton:false}
    }
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    hidden={false}
                    barStyle="light-content"
                />
                <SearchBar
                    ref='searchBar'
                    placeholder='Search'
                    onCancelButtonPress={() => this.setState({showsCancelButton: false})}
                    onFocus={() => this.setState({showsCancelButton: true})}
                    showsCancelButton={this.state.showsCancelButton}
                />
                <ScrollView style={{flex:1}}>
                    <TouchableOpacity style={[styles.listItem,styles.sectionHeader]} onPress={(e)=> console.log(e)}>
                        <Text style={[styles.boldFonts,styles.listText]}>
                            The Americas
                        </Text>
                    </TouchableOpacity>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Angola
                        </Text>
                        <Image  source={require('@images/country/angola.png')} style={[styles.flag]}></Image>

                    </View>
                    <View style={[styles.listItem]}>
                        <Text  style={[styles.listText]}>
                            Barbados
                        </Text>
                        <Image  source={require('@images/country/barbados.png')} style={[styles.flag]}></Image>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Brazil
                        </Text>
                        <Image  source={require('@images/country/brazil.png')} style={[styles.flag]}></Image>

                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Colombia
                        </Text>
                        <Image  source={require('@images/country/colombia.png')} style={[styles.flag]}></Image>
                    </View>

                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Cuba
                        </Text>
                        <Image  source={require('@images/country/cuba.png')} style={[styles.flag]}></Image>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Dominican Republic
                        </Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Haiti
                        </Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Jamaica
                        </Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            Trinidad and Tobago
                        </Text>
                    </View>
                    <View style={[styles.listItem]}>
                        <Text style={[styles.listText]}>
                            United States
                        </Text>
                    </View>
                    <View style={[styles.listItem,styles.sectionHeader]}>
                        <Text style={[styles.boldFonts,styles.listText]}>
                           Africa
                        </Text>
                    </View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Algeria</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]} selected={true}>Angola</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Benin</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Botswana</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Burkina Faso</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Burundi</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Haiti</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Cabo Verde</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Cameroon</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Central African Republic</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Chad</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Comoros</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Congo,Democratic Republic of the</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Cote d'lvoire</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Djibouti</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Egypt</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Equatorial Guinea</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Eritrea</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Ethiopia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Gabon</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Gambia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Ghana</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Guinea</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Guinea-Bissau</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Kenya</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Lesotho</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Liberia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Libya</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Madagascar</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Malawi</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Mali</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Mauritania</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Mauritius</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Morocco</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Mozambique</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Namibia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Niger</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Nigeria</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Rwanda</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Sao Tome and Principe</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Senegal</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Seychelles</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Sierra Leone</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Somalia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>South Africa</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Sudan</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Swaziland</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Tanzania</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Togo</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Tunisia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Uganda</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Zambia</Text></View>
                    <View style={[styles.listItem]}><Text style={[styles.listText]}>Zimbabwe</Text></View>
                </ScrollView>

            </View>
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
        fontSize:18
    },
    sectionHeader:{
        backgroundColor:'#F4F4F4'
    },
    boldFonts:{
        fontWeight:'bold'
    },
    flag:{
        width:45,
        height:30
    }
})
export  default GeographicPage
