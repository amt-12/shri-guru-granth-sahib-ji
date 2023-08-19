import { StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'
const {height, width} = Dimensions.get('window')
const LoginInput = ({setEmail, setPassword}:any) => {
  return (
    <>    
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
    </>

  )
}

export default LoginInput

const styles = StyleSheet.create({
    txt:{
        backgroundColor: '#fff',
        width: width * 0.8,
        height: 60,
        borderRadius:15,
        padding:20,
        marginBottom:10,
      },
})