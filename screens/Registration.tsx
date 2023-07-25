import { TextInput, TouchableOpacity, StyleSheet,StatusBar, Dimensions, Pressable, Alert, Keyboard, TouchableWithoutFeedback} from "react-native";
import { Text, View } from "../components/Themed";
import { useFonts } from "expo-font";
import axios from "axios";
import { useState } from "react";
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
          const res = await axios.post('http://192.168.0.103:3000/registration',
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
    <>
      <TextInput 
        style ={styles.txt}
        placeholder="ਪੂਰਾ ਨਾਂਮ" 
        value={fullName}
        onChangeText={setFullName}
        />
      <TextInput 
        style ={styles.txt} 
        placeholder="ਪੂਰਾ ਪਤਾ"
        value={address}
        onChangeText={setAddress}
        />
      <TextInput 
        style ={styles.txt} 
        placeholder=" ਈ - ਮੇਲ "
        value={email}
        onChangeText={setEmail}
        
        />
      <TextInput 
        style ={styles.txt} 
        secureTextEntry 
        placeholder="ਪਾਸਵਰਡ" 
        value={password}
        onChangeText={setPassword}
        />
      <TouchableOpacity style ={styles.btn}
        onPress={handleregistration}
      >
        <Text style ={styles.btntxt}>Submit</Text>
      </TouchableOpacity>
        <Pressable onPress={()=> navigation.navigate('Login screen')}>
        <Text style = {{fontSize:17, fontFamily:'Lora-Regular'}} > Not a member? <Text style = {{color:'blue', fontSize:17, fontFamily:'Lora-Regular'}}>Sign in</Text></Text>
        </Pressable>
    </>
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
