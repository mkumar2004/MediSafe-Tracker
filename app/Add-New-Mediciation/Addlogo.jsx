import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import AddMediciationForm from '../../components/AddMediciationForm';



export default function Add_New_Mediciation() {

    const route=useRouter();  

    return (
    <View>
      <View style={{flexDirection:'row'}}>
         <Image 
            style={{width:350,height:300}}
            source={require('../../assets/images/Medication.png')}
         />
         <TouchableOpacity
        onPress={() => route.replace('/')}
        style={{ marginLeft:-350}}
      >
        <Feather name="arrow-left" size={34} color="black" />
      </TouchableOpacity>
      </View>
      <AddMediciationForm/>

    </View>
  )
}