import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity, AsyncStorage, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import CustomModal from './Modal';
import DeletePlaylistModal from './DeletePlaylistModal';
import { ASYNC_KEYS } from '../config/AsyncKeys';
import { BASE_URL, API_URL } from '../config/Api';
import { BrowseBackground } from './BackgroundDesign';

export default class Playlist extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         isModalVisible: false,
         DeleteModalP: false,
         playlistData: [],
         playlist_id: this.props.navigation.getParam('id', 1),
         song_id: "",
         song_name: "",
         artist: "",
         token: "",
         image: "",
         genre: "",
         user:{},

         id: this.props.navigation.getParam('playlist_id', 1),
         param: this.props.navigation.getParam('params', ""),
         color: this.props.navigation.getParam('color', "#000000"),
      }
      this.getPlaylist = this.getPlaylist.bind(this)
      this.toggleModal = this.toggleModal.bind(this)
      this.deletePlaylistmodalMethod = this.deletePlaylistmodalMethod.bind(this)
      this.goback = this.goback.bind(this)
   }
   toggleModal = () => {
      this.setState({ isModalVisible: false });
   }
   deletePlaylistmodalMethod = () => {
      this.setState({ DeleteModalP: false });
   }
   goback = () => {
      this.props.navigation.navigate('Playlists')
   }
   async componentDidMount() {
      const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        const user = await AsyncStorage.getItem(ASYNC_KEYS.user);
        this.setState({user:JSON.parse(user)})
         // console.log(user?.tier?.name == 'Pro Tier','userrrr')
      if (userToken == 'null' || userToken == null) {
         this.props.navigation.navigate('Login')
      } else {
         this.setState({
            token: JSON.parse(userToken),
            
         })
      }
      this.getPlaylist()
   }

   async getPlaylist() {
      this.setState({
         loading:true
      })
      const id = this.props.navigation.getParam('id', '1')
      console.log('checked playlist id------',id)

      let ids = 1;
      try {
         let response = await fetch(`${BASE_URL}${API_URL}${id}/`, {
            method: 'GET',
            headers: {
               'Accept': 'application/json',
               'Content-type': 'application/json',
               'Authorization': `Token ${this.state.token}`
            },
         });
         let res = await response.json();
          console.log('checked------',res)

         if (response.status == 200) {
            this.setState({
               playlistData: res,
               image: res?.songs[0]?.image
            })
         }
         this.setState({
            loading:false
         })
      } catch (error) {
         console.log('error ' + error);
      }
   }

   render() {

      return (
         <View style={styles.container}>
            <BrowseBackground>

               <ImageBackground source={{ uri: this.state.playlistData?.image == null ? this.state.image : this.state.playlistData?.image }}
                  style={{ width: '100%', height: 220, opacity: 0.8 }}>
                  <View >
                     <TouchableOpacity onPress={() => this.props.navigation.navigate(this.state.param)}>
                        <Icon name="angle-left" size={25} color={this.state.color} style={{ paddingLeft: 20, paddingTop: 40 }} />
                     </TouchableOpacity>
                     <Icon name="play-circle-o" size={45} color={this.state.color}
                        style={{ alignSelf: 'center', width: 60, height: 50, marginLeft: 10 }} />
                     <Text style={[styles.title, { color: this.state.color }]}> {this.state.playlistData?.name}</Text>
                     {
                        this.state.playlistData?.songs ?
                           <Text style={[styles.trackText, { color: this.state.color }]}>{this.state.playlistData?.songs.length} track</Text>
                           : null
                     }
                  </View>
               </ImageBackground>
               <ImageBackground source={require('../assets/images/group.png')}
                  style={{ width: '100%', height: '100%', opacity: 0.8, marginTop: 0 }}>
                            {
                              this.state.user?.tier?.name == 'Pro Tier' && this.state.playlistData?.user != null  && this.state.user?.id == this.state.playlistData?.user.id? 
                                      
                              <View style={styles.views}>
                              <TouchableOpacity>
                            <Icon name='pencil' size={20} color='#fff' style={{alignSelf:'center'}}/>
                            </TouchableOpacity>  
                               <TouchableOpacity onPress={()=>this.setState({DeleteModalP:true})}>
                            <MaterialIcons name='delete' size={22} color='#fff' style={{alignSelf:'center'}}/>
                            </TouchableOpacity> 
                              {/* <TouchableOpacity>
                                 <MaterialIcons name='share' size={20} color='#fff' style={{ alignSelf: 'center' }} />
                              </TouchableOpacity> */}
                              <DeletePlaylistModal showModalDP={this.state.DeleteModalP} showDPModalMethod={this.deletePlaylistmodalMethod} id_playlist={this.state.id} goback={this.goback} />
                           </View>
                                      :
                                      null
                                 //      <View style={styles.views2}>
                                 //      <TouchableOpacity>
                                 //         <MaterialIcons name='share' size={20} color='#fff' style={{ alignSelf: 'center' }} />
                                 //      </TouchableOpacity>
                                 //      <DeletePlaylistModal showModalDP={this.state.DeleteModalP} showDPModalMethod={this.deletePlaylistmodalMethod} id_playlist={this.state.id} goback={this.goback} />
                                 //   </View>                          }
                           }
 
                  {
                     (this.state.loading) ?
                        <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/tenor.gif')} style={{width:30,height:30,alignSelf:'center',borderRadius:85}} />
                        </View>
                        :
                        <ScrollView style={{ marginBottom: '5%', marginTop: '10%' }}>
                           <View style={{ width: '98%', flex: 1, }}>
                              {
                                 this.state.playlistData?.songs ?
                                    this.state.playlistData?.songs.map((item, index) => {
                                       // console.log('item- song array----', this.state.playlistData?.songs.sort((a, b) => index - b.index).map((exemple, index, array) => exemple.name)

                                       // )
                                       return (
                                          <View
                                             key={item.id}
                                             style={styles.containera}
                                          >
                                             <View
                                                style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Song', { songs: this.state.playlistData?.songs, id: this.props.navigation.getParam('id', '1'), params: this.props.navigation.getParam('params', ''), color: this.props.navigation.getParam('color', "#000000") })}
                                                   style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start', }}>
                                                   <Text style={[styles.text, { textAlign: 'left' }]}>
                                                      {item.name}
                                                   </Text>
                                                   <Text style={[styles.text1, { textAlign: 'left' }]}>
                                                      {item.vocals}
                                                   </Text>
                                                </TouchableOpacity>
                                        {
                                         this.state.user?.tier?.name == 'Pro Tier' ? 
                                      
                                        <TouchableOpacity
                                           onPress={() => { 
                                              this.setState({isModalVisible:true,song_id:item.id,song_name:item.name,artist:item.vocals})}}
                                           >
                                          <Entypo name='dots-three-vertical' size={20} color='#fff' style={{alignSelf:'center',justifyContent:'flex-start'}}/>
                                     
                                        </TouchableOpacity>
                                      :
                                      null
                          }
                                             </View>
                                          </View>
                                       )
                                    }

                                    )
                                    :
                                    null
                              }
                           </View>
                        </ScrollView>
                  }
               </ImageBackground>
               <CustomModal showModalMethod={this.toggleModal} showModal={this.state.isModalVisible} songName={this.state.song_name} artist={this.state.artist} songId={this.state.song_id}
                  playlist_id={this.state.playlist_id} goback={this.goback} id_playlist={this.state.id}
               />
            </BrowseBackground>

         </View>
      )

   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0E3932'
   },
   resetText: {
      alignSelf: 'center',
      fontSize: 24,
      fontFamily: 'UnicaOne-Regular',
      color: '#fff',
      marginTop: -50,
      textAlign: 'center',
      width: '45%',
   },
   inputContainer: {
      width: '70%',
      alignSelf: 'center'
   },
   inputTextStyle: {
      fontSize: 12,
      paddingLeft: 20,
      paddingTop: 20
   },
   containera: {
      paddingLeft: 10,
      padding: 5,
   },
   text: {
      marginLeft: 15,
      fontSize: 14,
      marginTop: 10,
      fontFamily: 'Roboto-Regular',
      color: '#fff'
   },
   text1: {
      marginLeft: 15,
      fontSize: 12,
      fontFamily: 'Roboto-Light',
      color: '#fff'
   },
   title: { alignSelf: 'center', paddingTop: 25, fontFamily: 'Quicksand', fontSize: 24 },
   trackText: { alignSelf: 'center', fontFamily: 'Quicksand', fontSize: 14 },
   views: { alignSelf: 'center', backgroundColor: '#052923', width: '25%', height: 35, marginTop: 5, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-around', padding: 6 },
   views2: { alignSelf: 'center', backgroundColor: '#052923', width: '20%', height: 35, marginTop: 5, borderRadius: 25, flexDirection: 'row', justifyContent: 'space-around', padding: 6 }

});