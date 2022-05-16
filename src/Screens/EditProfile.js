import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, AsyncStorage, Image,KeyboardAvoidingView ,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Item, Input, } from 'native-base';
import RadialGradient from 'react-native-radial-gradient';
import {storeIntoAsyncStorage} from '../config/Utils';
import LinearGradient from '../components/GradiantPart';
import { ProfileBackground } from '../components/BackgroundDesign';
import {ASYNC_KEYS} from '../config/AsyncKeys';
import { BASE_URL , API_URL} from '../config/Api';
import ImagePicker from 'react-native-image-picker';
import { withNavigationFocus } from "react-navigation";

 class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state={
       token:"",
       showText: false,
       profile_picture : "",
       profileData:{},
       name:"",
       email:"",
       newPassword:"",
       confirmPassword:"",
       id:",",
       imgUrl:"",
       showTextNP: false,
       showTextCP: false,
       errorMessage: "",
       profile_picture:"",
       loading:false,
   
    }
  this.editProfile= this.editProfile.bind(this)
  this.handleChoosePhoto= this.handleChoosePhoto.bind(this)
  this.getProfile= this.getProfile.bind(this)
  this.updateProfile = this.updateProfile.bind(this)
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      const userPicture = JSON.parse(await AsyncStorage.getItem(ASYNC_KEYS.profile_picture));
      this.state.profile_picture= userPicture
      console.log('prevProps----isFocused-----------------',prevProps.isFocused,this.state.profile_picture)
      this.props.getProfile()

    }
  }
  async componentDidMount(){
    const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
    const userPicture = JSON.parse(await AsyncStorage.getItem(ASYNC_KEYS.profile_picture));

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

async getProfile(){
  let response = await fetch(`${BASE_URL}${API_URL}user/get_user_profile/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization':`Token ${this.state.token}`
    },
  });
  let res = await response.json();
  if(response.status == 200){
      this.setState({
          profileData: res,
          id: res.id,
          name: res.name,
          email: res.email

      })
    }
}

async editProfile(img){
  this.setState({
    loading:true
  })
  try {
      let response = await fetch(`${BASE_URL}${API_URL}user/set_profile_picture/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization':`Token ${this.state.token}`
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
    console.log('profile_picture',this.state.profile_picture)
    } catch (error) {
      console.log('error --------' + error);
    }
 }


 handleChoosePhoto = async () => {
 
  const options = {
    noData: false,
    maxWidth: 100,
    maxHeight: 100,
    quality:0.7 
  }
  ImagePicker.launchImageLibrary(options, response => {
    if (response.uri) {
      // console.log(response)
      let img = 'jpeg;base64,'+response.data
      this.editProfile(img)
    }
 
  })
}

async updateProfile(){
// console.log('checked-----',this.state.profileData.email, this.state.profileData.name )
  const {  newPassword,confirmPassword,name,email} = this.state
  if(confirmPassword == newPassword){
    this.setState({
      errorMessage: "",
      email: this.state.profileData?.email,
      name: this.state.profileData?.name 
    })
  }else if (name == '') {
   this.setState({    
     name: this.state.profileData?.name 
    })
 
  } else if (email == ''){
    this.setState({
      email: this.state.profileData.email,
    })

  }else{
    this.setState({
      errorMessage: "password did not match",
    })
  }

  try {
    let response = await fetch(`${BASE_URL}${API_URL}user/${this.state.id}/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization':`Token ${this.state.token}`
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: confirmPassword
      })
    });
    this.props.onPress()
    this.getProfile()
    this.props.getProfile()
  } catch (error) {
    console.log('error --------' + error);
  }
}

  render() {
    return (
  
      <ProfileBackground>
        <LinearGradient />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "position" : "height"}
                    style={{flex:2,}}
                    >
        <View style={styles.mainView}>
          <RadialGradient
            style={{ width: 195, height: 200, alignSelf: 'center', borderRadius: 45, opacity: 0.2,marginTop:20 }}
            colors={['#3AE364', '#033333', '#70FF93', '#033333', '#033333', '#70FF93', '#033333']}
            center={[100, 100]}
            radius={200}>
          </RadialGradient>

          <ImageBackground source={require('../assets/images/backprofile.png')}
            style={{ alignSelf: 'center', width: 215, height: 200, marginTop: -200, }}>
           <TouchableOpacity onPress={this.handleChoosePhoto}>
           {
             this.state.profile_picture !== "" || this.state.loading == false? 
             <Image source={{uri: this.state.profile_picture == null ? "" : this.state.profile_picture}}
             style={{ width: 110, height: 110, alignSelf: 'center', marginTop: 45 ,borderRadius:85}} />
             :
             <Image source={require('../assets/images/loading.gif')}
             style={{ width: 105, height: 105, alignSelf: 'center', marginTop: 48,borderRadius:85 }} />
           } 

            {/* <TouchableOpacity onPress={this.handleChoosePhoto}>
              <Image source={require('../assets/images/Camera.png')}
              style={{ width: 25, height: 25, alignSelf: 'center', marginTop: -120 }} /> */}
              </TouchableOpacity>
          </ImageBackground>
      
          <View style={{ marginTop: '2%', height:350,backgroundColor:'#052923',borderBottomLeftRadius:30,borderBottomRightRadius:30}}>
            <Item enable style={styles.inputContainer}>
              <Input enable
                placeholder={this.state.profileData?.name ? this.state.profileData?.name : 'Name'}
                placeholderTextColor="#FFFFFF"
                defaultValue={this.state.profileData?.name ? this.state.profileData?.name : ''}
                style={styles.inputTextStyle}
                autoCapitalize='words'
                keyboardAppearance='dark'
                onChangeText= {item => this.setState({name:item})}

              />
            </Item>

            <Item enable style={styles.inputContainer}>
              <Input enable
                placeholder={this.state.profileData?.email ? this.state.profileData?.email : 'Email'}
                placeholderTextColor="#FFFFFF"
                style={styles.inputTextStyle}
                autoCapitalize='none'
                defaultValue={this.state.profileData?.email ? this.state.profileData?.email : ''}
                keyboardAppearance='dark'
                onChangeText= {item => this.setState({email:item})}

              />
            </Item>
            <Item enable style={styles.inputContainer}>
              <Input enable
                secureTextEntry={this.state.showTextNP? false:true}
                placeholder='New password'
                placeholderTextColor="#FFFFFF"
                style={styles.inputTextStyle}
                autoCapitalize='none'
                keyboardAppearance='dark'
                onChangeText= {item => this.setState({newPassword:item})}

              />
               <TouchableOpacity onPress={()=> this.setState({showTextNP:!this.state.showTextNP})}> 
              <Icon name="eye-off" size={15} color="white"
                style={{ paddingRight: 20, paddingTop: 5 }} />
                </TouchableOpacity>
            </Item>
            <Item enable style={styles.inputContainer}>
              <Input enable
                secureTextEntry={this.state.showTextCP? false:true}
                placeholder='Confirm new password'
                placeholderTextColor="#FFFFFF"
                style={styles.inputTextStyle}
                keyboardAppearance='dark'
                onChangeText= {item => this.setState({confirmPassword:item})}

              />
               <TouchableOpacity onPress={()=> this.setState({showTextCP:!this.state.showTextCP})}> 
              <Icon name="eye-off" size={15} color="white"
                style={{ paddingRight: 20, paddingTop: 5 }} />
                </TouchableOpacity>
            </Item>
            { this.state.errorMessage ? 
             <Text style={{alignSelf:'center',color:'red',padding:5,fontFamily:'Roboto-Regular'}}>{this.state.errorMessage}</Text>
             :
             null
            }
         
       
          <View style={styles.proView}>
            <Text style={{ color: '#fff', fontSize: 12 }}>
            Subscription tier: <Text style={{color:'#A5FF5F'}}>{this.state.profileData?.tier?.name.split(" ")[0]}</Text>
            </Text>
          </View>
     
         
          <TouchableOpacity onPress={()=> {this.updateProfile()}}
            style={{  alignSelf: 'center',position:'absolute',bottom:10}}>
            <ImageBackground source={require('../assets/images/button.png')}
              style={{ width: 185, height: 50, borderRadius: 60 }}>
              <Text style={{ alignSelf: 'center', padding: 15, color: '#fff' }}>SAVE</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>
          </View> 
          </KeyboardAvoidingView>
          
          </ScrollView>
       
      </ProfileBackground>

    )

  }
}
export default withNavigationFocus(Editprofile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#033333'
  },
  inputContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 10
  },
  inputTextStyle: {
    fontSize: 10,
    paddingLeft: 15,
    paddingTop: 15,
    color:'#fff',
    height:40,
    marginTop:-10
  },
  mainView: {
    width: '85%',
    alignSelf: 'center',
    height: '90%',
    borderRadius: 30,
    backgroundColor: '#052923',
    opacity: 0.8,
    marginTop: '5%',

  },
  proView: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});