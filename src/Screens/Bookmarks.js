import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import LGradient from '../components/GradiantPart';
import { Background } from '../components/BackgroundDesign';
import { ProtierPart, StandardTierPart, SelectedProtier, SelectedStanderstier } from '../components/ProtirePart';

export default class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Background>
                    <LGradient />
                    <View style={{ height: 100, width: '40%', alignSelf: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: '#fff', fontFamily: 'Quicksand', textAlign: 'center' }}> Get the Pro tier to unlock this feature</Text>
                    </View>
                    <ProtierPart />

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BrowseByMood')}
                        style={{ alignSelf: 'center', position: 'absolute', bottom: '15%' }}>
                        <ImageBackground source={require('../assets/images/button.png')} style={{ width: 185, height: 50, borderRadius: 60 }}>
                            <Text style={{ alignSelf: 'center', padding: 15, color: '#fff' }}>GET PRO TIER</Text>

                        </ImageBackground>
                    </TouchableOpacity>

                </Background>
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


});