import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../config/connection";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileProps {
  userId: string; // Modify the type based on your use case
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchData = async (userId: any) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        const res = await axios.get(`${SERVER}singleuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUsers(res?.data?.data);
      } else {
        console.log("Auth token not available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId]); // Fetch data when userId changes

  return (
    <View>
      <Text>Profile</Text>
      <FlatList
        data={users}
        keyExtractor={(user: any) => user._id}
        renderItem={({ item }: any) => <Text>{item.fullname}</Text>}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
