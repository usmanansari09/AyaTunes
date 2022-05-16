import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, Image, TouchableOpacity, TextInput, Dimensions, ScrollView, Platform, AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { FlatGrid } from 'react-native-super-grid';
import { BrowseBackground } from '../components/BackgroundDesign';
import AlbumData from '../data/AlbumData';
import { ASYNC_KEYS } from '../config/AsyncKeys';
import { BASE_URL, API_URL } from '../config/Api';
import Player from '../components/Player';
const { width } = Dimensions.get('window').width;
const { height } = Dimensions.get('window').height;
import { useSelector, useDispatch } from 'react-redux'

// const apiReducer = useSelector((state) => state.apiReducer.play);  
import TrackPlayer, {
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
const BrowseByAlbum =({navigation})=> {

    const playbackState = usePlaybackState() ;
    const apiReducer = useSelector((state) => state.apiReducer);  
    const dispatch = useDispatch()
    const { position, bufferedPosition, duration } = useProgress(1000, null)
    const [token,setToken]=useState("")
    const [songData,setSongData]=useState([])
    const [filterData, setFilterdData]=useState([])
    const [mainData, setMainData]=useState([])
    const [searchText, setSearchText]=useState([])
    const [loading,setLoading]=useState(false)

    useEffect(()=> {
        tokenUpdate()
    })

    useEffect(()=> {
        getSongs()
    },[token])

    useEffect(()=>{
        getTrackObject();
        dispatch({
          type:"PLAY_BACK_STATE",
          payload: playbackState
        })
        
        // console.log(playbackState,'Browse by album',apiReducer)
      }, [playbackState])
      
      
      
          const getTrackObject= async()=> {
            const que= await TrackPlayer.getQueue()
             if(que.length !== 0){
           let trackIndex = await TrackPlayer.getCurrentTrack();
           let trackObject = await TrackPlayer.getTrack(trackIndex);
           dispatch({
            type: "GET_TRACK_OBJECT",
            payload:trackObject
           })
          }
          }

    const tokenUpdate= async()=> {
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        // console.log('userToken--------',userToken)
        if (userToken == 'null' || userToken == null) {
            navigation.navigate('Login')
        } else {
          
            setToken(JSON.parse(userToken))      

        }

    }

    const getSongs = async()=> {
           setLoading(true) 
        try {
            let response = await fetch(`${BASE_URL}${API_URL}music/song/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            let res = await response.json();
            if (response.status == 200) {
                    setMainData(res)   
                    setLoading(false)
            }
            // console.log(' getartist----',res , )

        } catch (error) {
            console.log('error ' + error);
        }
    }


   const searchData =(value) =>{
    setLoading(true)
        songData.filter(item => {
            if (item.name === value) {
                let data = {}
                data['name'] = item.name
                data['vocals'] = item.vocals
                data['image'] = item.image
                filterData.push(data)
            }
            setMainData(filterData)
            setLoading(false)
        })
    }


        return (
            <View style={styles.container}>
                <BrowseBackground>
                    <ImageBackground source={require('../assets/images/inputB.png')}
                        style={{ marginTop: Platform.OS == 'ios' ? 55 : 25, alignSelf: 'flex-end' }}
                        imageStyle={{ alignSelf: 'center', borderRadius: 25, width: '80%', height: 35, }}
                    >
                        <View style={styles.action}>
                            <TouchableOpacity onPress={async () => {
                                try {
                                    let response = await fetch(`${BASE_URL}${API_URL}music/song/`, {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-type': 'application/json',
                                            'Authorization': `Token ${token}`
                                        },
                                    });
                                    let res = await response.json();
                                    if (response.status == 200) {
                                            setMainData(res)
                                        
                                    }
                                    // console.log(' getartist----',res , )

                                } catch (error) {
                                    console.log('error ' + error);
                                }

                            }}>
                                <FontAwesome
                                    name="search"
                                    size={20}
                                    color='#fff'
                                    style={{ paddingTop: 8, paddingLeft: 10, paddingRight: 2 }}
                                />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.textInput}
                                keyboardAppearance='dark'
                                onChangeText={async (value) => {
                                    let response = await fetch(`${BASE_URL}${API_URL}music/song/?query=${value}`, {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-type': 'application/json',
                                            'Authorization': `Token ${token}`
                                        },
                                    });

                                    let res = await response.json();
                                        setMainData(res)

                                }}
                            />
                        </View>
                    </ImageBackground>

                    <ScrollView style={{ marginBottom: 50, marginTop: 10 }} keyboardShouldPersistTaps='handled'>
                        {
                        loading ?
                            <Image source={require('../assets/tenor.gif')} style={{ width: 30, height: 30, alignSelf: 'center', marginTop: '50%', borderRadius: 85 }} />
                            :
                            null
                        }
                        <FlatGrid
                            // itemDimension={Dimensions.get('window').width > 375 ? 160 : 140}
                            data={mainData}
                            style={{ alignSelf: 'center', marginTop: '5%', width: '90%' }}
                            extraData={mainData}
                            renderItem={({ item, index }) => {
                                // console.log('item songs----',this.state.mainData)
                                return (
                                    <View style={{ marginTop: 10, alignSelf: 'center', }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('SingleSong', { id: 1, album: item.composer, url: item.normal_audio, title: item.name, artist: item.vocals, artwork: item.image, instrumentalist: item.instrumentalist.substring(0, item.instrumentalist.indexOf('(')), backstory: item.backstory, songId: item.id })}
                                            key={index} style={styles.TouchableOpacityContainer} >
                                                {
                                                    item.image != null ? 
                                                    <Image source={{ uri: item.image }} style={styles.imageView1} /> 
                                                    :
                                                    <Image source={{ uri: ""}} style={styles.imageView1} />


                                                }
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemName1}>{item.vocals}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            }
                            keyExtractor={item => item.id?.toString()}
                        />

                    </ScrollView>
                    {
                        playbackState == 'playing' || playbackState == 'buffering' || playbackState == 'loading' || playbackState == 'ready' ?
                            <Player bottomBar={true} navigation={navigation} />
                            :
                            null
                    }

                </BrowseBackground>
            </View>

        )


    
}


export default BrowseByAlbum;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#052923'
    },
    list: {
        flexDirection: 'row',
        marginTop: 20,
        // margin:5,
        borderRadius: 0,
        height: 110,
    },
    action: {
        flexDirection: 'row',
        borderRadius: 25,
        width: '90%',
        alignSelf: 'center',
        opacity: 0.7,

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 5.5 : -5,
        color: '#fff',
        fontSize: 14,
        paddingRight: 50
    },
    TouchableOpacityContainer: {
        width: Dimensions.get('window').width > 375 ? 180 : 180,
        height: 160,
        alignSelf: 'center',
        marginLeft: '15%',
        marginRight: '15%',

    },
    itemName: {
        // flex:1,
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 375 ? 18 : 16,
        color: '#fff',
        marginTop: 3,
        fontFamily: 'Roboto-Light'
    },
    itemName1: {
        // flex:1,
        textAlign: 'center',
        fontSize: Dimensions.get('window').width > 375 ? 12 : 12,
        color: '#fff',
        marginTop: 2,
        fontFamily: 'Roboto-Light'
    },
    imageView: {
        width: 100,
        height: 100,
        // marginTop: '10%',
        alignSelf: 'center',
        borderRadius: 85
    },
    imageView1: {
        width: 100,
        height: 100,
        // marginTop: '15%',
        alignSelf: 'center',
        borderRadius: 15
    },
});