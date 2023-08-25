import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bookmark from "./Bookmark";
import SERVER from "../config/connection";
import LoginInput from "../components/LoginInput";
import IsLoginBtn from "../components/IsLoginBtn";
import PressReg from "../components/PressReg";
import { loginFlag } from "../store/auth";

const { height, width } = Dimensions.get("window");
import { useAtom } from "jotai";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginFlag);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);
  const checkLoggedInStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        "ਕੁਝ ਗਲਤ",
        "ਕਿਰਪਾ ਕਰਕੇ ਈਮੇਲ ਅਤੇ ਪਾਸਵਰਡ ਦੋਵਾਂ ਖੇਤਰਾਂ ਨੂੰ ਭਰੋ।"
      );
      return;
    }
    try {
      const res = await axios.post(`${SERVER}login`, {
        email: email,
        password: password,
      });
      if (res.data.token) {
        const authToken = res.data.token;
        await AsyncStorage.setItem("authToken", authToken);
        console.log("Token", authToken);
        setIsLoggedIn(true);
        Alert.alert("Success", "Login Successfully");
        navigation.navigate("BookmarkScreen");
      } else {
        Alert.alert(
          "Error",
          "Invalid response from the server. Missing authentication token."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Login failed. Please check your email and password."
      );
    }
  };
  return isLoggedIn ? (
    <Bookmark />
  ) : (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" />
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          bottom: height * 0.02,
          fontFamily: "Rubik-Regular",
        }}
      >
        ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
        ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
      </Text>

      <LoginInput setEmail={setEmail} setPassword={setPassword} />
      <IsLoginBtn handleLogin={handleLogin} />
      <PressReg navigation={navigation} />
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
