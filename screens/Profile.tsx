import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../config/connection";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [data, setData] = useState([]);

  const fetchData = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        const response = await axios.get(`${SERVER}singleuser/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setData(response?.data?.data?.id);
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
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
