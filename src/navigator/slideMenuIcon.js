import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

export class SlideMenuIcon extends React.Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.navigationProps}>
          <Icon name="bars" style={styles.icon} size={25} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  icon: {
    marginLeft: 5,
    margin:20
  }
})
