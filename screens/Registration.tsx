import {
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useFonts } from "expo-font";
import axios from "axios";
import { useState } from "react";
import SERVER from "../config/connection";
import RegInput from "../components/RegInput";
import RegBtn from "../components/RegBtn";
import PressBtn from "../components/PressBtn";
import { useMutation } from "react-query";

const Registration = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const registrationUser = async () => {
    if (!fullName || !address || !email || !password) {
      Alert.alert("ਕੁਝ ਗਲਤ", "ਕਿਰਪਾ ਕਰਕੇ ਖੇਤਰਾਂ ਨੂੰ ਭਰੋ।");
      return;
    }
    try {
      const res = await axios.post(SERVER + "/registration", {
        fullName: fullName,
        address: address,
        phone: phone,
        email: email,
        password: password,
      });
      Alert.alert("Success", "User saved successfully!");
      navigation.navigate("Login screen");
    } catch (err) {
      Alert.alert("Error", "Failed to save data. Please try again.");
    }
  };
  const { mutate, isLoading, isError, error } = useMutation(registrationUser);
  const handleregistration = () => {
    mutate({ fullName, address, phone, email, password });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" />
        <Text
          style={{
            fontSize: 26,
            textAlign: "center",
            top: 50,
            fontFamily: "Rubik-Regular",
          }}
        >
          ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
          ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
        </Text>
        <RegInput
          setFullName={setFullName}
          setAddress={setAddress}
          setPhone={setPhone}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <RegBtn handleregistration={handleregistration} isLoading={isLoading} />
        <PressBtn navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Registration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
