import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { RemoveLocalStorage } from '@/Service/Storage';
import { Auth } from 'firebase/auth';
import { auth } from '@/configs/Firebaseconfigs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {


  const router=useRouter();
   

  const Logout=async()=>{
    await AsyncStorage.clear();
    router.push('/login')
  }
  return (
    <View style={{padding:25,backgroundColor:'white',height:'100%'}}>
      <Text style={{fontSize:25,fontFamily:'Nunito-Regular'}}>Profile</Text>
   
       <View style={{alignItems:'center',marginTop:60}}>
         <Image
                     style={{width:280,height:240}}
                    source={require('../../assets/images/pro.jpg')}
                 />
       </View>
     
       <View>
          
        <View style={{padding:10,flexDirection:'row',gap:10}}>
           <TouchableOpacity
             onPress={()=>router.push('/(tabs)')}
             style={{borderWidth:1,borderColor:'#E8E8E8',width:60,height:50}}
           >
           <FontAwesome name="home" size={50} color='blue' />
           </TouchableOpacity >
           <Text style={{textAlign:'center',fontSize:29,fontFamily:'Nunito-Regular'}}>Home</Text>
        </View>

          
        <View style={{padding:10,flexDirection:'row',gap:10,marginTop:30}}>
           <TouchableOpacity
             onPress={()=>router.push('/(tabs)/AddNew')}
             style={{borderWidth:1,borderColor:'#E8E8E8',width:60,height:50}}
           >
            <FontAwesome name="plus-square" size={50} color='blue' />
           </TouchableOpacity >
           <Text style={{textAlign:'center',fontSize:29,fontFamily:'Nunito-Regular'}}>Add Medication</Text>
        </View>
       
         
        <View style={{padding:10,flexDirection:'row',gap:10,marginTop:30}}>
           <TouchableOpacity
             onPress={Logout}
             style={{borderWidth:1,borderColor:'#E8E8E8',width:60,height:50}}
           >
            <Entypo name="login" size={50} color="red" />
           </TouchableOpacity >
           <Text style={{textAlign:'center',fontSize:29,fontFamily:'Nunito-Regular'}}>Logout</Text>
        </View>
       
       
       
       
       
       </View>
       
    </View>
  )
}