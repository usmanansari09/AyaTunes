import React, { useEffect, useState } from 'react';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,

  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useSelector, useDispatch,} from 'react-redux'

import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';


const setup = async (playList: Array) => {
  console.log('array---------',playList)
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });


  await TrackPlayer.add(playList);
  await TrackPlayer.play();

  // TrackPlayer.setRepeatMode(RepeatMode.Queue);

};



const Player = ({ bottomBar = false, playlist, navigation ,disable,type,params}) => {
  const apiReducer = useSelector((state) => state.apiReducer);
  const dispatch = useDispatch()
  const playbackState = usePlaybackState();
  const { position, bufferedPosition, duration } = useProgress(1000, null)

  const [playerState, setPlayerState] = useState("")
  const [trackArtwork, setTrackArtwork] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("")
  const [instrument, setInstrument] = useState("")
  const [composer, setComposer] = useState("")

  const [playIcon, setPlayIcon] = useState(false)
  const [pauseIcon, setPauseIcon] = useState(false)
  const [backstorydata, setBackstoryData] = useState("");
  const [play, setPlay] = useState(true);
  const [album, setAlbum] = useState("")


  useEffect(() => {
    console.log('playlist comes--',playlist,type)
    if (playlist != undefined) {
      dispatch({
        type:'REPEAT_SONG',
        payload: false
      })
      dispatch({
        type:'SHUFFLE_SONG',
        payload: false
      })
      dispatch({
        type:'TYPE',
        payload: type
      })

      setup(playlist)
    }
  }, [playlist])



  useEffect(() => {
    setPlayerState(playbackState)
    getTrackObject();
    dispatch({
      type: "PLAY_BACK_STATE",
      payload: playbackState
    })
    // console.log(playbackState, 'player page ', apiReducer)
  }, [playbackState])


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


const shuffleSong = async ()=> {
  const que= await TrackPlayer.getQueue()
  dispatch({
    type: 'GET_PREVIOUS_QUE',
    payload: que
  })
  // const que = await TrackPlayer.getQueue()
 
  const playlistsong = []
  shuffle(que);
    function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));
        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}
que.forEach((i,index)=> {
  let song={}
  song['id']=index+1
  song['url']= i.url
  song['title']= i.title
  song['artist']= i.artist
  song['artwork']=i.artwork
  song['album']=i.album
  song['userAgent']= i.userAgent
  song['genre']= i.genre
  song ['duration']= duration
  playlistsong.push(song)
})

await TrackPlayer.destroy()
await TrackPlayer.setupPlayer({});
await TrackPlayer.add(playlistsong);
 await TrackPlayer.play();
 
}




  if (bottomBar) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(type,'==================')
          // const types = `${type}`
          navigation.navigate(apiReducer?.type == "SingleSong" ? "SingleSong" : "Song", { vocals: trackArtist, title: trackTitle, artwork: trackArtwork, album: album, instrument: instrument, onlyRenderPage: true })
        }}
        style={{ position: 'absolute', bottom: '10%', backgroundColor: '#204E46', width: '100%', height: 60, alignSelf: 'center', borderColor: '#0E392F', borderWidth: 1 }}>
        <ImageBackground source={require('../assets/images/bc.png')} style={{ width: '110%', height: '100%', alignSelf: 'center', marginRight: 50 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '50%', marginTop: 3, }}>
              <Image source={{ uri: apiReducer?.trackObjects?.artwork }} style={{ width: 50, height: 50, borderRadius: 20, }}>
              </Image>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: '60%', }}>

                <Text style={{ color: '#fff', fontSize: 12, textAlign: 'left' }}>
                  {apiReducer?.trackObjects?.title}
                </Text>


                <Text style={{ color: '#fff', fontSize: 9, textAlign: 'left' }}>
                  {apiReducer?.trackObjects?.artist}
                </Text>

              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '25%', marginTop: 5, marginLeft: 20 }}>
              <TouchableOpacity onPress={async () => {
                await TrackPlayer.skipToPrevious()
              }}>
                <Image source={require('../assets/songs/goBack.png')} style={styles.musicIcon2} />
              </TouchableOpacity>

              {
                (playerState !== 'paused') ?
                  <TouchableOpacity onPress={async () => {

                    await TrackPlayer.pause();
                  }}>
                    <Image source={require('../assets/songs/play.png')} style={{ width: 45, height: 45, }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={async () => {
                    await TrackPlayer.play();
                  }}>
                    <Image source={require('../assets/songs/pause.png')} style={{ width: 45, height: 45, }} />
                  </TouchableOpacity>
              }

              <TouchableOpacity onPress={async () => {
                await TrackPlayer.skipToNext()
              }}>
                <Image source={require('../assets/songs/forward.png')}
                  style={styles.musicIcon2} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

    )
  }

  return (
    <>
      <View style={styles.bottomPart}>
        {
          apiReducer?.repeat ? 
          <TouchableOpacity onPress={async ()=> {
            dispatch({
            type:"REPEAT_SONG",
            payload: false
          })
          TrackPlayer.setRepeatMode(RepeatMode.Off);
          }}>
          <Image source={require('../assets/songs/rpt.png')} style={styles.musicIcon} />
        </TouchableOpacity>
        :
          <TouchableOpacity onPress={()=> {
            dispatch({
            type:"REPEAT_SONG",
            payload: true
          })
          TrackPlayer.setRepeatMode(RepeatMode.Track);
        }
        }>
          <Image source={require('../assets/songs/repeat.png')} style={styles.musicIcon} />
        </TouchableOpacity>

        }

        <TouchableOpacity onPress={async () => {
          await TrackPlayer.skipToPrevious()

        }}>
          <Image source={require('../assets/songs/goBack.png')} style={styles.musicIcon} />
        </TouchableOpacity>
        {
          playerState !== 'paused' ?
            <TouchableOpacity style={{ marginTop: -10 }} onPress={async () => {
              await TrackPlayer.pause();
            }}>
              <Image source={require('../assets/songs/play.png')} style={{ width: 65, height: 65, }} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ marginTop: -10 }} onPress={async () => {
              await TrackPlayer.play();
            }}>
              <Image source={require('../assets/songs/pause.png')} style={{ width: 65, height: 65, }} />
            </TouchableOpacity>
        }

        <TouchableOpacity onPress={async () => {
          await TrackPlayer.skipToNext()
        }}>
          <Image source={require('../assets/songs/forward.png')}
            style={styles.musicIcon} />
        </TouchableOpacity>
        {
          disable == false ? 
          
            apiReducer?.shuffle ? 
  
            <TouchableOpacity onPress={async ()=> {
              const playList = apiReducer?.previousTrackQue
              await TrackPlayer.destroy()
              setup(playList)
              dispatch({
              type: "SHUFFLE_SONG",
              payload: false
            })
          }}
            >
            <Image source={require('../assets/songs/s.png')} style={styles.musicIcon} />
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={()=> {
            dispatch({
            type: "SHUFFLE_SONG",
            payload: true
          })
          shuffleSong()
        }}
          >
          <Image source={require('../assets/songs/cut.png')} style={styles.musicIcon} />
        </TouchableOpacity>
  
          
          :
          <TouchableOpacity 
          >
          <Image source={require('../assets/songs/cut.png')} style={[styles.musicIcon,{opacity:0.5}]} />
        </TouchableOpacity>
         
        }
   
 
      </View>

      <View style={styles.time}>
        <Text style={{ color: '#fff' }}>
          {new Date(position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={{ color: '#fff' }}>
          {new Date((duration - position) * 1000)
            .toISOString()
            .substr(14, 5)}
        </Text>

      </View>

      <Slider
        style={styles.progressContainer}
        value={position}
        thumbStyle={{ width: 2, height: 2}}
        thumbTintColor="#A5FF5F"
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor={'#0E3932'}
        maximumTrackTintColor="#fff"
        onValueChange={async value => {
          // console.log('position',position,value)
          await TrackPlayer.seekTo(value);

        }}
      />
    </>

  )
}
export default Player;

const styles = StyleSheet.create({
  bottomPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    position: 'absolute',
    bottom: '18%',
    alignSelf: 'center'

  },
  time: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '12%',
    alignSelf: 'center'
  },
  progressContainer: {
    position: 'absolute',
    bottom: '10%',
    width: 370,
    height: 0.1,
    alignSelf: 'center'

  },
  musicIcon: {
    width: 45,
    height: 45
  },
  musicIcon2: {
    width: 25,
    height: 25,
    marginTop: 10
  },
})