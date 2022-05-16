import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, AsyncStorage, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import LGradient from '../components/GradiantPart';
import { Background } from '../components/BackgroundDesign';
import { ProtierPart, StandardTierPart, SelectedProtier, SelectedStanderstier } from '../components/ProtirePart';
import { BASE_URL, API_URL } from '../config/Api';
import { storeIntoAsyncStorage } from '../config/Utils';
import { ASYNC_KEYS } from '../config/AsyncKeys';
import ProTierSelection from './ProTierSelection';

export default class Protier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            selectPro: false,
            selectStd: false,
            tierData: [],
            loading: false,
            id: ""
        }
        this.getTier = this.getTier.bind(this)
        this.setTier = this.setTier.bind(this)
    }
    async componentDidMount() {
        const rawUser = await AsyncStorage.getItem(ASYNC_KEYS.token);
        const rawUserData = await AsyncStorage.getItem(ASYNC_KEYS.user);
        const parseUser = JSON.parse(rawUserData)
        if(parseUser.tier == null){
            this.setState({
                id: 2
            })
        }else{
            this.setState({
                id: parseUser.tier.id
            })
        }

        if (rawUser == 'null' || rawUser == null) {
            this.props.navigation.navigate('Login')
        } else {
            this.setState({
                token: JSON.parse(rawUser),
            })
            console.log('tier id----------',this.state.token,)

            this.getTier()
        }
    }

    async getTier() {
        this.setState({
            loading: true
        })
        try {
            let response = await fetch(`${BASE_URL}${API_URL}user/get_tier/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Token ${this.state.token}`
                },
            });
            let res = await response.json();
            this.setState({
                tierData: res
            })
               console.log('tier------',this.state.tierData)
            this.setState({
                loading: false
            })
        } catch (error) {
            console.log('error ' + error);
        }
    }
    async setTier(){
        this.setState({
            loading:true
        })
        try {
            let response = await fetch(`${BASE_URL}${API_URL}user/set_tier/`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization':`Token ${this.state.token}`
              },
              body: JSON.stringify({
                id : this.state.id,
              })       
                 
            });
            let res = await response.json()
            await storeIntoAsyncStorage(
                ASYNC_KEYS.user , JSON.stringify(res)
            )
               this.setState({
              loading:false
            })
            this.props.navigation.navigate('Profile')
          } catch (error) {
            console.log('error ' + error);
          }
    }

    render() {
        const {user} = this.state
        return (
            <View style={styles.container}>
                <Background>
                    {
                        this.state.loading ?
                            <Image source={require('../assets/tenor.gif')} style={{ width: 30, height: 30, alignSelf: 'center', marginTop: '30%', borderRadius: 85 }} />

                            :
                            <ScrollView>

                                <LGradient />
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile')}>
                        <Icon name={'chevron-left'} size={30} style={{marginTop:'15%',marginLeft:'3%',color:'#fff'}}/>
                        </TouchableOpacity>
                                {this.state.tierData.map(i => {


                                    return (
                                        <TouchableOpacity  onPress={() => this.setState({
                                            id: i.id
                                        })}

                                            style={{
                                                width: '85%', height: i.id == 1 ? '33%' : '25%', marginTop: '10%', borderRadius: 15, borderWidth: 2,
                                                alignSelf: 'center', borderStartColor: '#CED978', borderBottomColor: '#CED978', borderRightColor: '#92B3D3', borderTopColor: '#92EBA5',
                                                opacity: 2
                                            }}>
                                                {
                                                    i.id == this.state.id? 
                                                    <ProTierSelection id ={i.id} name={i.name} description ={i.description} price={i.display_price}/>
                                                    :
                                                    <ImageBackground source={require('../assets/images/leaves.png')} style={{ width: '100%', height: '100%'}} imageStyle={{ borderRadius: 10 }}>
                                                    <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 20, marginTop: 5, padding: 5 }}> {i.name}</Text>
                                                    <Text style={{ fontSize: 12, color: '#fff', alignSelf: 'center', fontFamily: 'Quicksand', marginTop: 20, lineHeight: 30 }}>{i.description}</Text>
    
                                                    <Text style={{ marginTop: '5%', color: '#fff', alignSelf: 'center', fontFamily: 'Quicksand' }}>{i.display_price}$/month</Text>
                                                    <LinearGradient
                                                        style={{
                                                            width: '100%', height: '30%', opacity: 0.1, marginTop: 120
                                                        }}
                                                        colors={['transparent', '#0E3932', '#0E3932', 'transparent',]}
                                                    />
                                                </ImageBackground>
                                                }
      

                                        </TouchableOpacity>
                                    )



                                })}

                                <TouchableOpacity onPress={this.setTier}
                            style={{ alignSelf: 'center', marginTop: 25 }}>
                            <ImageBackground source={require('../assets/images/button.png')} style={{ width: 185, height: 50, borderRadius: 60 }}>
                                <Text style={{ alignSelf: 'center', padding: 15, color: '#fff' }}>CONFIRM</Text>
    
                            </ImageBackground>
                        </TouchableOpacity>
                            </ScrollView>

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