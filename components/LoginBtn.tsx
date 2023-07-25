import React from 'react';
import { Pressable, Text } from 'react-native';
import Login from '../screens/Login';


const LoginButton = ({navigation, }:any) => {
  return (
    <Pressable onPress={() => navigation.navigate('Login screen')}>
      <Text style={{ color: 'Black', paddingHorizontal:10, fontSize:20 }}>Login</Text>
    </Pressable>
  );
};

export default LoginButton;