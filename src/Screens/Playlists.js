import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, Image, TouchableOpacity, AsyncStorage, Dimensions, ScrollView, SectionList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  getQueue,
  reset
} from 'react-native-track-player';
import { FlatGrid } from 'react-native-super-grid';
import { BrowseBackground } from '../components/BackgroundDesign';
const { width } = Dimensions.get('window').width;
const { height } = Dimensions.get('window').height;
import AlbumData from '../data/AlbumData';
import { ASYNC_KEYS } from '../config/AsyncKeys';
import { BASE_URL, API_URL } from '../config/Api';
import Player from '../components/Player';
import { useSelector, useDispatch } from 'react-redux'

const Playlists = ({ navigation }) => {
  const playbackState = usePlaybackState();
  const apiReducer = useSelector((state) => state.apiReducer);
  const dispatch = useDispatch()

  // const [token, setToken] = useState('0267906dc087ecd924287e3ef63bd81a17fe2f0d');
  const [token, setToken] = useState();
  const [playlist, setPlaylist] = useState([])
  const [playerState, setPlayerState] = useState(navigation.getParam('playState', null))
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [album, setAlbum] = useState(navigation.getParam('album', ""))
  const [songName, setSongName] = useState(navigation.getParam('songN', ""))
  const [songArtist, setSongArtist] = useState(navigation.getParam('songA', ""))
  const [composer, setComposer] = useState(navigation.getParam('composer', ""))
  const [image, setImage] = useState(navigation.getParam('songImg', ""))
  const [loading, setLoding] = useState(false)

  useEffect(() => {
    setLoding(true)
    // fetchData()  
    getPlaylist()
  }, []);

  useEffect(() => {
    dispatch({
      type: "PLAY_BACK_STATE",
      payload: playbackState
    })
    // console.log('apiReducer Playlist page------',apiReducer?.playBackStatus )
    // fetchData()  
    console.log('Playback state playlists------', playbackState)
    getTrackObject();

  }, [playbackState]);

  const getTrackObject = async () => {
    const que = await TrackPlayer.getQueue()
    if (que.length !== 0) {
      let trackIndex = await TrackPlayer.getCurrentTrack();
      let trackObject = await TrackPlayer.getTrack(trackIndex);
      dispatch({
        type: "GET_TRACK_OBJECT",
        payload: trackObject
      })
    }
  }

  const getPlaylist = async () => {
    const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
    setToken(JSON.parse(userToken))

    try {
      let response = await fetch(`${BASE_URL}${API_URL}music/playlist/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Token ${JSON.parse(userToken)}`
        },
      });
      let res = await response.json();
      // console.log(res,'playlist res----------')
      if (response.status == 200) {
        setPlaylist(res)
        setLoding(false)
      }
    } catch (error) {
      console.log('error ' + error);
    }
  }

  return (
    <View style={styles.container}>
      <BrowseBackground>
        <ScrollView marginBottom={50} style={{ marginTop: '7%' }}>
          {loading ?
            <Image source={require('../assets/tenor.gif')} style={{ width: 30, height: 30, alignSelf: 'center', marginTop: '50%', borderRadius: 85 }} />
            :
            null
          }
          {
            playlist.map((i, indx) => {
              return (
                <ImageBackground source={require('../assets/images/bc.png')}
                  style={[styles.container1, { marginTop: '5%', }]}>
                  <TouchableOpacity onPress={async () =>{ 
                    dispatch({
                      type: 'API_END',
                      payload: "music/playlist/" + i.id
                    })
                    dispatch({
                      type: 'PARAMS',
                      payload: "Playlists"
                    })
                    dispatch({
                      type: 'PLAYLIST_ID',
                      payload:  i.id
                    })

                    navigation.navigate('Playlist', { id: 'music/playlist/' + i.id, params: 'Playlists', color: '#fff', playlist_id: i.id })
                    
                    }}>
                    <Text style={styles.texts}>{i.name}</Text></TouchableOpacity>
                  <ScrollView horizontal={true}>

                    <FlatGrid
                      // itemDimension={400}
                      data={i.songs}
                      style={styles.gridView}
                      horizontal={true}
                      renderItem={({ item, index }) => {
                        // console.log(item,'item-----------------')
                        return (
                          <TouchableOpacity style={[styles.itemContainer,]}
                            onPress={() => {
                              dispatch({
                                type: 'API_END',
                                payload: "music/playlist/" + i.id
                              })
                              dispatch({
                                type: 'PARAMS',
                                payload: "Playlists"
                              })
                              dispatch({
                                type: 'PLAYLIST_ID',
                                payload:  i.id
                              })
                              navigation.navigate('Song', { songs: playlist[indx].songs, album: playlist[indx].name })
                            }}
                          >
                            <Image source={{ uri: item.image }} style={styles.imageView1} />
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemName1}>{item.vocals}</Text>
                          </TouchableOpacity>
                        )
                      }}
                    />
                  </ScrollView>
                </ImageBackground>
              )

            })
          }

        </ScrollView>
        {/* {

                        playerState == null || playerState == 'paused'? 
                       null
                       : */}
        {
          playbackState == 'playing' || playbackState == 'buffering' || playbackState == 'ready' || playbackState == 'loading' ?
            <Player bottomBar={true} navigation={navigation} />
            :
            null
        }
        {/* // } */}

      </BrowseBackground>
    </View>
  )
}
export default Playlists;

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
    fontFamily: 'Roboto-Light',
    alignSelf: 'center',
    marginTop: 10
  },
  itemName1: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Roboto-Light',
    alignSelf: 'center'
  },
  imageView1: {
    width: 95,
    height: 90,
    // marginTop: '15%',
    alignSelf: 'center',
    borderRadius: 15
  },
  container1: { height: 180, backgroundColor: '#052923', width: '100%', marginTop: 20, },
  texts: { color: '#fff', marginLeft: '5%', fontFamily: 'Roboto-Light', marginTop: 5 },
  musicIcon: {
    width: 25,
    height: 25,
    marginTop: 10
  },
});
