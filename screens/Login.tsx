import {Pressable, View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import axios from 'axios';

const {height, width} = Dimensions.get('window')

const Login = ({navigation})=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Lora-Regular': require('../assets/fonts/Lora-Regular.ttf'),
    'Lobster-Regular': require('../assets/fonts/Lobster-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () =>{
    const res = await axios.post('http://192.168.0.103:3000/login',{
    email:email,
    password:password
   
  })
    Alert.alert('Success', 'Login Successfully');
    navigation.navigate('BookmarkScreen')
  }
  return (
     <View style = {styles.container}>

      <StatusBar backgroundColor= '#fff'  />
      <Text style ={{fontSize:30, textAlign:'center', bottom: height * .02, fontFamily:'Rubik-Regular'}} >
      ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
       ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
      </Text >
 
      <TextInput 
        style ={styles.txt}  
        placeholder = 'ਈ - ਮੇਲ'
        onChangeText={setEmail}  />
      <TextInput 
          style ={styles.txt} 
          placeholder='ਪਾਸਵਰਡ' 
          secureTextEntry 
          onChangeText={setPassword}
        />
      <TouchableOpacity style ={styles.btn} onPress={handleLogin} > 
        <Text style ={styles.btntxt} >Sign In</Text>
      </TouchableOpacity>
      <Pressable onPress={()=> navigation.navigate('Registration Screen')}>
      <Text style = {{fontSize:17, fontFamily:'Lora-Regular'}} > Not a member? <Text style = {{color:'blue', fontSize:17, fontFamily:'Lora-Regular'}}>Register now</Text></Text>
      </Pressable> 
      
  </View>
  )
}
export default Login;
       
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  txt:{
    backgroundColor: '#fff',
    width: width * 0.8,
    height: 60,
    borderRadius:15,
    padding:20,
    marginBottom:10,
  },
  btn: {
    color:'#fff',
    backgroundColor:'#E1372D',
    width: width * 0.8,
    padding:15,
    margin: height /8,
    borderRadius:15,
  },
  btntxt:{
    color:'#fff',
    fontSize:20,
    textAlign:'center',
    fontFamily:'Lora-Regular'
  },
  background:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0
  }
  })