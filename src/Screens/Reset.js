import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, AsyncStorage,KeyboardAvoidingView,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Item, Input, } from 'native-base';

import Button from '../components/Button';
import LinearGradient from '../components/GradiantPart';
import { Background } from '../components/BackgroundDesign';
import { BASE_URL } from '../config/Api';
import MessageModal from '../components/MessageModal';
export default class Reset extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: "",
            message:"",
            showMessage: false
        }
        this.onReset= this.onReset.bind(this)
        this.toggleModal= this.toggleModal.bind(this)
    }

   async onReset(){
    try {
        let response = await fetch(`${BASE_URL}rest-auth/password/reset/`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            email : this.state.email,
          })
        });

        let res = await response.json()
        this.setState({
            message: res?.detail,
            showMessage:true
        })
    } catch (error) {
        console.log('error ' + error);
      }
    }

    toggleModal(){
        // const that = this
        this.setState({
            showMessage: !this.state.showMessage
        })
    }
   
    render() {

        return (
            <View style={styles.container}>
                <Background>
                    <LinearGradient />
                    <ScrollView keyboardShouldPersistTaps='handled'>

                    <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "position" : "height"}
                    style={{flex:1,}}
                    >
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Icon name={'chevron-left'} size={30} style={{marginTop:'15%',marginLeft:'3%',color:'#fff'}}/>
                        </TouchableOpacity>
                    <Text style={styles.resetText}>RESET YOUR PASSWORD</Text>
                    <Text style={{ color: '#fff', alignSelf: 'center', textAlign: 'center', width: '70%', marginTop: '7%' }}>Please enter your email below and we will send you instructions to reset your password</Text>
                    <View style={{ marginTop: '10%' }}>
                        <Item  style={styles.inputContainer}>
                            <Input 
                                defaultValue={this.state.email}
                                placeholder='Email'
                                placeholderTextColor="#FFFFFF"
                                style={styles.inputTextStyle}
                                keyboardAppearance='dark'
                                autoCapitalize='none'
                                onChangeText={(item)=> this.setState({email:item})}
                            />
                        </Item>


                    </View>
                    <View style={{ marginTop: '50%' }}>
                        <Button title={'SEND'} onPress={this.onReset} />
                    </View>
                    <MessageModal showMessage={this.state.showMessage} message={this.state.message} toggleModal={this.toggleModal} navigation={this.props.navigation}/>

     </KeyboardAvoidingView>
     </ScrollView>
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
        backgroundColor: '#033333'
    },
    resetText: {
        alignSelf: 'center',
        fontSize: 24,
        fontFamily: 'UnicaOne-Regular',
        color: '#fff',
        // marginTop: '20%',
        textAlign: 'center',
        width: '45%',
    },
    inputContainer: {
        width: '70%',
        alignSelf: 'center'
    },
    inputTextStyle: {
        fontSize: 12,
        paddingLeft: 20,
        paddingTop: 20,
        color:'#fff'
    }
});