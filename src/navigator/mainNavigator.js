import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { View, Text, Button } from "react-native"
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SplashScreen from "../features/SplashScreen"
import SideMenu from "./sideMenu"
//@BlueprintImportInsertion
import BlankScreen9213199Navigator from '../features/BlankScreen9213199/screens/blank';
import BlankScreen8213120Navigator from '../features/BlankScreen8213120/screens/blank';
import BlankScreen7213119Navigator from '../features/BlankScreen7213119/navigator';
import BlankScreen6213118Navigator from '../features/BlankScreen6213118/navigator';
import BlankScreen5213117Navigator from '../features/BlankScreen5213117/navigator';
import BlankScreen4213116Navigator from '../features/BlankScreen4213116/navigator';
import BlankScreen3213115Navigator from '../features/BlankScreen3213115/navigator';
import BlankScreen2213114Navigator from '../features/BlankScreen2213114/navigator';
import BlankScreen1213113Navigator from '../features/BlankScreen1213113/navigator';
import BlankScreen0213108Navigator from '../features/BlankScreen0213108/navigator';

/**
 * new navigators can be imported here
 */

const AppNavigator = {
  //@BlueprintNavigationInsertion
  BlankScreen9213199: { screen: BlankScreen9213199Navigator },
  BlankScreen8213120: { screen: BlankScreen8213120Navigator },
  BlankScreen7213119: { screen: BlankScreen7213119Navigator },
  BlankScreen6213118: { screen: BlankScreen6213118Navigator },
  BlankScreen5213117: { screen: BlankScreen5213117Navigator },
  BlankScreen4213116: { screen: BlankScreen4213116Navigator },
  BlankScreen3213115: { screen: BlankScreen3213115Navigator },
  BlankScreen2213114: { screen: BlankScreen2213114Navigator },
  BlankScreen1213113: { screen: BlankScreen1213113Navigator },
  BlankScreen0213108: { screen: BlankScreen0213108Navigator },

  /** new navigators can be added here */
  SplashScreen: {
    screen: SplashScreen
  }
}
// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

const Drawer = createDrawerNavigator()

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Blank" component={BlankScreen9213199Navigator} />
        <Drawer.Screen name="Notifications" component={BlankScreen8213120Navigator} />
      </Drawer.Navigator>
      {/* <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
        {Object.keys(AppNavigator).map(s => (
          <Drawer.Screen name={s} component={AppNavigator[s].screen} />
        ))}
      </Drawer.Navigator> */}
    </NavigationContainer>
  )
}

const AppStackNavigator = createSwitchNavigator({
  BlankScreen8213120Navigator: BlankScreen8213120Navigator,
  // SignIn:SignIn,
  AppContainer: AppContainer,


},
  {
    initialRouteName: 'BlankScreen8213120Navigator'
  }

)

export default createAppContainer(AppStackNavigator);
