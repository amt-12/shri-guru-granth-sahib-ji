import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook
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

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'wheat', textAlign: 'center', backgroundColor: 'black' }}>ਪਦ ਅਰਥ:</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
              <Text style={{ fontSize: 15 }}>{item.arth}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
