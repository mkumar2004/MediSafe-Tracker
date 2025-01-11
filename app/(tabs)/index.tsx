import { View, Text, Button, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { Redirect, useRouter } from 'expo-router'
import {auth} from '../../configs/Firebaseconfigs'
import { signOut } from 'firebase/auth'
import Headers from '../../components/Headers'
import Medication from '../../components/Medication'


export default function HomeScreen() {

  return(
        
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
          
        <View
        style={{
         padding:10,
         backgroundColor:'white',
     
        }}
       >
       
       <Headers/>
     
       
       <Medication/>
       
       {/* <Button title='Logout' onPress={()=>signOut(auth)}/>  */}
        
      </View>
      
      }
    />

   
  
  
 
  )

}