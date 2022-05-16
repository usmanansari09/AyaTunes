import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, TextInput, Image, AsyncStorage, KeyboardAvoidingView, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { ASYNC_KEYS } from '../config/AsyncKeys';
import { BASE_URL, API_URL } from '../config/Api';

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: false,
      playlist_id: this.props.id_playlist,
      playlists: [],
      newPlaylist: false,
      deleteModal: false,
      token: "",
      name: "",
      inHeight: true,
      deletePlaylist: this.props.showDeleteModal,
    }
    this.getPlaylist = this.getPlaylist.bind(this)
    this.createPlaylist = this.createPlaylist.bind(this)
    this.updatePlaylist = this.updatePlaylist.bind(this)
    this.songRemoveFromPlaylist = this.songRemoveFromPlaylist.bind(this)
  }

  async componentDidMount() {
    const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
    if (userToken == 'null' || userToken == null) {
      this.props.navigation.navigate('Login')
    } else {
      this.setState({
        token: JSON.parse(userToken)
      })
    }
    this.getPlaylist()
  }


  getPlaylist = async () => {
    try {
      let response = await fetch(`${BASE_URL}${API_URL}music/playlist/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Token ${this.state.token}`
        },
      });
      let res = await response.json();
      // console.log('called- res----',res)

      if (response.status == 200) {
        this.setState({
          playlists: res,
          playlist_id: res.id
        })
      }
    } catch (error) {
      console.log('error ' + error);
    }
  }


  createPlaylist = async () => {
    Keyboard.dismiss()
    this.setState({
      inHeight: false
    })
    try {
      let response = await fetch(`${BASE_URL}${API_URL}music/playlist/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Token ${this.state.token}`
        },
        body: JSON.stringify({
          name: this.state.name,
          songs: [this.props.songId],
          image: null,
          celebrity_name: "",
          songs: this.props.songId,

        })
      });
      const res = await response.json()
      this.props.showModalMethod()
      this.props.goback()
    } catch (error) {
      console.log('error ' + error);
    }
  }

  updatePlaylist = async (id, sId) => {
    try {
      // console.log('called-----',id,sId)
      let response = await fetch(`${BASE_URL}${API_URL}music/playlist/${id}/add_songs/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Token ${this.state.token}`
        },
        body: JSON.stringify({
          songs: [sId],
        })
      });
      let res = await response.json();
      this.props.showModalMethod()
      this.props.goback()

    } catch (error) {
      console.log('error ' + error);
    }
  }

  songRemoveFromPlaylist = async (id, sId) => {
    // console.log('called-----', id,sId)

    try {
      let response = await fetch(`${BASE_URL}${API_URL}music/playlist/${id}/remove_songs/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Token ${this.state.token}`
        },
        body: JSON.stringify({
          songs: [sId],
        })
      });
      let res = await response.json();
      // console.log('res- status --------',response.status)

      this.props.showModalMethod()
      this.props.goback()

    } catch (error) {
      console.log('error ' + error);
    }

  }
  render() {
    return (

      <Modal
        isVisible={this.props.showModal ? this.props.showModal : this.state.deleteModal}
        onBackdropPress={this.props.showModalMethod}
        backdropColor={'#0E3932'}
        backdropOpacity={0.2}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="slideInUp"
        style={{ justifyContent: "flex-end", margin: 0, width: '100%', }}>

        {
          this.state.playlist == true && this.state.newPlaylist == false ?
            <View style={styles.modalDesign}>
              <ImageBackground source={require('../assets/images/modalB.png')}
                style={styles.background}
                imageStyle={styles.backgroundStyle}>
                <ScrollView>
                  <Text style={styles.mainText}>Add to playlist</Text>
                  <TouchableOpacity style={{ marginTop: 35 }}
                    onPress={() => this.setState({ newPlaylist: true, playlist: false, inHeight: !this.state.inHeight })}>
                    <Text style={styles.newText}>New</Text>
                  </TouchableOpacity>
                  {
                    this.state.playlists.map(i => {
                      return (
                        <TouchableOpacity key={i.id} onPress={() => this.updatePlaylist(i.id, this.props.songId)}>
                          <Text style={[styles.itemText, { marginTop: 25 }]}>{i.name}</Text>
                        </TouchableOpacity>
                      )

                    })
                  }
                </ScrollView>
              </ImageBackground>
            </View>

            :

            (this.state.newPlaylist == true) ?
              null :
              <View style={styles.modalDesign2}>
                <ImageBackground source={require('../assets/images/modal.png')}
                  style={styles.background}
                  imageStyle={styles.backgroundStyle}>
                  <Text style={styles.mainText}>{this.props.songName}</Text>
                  <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 12, fontFamily: 'Roboto-Light' }}>{this.props.artist}</Text>
                  <TouchableOpacity style={{ marginTop: 25 }}
                    onPress={() => this.setState({ playlist: true })}>
                    <Text style={styles.itemText}> Add to playlist</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginTop: 25 }} onPress={() => this.songRemoveFromPlaylist(this.props.id_playlist, this.props.songId)}>
                    <Text style={styles.itemText}> Remove from playlist</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={{marginTop:25}}>
                                   <Text style={styles.itemText}> View </Text>
                               </TouchableOpacity> */}

                </ImageBackground>
              </View>
        }


        {
          this.state.newPlaylist ?

            <TouchableOpacity onPress={() => {
              this.setState({
                inHeight: !this.state.inHeight
              })

            }}
              style={[styles.modalDesign2, { height: this.state.name || this.state.inHeight ? '65%' : '35%' }]}>
              <ImageBackground source={require('../assets/images/modal.png')}
                style={styles.background}
                imageStyle={styles.backgroundStyle}>
                <ScrollView keyboardShouldPersistTaps='handled'>


                  <Text style={[styles.mainText, { fontSize: 14 }]}>Playlist Name</Text>
                  <TextInput style={styles.inputTextStyle}
                    placeholder='Enter playlist name'
                    placeholderTextColor='#fff'
                    autoCapitalize='words'
                    keyboardAppearance='dark'
                    onFocus={() => {
                      this.setState({ inHeight: !this.state.inHeight })
                    }}
                    onChangeText={item => this.setState({ name: item, inHeight: true })}

                  >
                  </TextInput>
                  <View style={styles.viewStyle}>
                    <TouchableOpacity style={styles.button}
                      onPress={() => {
                        this.setState({ newPlaylist: false, })
                      }}>
                      <Text style={{ alignSelf: 'center', color: '#fff', padding: 7, fontSize: 14 }}>Cancel</Text>
                    </TouchableOpacity>
                    <ImageBackground source={require('../assets/images/buttonL.png')}
                      style={{ width: 110, height: 32 }} imageStyle={{ borderRadius: 25 }}>
                      <TouchableOpacity onPress={this.createPlaylist}>
                        <Text style={{ alignSelf: 'center', padding: 7, fontSize: 14 }}>Save</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                </ScrollView>
              </ImageBackground>

            </TouchableOpacity>

            : null
        }

      </Modal>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#033333'
  },
  modalDesign: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#0E3932',
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalDesign2: { width: '100%', height: '35%', position: 'absolute', bottom: 0, backgroundColor: '#0E3932', alignSelf: 'center', borderTopLeftRadius: 25, borderTopRightRadius: 25, },
  background: { width: '100%', height: '100%', },
  backgroundStyle: { borderTopLeftRadius: 25, borderTopRightRadius: 25, },
  mainText: { color: '#fff', alignSelf: 'center', marginTop: 25, fontSize: 18, fontFamily: 'Roboto-Regular' },
  newText: { color: '#fff', alignSelf: 'center', fontSize: 14, fontFamily: 'Roboto-Light' },
  itemText: { color: '#fff', alignSelf: 'center', fontSize: 14, fontFamily: 'Roboto-Light' },
  inputTextStyle: { marginTop: 20, alignSelf: 'center', width: '60%', backgroundColor: '#052923', height: 35, borderRadius: 25, paddingLeft: 15, fontSize: 12, opacity: 0.6, color: '#fff' },
  viewStyle: { alignSelf: 'center', width: '70%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  button: { width: 110, height: 32, borderRadius: 25, backgroundColor: '#052923', opacity: 0.7 }

});