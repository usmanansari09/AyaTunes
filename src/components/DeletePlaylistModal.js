import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,TextInput,Image ,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {ASYNC_KEYS} from '../config/AsyncKeys';
import { BASE_URL , API_URL} from '../config/Api';

export default class DeletePlaylistModal extends Component {
    constructor(props) {
        super(props);
        this.state={
         deleteModal: false,
         token: "",
         deletePlaylist: this.props.showModalDP,
        }
        this.deletePlaylist = this.deletePlaylist.bind(this)
    }

    async componentDidMount(){
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        // console.log('userToken--------',userToken)
        if(userToken == 'null' || userToken == null) {
            this.props.navigation.navigate('Login')
        }else{
           this.setState({
               token: JSON.parse(userToken)
           })
        }
    }

    deletePlaylist= async()=>{
        const id = this.props.id_playlist
        try {
            let response = await fetch(`${BASE_URL}${API_URL}music/playlist/${id}/`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization':`Token ${this.state.token}`
              },
            });
            // console.log('response----',)
            // this.props.navigation.navigate('Playlists')
            
            this.props.showDPModalMethod()
            this.props.goback()
          } catch (error) {
            console.log('error ' + error);
          }
      
    }

   render (){
    return (
        <Modal
            isVisible={this.props.showModalDP}
            onBackdropPress={this.props.showDPModalMethod}
            backdropColor={'#0E3932'}
            backdropOpacity={0.2}
            animationInTiming={500}
            animationOutTiming={500}
            animationIn="slideInUp"
            style={{ justifyContent: "flex-end", margin: 0, width: '100%' }}>
            
              
                        <View style={styles.modalDesign2}>
                        <ImageBackground source={require('../assets/images/modal.png')} 
                       style={styles.background}
                       imageStyle={styles.backgroundStyle}>           
                           <Text style={[styles.mainText,{fontSize:14}]}>Delete this playlist ?</Text>
                           <Image source={require('../assets/images/remove.png')} style={{alignSelf:'center',width:40,height:40,marginTop:20}}/>
                           <View style={styles.viewStyle}>
                              <TouchableOpacity style={styles.button} onPress={()=> {
                                  this.props.showDPModalMethod()
                              }}>     
                              <Text style={{alignSelf:'center',color:'#fff',padding:7,fontSize:14}}>Cancel</Text>
                              </TouchableOpacity>
                              <ImageBackground source={require('../assets/images/buttonL.png')} style={{width:110,height:32}} imageStyle={{borderRadius:25}}>
                              <TouchableOpacity onPress={this.deletePlaylist}>     
                              <Text style={{alignSelf:'center',padding:7,fontSize:14}}>Delete</Text>
                              </TouchableOpacity>
                              </ImageBackground>
                          </View>
                        </ImageBackground>
          
                    </View>
               
                

                
        </Modal>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#033333'
    },
    modalDesign: { 
        width: '100%', 
        height: '60%',
         position: 'absolute', 
         bottom: 0, 
         backgroundColor: '#0E3932',
          alignSelf: 'center',
           borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
         },
         modalDesign2:{ width: '100%', height: '35%', position: 'absolute', bottom: 0, backgroundColor: '#0E3932', alignSelf: 'center', borderTopLeftRadius: 25, borderTopRightRadius: 25, },
         background:{ width: '100%', height: '100%', },
         backgroundStyle: { borderTopLeftRadius: 25, borderTopRightRadius: 25, },
         mainText:{ color: '#fff',alignSelf:'center',marginTop:25,fontSize:18,fontFamily:'Roboto-Regular'},
         newText:{ color: '#fff',alignSelf:'center',fontSize:14,fontFamily:'Roboto-Light' },
         itemText:{ color: '#fff',alignSelf:'center',fontSize:14,fontFamily:'Roboto-Light'},
         inputTextStyle: {marginTop:20,alignSelf:'center',width:'60%',backgroundColor:'#052923',height:35,borderRadius:25,paddingLeft:15,fontSize:12,opacity:0.6},
         viewStyle:{alignSelf:'center',width:'70%',flexDirection:'row',justifyContent:'space-around',marginTop:30},
         button:{width:110,height:32,borderRadius:25,backgroundColor:'#052923',opacity:0.7}

});