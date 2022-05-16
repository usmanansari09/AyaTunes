/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  ImageBackground,
  AsyncStorage
} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import LGradient from "../components/GradiantPart"
import { Background } from "../components/BackgroundDesign"
import { ASYNC_KEYS } from "../config/AsyncKeys"
import { BASE_URL, API_URL } from "../config/Api"
import GetProTier from "../Screens/GetProTier"
import { storeIntoAsyncStorage } from "../config/Utils"
// import { withNavigationFocus } from "react-navigation";
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  // useTrackPlayerProgress,
  useTrackPlayerEvents,
  // TrackPlayerEvents,
  getQueue
} from "react-native-track-player"
import { SafeAreaView } from "react-native-safe-area-context"
import { withNavigationFocus } from "react-navigation"

const Bookmark = (props, { navigation }) => {
  const playbackState = usePlaybackState()
  const { position, bufferedPosition, duration } = useProgress(1000, null)
  const [token, setToken] = useState()
  const [bookmarkData, setBookmarkData] = useState([])
  const [showtier, setShowtier] = useState(false)
  const [tierData, setTierData] = useState({})
  const [playerState, setPlayerState] = useState(null)
  const [endTime, setEndTime] = useState()
  const [trackId, setTrackId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    checktier()
  }, [])

  useEffect(() => {
    // console.log("updated position ", parseInt(position));
    tryingtostop()
  }, [position])

  useEffect(() => {
    if (props.isFocused == false) {
      TrackPlayer.stop()
      stopSong()
    }
    // console.log(props.isFocused,'isFocused---------')
  }, [props.isFocused])

  const stopSong = async () => {
    await TrackPlayer.stop()
  }

  const str_pad_left = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length)
  }

  function getDuration(startMin, startSecond, endMin, endSec) {
    var totalStart = parseInt(startMin) * 60 + parseInt(startSecond)
    var totalEnd = parseInt(endMin) * 60 + parseInt(endSec)
    var diff = totalEnd - totalStart
    // console.log('diff----',diff)
    return diff
  }
  function formateMinuteSecond(timeInSecond) {
    var minutes = Math.floor(timeInSecond / 60)
    var seconds = timeInSecond - minutes * 60
    var finalTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2)
    return finalTime
  }
  const tryingtostop = async () => {
    // console.log('endstate--', endTime)
    if (parseInt(position) == endTime) {
      await TrackPlayer.stop()
    }
  }

  const setup = async (
    ids,
    urls,
    start,
    end,
    titles,
    albums,
    userAgents,
    artists,
    end_min,
    end_sec
  ) => {
    await TrackPlayer.remove([0])
    await TrackPlayer.stop()
    const time = start != 0 ? start * 60 + end : end
    setStartTime(time)
    // console.log(time,'start time---')
    setEndTime(end_min != 0 ? end_min * 60 + end_sec : end_sec)

    try {
      const tracks = [
        {
          id: 1,
          url: urls,
          title: titles,
          album: albums,
          artist: artists,
          userAgent: userAgents
        }
      ]
      await TrackPlayer.add(tracks)
      await TrackPlayer.setupPlayer({})
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop
        ],
        compactCapabilities: [Capability.Play, Capability.Pause]
      })
      //   TrackPlayer.addEventListener('playback-state', async (stateObject) => {
      if (playbackState == "playing") {
        console.log("seek time----", time)
        await TrackPlayer.seekTo(time)
      }
      // });
      await TrackPlayer.play()
    } catch (e) {
      console.log("errror----", e)
    }
  }

  useEffect(() => {
    startPlayingSeekTo()
  }, [playbackState, startTime])

  const startPlayingSeekTo = async () => {
    // console.log('playbackState22---',playbackState,startTime)
    if (playbackState == "playing") {
      await TrackPlayer.seekTo(startTime)
    }
    await TrackPlayer.play()
  }

  useEffect(() => {
    getTier()
    getBookmark()
  }, [token])

  const checktier = async () => {
    setLoading(true)
    const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token)
    // console.log('users--------',users)
    if (userToken == "null" || userToken == null) {
      navigation.navigate("Login")
    } else {
      let t = JSON.parse(userToken)
      setToken(t)
    }
  }

  const getBookmark = async () => {
    const userToken = token
    try {
      let response = await fetch(`${BASE_URL}${API_URL}music/bookmark/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Token ${userToken}`
        }
      })
      let res = await response.json()
      // console.log(res,' getBookmark--------')
      const promises = res.map((item, index) => {
        return new Promise(async (resolve, reject) => {
          try {
            const rawResponse = await fetch(
              `${BASE_URL}${API_URL}music/song/${item.song}/`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json",
                  Authorization: `Token ${userToken}`
                }
              }
            )
            const response = await rawResponse.json()
            return resolve(response)
          } catch (error) {
            reject(error)
          }
        })
      })
      Promise.all(promises)
        .then(listOfRes => {
          // console.log('listOfRes ------------',listOfRes)
          let formatedBootmarksData = []
          res.forEach((item, index) => {
            let song = listOfRes.filter(songItem => item.song == songItem.id)[0]
            formatedBootmarksData.push(
              Object.assign(
                {},
                {
                  id: index + 1,
                  songId: song.id,
                  start_min: item.start_min,
                  start_sec: item.start_sec,
                  end_min: item.end_min,
                  end_sec: item.end_sec,
                  vocals: song.vocals,
                  name: song.name,
                  url: song.normal_audio,
                  image: song.image,
                  album: song.composer,
                  userAgent: song.instrumentalist.substring(
                    0,
                    song.instrumentalist.indexOf("(")
                  )
                }
              )
            )
          })
          setLoading(false)
          setBookmarkData(formatedBootmarksData)
          // console.log("formated response------------- ",bookmarkData)
        })
        .catch(e => {
          console.log("Error ", e)
        })
    } catch (error) {
      console.log("error " + error)
    }
  }

  const getTier = async () => {
    const userToken = token

    //    console.log('token----',token)
    try {
      let response = await fetch(`${BASE_URL}${API_URL}user/get_tier/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Token ${userToken}`
        }
      })
      let res = await response.json()
      res.forEach(element => {
        if (element.name == "Pro Tier") {
          setTierData(element)
        } else {
          return
        }
      })
    } catch (error) {
      console.log("error " + error)
    }
  }

  const setTier = async () => {
    try {
      let response = await fetch(`${BASE_URL}${API_URL}user/set_tier/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          id: tierData?.id
        })
      })
      let res = await response.json()
      await storeIntoAsyncStorage(ASYNC_KEYS.user, JSON.stringify(res))
      setShowtier(false)
    } catch (error) {
      console.log("error " + error)
    }
  }

  return showtier == false ? (
    <View style={styles.container}>
      <Background>
        <Image
          source={require("../assets/leaves/tleaves.png")}
          style={{
            width: "98%",
            height: "30%",
            alignSelf: "center",
            opacity: 0.7
          }}
        />
        <LGradient />
        <Text style={styles.bookmarkText}>My bookmarks</Text>
        {loading ? (
          <Image
            source={require("../assets/tenor.gif")}
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
              marginTop: "30%",
              borderRadius: 85
            }}
          />
        ) : null}
        {playbackState == "loading" || playbackState == "ready" ? (
          <Image
            source={require("../assets/tenor.gif")}
            style={{
              width: 30,
              height: 30,
              alignSelf: "center",
              marginTop: "30%",
              borderRadius: 85
            }}
          />
        ) : null}
        <SafeAreaView
          style={{
            marginBottom: 100,
            marginTop: -100
          }}
        >
          <FlatList
            data={bookmarkData}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    if (item.id != trackId) {
                      setup(
                        item.id,
                        item.url,
                        item.start_min,
                        item.start_sec,
                        item.name,
                        item.album,
                        item.userAgent,
                        item.vocals,
                        item.end_min,
                        item.end_sec
                      )
                      setTrackId(item.id)
                    } else {
                      await TrackPlayer.stop()
                      setTrackId(null)
                    }
                  }}
                  style={styles.list}
                  key={index}
                >
                  <ImageBackground
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "100%" }}
                    imageStyle={{ borderRadius: 10, opacity: 0.3 }}
                  >
                    {/* <ImageBackground source={require('../assets/images/trans.png')} style={{width:'100%',height:'100%',}}> */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        flex: 1
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          width: "35%",
                          padding: 5
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          {item.id == trackId ? (
                            <MaterialIcons
                              name="bookmark"
                              size={20}
                              color="#fff"
                            />
                          ) : (
                            <MaterialIcons
                              name="bookmark-border"
                              size={20}
                              color="#fff"
                            />
                          )}
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 16,
                              lineHeight: 22
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: "#fff",
                            marginLeft: 20,
                            fontFamily: "Roboto-Light",
                            fontSize: 14,
                            lineHeight: 22
                          }}
                        >
                          {item.vocals}
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            marginLeft: 20,
                            fontFamily: "Roboto-Light",
                            fontSize: 12,
                            lineHeight: 22
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          width: "65%",
                          paddingTop: 5,
                          paddingRight: 5
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontFamily: "Roboto-Medium",
                              fontSize: 12,
                              textAlign: "center",
                              width: "50%"
                            }}
                          >
                            {item.album}
                          </Text>
                          <Text
                            style={{
                              color: "#fff",
                              fontFamily: "Roboto-Bold",
                              fontSize: 14
                            }}
                          >
                            {formateMinuteSecond(
                              getDuration(
                                item.start_min,
                                item.start_sec,
                                item.end_min,
                                item.end_sec
                              )
                            )}
                          </Text>
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            source={require("../assets/bookmarks/music.png")}
                            style={{ width: "100%", height: 42 }}
                          />
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                  {/* </ImageBackground> */}
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.id?.toString()}
          />
        </SafeAreaView>
        <Image
          source={require("../assets/leaves/bleaves.png")}
          style={styles.bottomImage}
        />
      </Background>
    </View>
  ) : (
    <GetProTier navigation={navigation} tierData={tierData} setTier={setTier} />
  )
}
export default withNavigationFocus(Bookmark)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#033333"
  },
  bookmarkText: {
    alignSelf: "center",
    position: "absolute",
    top: Platform.OS == "ios" ? 70 : 90,
    fontFamily: "Quicksand",
    fontSize: 24,
    color: "#fff"
  },
  bottomImage: {
    width: "98%",
    height: "35%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    opacity: 0.7
  },
  list: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 10,
    height: 75,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#033333",
    borderColor: "#F2FF5F",
    borderWidth: 0.3
  },
  firstText: {
    alignSelf: "center",
    width: "65%",
    fontFamily: "Quicksand",
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
    position: "absolute",
    top: 50
  },
  listName: {
    alignSelf: "center",
    fontSize: 28,
    fontFamily: "UnicaOne-Regular",
    marginTop: -60,
    color: "#fff"
  }
})
