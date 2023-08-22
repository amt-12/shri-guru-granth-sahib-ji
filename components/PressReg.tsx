import { Pressable, Text } from "react-native";
import React from "react";

const PressReg = ({ navigation }: any) => {
  return (
    <Pressable onPress={() => navigation.navigate("RegistrationScreen")}>
      <Text style={{ fontSize: 17, fontFamily: "Lora-Regular" }}>
        {" "}
        Not a member?{" "}
        <Text
          style={{ color: "blue", fontSize: 17, fontFamily: "Lora-Regular" }}
        >
          Register now
        </Text>
      </Text>
    </Pressable>
  );
};

export default PressReg;
