import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, AsyncStorage, FlatList, Image, SafeAreaView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { ProfileBackground } from '../components/BackgroundDesign';
import AlbumData from '../data/AlbumData';
import { ASYNC_KEYS } from '../config/AsyncKeys';
import { BASE_URL, API_URL } from '../config/Api';
import { useSelector, useDispatch } from 'react-redux'

 const  BrowseByMood = ({navigation})=> {

    const apiReducer = useSelector((state) => state.apiReducer);
    const dispatch = useDispatch()
  
    // const [token, setToken] = useState('0267906dc087ecd924287e3ef63bd81a17fe2f0d');
    const [token, setToken] = useState();
    const [moodData, setMoodData] = useState([])
    const [loading, setLoding] = useState(false)

    useEffect(() => {
        setLoding(true)
        calledToken()
      }, []);


    const calledToken =async()=> {
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        if (userToken == 'null' || userToken == null) {
            navigation.navigate('Login')
        } else {
                setToken(JSON.parse(userToken))
        }
        getMoodAlbum()
    }

    const getMoodAlbum=async()=> {
        setLoding(true)
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        setToken(JSON.parse(userToken))
        try {
            let response = await fetch(`${BASE_URL}${API_URL}music/mood/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `Token ${JSON.parse(userToken)}`
                },
            });
            let res = await response.json();
            if (response.status == 200) {
                    setMoodData(res)

            }
            setLoding(false)

        } catch (error) {
            console.log('error ' + error);
        }
    }

    
        return (
            <View style={styles.container}>
                <ProfileBackground>
                    <LinearGradient
                        style={{
                            width: '100%',
                            height: "15%",
                            opacity: 0.3,
                            alignSelf: 'center',
                        }}
                        start={{ x: 0.0, y: 0.01 }}
                        end={{ x: 0.0, y: 1.0 }}
                        colors={['#fff', 'transparent',]}
                    >
                    </LinearGradient>
                    <Text style={styles.firstText}>
                        What mood are you in today
                    </Text>
                    <SafeAreaView style={{ marginBottom: '50%',   }}>
                        <View >
                        {
            loading ?
            <Image source={require('../assets/tenor.gif')} style={{width:30,height:30,alignSelf:'center',marginTop:'50%',borderRadius:85}} />
             :
             null
          }
             
                            <FlatList
                                data={moodData}
                                renderItem={({ item, index }) => {
                                    console.log('images back------',item.image)
                                    return (
                                        <TouchableOpacity style={styles.list} key={index} onPress={() => {
                                            dispatch({
                                                type: 'API_END',
                                                payload: "music/mood/"+item.id
                                              })
                                              dispatch({
                                                type: 'PARAMS',
                                                payload: "BrowseByMood"
                                              })
                                              dispatch({
                                                type: 'PLAYLIST_ID',
                                                payload:  item.id
                                              })
                          
                                            navigation.navigate('Playlist', { id: 'music/mood/' + item.id, params: 'BrowseByMood', color: '#000000' })
                                            
                                            }}>
                                            {
                                                item.image != null ? 
                                                <ImageBackground source={{ uri: item.image  }}
                                                style={{ width: '100%', height: '100%' }}>
                                                <LinearGradient
                                                    style={{
                                                        width: '30%',
                                                        height: 90,
                                                        opacity: 0.3,
                                                        alignSelf: 'center',
                                                        borderRadius: 65,
                                                        marginTop: 5
                                                    }}
                                                    start={{ x: 0.0, y: 0.01 }}
                                                    end={{ x: 0.0, y: 1.0 }}
                                                    colors={['#fff', '#fff',]}
                                                />
                                                <Text style={styles.listName}>
                                                    {item.name}
                                                </Text>
                                            </ImageBackground>
                                            :
                                            <ImageBackground source={{ uri: ""}}
                                            style={{ width: '100%', height: '100%' }}>
                                            <LinearGradient
                                                style={{
                                                    width: '30%',
                                                    height: 90,
                                                    opacity: 0.3,
                                                    alignSelf: 'center',
                                                    borderRadius: 65,
                                                    marginTop: 5
                                                }}
                                                start={{ x: 0.0, y: 0.01 }}
                                                end={{ x: 0.0, y: 1.0 }}
                                                colors={['#fff', '#fff',]}
                                            />
                                            <Text style={styles.listName}>
                                                {item.name}
                                            </Text>
                                        </ImageBackground>
                                            }
                                        
                                        </TouchableOpacity>
                                    )
                                }

                                }
                                keyExtractor={item => item.id?.toString()}
                            />
                        </View>
                    </SafeAreaView>
                </ProfileBackground>
            </View>

        )

    
}
export default BrowseByMood;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#033333'
    },
    list: {
        flexDirection: 'row',
        marginTop: 20,
        // margin:5,
        borderRadius: 0,
        height: 110,
    },
    firstText: { alignSelf: 'center', width: '65%', fontFamily: 'Quicksand', fontSize: 24, textAlign: 'center', color: '#fff', position: 'absolute', marginTop: 30 },
    listName: { alignSelf: 'center', fontSize: 28, fontFamily: 'UnicaOne-Regular', marginTop: -60, color: '#000000' }
});