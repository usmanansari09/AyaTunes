import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View, Image, TouchableOpacity, TextInput, Dimensions, 
 } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class Backstory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artiest: true,
            album: false
        }
    }
    render() {
        console.log(this.props.backStory,'backstory-----')
        return (
            <View style={styles.container}>
           
     
                  <ImageBackground source={require('../assets/images/back.png')} 
                  style={styles.background}>
                 

                 <Image source={{uri:this.props.backImg}} style={{width:'100%',height:'30%',position:'absolute',top:0}}/>
                  <TouchableOpacity onPress={this.props.backPress} style={{alignSelf:'flex-start',marginLeft:12,height:'27%',marginTop:'7%'}}>
                     <Image source ={require('../assets/songs/back.png')}  
                     style={{width:30,height:35,marginTop:20}}/>
                     </TouchableOpacity>
                     <ImageBackground source={require('../assets/images/bb.png')} style={{width:'100%',height:'100%'}}>
                    <View style={{padding:15,alignSelf:'flex-start'}}>                 
                   <Text style={[styles.text,{fontSize:20}]}> {this.props.track}</Text>
                   <Text style={[styles.text,{padding:5}]}> {this.props.artist}</Text>
                   <Text style={[styles.text,{paddingLeft:5}]}> Picture: {this.props.artist}</Text>
                   <Text style={{padding:5,marginTop:25,color:'#fff',fontFamily:'Roboto-Light',fontSize:14}}>
                       {this.props.backStory}
                   {/* Although a familiar face for regular Diynamic event attendees of the last years, it is only now that Innellea is having his actual Diynamic record label debut. Hosting the ninth edition of Diynamic’s „Picture“ series, the Munich-based live-act, DJ and producer is bringing the influence of his melancholic club soundscapes that might best be described as a mix of cinematic and post-apocalyptic, combined with a very distinct novelty: using his own vocals. */}
                   </Text>
                          {/* <Text style={{color:'#00AAFF',fontSize:12,textAlign:'left',paddingLeft:5,paddingTop:15}}>
                          www.diynamic.com
                          </Text>
                          <Text style={{color:'#00AAFF',fontSize:12,textAlign:'left',paddingLeft:5,}}>
                          www.people-machines.com
                          </Text>
                          <Text style={{color:'#fff',fontSize:12,textAlign:'left',paddingLeft:5,paddingTop:25}}>
                          Facebook: <Text style={{color:'#00AAFF',fontSize:12,}}>https://www.facebook.com/innellea</Text>

                          </Text>
                          <Text style={{color:'#fff',fontSize:12,textAlign:'left',paddingLeft:5,}}>
                          Instagram: <Text style={{color:'#00AAFF',fontSize:12,}}>https://www.instagram.com/innellea/</Text>

                          </Text> */}
                   
                         </View>
                  </ImageBackground>
                  </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#052923'
    },
    gridView: {
        marginTop: 5,
        // flex: 1,
    },
    itemContainer: {
        borderRadius: 5,
        // padding: 10,
        height: 120,
        width: 115
    },
    itemName: {
        fontSize: 14,
        color: '#fff',
        fontFamily:'Roboto-Light',
        alignSelf: 'center'
    },
    itemName1: {
        fontSize: 10,
        color: '#fff',
        fontFamily:'Roboto-Light',
        alignSelf: 'center'
    },
    imageView1: {
        width: 95,
        height: 90,
        // marginTop: '15%',
        alignSelf: 'center',
        borderRadius: 15
    },
    background:{
        alignSelf:'center',
        width:'100%',
        height:'100%',
        opacity:0.8,

    },
    text:{
        color:'#fff',
        fontSize:12,
        textAlign:'left',
        fontFamily:'Roboto-Regular'
    },

});
