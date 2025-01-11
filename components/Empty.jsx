import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Empty() {
    const route = useRouter();

  return (
    <View style={{padding:20}}>
       <Image
               style={{width:240,height:240}}
              source={require('../assets/images/add.png')}
           />
        <Text style={{textAlign:'center',fontSize:22,fontFamily:'Poppins'}}>No Mediciations!....</Text>
        <Text  style={{textAlign:'center',fontSize:10,fontFamily:'Poppins',color:'grey'}}>You have 0 Mediciation Setup, Please Setup Your Mediciation</Text>
        <TouchableOpacity
          onPress={()=>route.replace('/AddNew')}
        >
            <Text
             style={{
                backgroundColor:'blue',
                padding:15,
                color:'white',
                textAlign:'center',
                borderRadius:50,
                marginTop:10,
                
             }}
            >
                + Add New Mediciation
            </Text>
        </TouchableOpacity>
    </View>
  )
}