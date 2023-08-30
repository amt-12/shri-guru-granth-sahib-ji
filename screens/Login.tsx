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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";

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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "YOUR_WEB_CLIENT_ID", // Your web client ID from Google Developer Console
      offlineAccess: true,
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Other error occurred
      }
    }
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
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
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
