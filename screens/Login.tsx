import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import { useQueryClient, useMutation } from "react-query";

const { height, width } = Dimensions.get("window");
import { useAtom } from "jotai";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
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

  const loginUser = async () => {
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
  const { mutate, isLoading } = useMutation(loginUser);
  const handleLogin = () => {
    mutate({ email, password });
  };

  return isLoggedIn ? (
    <Bookmark />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <StatusBar backgroundColor="#fff" />
          <Text
            style={{
              fontSize: 26,
              textAlign: "center",
              bottom: height * 0.02,
              fontFamily: "Rubik-Regular",
            }}
          >
            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
          </Text>

          <LoginInput setEmail={setEmail} setPassword={setPassword} />
          <IsLoginBtn handleLogin={handleLogin} isLoading={isLoading} />
          <Pressable>
            <Text style={{ color: "blue" }}>Forget password?</Text>
          </Pressable>
          <PressReg navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
