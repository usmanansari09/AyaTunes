import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform
} from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { Item, Input } from "native-base"

import Button from "../components/Button"
import LinearGradient from "../components/GradiantPart"
import { Background } from "../components/BackgroundDesign"
import { BASE_URL, API_URL } from "../config/Api"
import { storeIntoAsyncStorage } from "../config/Utils"
import { ASYNC_KEYS } from "../config/AsyncKeys"
import { isValidEmail } from "../utils/validation"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      showText: false,
      loading: false
    }
    this.onLogin = this.onLogin.bind(this)
  }

  async componentDidMount() {
    const rawUser = await AsyncStorage.getItem(ASYNC_KEYS.token)
    if (rawUser == "null" || rawUser == null) {
      this.props.navigation.navigate("Login")
    } else {
      this.props.navigation.navigate("BrowseByMood")
    }
  }

  validate() {
    const { email, password } = this.state
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
    }
    return true
  }

  async onLogin() {
    const { email, password } = this.state
    this.setState({
      loading: true
    })
    try {
      let response = await fetch(`${BASE_URL}${API_URL}login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })
      let res = await response.json()
      if (response.status == 200) {
        if (res.profile_picture !== "" || res.profile_picture !== null) {
          await storeIntoAsyncStorage(
            ASYNC_KEYS.profile_picture,
            JSON.stringify(res.user.profile_picture)
          )
        }
        await storeIntoAsyncStorage(ASYNC_KEYS.token, JSON.stringify(res.token))
        await storeIntoAsyncStorage(ASYNC_KEYS.user, JSON.stringify(res.user))
        if (res.user.profile_picture !== "") {
          await storeIntoAsyncStorage(
            ASYNC_KEYS.profile_picture,
            JSON.stringify(res.user.profile_picture)
          )
        }

        this.setState({
          loading: false
        })
        this.props.navigation.navigate("BrowseByMood")
      } else {
        this.setState({
          loading: false
        })
        let error = res
        throw error
      }
    } catch (error) {
      this.setState({
        loading: false
      })
      console.log("error ", JSON.stringify(error?.non_field_errors[0]))
      alert(JSON.stringify(error?.non_field_errors[0]))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Background>
          <LinearGradient />
          <ScrollView keyboardShouldPersistTaps="handled" style={{}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "position" : "height"}
              style={{ flex: 1, marginBottom: "10%" }}
            >
              {this.state.loading == false ? (
                <>
                  <Text style={styles.loginText}>LOG IN</Text>

                  <View style={{ marginTop: "8%" }}>
                    <Item style={styles.inputContainer}>
                      <Input
                        defaultValue={this.state.email}
                        blurOnSubmit={false}
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
                        secureTextEntry={this.state.showText ? false : true}
                        blurOnSubmit={false}
                        defaultValue={this.state.password}
                        placeholder="Password"
                        placeholderTextColor="#FFFFFF"
                        style={styles.inputTextStyle}
                        keyboardAppearance="dark"
                        onChangeText={item => this.setState({ password: item })}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({ showText: !this.state.showText })
                        }
                      >
                        <Icon
                          name="eye-off"
                          size={15}
                          color="white"
                          style={{ paddingRight: 20, paddingTop: 20 }}
                        />
                      </TouchableOpacity>
                    </Item>
                  </View>
                  <View style={{ width: "72%", alignSelf: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("Reset")}
                    >
                      <Text
                        style={{
                          alignSelf: "flex-end",
                          marginTop: 20,
                          color: "#fff",
                          fontSize: 12
                        }}
                      >
                        {" "}
                        Forget Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignSelf: "center", marginTop: "50%" }}>
                    <Button
                      title={"LOG IN"}
                      onPress={() => {
                        if (this.validate()) {
                          this.onLogin()
                        }
                      }}
                    />
                  </View>

                  <TouchableOpacity
                    style={{ marginTop: "2%", alignSelf: "center" }}
                    onPress={() => this.props.navigation.navigate("Signup")}
                  >
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      Don't have an account? <Text> Sign up</Text>
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
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
              )}
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
