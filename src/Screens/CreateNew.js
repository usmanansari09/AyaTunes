import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions , KeyboardAvoidingView, ScrollView, KeyboardAvoidingViewBase, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Item, Input, } from 'native-base';

import Button from '../components/Button';
import LinearGradient from '../components/GradiantPart';
import { Background } from '../components/BackgroundDesign';

export default class CreateNew extends Component {
    constructor(props) {
        super(props);
        this.state={
            newPassword:"",
            confirmPassword:"",
            showTextNP: false,
            showTextCP: false,
            errorMessage: "",
          }
    }
    render() {
        const { height } = Dimensions.get('window').height;
        const { width } = Dimensions.get('window').width;
        return (
            <View style={styles.container}>
                <Background>
                    <LinearGradient />
                    <ScrollView keyboardShouldPersistTaps='handled'>

                    <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "position" : "height"}
                    style={{flex:1,}}
                    >
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Reset')}>
                        <Icon name={'chevron-left'} size={30} style={{marginTop:'15%',marginLeft:'3%',color:'#fff'}}/>
                        </TouchableOpacity>
                    <Text style={styles.resetText}>CREATE A NEW PASSWORD</Text>


                    <View style={{ marginTop: '10%' }}>
                        <Item enable style={styles.inputContainer}>
                            <Input enable
                                placeholder='New password'
                                secureTextEntry={this.state.showTextNP? false:true}
                                placeholderTextColor="#FFFFFF"
                                style={styles.inputTextStyle}
                                keyboardAppearance='dark'
                                onChangeText= {item=> this.setState({newPassword:item})}


                            />
                               <TouchableOpacity onPress={()=> this.setState({showTextNP:!this.state.showTextNP})}> 
                               <Icon name="eye-off" size={15} color="white" style={{ paddingRight: 10, paddingTop: 20, opacity: 0.3 }} />
                               </TouchableOpacity> 
                            
                            </Item>
                        <Item enable style={styles.inputContainer}>
                            <Input enable
                                placeholder='Cosnfirm new password'
                                secureTextEntry={this.state.showTextCP? false:true}
                                placeholderTextColor="#FFFFFF"
                                style={styles.inputTextStyle}
                                keyboardAppearance='dark'
                                onChangeText= {item=> this.setState({confirmPassword:item})}

                            />
                               <TouchableOpacity onPress={()=> {
                                   this.setState({showTextCP:!this.state.showTextCP})
                               }}> 
                            <Icon name="eye-off" size={15} color="white" style={{ paddingRight: 10, paddingTop: 20, opacity: 0.3 }} />
                           </TouchableOpacity>
                        </Item>
                        { this.state.errorMessage ? 
             <Text style={{alignSelf:'center',color:'red',padding:5,fontFamily:'Roboto-Regular'}}>{this.state.errorMessage}</Text>
             :
             null
            }
                    </View>
                    <View style={{ marginTop: '50%' }}>
                        <Button title={'CREATE'} onPress={() => this.props.navigation.navigate('Login')} />
                    </View>

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
        lineHeight: 28,
        fontWeight: '400'
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