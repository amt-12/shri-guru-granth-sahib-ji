import React from 'react';
import { Pressable, Text } from 'react-native';

const LogoutButton = ({navigation, }:any) => {
  return (
    <Pressable onPress={() => navigation.navigate('Login screen')}>
      <Text style={{ color: 'Black', paddingHorizontal:10, fontSize:20 }}>Logout</Text>
    </Pressable>
  );
};

export default LogoutButton;