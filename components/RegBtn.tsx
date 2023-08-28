import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");
const RegBtn = ({ handleregistration, isLoading }: any) => {
  return (
    <View style={{ margin: 50 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleregistration}>
          <Text style={styles.btntxt}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RegBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#E1372D",
    width: width * 0.4,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  btntxt: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
