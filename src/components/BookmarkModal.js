import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, AsyncStorage, ImageBackground, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import Modal from 'react-native-modal';
import { BASE_URL, API_URL } from '../config/Api';
import { storeIntoAsyncStorage } from '../config/Utils';
import { ASYNC_KEYS } from '../config/AsyncKeys';
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
    getQueue,
    reset
} from 'react-native-track-player';
import Slider from "react-native-slider";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomLabel from './CustomLabel';
import CustomMarker from './CustomMarker';

const BookmarkModal = (props) => {
    const { position, bufferedPosition, duration } = useProgress(1000, null);

    // useEffect(()=> {
    //     if(parseInt(duration)){
    //         setNonCollidingMultiSliderValue([0, parseInt(duration)])
    //     }

    // }, [])
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [inheight, setInheight] = useState('65%')
    const [backstorydata, setBackstoryData] = useState();
    const [playerState, setPlayerState] = useState(null)
    const [token, setToken] = useState()
    const [startMinute, setStartMinute] = useState(null)
    const [startSecond, setStartSecond] = useState(null)
    const [endMinute, setEndMinute] = useState(null)
    const [endSecond, setEndSecond] = useState(null)
    const [multiSliderValue, setMultiSliderValue] = React.useState([0, parseInt(duration)]);
    // useEffect(()=> {
    // console.log(parseInt(duration),parseInt(position))
    //     setMultiSliderValue([0, duration])
    // }, [])



    useEffect(() => {
        // console.log(params,'params-----')
        setup();
    }, [])


    const setup = async () => {
        const playlistsong = props.songArray
        await TrackPlayer.setupPlayer({});
        await TrackPlayer.add(playlistsong);

        await TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP, TrackPlayer.CAPABILITY_SKIP_TO_NEXT, TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS

            ],
            compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE, TrackPlayer.CAPABILITY_SKIP, TrackPlayer.CAPABILITY_SKIP_TO_NEXT, TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS],
        });
        await TrackPlayer.play();
    }

    const togglePlayback = async () => {
        if (playerState == 'playing') {
            await TrackPlayer.pause();

        } else {
            await TrackPlayer.play();

        }

    }

    // const events = [
    //     TrackPlayerEvents.PLAYBACK_STATE,
    //     TrackPlayerEvents.PLAYBACK_ERROR,
    //     TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    //     TrackPlayerEvents.PLAYBACK_QUEUE_ENDED
    // ];
    // useTrackPlayerEvents(events, async (event) => {
    //     if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
    //         console.warn('An error occured while playing the current track.');
    //     }
    //     if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
    //         setPlayerState(event.state);
    //     }


    //     if (event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
    //         let trackIndex = await TrackPlayer.getCurrentTrack();
    //         let trackObject = await TrackPlayer.getTrack(trackIndex);
    //         // console.log('trackObject------',trackObject)
    //         // await TrackPlayer.stop()

    //     }


    //     //   if(event.type === TrackPlayerEvents.PLAYBACK_QUEUE_ENDED){
    //     //     await TrackPlayer.stop()

    //     //     const que= await getQueue()
    //     //     await TrackPlayer.setupPlayer({});
    //     //     await TrackPlayer.add(que);
    //     //     await TrackPlayer.updateOptions({
    //     //       stopWithApp: true,
    //     //       capabilities: [
    //     //         TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE,
    //     //         TrackPlayer.CAPABILITY_SKIP,TrackPlayer.CAPABILITY_SKIP_TO_NEXT,TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS

    //     //       ],
    //     //       compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE ,TrackPlayer.CAPABILITY_SKIP,TrackPlayer.CAPABILITY_SKIP_TO_NEXT,TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS],
    //     //     });
    //     //     await TrackPlayer.play();     
    //     //     // TrackPlayer.setRepeatMode(RepeatMode.que);
    //     //   }


    // });

    const reset = async () => {
        const que = await getQueue()
        await TrackPlayer.setupPlayer({});
        await TrackPlayer.add(que);
        // console.log('que-----',que)
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_SKIP, TrackPlayer.CAPABILITY_SKIP_TO_NEXT, TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS

            ],
            compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE, TrackPlayer.CAPABILITY_SKIP, TrackPlayer.CAPABILITY_SKIP_TO_NEXT, TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS],
        });
        await TrackPlayer.play();
    }

    const createBookmark = async () => {
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        let t = JSON.parse(userToken)
        var Sminutes = Math.floor(startMinute / 60);
        var Sseconds = startMinute - Sminutes * 60;
        var Eminutes = Math.floor(endMinute / 60);
        var Eseconds = endMinute - Eminutes * 60;
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        console.log('all minutes ,second',trackObject.date)
 
        try{
            let response = await fetch(`${BASE_URL}${API_URL}music/bookmark/`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json',
                  'Authorization':`Token ${t}`
    
                },
                body: JSON.stringify({
                    song: trackObject.date,
                    start_min: Sminutes,
                    start_sec: Sseconds,
                    end_min: Eminutes,
                    end_sec: Eseconds
                })
              });
              let res = await response.json()
            //   console.log('res',res)
               }catch (e){
                 console.log(e,'erre-')
             }
      
          props.toggle()

    }
    
    const str_pad_left = (string, pad, length) => {

        return (new Array(length + 1).join(pad) + string).slice(-length);

    }
    
    function formateMinuteSecond(timeInSecond) {


        var minutes = Math.floor(timeInSecond / 60);
        var seconds = timeInSecond - minutes * 60;
        var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

        return finalTime;



    }

    return (

        <Modal
            isVisible={props.show}
            onBackdropPress={props.toggle}
            backdropColor={'#0E3932'}
            backdropOpacity={0.4}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
        >


            <TouchableOpacity
                style={[styles.mainView, { height: inheight }]}>
                <ImageBackground source={require('../assets/bookmarks/b.png')}
                    style={{
                        width: '100%',
                        height: '110%'
                    }}
                    imageStyle={{

                    }}>
                    <ScrollView keyboardShouldPersistTaps='handled' >

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "position" : "height"}
                            style={{ flex: 1, marginBottom: '5%' }}
                        >

                            <Text style={{ alignSelf: 'center', marginTop: '3%', color: '#fff' }}>Add new bookmark</Text>
                            <View style={{ alignSelf: 'flex-end', marginRight: 30 }}>

                            </View>

                            <View style={{ alignSelf: 'center', width: '80%', marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '45%', justifyContent: 'space-around', flexDirection: 'column' }}>
                                    <Text style={{ marginLeft: 40, color: '#fff', fontSize: 12, marginBottom: 10 }}>Start</Text>
                                    <TouchableOpacity style={{ backgroundColor: '#052923', width: 110, height: 30, borderRadius: 5, justifyContent: 'center', }}>
                                        {
                                            startMinute == null ?
                                                <Text style={{ color: '#fff', alignSelf: 'center', }}>
                                                    00:00
                                                </Text>
                                                :
                                                <Text style={{ color: '#fff', alignSelf: 'center', }}>
                                                    {formateMinuteSecond(startMinute)}
                                                </Text>
                                        }

                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: '35%', justifyContent: 'space-around', flexDirection: 'column' }}>
                                    <Text style={{ marginLeft: 40, color: '#fff', fontSize: 12, marginBottom: 10 }}>End</Text>
                                    <TouchableOpacity style={{ backgroundColor: '#052923', width: 110, height: 30, borderRadius: 5, justifyContent: 'center', }}>


                                        {
                                            endMinute == null ?
                                                <Text style={{ color: '#fff', alignSelf: 'center', }}>

                                                {formateMinuteSecond(parseInt(duration))}
                                                </Text>
                                                :
                                                <Text style={{ color: '#fff', alignSelf: 'center', }}>
                                                  {formateMinuteSecond(endMinute)}

                                                </Text>
                                        }


                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ alignSelf: 'center', width: '70%', }}>
                                <MultiSlider
                                    values={[multiSliderValue[0], multiSliderValue[parseInt(duration)]]}

                                    sliderLength={280}
                                    onValueChange={async value => {
                                    }}
                                    min={0}
                                    max={parseInt(duration)}
                                    step={1}
                                    allowOverlap
                                    customLabel={CustomLabel}
                                    customMarker={CustomMarker}
                                    onValuesChangeStart={values => {
                                    }
                                    }
                                    onValuesChangeFinish={values => {
                                        if (values !== undefined ) {
                                            // console.log("--------finish", values[0], values[1])

                                            //     if(values[0] > 60){
                                            setStartMinute(values[0])
                                            setMultiSliderValue([values[0], values[1]])
                                            if (values[1] !== undefined) {
                                                setMultiSliderValue([startMinute, values[1]])

                                                //    setMultiSliderValue([startMinute, new Date((duration - position) * 1000)
                                                //     .toISOString()
                                                //     .substr(14, 5)])
                                                setEndMinute(values[1])
                                            }
                                        }
                

                                    }}
                                />



                            </View>
          
                            <TouchableOpacity
                                onPress={async () => {
                                    togglePlayback(State)
                                    if (startMinute == null) {
                                        setStartMinute(parseInt(`${new Date(position * 1000).toISOString().substr(14, 5)}`.substring(3, 5)))
                                        setMultiSliderValue([startMinute == null ? parseInt(`${new Date(position * 1000).toISOString().substr(14, 5)}`.substring(3, 5)) : parseInt(startMinute > 10 ? startMinute.substring(0, 1) : startMinute), parseInt(duration)])

                                    }
                                }}>
                                <Image source={require('../assets/songs/pause.png')} style={{ alignSelf: 'center', width: 35, height: 35, marginTop: 10 }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 15 }}>Title</Text>

                            <TextInput style={{
                                alignSelf: 'center',
                                width: '50%',
                                opacity: 0.5,
                                textAlign: 'center',
                                color: '#fff'
                            }}
                                placeholder='Add title here'
                                placeholderTextColor='#fff'
                                autoCapitalize='words'
                                keyboardAppearance='dark'
                                // onFocus={() => {
                                //     setInheight('77%')
                                // }}

                                onChangeText={item => setTitle(item)}

                            >
                            </TextInput>
                            <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 10 }}>Description</Text>
                            <TextInput style={{
                                alignSelf: 'center',
                                width: '50%',
                                opacity: 0.5,
                                textAlign: 'center',
                                color: '#fff'
                            }}
                                placeholder='Add title here'
                                placeholderTextColor='#fff'
                                autoCapitalize='words'
                                keyboardAppearance='dark'
                                // onFocus={() => {
                                //     setInheight('85%')

                                // }}
                                onChangeText={item => setDescription(item)}

                            >
                            </TextInput>
                            <View style={styles.viewStyle}>
                                <TouchableOpacity style={styles.button} onPress={() =>
                                    props.toggle()
                                }>
                                    <Text style={{ alignSelf: 'center', color: '#fff', padding: 7, fontSize: 14 }}>Cancel</Text>
                                </TouchableOpacity>
                                <ImageBackground source={require('../assets/images/buttonL.png')} style={{ width: 110, height: 32 }} imageStyle={{ borderRadius: 25 }}>
                                    <TouchableOpacity onPress={() => createBookmark()}>
                                        <Text style={{ alignSelf: 'center', padding: 7, fontSize: 14 }}>save</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </ImageBackground>
            </TouchableOpacity>

        </Modal>


    )




}

export default BookmarkModal;

const styles = StyleSheet.create({
    container: {
        //  flex:1
    },
    mainView: { backgroundColor: '#052923', width: '110%', position: 'absolute', bottom: -20, borderTopLeftRadius: 25, borderTopRightRadius: 25, alignSelf: 'center' },
    name: { width: '80%', color: '#fff', fontFamily: 'Roboto-Regular', paddingLeft: '5%', height: 40 },
    icon: { width: 15, height: 15, alignSelf: 'center' },
    viewStyle: { alignSelf: 'center', width: '70%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, },
    button: { width: 110, height: 32, borderRadius: 25, backgroundColor: '#052923', opacity: 0.7 },
    progressContainer: {
        marginTop: 20,
        width: 300,
        height: 0.1,
        alignSelf: 'center',
        marginBottom: 10
    }

});
