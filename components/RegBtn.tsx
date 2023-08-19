import { StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const {height, width} = Dimensions.get('window')
const RegBtn = ({handleregistration}:any) => {
  return (
    <TouchableOpacity style ={styles.btn}
        onPress={handleregistration}
      >
        <Text style ={styles.btntxt}>Submit</Text>
      </TouchableOpacity>
  )
}

export default RegBtn

const styles = StyleSheet.create({
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
})