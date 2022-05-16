import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const ProtierPart=(props)=>{
 
        return (
           <TouchableOpacity style={{width:'85%',height:'33%',marginTop:'20%',borderRadius:15,borderWidth:2,
           alignSelf:'center',borderStartColor:'#CED978',borderBottomColor:'#CED978',borderRightColor:'#92B3D3',borderTopColor:'#92EBA5'}}>               
          <ImageBackground source={require('../assets/images/leaves.png')} style={{width:'100%',height:250,borderRadius:40,}}>
          <Text style={{alignSelf:'center',color:'#fff',fontSize:20,marginTop:5,padding:5}}> Pro Tier</Text>
          <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> access all songs in both normal and spatial/3D mode</Text> </Text>
          <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> make bookmarks to save favourite parts from songs</Text> </Text>
          <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> create custom playlist</Text> </Text>
          <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> share custom playlists with other users</Text> </Text>
          <Text style={{marginTop:'5%',color:'#fff',alignSelf:'center',fontFamily:'Quicksand'}}>20$/month</Text>
          <LinearGradient
                    style={{
                        width: '100%', height: '30%', opacity: 0.1,marginTop:120
                    }}
                    colors={['transparent', '#0E3932','#0E3932', 'transparent',]}
                />
          </ImageBackground>

           </TouchableOpacity>
        )

  
}

export const StandardTierPart=(props)=>{
    return(
        <TouchableOpacity style={{marginTop:'10%',width:'85%',height:'22%',borderRadius:15,borderWidth:1,alignSelf:'center',borderColor:'#A5FF5F'}}>
        <Text style={{alignSelf:'center',color:'#fff',fontSize:20,marginTop:5,padding:5}}> Standard Tier</Text>
        <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> access all songs in both normal and spatial/3D mode</Text> </Text>
        <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> make bookmarks to save favourite parts from songs</Text> </Text>
        <Text style={{marginTop:'10%',color:'#fff',alignSelf:'center',fontFamily:'Quicksand'}}>6$/month</Text>

      </TouchableOpacity>
    )
}

export const SelectedProtier =(props)=>{
    return(
    <TouchableOpacity style={{width:'85%',height:'33%',marginTop:'20%',borderRadius:15,borderWidth:2,
    alignSelf:'center',borderStartColor:'#CED978',borderBottomColor:'#CED978',borderRightColor:'#92B3D3',borderTopColor:'#92EBA5',}}> 

       <LinearGradient
                    style={{
                        width: '100%', height: '100%', opacity: 0.7, alignSelf: 'center',borderRadius:15
                    }}
                    colors={[ '#8DCEC2', '#8DCEC2', '#A3D1D2', '#8DCEC2', '#8DCEC2',]}
                >  
                 <ImageBackground source={require('../assets/images/leaves.png')} style={{width:'100%',height:250,borderRadius:40,}}>
   <Text style={{alignSelf:'center',color:'#fff',fontSize:20,marginTop:5,padding:5}}> Pro Tier</Text>
   <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> access all songs in both normal and spatial/3D mode</Text> </Text>
   <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> make bookmarks to save favourite parts from songs</Text> </Text>
   <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> create custom playlist</Text> </Text>
   <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> share custom playlists with other users</Text> </Text>
   <Text style={{marginTop:'5%',color:'#fff',alignSelf:'center',fontFamily:'Quicksand'}}>20$/month</Text>
   <LinearGradient
             style={{
                 width: '100%', height: '30%', opacity: 0.1,marginTop:120
             }}
             colors={['transparent', '#0E3932','#0E3932', 'transparent',]}
         />
   </ImageBackground>
  </LinearGradient>
    </TouchableOpacity>
    )
}

export const SelectedStanderstier=(props)=>{
    return(
        <TouchableOpacity style={{marginTop:'10%',width:'85%',height:'22%',borderRadius:15,borderWidth:1,alignSelf:'center',borderColor:'#A5FF5F'}}>
             <LinearGradient
                    // colors={['#FFFB9A','transparent', ]}
                    style={{
                        width: '100%', height: '100%', opacity: 0.7, alignSelf: 'center',borderRadius:15
                    }}
                    // start={{ x: 0.0, y: 0.0 }} end={{ x: 0.50, y: 0.50 }}
                    //   locations={[0,0.5,0.6]}
                    colors={[ '#8DCEC2', '#8DCEC2', '#A3D1D2', '#8DCEC2', '#8DCEC2',]}
                > 
        <Text style={{alignSelf:'center',color:'#fff',fontSize:20,marginTop:5,padding:5}}> Standard Tier</Text>
        <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> access all songs in both normal and spatial/3D mode</Text> </Text>
        <Text style={styles.bullet}>{'\u2B24'}   <Text style={{fontSize:12}}> make bookmarks to save favourite parts from songs</Text> </Text>
        <Text style={{marginTop:'10%',color:'#fff',alignSelf:'center',fontFamily:'Quicksand'}}>6$/month</Text>
  </LinearGradient>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bullet:{
        color:'#fff',
        fontSize:6,
       alignSelf:'center',
       width:'90%',
        marginTop:15,
        fontFamily:'Quicksand'

    },
})


