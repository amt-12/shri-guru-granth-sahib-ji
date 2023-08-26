import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");
const RegBtn = ({ handleregistration }: any) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={handleregistration}>
      <Text style={styles.btntxt}>Submit</Text>
    </TouchableOpacity>
  );
};

export default RegBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#E1372D",
    width: width * 0.4,
    padding: 10,
    margin: height / 12,
    borderRadius: 20,
  },
  btntxt: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
