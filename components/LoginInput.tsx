import { StyleSheet, TextInput, Dimensions, View } from "react-native";
import React from "react";
const { width } = Dimensions.get("window");
const LoginInput = ({ setEmail, setPassword }: any) => {
  return (
    <View style={{ justifyContent: "center" }}>
      <TextInput
        style={styles.txt}
        placeholder="ਈ - ਮੇਲ"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.txt}
        placeholder="ਪਾਸਵਰਡ"
        secureTextEntry
        onChangeText={setPassword}
      />
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  txt: {
    backgroundColor: "#fff",
    width: width * 0.8,
    height: 60,
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
});
