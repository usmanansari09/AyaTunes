import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Platform,FlatList,ImageBackground } from 'react-native';
import TrackPlayer , { 
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  // useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  getQueue
} from 'react-native-track-player';
// import Slider from '@react-native-community/slider';
import Slider from "react-native-slider";
import playlistData from'../data/Playlist.json';
import CustomModal from '../components/SongModal';
import LinearGradient from 'react-native-linear-gradient';
import CustomM from '../components/Modal';
import BookmarkModal from '../components/BookmarkModal';
import Backstory from './Backstory';
import Player from '../components/Player';
import { useSelector, useDispatch } from 'react-redux'

const Song = ({navigation}) => {
  const playbackState = usePlaybackState() ;
  const apiReducer = useSelector((state) => state.apiReducer);  
  const dispatch = useDispatch()
  const { position, bufferedPosition, duration } = useProgress(1000, null)
  const [id, setId] = useState(navigation.getParam('id',""))
  const [params, setParams]= useState(navigation.getParam('params',""))
  const [color, setColor]=useState(navigation.getParam('color',"#fff"))
  const [trackArtwork, setTrackArtwork] = useState(navigation.getParam('artwork','no image'));
  const [trackTitle, setTrackTitle] = useState(navigation.getParam('title',""));
  const [trackArtist, setTrackArtist] = useState(navigation.getParam('vocals',""));
  const [backstorydata, setBackstoryData] = useState();
  const [instrument,setInstrument]= useState(navigation.getParam('composer',""))
  const [ isModalVisible , setIsModalVisible] = useState(false)
  const [ showSongModal , setShowSongModal] = useState(false)
  const [ bookmarkModal, setBookmarkmodal]= useState(false)
  const [play, setPlay] = useState(true);
  const [album, setAlbum]= useState(navigation.getParam('album',""))
  const [playerState, setPlayerState] = useState(null)
  const [backstory,setBackstory] = useState(false)
  const [paramsSongs,setParamsSongs]=useState([])
  const [onlyRender,setOnlyRender]=useState(navigation.getParam('onlyRenderPage',false))
  const [repeat,setRepeat] = useState(false)
  const [songPlaylist,setSongPlaylist]=useState([])
  const [loading,setLoading]=useState(false)
  const [songs,setSongs] = navigation.getParam('songs','no songs')



useEffect(() => {
   if(onlyRender){
   }else{
    setup();
   }
  
}, []);


useEffect(()=>{
  setPlayerState(playbackState)
  getTrackObject();
  dispatch({
    type:"PLAY_BACK_STATE",
    payload: playbackState
  })
  
  console.log(playbackState,'player page ',apiReducer)
}, [playbackState])



    const getTrackObject= async()=> {
      const que= await TrackPlayer.getQueue()
      //  console.log(que.length !== 0,'que get track object method------')
       if(que.length !== 0){
     let trackIndex = await TrackPlayer.getCurrentTrack();
     let trackObject = await TrackPlayer.getTrack(trackIndex);
     dispatch({
      type: "GET_TRACK_OBJECT",
      payload:trackObject
     })
    }
    }


const setup = async () => {
  const songs = navigation.getParam('songs','no songs')
  const playlistsong = []
  songs.forEach((i,index)=> {
    let song={}
    song['id']=parseInt(i.id)
    song['date']= i.id
    song['url']= i.normal_audio
    song['title']= i.name
    song['artist']= i.vocals
    song['artwork']=i.image
    song['album']=i.composer
    song['userAgent']= i.instrumentalist.substring(0,i.instrumentalist.indexOf('('))
    song['genre']= i.backstory
    song ['duration']= 150
    playlistsong.push(song)
  })
  // TrackPlayer.destroy()
  // await TrackPlayer.stop();
  const que = await TrackPlayer.getQueue()
  if(que.length > 0){
    let priorData = [];
    que.forEach((item, index) => {
      priorData.push(index)
    })
    await TrackPlayer.remove(priorData)
    await TrackPlayer.stop()
  }
  setSongPlaylist(playlistsong)
 
};

useEffect(()=> {
  setPlayerState(playbackState)
  // console.log("---playbackState------", playbackState)

  if(playbackState=='loading' || playbackState =='buffering' ){
    // show loading
    setLoading(true)
  } else if(playbackState=='paused'){
    setLoading(false)

    // change play icon to pause
  }else if(playbackState=='playing'){
    setLoading(false)

  }
}, [playbackState])





const toggleModal = () => {
  setIsModalVisible(!isModalVisible)
}
const toggleModalSong = ()=> {
  setShowSongModal(!showSongModal)
}
const toggle =async ()=>{
          const que= await TrackPlayer.getQueue()
          //  console.log(que.length !== 0,'que get track object method------')
           if(que.length !== 0){
          let trackIndex = await TrackPlayer.getCurrentTrack();
          let trackObject = await TrackPlayer.getTrack(trackIndex);
          let arr =[]
  
  setParamsSongs(arr.push(trackObject))
  // console.log('array-----',paramsSongs)
  setBookmarkmodal(!bookmarkModal)
           }
}
const backPress=()=> {
 setBackstory(false)
}

      return(
                  <View style={styles.container}>
                  {
                     backstory == false ?
                  
                  <ImageBackground  source={{uri: apiReducer?.trackObjects?.artwork}}
                  style={{
                    width:'100%',
                    height:'100%'
                    }}>
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,marginTop:'10%',}}>
                    <View style={{flexDirection:'column',width:'15%',alignSelf:'flex-start',}}>
                     <TouchableOpacity onPress={async ()=> {
                        // await TrackPlayer.pause()
                        const params = apiReducer?.params
                        console.log('params-------',params)
                       navigation.navigate(params)

                       }}>
                     <Image source ={require('../assets/songs/back.png')} 
                     style={{width:30,height:25}}/>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=> navigation.navigate('Playlist',{id: apiReducer?.apiendpoint,  params:apiReducer?.params, color:apiReducer?.params == "BrowseByMood" ? "#000000" : "#fff"})}>
                     <Image source ={require('../assets/songs/record.png')} 
                     style={{width:30,height:25,marginTop:20}}/>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=> setBackstory(true)}>
                     <Image source ={require('../assets/songs/pen.png')} 
                     style={{width:30,height:25,marginTop:20}}/>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=> {

                       toggle()
                     }} >
                     <Image source ={require('../assets/icons/bookmark.png')} 
                     style={{width:30,height:25,marginTop:20}}/>
                     </TouchableOpacity>
                    </View>
                    <BookmarkModal show={bookmarkModal} toggle={toggle} songArray={paramsSongs}/>

                    <View style={{flexDirection:'column',width:'55%',}}>
                    <ImageBackground source={require('../assets/songs/first.png')} style={styles.firstText}>
                     <Text style={{alignSelf:'center',fontSize:18,color:'#fff'}}>
                       {apiReducer?.trackObjects?.album}
                     </Text>
                     </ImageBackground>
                     <ImageBackground source={require('../assets/songs/first.png')} style={styles.firstText}>
                     <Text style={{alignSelf:'center',fontSize:18,color:'#fff'}}>
                       {apiReducer?.trackObjects?.userAgent}
                     </Text>
                     </ImageBackground>
                     <ImageBackground source={require('../assets/songs/middle.png')} style={{width:'100%',height:32,alignSelf:'center'}}>
                   <Text style={{alignSelf:'center',fontSize:22,color:'#fff',padding:-2}}>
                    {apiReducer?.trackObjects?.title}                 
                    </Text>
                     </ImageBackground>
                     <ImageBackground source={require('../assets/songs/last.png')} style={styles.firstText}>
                     <Text style={{alignSelf:'center',fontSize:18,color:'#fff'}}>
                     {apiReducer?.trackObjects?.artist}
                     </Text>
                     </ImageBackground>
                    </View>
                    <View style={{flexDirection:'column',width:'15%',}}>
                    <TouchableOpacity onPress={toggleModalSong}>
                     <Image source ={require('../assets/songs/menu.png')} 
                     style={{width:35,height:25,alignSelf:'flex-end'}}/>
                      <CustomModal showSModal={showSongModal} toggleSModal = {toggleModalSong}></CustomModal>
                     </TouchableOpacity>
                    </View>
               
                    </View>
                    {
            loading ?
            <Image source={require('../assets/tenor.gif')} style={{width:30,height:30,alignSelf:'center',marginTop:'30%',borderRadius:85}} />
             :
             null
          }
                    <Player bottomBar={false} playlist={songPlaylist} disable={false} type={"Song"} />


                     </ImageBackground>
                     :
                     <Backstory backImg ={apiReducer?.trackObjects?.artwork} backPress={backPress} track={apiReducer?.trackObjects?.title} artist={apiReducer?.trackObjects?.artist} backStory={apiReducer?.trackObjects?.genre}/>
}
                    </View>
    
      )
}
export default Song;


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#033333'       
  },
  bottomPart:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'92%',
    position:'absolute',
    bottom:'18%',
    alignSelf:'center'

  },
  musicIcon:{
    width:45,
    height:45
  },
  firstText:{
    width:'90%',
    height:25,
    alignSelf:'center'
  },
  time: {
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-between',
    position:'absolute',
    bottom:'12%',
    alignSelf:'center'
  },
  progressImage:{ 
    alignSelf:'center',
    width:'90%',
    height:10,
    position:'absolute',
    bottom:'10%'
  },
  progressContainer:{
    position:'absolute',
    bottom:'10%',
    width: 370,
    height:0.1,
    alignSelf:'center'

  }
})