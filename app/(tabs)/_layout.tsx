import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../configs/Firebaseconfigs'
import {getLocalStorage} from '../../Service/Storage'

export default function TabLayout() {

  const route =useRouter();
  
  
  // const [authicated,setAutheticated]=useState<boolean>();

  // onAuthStateChanged(auth, (user) => {  //check whether the user login or not
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     setAutheticated(true);
  //     //console.log(uid);
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     route?.push('/login');
  //     setAutheticated(false);
  //   }
  // })

  // useEffect(()=>{
  //  if(authicated==false){
  //   route.push('/login');
  //  }
  // },[authicated])

  //above code for previous testing

  useEffect(()=>{
    GetUserdetail();
  },[])

  const GetUserdetail=async()=>{
      const userInfo=await getLocalStorage('userDetail');
      //console.log(userInfo);
      if(!userInfo){
        route.replace('/login');
      }
  }


  return (
    <Tabs screenOptions={{
      headerShown: false
    }}
    >
      
      <Tabs.Screen name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color={color} />
          )
        }}
      />



      <Tabs.Screen name="AddNew"
        options={{
          tabBarLabel: 'AddNew',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={24} color={color} />
          )
        }}
      />


      <Tabs.Screen name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-secret" size={24} color={color} />
          )
        }}

      />


    </Tabs>
  );
}
