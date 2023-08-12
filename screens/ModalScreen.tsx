import { StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions} from "react-native";
import React from "react";

const {width, height} = Dimensions.get('window'); 

const ModalMenu = ({viewable, setViewable}:any) => {

  return (
    
    <Modal viewable={viewable} transparent={false} onRequestClose={()=>{setViewable(true) }} >
      <TouchableOpacity style = {{
        backgroundColor: 'rgba(0, 0, 255, 0)',
        width: width,
        height:height,
        position:'absolute',
        top: 10,
        justifyContent:'center',
        alignItems:'center'
      }} onPress={()=>{setViewable(false)}}>
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