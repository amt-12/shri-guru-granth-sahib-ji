import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useProfile } from "../data/profile/query";
import { useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const profile = useProfile();
  useFocusEffect(
    useCallback(() => {
      profile.refetch();
    }, [])
  );
  console.log({
    data: profile?.data?.data,
  });

  if (profile.isLoading) {
    return <ActivityIndicator animating size={"large"} />;
  }
  return (
    <View>
      <Text>Profile</Text>
      <FlatList
        data={profile?.data?.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }: any) => <Text>{item.fullname}</Text>}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
