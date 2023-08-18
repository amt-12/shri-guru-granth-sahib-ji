import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions} from "react-native";
import React, { useState } from "react";

const {width, height} = Dimensions.get('window'); 

const ModalMenu = ({visible, setVisible}:any) => {

  return (
    
    <Modal visible={visible} transparent={false} onRequestClose={()=>{setVisible(true) }} >
      <TouchableOpacity style = {{
        backgroundColor: 'rgba(0, 0, 255, 0)',
        width: width,
        height:height,
        position:'absolute',
        top: 10,
        justifyContent:'center',
        alignItems:'center'
      }} onPress={()=>{setVisible(false)}}>
        <View 
        style = {{
          backgroundColor:'#f7f7f7',
          width: width * 0.7,
          height: 45,
          borderRadius:30,
          flexDirection:'row',
          justifyContent:'space-evenly'
          }}
        >
     
            <Text style = {{fontSize:30}}>🙂 </Text>
            <Text style = {{fontSize:30}}>💆‍♂️</Text>
            <Text style = {{fontSize:30}}>👍</Text>
            <Text style = {{fontSize:30}}>💪</Text>
            <Text style = {{fontSize:30}}>🤘</Text>
        </View>
      </TouchableOpacity>
      </Modal>
  );
};

export default ModalMenu;

const styles = StyleSheet.create({});
