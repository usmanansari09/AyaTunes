import React from 'react' ;
import { View, ImageBackground } from 'react-native';

export const Background=(props)=> {
return (

    <ImageBackground source={require('../assets/images/background.png')} 
    style={{width:'100%',height:'100%',alignSelf:'center'}}>
        {props.children}
    </ImageBackground>
)
}

export const ProfileBackground =(props)=> {
    return (
    
        <ImageBackground source={require('../assets/images/profileBackground.png')} 
        style={{width:'100%',height:'100%',alignSelf:'center'}}>
            {props.children}
        </ImageBackground>
    )
    }

    export const BrowseBackground =(props)=> {
        return (
        
            <ImageBackground source={require('../assets/images/browseBackground.png')} 
            style={{width:'100%',height:'100%',alignSelf:'center'}}>
                {props.children}
            </ImageBackground>
        )
        }

// export default BackgroundDesign;