import React, { Component } from 'react';
import { StyleSheet,AsyncStorage, Text,Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LGradient from '../components/GradiantPart';
import { Background } from '../components/BackgroundDesign';
import { ProtierPart, StandardTierPart, SelectedProtier, SelectedStanderstier } from '../components/ProtirePart';
import { BASE_URL , API_URL} from '../config/Api';
import {storeIntoAsyncStorage} from '../config/Utils';
import { ASYNC_KEYS } from '../config/AsyncKeys';
export default class GetProTier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:"",
            // id:this.props.navigation.getParam('id',1),
            // name:this.props.navigation.getParam('name',""),
            // description: this.props.navigation.getParam('description',""),
            // price: this.props.navigation.getParam('price',""),
            loading: false,
        }
        // this.setTier= this.setTier.bind(this)
    }

    async componentDidMount(){
        const rawUser = await AsyncStorage.getItem(ASYNC_KEYS.token);
        if(rawUser == 'null' || rawUser == null) {
            this.props.navigation.navigate('Login')
        }else{
            this.setState({
                token: JSON.parse(rawUser)
            }) 
        }
    }

  


    render() {
        const {tierData } = this.props
        // console.log('get tier----',tierData)
        return (
            <View style={styles.container}>
                <Background>
                    <LGradient />
                    {
                        this.state.loading == false ?
                      <>
                        <Text style={{ alignSelf: 'center', color: '#fff', fontFamily: 'Quicksand', textAlign: 'center',marginTop:'30%'}}> Get the Pro tier to unlock this feature</Text>
                    <TouchableOpacity 
                                      
                                      style={{width:'83%',height:'33%',borderRadius:15,borderWidth:2,marginTop:'5%',
                                     alignSelf:'center',borderStartColor:'#CED978',borderBottomColor:'#CED978',borderRightColor:'#92B3D3',borderTopColor:'#92EBA5',}}>               
                                    <ImageBackground source={require('../assets/images/leaves.png')} style={{width:'100%',height:'100%',}} imageStyle={{borderRadius:10}}>
                                    <Text style={{alignSelf:'center',color:'#fff',fontSize:20,marginTop:5,padding:5}}> {tierData.name}</Text>
                                    <Text style={{fontSize:12,color:'#fff',alignSelf:'center',fontFamily:'Quicksand',marginTop:20,lineHeight:30}}>{tierData.description}</Text> 
             
                                    <Text style={{marginTop:'5%',color:'#fff',alignSelf:'center',fontFamily:'Quicksand'}}>{tierData.price}$/month</Text>
                                 
                                    </ImageBackground>
                          
                                     </TouchableOpacity> 

                    <TouchableOpacity onPress={()=> this.props.setTier()}
                        style={{ alignSelf: 'center', position: 'absolute', bottom: '25%' }}>
                        <ImageBackground source={require('../assets/images/button.png')} style={{ width: 185, height: 50, borderRadius: 60 }}>
                            <Text style={{ alignSelf: 'center', padding: 15, color: '#fff' }}>Get {tierData.name}</Text>

                        </ImageBackground>
                    </TouchableOpacity>
                    </>
                    :
                    <Image source={require('../assets/tenor.gif')} style={{width:30,height:30,alignSelf:'center',marginTop:'30%',borderRadius:85}} />

    }
                </Background>
            </View>

        )


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0E3932'
    },


});