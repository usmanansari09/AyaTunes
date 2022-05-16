import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class GradiantPart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // <View style={styles.container}>

                <LinearGradient
                    // colors={['#FFFB9A','transparent', ]}
                    style={{
                        width: '100%', height: 180, opacity: 0.3, alignSelf: 'center',position:'absolute',top:0
                    }}
                    start={{ x: 0.0, y: 0.01 }} end={{ x: 0.0, y: 1.0 }}
                    //   locations={[0,0.5,0.6]}
                    colors={[ '#FFFB9A', 'transparent',]}
                />
            // </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        // flex:1 ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'UnicaOne-regular',
        color: '#fff',
        fontSize: 18,
        padding: 60
    }
})


