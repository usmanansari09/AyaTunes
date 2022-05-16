import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity,Dimensions,Image,AsyncStorage } from 'react-native';
import  Icon  from 'react-native-vector-icons/Feather';
import {Item, Input,} from 'native-base';
import RadialGradient from 'react-native-radial-gradient';
import Editprofile from './EditProfile';
import LinearGradient from '../components/GradiantPart';
import {ProfileBackground} from '../components/BackgroundDesign';
import {storeIntoAsyncStorage} from '../config/Utils';
import {ASYNC_KEYS} from '../config/AsyncKeys';
import { BASE_URL , API_URL} from '../config/Api';
import ImagePicker from 'react-native-image-picker';
import { withNavigationFocus } from "react-navigation";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
          token: "",
          profileData:null,
          showEditProfile:false,
          loading: false,
          profile_picture:""
        }
        this.getProfile = this.getProfile.bind(this)
        this.logOut = this.logOut.bind(this)
        this.handleChoosePhoto= this.handleChoosePhoto.bind(this)
        this.editProfile= this.editProfile.bind(this)


    }


    async componentDidMount(){
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        const userPicture = JSON.parse(await AsyncStorage.getItem(ASYNC_KEYS.profile_picture));
        //  this.state.profile_picture= userPicture
         if(userToken == 'null' || userToken == null) {
            this.props.navigation.navigate('Login')
        }else{
           this.setState({
               token: JSON.parse(userToken),
               profile_picture: userPicture

           })
        }
        this.getProfile()
    }

    async componentDidUpdate(prevProps) {
      if (prevProps.isFocused !== this.props.isFocused) {
        const userPicture = JSON.parse(await AsyncStorage.getItem(ASYNC_KEYS.profile_picture));
        this.state.profile_picture= userPicture
        console.log('prevProps----isFocused-----------------',prevProps.isFocused,)
        this.getProfile()

      }
    }
  //   componentDidUpdate(prevProps) {
  //     if (this.props.isFocused) {
  //       this.getProfile()
  // }

    // }

   async getProfile(){

    try {
        let response = await fetch(`${BASE_URL}${API_URL}user/get_user_profile/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization':`Token ${this.state.token}`
          },
        });
        let res = await response.json();
        // console.log('res profile------',res)
            this.setState({
                profileData: res,
            })
          
      } catch (error) {
        console.log('error ' + error);
      }
   }

   async editProfile(img){
    this.setState({
      loading:true
    })
    let token = this.state.token
    try {
        let response = await fetch(`${BASE_URL}${API_URL}user/set_profile_picture/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization':`Token ${token}`
          },
          body: JSON.stringify({
            image: img
          })
        });
        let res = await response.json()
        await storeIntoAsyncStorage(
          ASYNC_KEYS.user , JSON.stringify(res)
      )       
       await storeIntoAsyncStorage(
          ASYNC_KEYS.profile_picture , JSON.stringify(res.profile_picture)
      )
      const userPicture = JSON.parse(await AsyncStorage.getItem(ASYNC_KEYS.profile_picture));
      this.state.profile_picture= userPicture
      this.setState({
        profile_picture: userPicture,
        loading:false
      })
      // console.log('profile_picture-------',userPicture,this.state.profile_picture,)
      } catch (error) {
        console.log('error --------' + error);
      }
   }

  async handleChoosePhoto() {
    // alert('called---')

   const options = {
     noData: false,
     maxWidth: 100,
     maxHeight: 100,
     quality:0.7
       }
   let img = "";
   ImagePicker.launchImageLibrary(options, response => {
     if (response.uri) {
       // console.log(response)
        img = 'jpeg;base64,'+response.data
        // console.log('img-----',img)
        this.editProfile(img)
     }
  
  
   })
 }
    async logOut(){
      const {navigation} = this.props
      navigation.navigate('Login');
      await AsyncStorage.removeItem(ASYNC_KEYS.token);
      await AsyncStorage.removeItem(ASYNC_KEYS.user);
      await AsyncStorage.removeItem(ASYNC_KEYS.profile_picture);


    }


    render() {
      const {navigation }= this.props
      // console.log(this.props.navigation);
        return (
       <View style={styles.container}>
           {
               this.state.showEditProfile == false?
            
               <ProfileBackground>
               <LinearGradient/> 
                <View style={styles.mainView}>
                <RadialGradient 
                              style={{width:200,height:200,alignSelf:'center',borderRadius:45,opacity:0.2,marginTop:20}}
                              colors={['#3AE364','#033333','#70FF93','#033333','#033333','#70FF93','#033333']}
                              center={[100,100]}
                              radius={200}>
                </RadialGradient>
                <ImageBackground source={require('../assets/images/backprofile.png')} style={{alignSelf:'center',width:220,height:200,marginTop:-200,}}>
                  <TouchableOpacity onPress={this.handleChoosePhoto}>
                  { this.state.profile_picture == "" || this.state.loading ?
                    <Image source={require('../assets/images/loading.gif')} style={{width:50,height:50,alignSelf:'center',marginTop:75,borderRadius:85}} />
                                :
                     <Image source={{uri: this.state.profile_picture == null ? "" :this.state.profile_picture}} style={{width:110,height:110,alignSelf:'center',marginTop:45,borderRadius:85}} />

                }
                </TouchableOpacity>
                  {/* <Image source={require('../assets/images/Camera.png')} style={{width:25,height:25,alignSelf:'center',marginTop:-125}}/> */}
                </ImageBackground>
                <Text style={{alignSelf:'center',color:'#fff',fontSize:24,marginTop:5}}>{this.state.profileData !== null ? this.state.profileData.name : ""}</Text>
      
                <View style={{marginTop:'2%'}}>
             <Item disabled  style={styles.inputContainer}>
                  <Input disabled 
                  placeholder='test@gmail.com' 
                  placeholderTextColor="#FFFFFF"
                  style={styles.inputTextStyle}
                  defaultValue={this.state.profileData !== null ? this.state.profileData.email: ""}
                  keyboardAppearance='dark'
                  />
                </Item>
      
                <Item disabled style={styles.inputContainer}>
                  <Input disabled 
                  placeholder='*****************' 
                  placeholderTextColor="#FFFFFF"
                  style={styles.inputTextStyle}
                  keyboardAppearance='dark'
                  />
                 {/* <Icon name="eye-off" size={15} color="white" style={{paddingRight:20,paddingTop:20}}/> */}
                </Item>
                </View>
      
                <View style={styles.proView}>
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('Protier')}>
                <Text style={{color:'#fff',fontSize:12}}>
                    Subscription tier: <Text style={{color:'#A5FF5F'}}>{this.state.profileData?.tier?.name.split(" ")[0]}</Text>
                </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({showEditProfile: true})}>
                <Image source={require('../assets/images/pencilgroup.png')} 
                style={{width:30,height:30}}></Image>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.logOut}
                style={{position:'absolute',alignSelf:'center',bottom:15}}>
                <Text style={{alignSelf:'center',color:'#fff',fontWeight:'bold'}}>Log out</Text>
                </TouchableOpacity>
                </View>
                </ProfileBackground>  
                :
                <Editprofile onPress={()=> this.setState({showEditProfile: false})} getProfile={this.getProfile}/>
                
           }
       
         </View>
        )

    }
}
export default withNavigationFocus(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#033333'       
    },
    inputContainer:{
        width:'85%',
        alignSelf:'center'
      },
      inputTextStyle:{
          fontSize:10,
          paddingLeft:15,
          paddingTop:30,
          color:'#fff'
      },
     mainView:{
         width:'85%',
         alignSelf:'center',
         height:'70%',
         position:'absolute',
         top:'5%',
         borderRadius:30,
         backgroundColor:'#052923',
         opacity:0.8,
         marginTop: '10%',
        },
        proView:{
            width:'80%',
            alignSelf:'center',
            marginTop:30,
            flex:0.40,
            flexDirection:'row',
            justifyContent:'space-between'
        }
});