import React from "react";
import { Pressable, Text } from "react-native";

const LoginButton = ({ navigation }: any) => {
  return (
    <Pressable onPress={() => navigation.navigate("Loginscreen")}>
      <Text style={{ color: "Black", paddingHorizontal: 10, fontSize: 20 }}>
        Login
      </Text>
    </Pressable>
  );
};

export default LoginButton;
