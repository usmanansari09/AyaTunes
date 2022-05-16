import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,TextInput,Image ,AsyncStorage,KeyboardAvoidingView, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {ASYNC_KEYS} from '../config/AsyncKeys';
import { BASE_URL , API_URL} from '../config/Api';

export default class MessageModal extends Component {
    constructor(props) {
        super(props);
        this.state={
        loading: false,

        }
        this.clickOk= this.clickOk.bind(this)
        // this.createPlaylist= this.createPlaylist.bind(this)

    }

  clickOk(){
    //   this.setState({
    //       loading: true
    //   })
    // console.log(this.props.showMessage)
      this.props.navigation.navigate('Login')
    //   this.setState({
    //       loading:false
    //   })
      this.props.toggleModal()
  }


 
   render (){
    return (
    
        <Modal
            isVisible={this.props.showMessage}
            onBackdropPress={this.props.toggleModal}
            backdropColor={'#0E3932'}
            backdropOpacity={0.9}
            // animationInTiming={500}
            // animationOutTiming={500}
            // animationIn="slideInUp"
            style={{ justifyContent: "center", margin: 0, width: '80%',height:'20%' ,alignSelf:'center'}}>

              {
                  this.state.loading ? 
                  <Image source={require('../assets/tenor.gif')} style={{width:30,height:30,alignSelf:'center',marginTop:'30%',borderRadius:85}} />
                        :
                  <View style={styles.modalDesign}>
                  <ImageBackground source={require('../assets/images/modalB.png')} 
                     style={styles.background}
                      imageStyle={styles.backgroundStyle}>
                          <Text style={{textAlign:'center',margin:'5%',color:'#fff'}}>{this.props.message}</Text>
                         <View style={{width:'90%',backgroundColor:'#fff',height:1,marginTop:10,alignSelf:'center'}}/>
                         <View style={styles.viewStyle}>
                         <TouchableOpacity onPress={this.clickOk}
                         style={styles.button} 
                        >     
                         <Text style={{alignSelf:'center',color:'#fff',padding:7,fontSize:14}}>Ok</Text>
                         </TouchableOpacity>
                       
                     </View>
                  </ImageBackground>
              </View>
              

              }
                 

           
                 
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
        width: '90%', 
        height: '18%',
        borderRadius:10,
         backgroundColor: '#0E3932',
          alignSelf: 'center',
         },
         modalDesign2:{ width: '100%', height: '35%', position: 'absolute', bottom: 0, backgroundColor: '#0E3932', alignSelf: 'center', borderTopLeftRadius: 25, borderTopRightRadius: 25, },
         background:{ width: '100%', height: '95%', },
         backgroundStyle: { borderRadius:10},
         mainText:{ color: '#fff',alignSelf:'center',marginTop:25,fontSize:18,fontFamily:'Roboto-Regular'},
         newText:{ color: '#fff',alignSelf:'center',fontSize:14,fontFamily:'Roboto-Light' },
         itemText:{ color: '#fff',alignSelf:'center',fontSize:14,fontFamily:'Roboto-Light'},
         inputTextStyle: {marginTop:20,alignSelf:'center',width:'60%',backgroundColor:'#052923',height:35,borderRadius:25,paddingLeft:15,fontSize:12,opacity:0.6,color:'#fff'},
         viewStyle:{alignSelf:'center',width:'70%',flexDirection:'row',justifyContent:'space-around',marginTop:30},
         button:{width:110,height:32,borderRadius:25,backgroundColor:'#052923',opacity:0.7}

});