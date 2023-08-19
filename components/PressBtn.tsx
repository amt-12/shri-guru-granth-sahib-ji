import { Pressable, Text} from 'react-native'
import React from 'react'

const PressBtn = ({navigation}:any) => {
    return (
    <Pressable onPress={()=> navigation.navigate('Login screen')}>
    <Text style = {{fontSize:17, fontFamily:'Lora-Regular'}} > Already have an Account? <Text style = {{color:'blue', fontSize:17, fontFamily:'Lora-Regular'}}>Sign in</Text></Text>
    </Pressable>
  )
}
export default PressBtn;