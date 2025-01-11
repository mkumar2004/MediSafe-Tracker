import {StyleSheet, View, Text,Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import {useLocalSearchParams, useRouter} from 'expo-router'
import MedicationData from '../../components/MedicationData'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Try } from 'expo-router/build/views/Try';
import {db} from '../../configs/Firebaseconfigs'
import { arrayUnion, updateDoc,doc } from 'firebase/firestore';
import moment from 'moment'

export default function Notifiaction() {
    const medicine= useLocalSearchParams();
    //console.log(medicine)
    const router=useRouter();

    const UpadateStatus=async(status)=>{
      try{

        const docRef=doc(db, 'Mediciation', medicine?.docId);
        await updateDoc(docRef,{
          action:arrayUnion({
            status:status,
            time:moment().format('Lt'),
            date:medicine?.Selectdate
            
          })
        });
    
       Alert.alert(status,'Response Saved!',[
        {
          Text:'Ok',
          onPress:()=>router.replace('(tabs)')
        }
       ])  
      }catch(e){
        console.log(e);
      }
    }

  return (
    <View style={{backgroundColor:'white',height:'100%'}}>

    
    <View style={styles.constainer}>
      <Image 
        
         source={require('../../assets/images/notification.gif')}
         style={{width:150,height:150}}
        
      />
      <Text style={{fontSize:15}}>{medicine?.Selectdate}</Text>
      <Text style={{fontSize:28,fontWeight:'bold',color:'#007FFF'}}>{medicine?.reminder}</Text>
      <Text style={{color:'grey'}} >Remember ,it's time to take your medicine</Text>
       
       <View style={{flexDirection:'row',justifyContent:'space-between',gap:40,borderWidth:1,borderColor:'#E8E8E8',padding:5,marginTop:10,borderRadius:20}}>
     
       
       <View style={{padding:10,marginLeft:30}}>
       <Text >{medicine.name}</Text>
       <Text >{medicine?.when}</Text>
       <Text >{medicine?.Dose}</Text>
       </View>
       
       <View style={{borderWidth:1,borderColor:'#E8E8E8',padding:5,borderRadius:20}}>
       <MaterialCommunityIcons style={{marginLeft:25}} name="timer" size={22} color="black" />
       <Text>{medicine?.reminder}</Text>
       </View>
       
       
       </View>
     
        {/* Missed Status */}
        <View style={{padding:10,flexDirection:'row',gap:10}} >
               <TouchableOpacity 
                onPress={()=>UpadateStatus('Missed')}
               style={styles.con}>
               <Fontisto name="close-a" size={24} color="red" />
                <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}>Missed</Text>
               </TouchableOpacity>

            {/* Taken Status */}
               <TouchableOpacity 
               
               onPress={()=>UpadateStatus('Taken')}
               style={styles.con1}>
                <Entypo name="check" size={29} color="white" />
                <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Taken</Text>
               </TouchableOpacity>
        </View>
      
         <TouchableOpacity
             onPress={()=>router.back()}
             
             style={{position:'absolute',bottom:-65}}
         >
         <AntDesign name="closecircle" size={39} color="grey" />
         </TouchableOpacity>

    </View>


    </View>
  )
}

const styles = StyleSheet.create({

    constainer:{
        padding:25,
        alignItems:'center',
        justifyContent:'center',
        marginTop:170
    },
    con:{
      flexDirection:'row',
      justifyContent:'center',
      padding:10,
      gap:6,
      borderWidth:2,
      borderColor:'red',
      borderRadius:10
    },
    con1:{
      flexDirection:'row',
      justifyContent:'center',
      padding:10,
      gap:6,
      borderWidth:2,
      backgroundColor:'green',
      borderRadius:10,
      borderColor:'green'
    }
})