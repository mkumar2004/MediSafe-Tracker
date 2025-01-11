import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MedicationData({ medicine,SelectDate=''}) {
  const item = medicine
 // console.log(item)

  const [Status,setStatus] =useState();

  useEffect(()=>{
    checkStatus();
  },[medicine])

  const checkStatus=()=>{
    const data=medicine?.action?.find((item)=>item.date==SelectDate)
    //console.log(data)
    setStatus(data);
  }
  return (

      <View style={styles.im}>

        <View style={{ flexDirection: 'row', backgroundColor: '', borderRadius: 22, alignItems: 'center',padding:5,marginTop:5, }}>
          <View >
            <Image

              source={{ uri: medicine?.Type?.icon }}
              style={{ width: 50, height: 50 }}
            />
          </View>
          
          
          <View style={{flexDirection: 'row' ,}}>
            <View style={{padding:5,marginLeft:5}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{medicine?.name}</Text>
            <Text>{medicine?.when}</Text>
            <Text>{medicine?.Dose} {medicine?.Type?.name}</Text>
            
            </View>
           
            <View style={styles.lk}>
              
              <MaterialCommunityIcons style={{marginLeft:35}} name="timer" size={22} color="black" />
              <Text style={{marginLeft:10}} >{medicine?.reminder}</Text>
            
            </View>
           
             {Status?.date&& <View style={styles.container}>
                 <AntDesign name="checkcircle" size={24} color="green" />
               </View>}
          </View>
           
        </View>
        
         






      </View>



  )
}



const styles = StyleSheet.create({
  im: {
    marginTop:15,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth:1,
     borderColor:'#E8E8E8'

  },
  lk:{
    marginLeft:165,
    marginTop:10,
    backgroundColor:'white',
    borderRadius:10,
    height:60,
    left:0,
    position:'absolute',
    alignContent:'flex-end',
    borderWidth:1,
    width:110,
    borderColor:'#E8E8E8'
  },
  container:{
    position:'absolute',
    top:-6,
    left:-45
  }
})