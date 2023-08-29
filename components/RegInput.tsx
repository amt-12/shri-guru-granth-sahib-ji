import { TextInput, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const RegInput = ({
  setFullName,
  setAddress,
  setPhone,
  setEmail,
  setPassword,
}: any) => {
  return (
    <>
      <TextInput
        style={styles.txt}
        placeholder="ਪੂਰਾ ਨਾਂਮ"
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.txt}
        placeholder="ਪੂਰਾ ਪਤਾ"
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.txt}
        placeholder="Mobile Number"
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.txt}
        placeholder=" ਈ - ਮੇਲ "
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.txt}
        secureTextEntry
        placeholder="ਪਾਸਵਰਡ"
        onChangeText={setPassword}
      />
    </>
  );
};
export default RegInput;
const styles = StyleSheet.create({
  txt: {
    backgroundColor: "#fff",
    width: width * 0.8,
    height: 50,
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    top: 50,
  },
});
