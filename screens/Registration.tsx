import { StyleSheet,StatusBar, Dimensions, Alert, Keyboard, TouchableWithoutFeedback} from "react-native";
import { Text, View } from "../components/Themed";
import { useFonts } from "expo-font";
import axios from "axios";
import { useState } from "react";
import SERVER from "../config/connection";
import RegInput from "../components/RegInput";
import RegBtn from "../components/RegBtn";
import PressBtn from "../components/PressBtn";
const {height, width} = Dimensions.get('window')

const Registration = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName,setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
    'Lora-Regular': require('../assets/fonts/Lora-Regular.ttf'),
    'Lobster-Regular': require('../assets/fonts/Lobster-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

    const handleregistration = async () => {
        try {
          const res = await axios.post(SERVER+'/registration',
          {
            fullName: fullName,
            address:address,
            email: email,
            password: password
          })
            Alert.alert('Success', 'User saved successfully!');
            navigation.navigate('Login screen')
            
        } catch (err) {
          Alert.alert('Error', 'Failed to save data. Please try again.');
        }
      }
  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <View style = {styles.container}>
        <StatusBar backgroundColor= '#fff'  />
      <Text style ={{fontSize:30, textAlign:'center', bottom: height * .02, fontFamily:'Rubik-Regular'}} >
      ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
      ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
      </Text >
      <RegInput 
      setFullName ={setFullName}
      setAddress = {setAddress}
      setEmail = {setEmail}
      setPassword = {setPassword}
      />
     <RegBtn 
     handleregistration ={handleregistration}
     />
      <PressBtn navigation = {navigation}/>
    </View>
    </TouchableWithoutFeedback>
  );
};
export default Registration;
const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#eee'
    },
    background:{
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      top:0
    }
    })