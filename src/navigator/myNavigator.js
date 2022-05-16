import React from 'react';  
import { View,PixelRatio,Image, Platform} from 'react-native'; 
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer,createSwitchNavigator} from 'react-navigation';  
import BlankScreen9213199Navigator from '../features/BlankScreen9213199/navigator';


const StackNavigator = createStackNavigator({ 
    BlankScreen9213199Navigator:{
      screen: BlankScreen9213199Navigator ,
      navigationOptions: {
        headerShown: false
      }
    },  
    
      },
    
    
      );

      export default createAppContainer(StackNavigator);  