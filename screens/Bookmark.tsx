import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'

const Bookmark = () => {
    const [data, setData]:any = useState([]);
  const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.48:3000/bookmark');
        setData(response?.data?.data);
      } catch (error) {
        console.error( error);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data)
       
  return (
    <View>
      <Text>Bookmark</Text>
      <FlatList 
        data={data}
        renderItem={({item}) => {
            return(
                <View>
                    <Text style = {{fontSize:30, fontWeight:'bold'}}>{item.title}</Text>
                    <Text style = {{fontSize:20}}>{item.arth}</Text>
                </View>
            )
        }}

      />
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({})