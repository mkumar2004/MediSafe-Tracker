import { StyleSheet, Text, TextInput, View, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  router, useNavigation } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../../configs/Firebaseconfigs'
import { setLocalStorage } from '../../../Service/Storage';


const Signin = () => {
  const route = useRouter();
  const navigation = useNavigation();
  const [email,setemail]=useState();
  const [password,setpassword]=useState();
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [])
  
   const Signin=()=>{
    if(!email && !password){
      ToastAndroid.show(' Please enter email & Password',ToastAndroid.BOTTOM)
    }
    else if(!email){
      ToastAndroid.show(' Please enter a email ',ToastAndroid.BOTTOM)
    }
    else if(!password){
      ToastAndroid.show(' Please enter a password ',ToastAndroid.BOTTOM)
    }
   
    signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      await setLocalStorage('userDetail',user)  
      route.replace('(tabs)')
      
      //console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //console.log(errorCode,errorMessage)
      if(errorCode=="auth/invalid-credential"){
        ToastAndroid.show(' Invalid Email & password ',ToastAndroid.BOTTOM)
      }
     
    });
  
   }

  return (
    <View style={{ backgroundColor: 'white', height: '1000' }}>
      <TouchableOpacity
        onPress={() => route.replace('/')}
        style={{ padding: 15 }}
      >
        <Feather name="arrow-left" size={34} color="black" />
      </TouchableOpacity>
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 30, fontFamily: "Poppins", marginTop: -10 }}>Let's Sign You In</Text>
        <Text style={{ fontSize: 30, marginTop: 5, fontFamily: "Poppins-Bold", color: 'grey' }}>Welcome Back</Text>
        <Text style={{ fontSize: 25, marginTop: -5, fontFamily: "Roboto-Light", color: '#888888' }}>A journey of a Thousand Miles Begins With a Single Step....</Text>

        {/* Email*/}
        <View style={{ marginTop: 20 }} >
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Email'
            onChangeText={(value)=>setemail(value)}
          />
        </View>

        {/* password*/}
        <View style={{ marginTop: 20 }} >
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Enter Password'
            onChangeText={(value)=>setpassword(value)}
          />
        </View>


        {/* sign-in*/}
        <TouchableOpacity onPress={Signin}>

          <View style={styles.col} >
            <Text style={{ color: 'white', textAlign: 'center' }} >Sign In</Text>
          </View>


        </TouchableOpacity>


        {/* Create Account*/}
        <TouchableOpacity
          onPress={() => route.replace('auth/sign-up/Signup')}
        >

          <View style={styles.col2} >
            <Text style={{ color: 'black', textAlign: 'center' }} >Create Account</Text>
          </View>


        </TouchableOpacity>





      </View>





    </View>




  )
}

export default Signin

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#888888'
  },
  col: {
    padding: 15,
    backgroundColor: "black",
    marginTop: 60,
    width: '80%',
    marginLeft: 25,
    borderRadius: 7
  },
  col2: {
    padding: 15,
    borderWidth: 2,
    marginTop: 10,
    width: '80%',
    marginLeft: 25,
    borderRadius: 7,
    borderColor: '#888888'

  }

})