import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");
const IsLoginBtn = ({ handleLogin, isLoading, isError }: any) => {
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#E1372D" />
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btntxt}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IsLoginBtn;

const styles = StyleSheet.create({
  btn: {
    color: "#fff",
    backgroundColor: "#E1372D",
    width: width * 0.5,
    padding: 10,
    margin: height / 12,
    borderRadius: 20,
  },
  btntxt: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
