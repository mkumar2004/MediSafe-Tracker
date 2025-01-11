import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useRouter } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../../../configs/Firebaseconfigs'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { setLocalStorage } from '../../../Service/Storage';

const Signup = () => {
  const route = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [])
 
   const [email,setemail] = useState();
   const [password,setpassword] = useState();
   const [Username,setUsername] = useState();
   //console.log(Username);
  const oncreateAccount = () => {

    if(!email&& !password&& !Username){
      ToastAndroid.show('Please fill the details',ToastAndroid.BOTTOM)
      return;
    }
    else if(!email){
      ToastAndroid.show('Please enter a email',ToastAndroid.BOTTOM)
      return;
    }
    else if(!password){
       ToastAndroid.show(' Please enter a Password',ToastAndroid.BOTTOM)
      return;
    }
    else if(!Username){
      ToastAndroid.show(' Please enter a Usernmae',ToastAndroid.BOTTOM,)
     return;
   }
   
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        //console.log(user)
        await updateProfile(user,{
          displayName:Username
        })
        
        await setLocalStorage('userDetail',user);     
         route.replace('(tabs)')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        //console.log(errorCode);
        if( email&& password&& Username){
          ToastAndroid.show('your Account already Exists ',ToastAndroid.BOTTOM)
        }
        else{
          ToastAndroid.show('your account created',ToastAndroid.BOTTOM)
       }
       

      });
  }

  return (
    <View style={{ backgroundColor: 'white', height: '1000' }}>
      <TouchableOpacity
        onPress={() => route.replace('auth/sign-in/Signin')}
        style={{ padding: 15 }}
      >
        <Feather name="arrow-left" size={34} color="black" />
      </TouchableOpacity>


      <View style={{ padding: 15 }}>

        <Text style={{ fontSize: 30, fontFamily: "Montserrat-Black", marginTop: -10, fontWeight: 'bold' }}>Create New Account</Text>
        {/* user name*/}
        <View style={{ marginTop: 20 }} >
          <Text>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder='User Name'
            onChangeText={(value) =>setUsername(value)}
          />
        </View>

        {/* Email*/}
        <View style={{ marginTop: 20 }} >
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Email'
            onChangeText={(value) =>setemail(value)}
          />
        </View>

        {/* password*/}
        <View style={{ marginTop: 20 }} >
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Enter Password'
            onChangeText={(value) =>setpassword(value)}
          />
        </View>


        {/* Create Account*/}
        <TouchableOpacity
          onPress={oncreateAccount}
        >

          <View style={styles.col} >
            <Text style={{ color: 'white', textAlign: 'center' }} >Create Account</Text>
          </View>


        </TouchableOpacity>


        {/* sign-in*/}
        <TouchableOpacity
          onPress={oncreateAccount}
          // onPress={() => route.replace('auth/sign-in/Signin')}

        >

          <View style={styles.col2} >
            <Text style={{ color: 'black', textAlign: 'center' }} >Sign In</Text>
          </View>


        </TouchableOpacity>



      </View>
    </View>
  )
}

export default Signup

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