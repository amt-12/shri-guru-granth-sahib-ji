import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SERVER from "../config/connection";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

const Bookmark = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");

      if (authToken) {
        const response = await axios.get(SERVER + "/bookmark", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setData(response?.data?.data);
        console.log(response?.data);
      } else {
        // Handle case where authToken is not available
        console.log("Auth token not available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const white = "rgb(200,200,200)";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <TextInput
        style={styles.input}
        placeholder="search keyword"
        placeholderTextColor="#fff"
        autoCapitalize="none"
        keyboardType="default"
        returnKeyType="next"
        blurOnSubmit={false}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={{ marginHorizontal: 20, padding: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "rgb(255,255,255)",
                  fontFamily: "GurbaniAkharHeavy",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  color: "rgb(200, 200, 200)",
                  fontFamily: "GurbaniAkhar",
                }}
              >
                {item.arth}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.9,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "rgba(145, 151, 167, 1)",
    color: "white",
  },
});
