import React, { Component } from 'react';
import { StyleSheet, Text, AsyncStorage,ImageBackground, View, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { FlatGrid } from 'react-native-super-grid';
import { BrowseBackground } from '../components/BackgroundDesign';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import CustomModal from '../components/Modal';
import {ASYNC_KEYS} from '../config/AsyncKeys';
import { BASE_URL , API_URL} from '../config/Api';
const { width } = Dimensions.get('window').width;
const { height } = Dimensions.get('window').height;


export default class SelectedArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading: false,
            isModalVisible: false,
            DeleteModalP: false,
            playlistData:[],
            playlist_id: this.props.navigation.getParam('id',1),
            song_id : "",
            song_name: "",
            artist:"",
            token:"",
        }
        this.toggleModal = this.toggleModal.bind(this)
    }


    async componentDidMount(){
        const userToken = await AsyncStorage.getItem(ASYNC_KEYS.token);
        console.log('userToken--------',userToken)
        if(userToken == 'null' || userToken == null) {
            this.props.navigation.navigate('Login')
        }else{
           this.setState({
               token: JSON.parse(userToken)
           })
        }
    }

    toggleModal = () => {
        this.setState({isModalVisible: false});
      }

    render() {
        const items = this.props.navigation.getParam('items',"item")
         console.log('items----',items.songs, items.name)
        return (
            <View style={styles.container}>
                <BrowseBackground>
                <ImageBackground source={{uri: items.image}} 
          style={{width:'115%',height:250,opacity:0.8,alignSelf:'center'}}>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('BrowseByAlbum')}>
              <Icon name="angle-left" size={30} color="#fff" style={{paddingLeft:50,paddingTop:40}} />
              <Text style={{alignSelf:'center',fontSize:20,color:'#fff',marginTop:'25%'}}>{items.name}</Text>
          </TouchableOpacity>
          </ImageBackground>
          { items.albums.length > 0 ?
          
        
              <View style={{height:170}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('BrowseByAlbum')}>
                        <Text style={styles.texts}>Albums</Text></TouchableOpacity>
                        <ScrollView horizontal={true} >
                            <FlatGrid
                                // itemDimension={400}
                                data={items.albums}
                                style={styles.gridView}
                                horizontal={true}
                                renderItem={({ item }) => {      
                                    console.log('image--',item.image)
                                    return(
                                       <TouchableOpacity style={[styles.itemContainer,]} 
                                             >
                                            <Image source={{uri: item.image}} style={styles.imageView1} />
                                           <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemName1}>{item.vocals}</Text>
                                        </TouchableOpacity> 
                                    )                             
                                }}
                            />
                        </ScrollView>
                        </View> 
                        :
                        null
    }
                        <ScrollView style={{ marginBottom: '5%', marginTop: '5%' }}>
                     <View style={{ width: '98%', flex: 1,paddingTop:10}}>
                         {
                             items.songs.length > 0 ?
                             <Text style={[styles.texts,{marginBottom:15,marginLeft:25}]}>Tracks</Text>
                                    : null
                         }

                        {
                           items.songs.map((item, index) => {
                               console.log('songs------',item)
                              return (
                                 <View
                                    key={item.id}
                                    style={styles.containera}
                                 >
                                    <View
                                       style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('Song',{songs:  items.songs, album:items.name})}
                                       style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start', }}>
                                          <Text style={[styles.text, { textAlign: 'left' }]}>
                                             {item.name}
                                          </Text>
                                          <Text style={[styles.text1, { textAlign: 'left' }]}>
                                             {item.vocals}
                                          </Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity
                                             onPress={() => { 
                                                this.setState({isModalVisible:true,song_id:item.id,song_name:item.name,artist:item.vocals})
                                             }}
                                          style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                                         <Entypo name='dots-three-vertical' size={20} color='#fff' style={{alignSelf:'center',justifyContent:'flex-start'}}/>
                                    
                                       </TouchableOpacity>
                                    </View>
                                 </View>
                              )
                           }
                           )
                        }
                     </View>
                  </ScrollView>
                  <CustomModal showModalMethod={this.toggleModal} showModal={this.state.isModalVisible} songName={this.state.song_name} artist={this.state.artist} songId={this.state.song_id}
             playlist_id= {this.state.playlist_id}
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
        width: 130
    },
    itemName: {
        fontSize: 14,
        color: '#fff',
        fontFamily:'Roboto-Light',
        alignSelf: 'center'
    },
    itemName1: {
        fontSize: 10,
        color: '#fff',
        fontFamily:'Roboto-Light',
        alignSelf: 'center'
    },
    containera: {
        paddingLeft: 10,
        padding: 5,
     },
     text: {
        marginLeft: 15,
        fontSize: 14,
        marginTop: 10,
        fontFamily:'Roboto-Regular',
        color:'#fff'
     },
    imageView1: {
        width: 80,
        height: 80,
        // marginTop: '15%',
        alignSelf: 'center',
        // borderRadius: 15,
        marginBottom:10
    },
    text1: {
        marginLeft: 15,
        fontSize: 12,
        fontFamily:'Roboto-Light',
        color: '#fff'
     },
    container1:{ height: 180, backgroundColor: '#052923', width: '100%', marginTop: 20,  },
    texts:{color:'#fff',marginLeft:'5%',fontFamily:'Roboto-Light',marginTop:5}

});
