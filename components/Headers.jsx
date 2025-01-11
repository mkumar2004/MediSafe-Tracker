import { View, Text,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '@/Service/Storage'
import Ionicons from '@expo/vector-icons/Ionicons';
import Empty from './Empty'


export default function Headers() {
  
const [User,setUser]=useState();
   useEffect(()=>{
       GetUserdetail();
   },[])

    const GetUserdetail=async()=>{
        const userInfo= await getLocalStorage('userDetail');
        //console.log(userInfo);
        setUser(userInfo);
    }

  return (
    <View>
        <View style={{flexDirection:'row',gap:220}}> 
           <Image
               style={{width:60,height:60}}
              source={require('../assets/images/main.png')}
           />
           <TouchableOpacity>
           <Ionicons name="settings" size={40} color="grey" />
           </TouchableOpacity>
          
  
            
        </View>
       <Text style={{color:'grey',fontSize:35,fontFamily:'Roboto-Light',fontWeight:'600'}}>Welcome {User?.displayName} you to MediSafe..... </Text>
        
        
    </View>
  )
}