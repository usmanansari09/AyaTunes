import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native";
import DateTimePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { CheckBox } from 'react-native-elements';
import {SlideMenuIcon} from '../../../navigator/slideMenuIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Blank extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    };
  };
  
  state = {
    loading: false,
    email: "",
    password: ""
  };

//   render = () => (
//     <View style={styles.container}>
//       <Text>This is your new component</Text>
//     </View>
//   );
// }

render (){
  const {navigation}= this.props
  return (
    
      <View style={loginStyle.container}>

          {
                       (this.state.loading)?               
                       <View style = {{alignSelf:'center',justifyContent:'center',flex:1}}>
                           <ActivityIndicator size = "large" color="#1C96EB"/>
                       </View>: null
          }
          <ImageBackground source={{uri:"https://i.pinimg.com/564x/21/ab/ea/21abea24e4a738b0d96d33c0f7ea80f2.jpg"}} style={{height:'100%',width:'100%',alignSelf:'center'}}>
          <View
              style={loginStyle.header}
          >
              <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_WsiXRs4Lecvm4626jhT8oYQCOinBgmvn4Q&usqp=CAU"}} style={{ width: 80, height: 80, alignSelf: 'center' ,borderRadius:85}} />
          </View>
          <View style={loginStyle.footer}>
          <Text style={loginStyle.text_footer1}>Reset Password</Text>
          <Text style={loginStyle.text_footer}>New Password  *</Text>

              <View style={loginStyle.action}>
              <FontAwesome
                      name="lock"
                      size={20}
                      color={'#91dd94'}
                      style={{marginTop:10}}
                  />
                  <TextInput
                      placeholder="*****"
                      style={loginStyle.textInput}
                      autoCapitalize="none"
                      onChangeText={(value) => this.setState({email:value})}
                  />
              </View>
              <Text style={[loginStyle.text_footer, { marginTop: 10 }]}>Confirm Password  *</Text>
              <View style={loginStyle.action}>
                  <FontAwesome
                      name="lock"
                      size={20}
                      color={'#91dd94'}
                      style={{marginTop:10}}
                  />
                  <TextInput
                      placeholder="*****"
                      style={loginStyle.textInput}
                      secureTextEntry={true}
                      onChangeText={(value) => this.setState({password:value})}
                  />
              </View>

              <View style={loginStyle.button}>
                  <TouchableOpacity
                      onPress={this.userLogin}
                      style={[loginStyle.signIn, {
                          backgroundColor: '#4caf50',
                          marginTop: 5
                      }]}
                  >
                      <Text style={[loginStyle.textSign, {
                          color: '#fff'
                      }]}>Reset </Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                      onPress={() => navigation.navigate("SignUp")}
                      style={[loginStyle.signIn, {
                          borderColor: '#4caf50',
                          borderWidth: 2,
                          marginTop: 15
                      }]}
                  >
                      <Text style={[loginStyle.textSign, {
                          color: '#4caf50'
                      }]}>Sign Up</Text>
                  </TouchableOpacity> */}
              </View>
              {/* <TouchableOpacity style={{alignSelf:'center',flexDirection:'row'}}>
                  <Text style={{ color: '#4caf50', marginTop: 15, }}>Already have an account?</Text>
                  <Text style={{ color: '#4caf50', marginTop: 15, fontWeight:'bold' ,marginLeft:15}}>Login</Text>

              </TouchableOpacity> */}
          </View>
          </ImageBackground>
      </View>
  );

}
}
const loginStyle = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  header: {
      // flex: 2,
      marginTop:'10%'
  },
  footer: {
      // flex: 1,
      backgroundColor: '#fff',
      marginBottom:'20%',
      padding:'5%',
      margin:'5%',
      marginTop:'20%',
      borderRadius:30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
    color: '#4caf50',
    fontSize: 15 ,
},
  text_footer1: {
      color: '#4caf50',
      fontSize: 18 ,
       alignSelf:'center',
      fontWeight:'bold',
      marginBottom:'10%'
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -5,
      paddingLeft: 10,
      color: '#05375a',
  },
  action: {
      flexDirection: 'row',
      marginTop: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  signIn: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }

});
