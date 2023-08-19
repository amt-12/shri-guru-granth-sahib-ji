import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, SafeAreaView, StyleSheet, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SERVER from '../config/connection';
import { StatusBar } from 'expo-status-bar';

const Bookmark = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
        const authToken = await AsyncStorage.getItem('authToken');

        if (authToken) {
            const response = await axios.get(SERVER + '/bookmark', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
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
  const white = "rgb(200,200,200)"

  return (
    <SafeAreaView style = {styles.container}>
      <StatusBar hidden />
      <TextInput placeholder='Search' placeholderTextColor={white} />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(200, 200, 200)' }}>{item.title}</Text>
              <Text style={{ fontSize: 15, color: 'rgb(200, 200, 200)' }}>{item.arth}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)'
  },

});
