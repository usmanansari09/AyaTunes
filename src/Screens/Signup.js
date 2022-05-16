import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Platform
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { Item, Input } from "native-base"
// import {ApngPlayer} from 'react-native-apng';

import Button from "../components/Button"
import LinearGradient from "../components/GradiantPart"
import { Background } from "../components/BackgroundDesign"
import { BASE_URL, API_URL } from "../config/Api"
import { KeyboardAvoidingView } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { isValidEmail } from "../utils/validation"

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      showTextP: false,
      showTextCP: false,
      errorMessage: ""
    }
    this.onSignup = this.onSignup.bind(this)
  }

  validate() {
    const { email, password, confirmPassword } = this.state
    if (email.length == 0) {
      alert("Please enter email first")
      return
    } else if (!isValidEmail(email)) {
      alert("Please enter valid email address")
      return
    }
    if (password.length == 0) {
      alert("Please enter password first")
      return
    } else if (password != confirmPassword) {
      alert("Password are not matched")
      return
    }
    return true
  }

  async onSignup() {
    const { email, password, confirmPassword } = this.state
    try {
      let response = await fetch(`${BASE_URL}${API_URL}signup/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      // let res = await response.json()
      console.log("res signup ----", response)
      // if (response.status > 200 || response.status < 202) {
      //   this.setState({
      //     error: ""
      //   })
      //   this.props.navigation.navigate("Login")
      // } else {
      //   let error = res
      //   throw error
      // }
    } catch (error) {
      console.log("error " + error)
    }
  }

  render() {
    const { height } = Dimensions.get("window").height
    const { width } = Dimensions.get("window").width
    return (
      <View style={styles.container}>
        <Background>
          <LinearGradient />
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "position" : "height"}
            >
              <Text style={styles.loginText}>SIGN UP</Text>

              <View style={{ marginTop: "8%" }}>
                <Item style={styles.inputContainer}>
                  <Input
                    defaultValue={this.state.email}
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    style={styles.inputTextStyle}
                    autoCapitalize="none"
                    keyboardAppearance="dark"
                    onChangeText={item => this.setState({ email: item })}
                  />
                </Item>

                <Item style={styles.inputContainer}>
                  <Input
                    defaultValue={this.state.password}
                    blurOnSubmit={false}
                    secureTextEntry={this.state.showTextP ? false : true}
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    style={styles.inputTextStyle}
                    keyboardAppearance="dark"
                    onChangeText={item => this.setState({ password: item })}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ showTextP: !this.state.showTextP })
                    }
                  >
                    <Icon
                      name="eye-off"
                      size={15}
                      color="white"
                      style={{ paddingRight: 20, paddingTop: 20, opacity: 0.8 }}
                    />
                  </TouchableOpacity>
                </Item>
                <Item style={styles.inputContainer}>
                  <Input
                    defaultValue={this.state.confirmPassword}
                    blurOnSubmit={false}
                    secureTextEntry={this.state.showTextCP ? false : true}
                    placeholder="Confirm password"
                    placeholderTextColor="#FFFFFF"
                    style={styles.inputTextStyle}
                    keyboardAppearance="dark"
                    onChangeText={item =>
                      this.setState({ confirmPassword: item })
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ showTextCP: !this.state.showTextCP })
                    }
                  >
                    <Icon
                      name="eye-off"
                      size={15}
                      color="white"
                      style={{ paddingRight: 20, paddingTop: 20, opacity: 0.8 }}
                    />
                  </TouchableOpacity>
                </Item>
                {this.state.errorMessage ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "red",
                      padding: 5,
                      fontFamily: "Roboto-Regular"
                    }}
                  >
                    {this.state.errorMessage}
                  </Text>
                ) : null}
              </View>

              <View style={{ marginTop: "50%" }}>
                <Button
                  title={"SIGN UP"}
                  onPress={() => {
                    if (this.validate()) {
                      this.onSignup()
                    }
                  }}
                />
              </View>

              <TouchableOpacity
                style={{ marginTop: "2%", alignSelf: "center" }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  Already have an account? <Text> Log in</Text>
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </Background>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#033333"
  },
  backImage: {
    width: "100%",
    height: "100%",
    marginTop: -20
  },
  loginText: {
    alignSelf: "center",
    fontSize: 36,
    fontFamily: "UnicaOne-Regular",
    color: "#fff",
    marginTop: "20%"
  },
  inputContainer: {
    width: "70%",
    alignSelf: "center"
  },
  inputTextStyle: {
    fontSize: 12,
    paddingLeft: 20,
    paddingTop: 20,
    color: "#fff",
    fontFamily: "Roboto-Regular"
  }
})
