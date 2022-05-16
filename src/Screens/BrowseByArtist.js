import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import { FlatGrid } from 'react-native-super-grid';
import { BrowseBackground } from '../components/BackgroundDesign';
const { width } = Dimensions.get('window').width;
const { height } = Dimensions.get('window').height;
import AlbumData from '../data/AlbumData';

export default class BrowseByArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artiest: true,
            album: false
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <BrowseBackground>
                    <View marginBottom={50}>
                        <ImageBackground source={require('../assets/images/bc.png')} style={{ height: 175, backgroundColor: '#052923', width: '100%', marginTop: 20, }}>
                            <TouchableOpacity><Text style={{ color: '#fff', marginLeft: '5%', fontFamily: 'Roboto-Light', marginTop: 5 }}>Morning Chillout</Text></TouchableOpacity>
                            <ScrollView horizontal={true}>
                                <FlatGrid
                                    // itemDimension={400}
                                    data={AlbumData.items}
                                    style={styles.gridView}
                                    horizontal={true}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity style={[styles.itemContainer,]}>
                                            <Image source={item.imageurl} style={styles.imageView1} />
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemName1}>{item.screen}</Text>
                                        </TouchableOpacity>

                                    )}
                                />
                            </ScrollView>
                        </ImageBackground>
                        <ImageBackground source={require('../assets/images/bc.png')} style={{ height: 180, backgroundColor: '#052923', width: '100%', marginTop: 20, }}>
                            <TouchableOpacity><Text style={{ color: '#fff', marginLeft: '5%', fontFamily: 'Roboto-Light', marginTop: 5 }}>Glitched Love</Text></TouchableOpacity>
                            <ScrollView horizontal={true}>
                                <FlatGrid
                                    // itemDimension={400}
                                    data={AlbumData.items1}
                                    style={styles.gridView}
                                    horizontal={true}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity style={[styles.itemContainer,]}>
                                            <Image source={item.imageurl} style={styles.imageView1} />
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemName1}>{item.screen}</Text>
                                        </TouchableOpacity>

                                    )}
                                />
                            </ScrollView>
                        </ImageBackground>
                        <ImageBackground source={require('../assets/images/bc.png')} style={{ height: 180, backgroundColor: '#052923', width: '100%', marginTop: 20 }}>
                            <TouchableOpacity><Text style={{ color: '#fff', marginLeft: '5%', fontFamily: 'Roboto-Light', marginTop: 5 }}>Jazz hip</Text></TouchableOpacity>
                            <ScrollView horizontal={true}>
                                <FlatGrid
                                    // itemDimension={400}
                                    data={AlbumData.items2}
                                    style={styles.gridView}
                                    horizontal={true}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity style={[styles.itemContainer,]}>
                                            <Image source={item.imageurl} style={styles.imageView1} />
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemName1}>{item.screen}</Text>
                                        </TouchableOpacity>

                                    )}
                                />
                            </ScrollView>
                        </ImageBackground>
                        <ImageBackground source={require('../assets/images/bc.png')} style={{ height: 180, backgroundColor: '#052923', width: '100%', marginTop: 20, }}>
                            <TouchableOpacity><Text style={{ color: '#fff', marginLeft: '5%', fontFamily: 'Roboto-Light', marginTop: 5 }}>Sleep healing sounds</Text></TouchableOpacity>
                            <ScrollView horizontal={true}>
                                <FlatGrid
                                    // itemDimension={400}
                                    data={AlbumData.items3}
                                    style={styles.gridView}
                                    horizontal={true}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity style={[styles.itemContainer,]}>
                                            <Image source={item.imageurl} style={styles.imageView1} />
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            <Text style={styles.itemName1}>{item.screen}</Text>
                                        </TouchableOpacity>

                                    )}
                                />
                            </ScrollView>
                        </ImageBackground>
                    </View>
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
        width: 115
    },
    itemName: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Roboto-Light',
        alignSelf: 'center'
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

});
