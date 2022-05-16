
import { View } from 'native-base';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CustomMarker extends React.Component {
  render() {
    return (
      <View style={styles.image}>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 20,
    width: 20,
    borderRadius:85,
    backgroundColor:'#fff'
  },
});

export default CustomMarker;