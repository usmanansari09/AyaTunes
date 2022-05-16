import React from 'react';
import { View, PixelRatio, Image, Platform, ImageBackground } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import CreateNew from '../Screens/CreateNew';
import Reset from '../Screens/Reset';
import EditProfile from '../Screens/EditProfile';
import Profile from '../Screens/Profile';
import Protier from '../Screens/Protier';
import BrowseByMood from '../Screens/BrowseByMood';
import GetProTier from '../Screens/GetProTier';
import BrowseByAlbum from '../Screens/BrowserByAlbum';
import Playlists from '../Screens/Playlists';
import Playlist from '../components/Playlist';
import Bookmark from '../Screens/Bookmark';
import Song from '../Screens/Song';
import Backstory from '../Screens/Backstory';
import SelectedArtistPage from '../Screens/SelectedArtiestPage';
import SingleSong from '../Screens/SingleSong';
import BookmarkModal from '../components/BookmarkModal';
import ProTierSelection from '../Screens/ProTierSelection';

const StackNavigator = createStackNavigator({

  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },
  CreateNew: {
    screen: CreateNew,
    navigationOptions: {
      headerShown: false
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false
    }
  },
  Reset: {
    screen: Reset,
    navigationOptions: {
      headerShown: false
    }
  },
  // Protier: {
  //   screen: Protier,
  //   navigationOptions: {
  //     headerShown: false
  //   }
  // },

},

);

function getDp() {
  if (PixelRatio.get() && Platform.OS == "android" || Platform.OS == 'web') {
    return 2;
  }
  return PixelRatio.get();
}


const TabNavigator = createBottomTabNavigator(
  {
    BrowseByAlbum: {
      screen: BrowseByAlbum,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          if (focused) {
            return (
              <Image
                source={require('../assets/icons/playlistF.png')}
                style={{ width: 28, height: 28 ,}}
                tintColor={tintColor} />
            )
          } else {
            return (
              <Image
                source={require('../assets/icons/playlist.png')}
                style={{ width: 28, height: 28 }}
                tintColor={tintColor} />
            )
          }
        }
      }
    },
    Playlists: {
      screen: Playlists,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          if (focused) {
            return (
              <Image
                source={require('../assets/icons/discF.png')}
                style={{ width: 28, height: 28 ,margin:20}}
              // tintColor={tintColor}
              />
            )
          } else {
            return (
              <Image
                source={require('../assets/icons/disc.png')}
                style={{ width: 28, height: 28 }}
                tintColor={tintColor} />
            )
          }
        }
      }
    },
    BrowseByMood: {
      screen: BrowseByMood,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          if (focused) {
            return (
              <ImageBackground source={require('../assets/icons/back.png')}
                style={{ width: 80, height: 50, alignSelf: 'center' }}>
                <Image
                  source={require('../assets/icons/mood.png')}
                  style={{ width: 55, height: 38, alignSelf: 'center' }}
                  tintColor={tintColor} />
              </ImageBackground>
            )
          } else {
            return (
              <Image
                source={require('../assets/icons/profile.png')}
                style={{ width: 60, height: 60 }}
                tintColor={tintColor} />
            )

          }
        }
      }
    },
    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          if (focused) {
            return (
              <Image
                source={require('../assets/icons/bookmarkF.png')}
                style={{ width: 28, height: 28 }}
              />
            )
          } else {
            return (
              <Image
                source={require('../assets/icons/bookmark.png')}
                style={{ width: 28, height: 28 }}
              />
            )
          }
        }
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          if (focused) {
            return (
              <Image
                source={require('../assets/icons/UserCircle1.png')}
                style={{ width: 28, height: 28 }}
                tintColor={tintColor} />
            )
          } else {
            return (
              <Image
                source={require('../assets/icons/UserCircle.png')}
                style={{ width: 28, height: 28 }}
                tintColor={tintColor} />
            )
          }
        }
      }
    },


  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#fff",
      showLabel: false,
      // indicatorStyle: {
      //   backgroundColor: '#0E3932'
      // },
      style: {
        height: getDp() == 2 ? 70 : 90,
        backgroundColor: '#0E3932',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        overflow: "hidden",
        borderTopColor: '#0E3932',
        paddingBottom: getDp() == 2 ? 0 : 15,
      },
      safeAreaInset: { bottom: "never", top: "never" }
    }
  },

);

const AppStackNavigator = createSwitchNavigator({
  Login: Login,
  StackNavigator: StackNavigator,
  TabNavigator: TabNavigator,
  Song: Song,
  SingleSong: SingleSong,
  Playlist: Playlist,
  SelectedArtistPage: SelectedArtistPage,
  Backstory: Backstory,
  BookmarkModal:BookmarkModal,
  GetProTier: GetProTier,
  Protier: Protier,
  ProTierSelection: ProTierSelection
},

)

export default createAppContainer(AppStackNavigator);