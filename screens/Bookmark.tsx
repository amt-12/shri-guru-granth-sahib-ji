import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SERVER from "../config/connection";
import { StatusBar } from "expo-status-bar";
import ListComponent from "../components/ListComponent";
const { height, width } = Dimensions.get("window");

interface ListTask {
  title: String;
  arth: String;
  ang: Number;
}
const Bookmark = () => {
  const [data, setData] = useState<ListTask>();

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
        console.log(response?.data?.data);
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

      <ListComponent data={data} />
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
