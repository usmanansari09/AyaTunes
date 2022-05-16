import React, { Component } from 'react';
import { StyleSheet,Text,View ,ImageBackground,Image,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

export default class SongModal extends Component {
    constructor(props) {
        super(props);
        this.state={
          buttonOne: false,
          buttonTwo: false,
          buttonThree: false,
          butonFour: false
        }
        
    }
 
    render() {

        items= [
            {id:1,songSystem:'Normal audio'},
            {id:2,songSystem:'Spacial audio'},
            {id:3,songSystem:'Normal audio with guided meditation'},
            {id:4,songSystem:'Spacial audio with guided meditation'},

        ]
        return (
         <Modal 
         isVisible={this.props.showSModal}
         onBackdropPress={this.props.toggleSModal}
         backdropColor={'#0E3932'}
         backdropOpacity={0.4} 
         animationIn={'slideInRight'}
         animationOut={'slideOutRight'}
         >
            <View style={styles.mainView}>
            <ImageBackground  source={require('../assets/songs/modalB.png')} 
                  style={{
                    width:'100%',
                    height:'100%'
                    }} 
                    imageStyle={{
                    borderTopLeftRadius:15,
                    borderBottomLeftRadius:15
                    }}>
                    <TouchableOpacity onPress={this.props.toggleSModal}>
                    <Image source ={require('../assets/songs/menu.png')} 
                     style={{width:35,height:25,alignSelf:'flex-start',margin:5,marginLeft:'5%'}}/>
                     </TouchableOpacity>
                     
                     <View style={{flexDirection:'row',paddingTop:15,padding:5}}>
                     <Text style={styles.name}>Normal audio</Text>
                      <TouchableOpacity 
                      onPress={()=> this.setState({buttonOne:!this.state.buttonOne,buttonThree:false,buttonFour:false,buttonTwo:false,})}
                      style={{alignSelf:'center',paddingBottom:15}}
                      >
                        {
                          this.state.buttonOne ?
                          <Image source={require('../assets/songs/roundF.png')} style={{width:15,height:15,alignSelf:'center'}} />                 
                           :
                          <Image source={require('../assets/songs/round.png')} style={styles.icon} />                 

                        }
                      </TouchableOpacity>
                    </View>   
                    <View style={{flexDirection:'row',padding:5}}>
                     <Text style={styles.name}>Spacial audio</Text>
                      <TouchableOpacity 
                      onPress={()=> this.setState({buttonTwo:!this.state.buttonTwo,buttonThree:false,buttonOne:false,buttonFour:false,})}
                      style={{alignSelf:'center',paddingBottom:15}}
                      >
                        {
                          this.state.buttonTwo ?
                          <Image source={require('../assets/songs/roundF.png')} style={{width:15,height:15,alignSelf:'center'}} />                 
                           :
                          <Image source={require('../assets/songs/round.png')} style={styles.icon} />                 

                        }
                      </TouchableOpacity>
                    </View>  
                    <View style={{flexDirection:'row',padding:5}}>
                     <Text style={styles.name}>Normal audio with guided meditation</Text>
                      <TouchableOpacity 
                      onPress={()=> this.setState({buttonThree:!this.state.buttonThree,buttonOne:false,buttonTwo:false,buttonFour:false})}
                      style={{alignSelf:'center',paddingBottom:5}}
                      >
                        {
                          this.state.buttonThree ?
                          <Image source={require('../assets/songs/roundF.png')} style={{width:15,height:15,alignSelf:'center'}} />                 
                           :
                          <Image source={require('../assets/songs/round.png')} style={styles.icon} />                 

                        }
                      </TouchableOpacity>
                    </View> 
                    <View style={{flexDirection:'row',padding:5}}>
                     <Text style={styles.name}>Spacial audio with guided meditation</Text>
                      <TouchableOpacity 
                      onPress={()=> this.setState({buttonFour:!this.state.buttonFour,buttonThree:false,buttonOne:false,buttonTwo:false,})}
                      style={{alignSelf:'center',paddingBottom:5}}
                      >
                        {
                          this.state.buttonFour ?
                          <Image source={require('../assets/songs/roundF.png')} style={{width:15,height:15,alignSelf:'center'}} />                 
                           :
                          <Image source={require('../assets/songs/round.png')} style={styles.icon} />                 

                        }
                      </TouchableOpacity>
                    </View> 

             
            </ImageBackground>
            </View>
         </Modal>
        )

    }
}

const styles = StyleSheet.create({
   container:{
    //  flex:1
    },
    mainView:{backgroundColor:'#052923',height:'40%',width:'55%',position:'absolute',top:'4%',right:'-7%',borderTopLeftRadius:15,borderBottomLeftRadius:15},
    name:{width:'80%',color:'#fff',fontFamily:'Roboto-Regular',paddingLeft:'5%',height: 40 },
    icon:{width:15,height:15,alignSelf:'center'},


});