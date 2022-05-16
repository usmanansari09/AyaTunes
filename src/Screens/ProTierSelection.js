import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, AsyncStorage, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LGradient from '../components/GradiantPart';
import { Background } from '../components/BackgroundDesign';
import { ProtierPart, StandardTierPart, SelectedProtier, SelectedStanderstier } from '../components/ProtirePart';
import { BASE_URL, API_URL } from '../config/Api';
import { storeIntoAsyncStorage } from '../config/Utils';
import { ASYNC_KEYS } from '../config/AsyncKeys';

export default class ProTierSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            selectPro: false,
            selectStd: false,
            // id: this.props.navigation.getParam('id', 1),
            // name: this.props.navigation.getParam('name', ""),
            // description: this.props.navigation.getParam('description', ""),
            // price: this.props.navigation.getParam('price', ""),
            loading: false,
        }
        // this.getTier= this.getTier.bind(this)
    }
    async componentDidMount() {
        // const rawUser = await AsyncStorage.getItem(ASYNC_KEYS.token);
        // if(rawUser == 'null' || rawUser == null) {
        //     this.props.navigation.navigate('Login')
        // }else{
        //     this.setState({
        //         token: JSON.parse(rawUser)
        //     }) 
        //     this.getTier()         
        // }
        // console.log('this------', )
    }

    // async getTier(){
    //     this.setState({
    //       loading:true
    //     })
    //    try {
    //        let response = await fetch(`${BASE_URL}${API_URL}user/get_tier/`, {
    //          method: 'GET',
    //          headers: {
    //            'Accept': 'application/json',
    //            'Content-type': 'application/json',
    //            'Authorization':`Token ${this.state.token}`
    //          },
    //        });
    //        let res = await response.json();
    //        this.setState({
    //            tierData: res
    //        })
    //     //    console.log('tier------',this.state.tierData)
    //        this.setState({
    //          loading:false
    //        })
    //      } catch (error) {
    //        console.log('error ' + error);
    //      }
    //   }
    render() {
        return (
            // <View style={styles.container}>
            //     {/* <Background> */}


            //             <LGradient />
            <LinearGradient
                    style={{
                        width: '100%', height: '100%', opacity: 0.5, alignSelf: 'center',borderRadius:15,
                    }}
                    colors={[ '#8DCEC2', '#8DCEC2', '#A3D1D2', '#8DCEC2', '#8DCEC2',]}
                >

            <TouchableOpacity

                style={{
                    width: '100%', height: '100%', borderRadius: 15, borderWidth: 2,
                    alignSelf: 'center', borderStartColor: '#CED978', borderBottomColor: '#CED978', borderRightColor: '#92B3D3', borderTopColor: '#92EBA5',
                }}>
                <ImageBackground source={require('../assets/images/leaves.png')} style={{ width: '100%', height: '100%', }} imageStyle={{ borderRadius: 10 }}>
                    <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 20, marginTop: 5, padding: 5 }}> {this.props.name}</Text>
                    <Text style={{ fontSize: 12, color: '#fff', alignSelf: 'center', fontFamily: 'Quicksand', marginTop: 20, lineHeight: 30 }}>{this.props.description}</Text>

                    <Text style={{ marginTop: '5%', color: '#fff', alignSelf: 'center', fontFamily: 'Quicksand' }}>{this.props.price}$/month</Text>
                    <LinearGradient
                        style={{
                            width: '100%', height: '30%', opacity: 0.1, marginTop: 120
                        }}
                        colors={['transparent', '#0E3932', '#0E3932', 'transparent',]}
                    />
                </ImageBackground>

            </TouchableOpacity>

           </LinearGradient>
                           
                         
    
        
        //                 {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('GetProTier',{
        //                       id: this.state.id,
        //                       name: this.state.name,
        //                       description: this.state.description,
        //                       price: this.state.price
        //                 })}
        //                     style={{ alignSelf: 'center', marginTop: 35 }}>
        //                     <ImageBackground source={require('../assets/images/button.png')} style={{ width: 185, height: 50, borderRadius: 60 }}>
        //                         <Text style={{ alignSelf: 'center', padding: 15, color: '#fff' }}>CONFIRM</Text>
    
        //                     </ImageBackground>
        //                 </TouchableOpacity> */}


        // {/* </Background> */ }
        //     // </View>

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