import React, { Component } from 'react';
import { StyleSheet,Text,View} from 'react-native';
import {Button} from 'native-base';

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <Button rounded style={{
               backgroundColor:'#099999',
               alignSelf:'center',
               width:170,
               padding:20
               }}
               onPress={this.props.onPress} 
               >          
            <Text style={styles.titleText}>{this.props.title}</Text>
          </Button>   
        )

    }
}

const styles = StyleSheet.create({
   titleText:{
       alignSelf:'center',
       alignContent:'center',
       textAlign:'center',
       fontFamily:'UnicaOne-Regular',
       color:'#fff',
       fontSize:20,
       width:'100%',   

    }
});