import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetDatesToDisplay } from '../Service/ConvertDate'
import moment from 'moment';
import { getLocalStorage } from '@/Service/Storage';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/configs/Firebaseconfigs';
import MedicationData from './MedicationData'
import Empty from './Empty';
import { useRouter } from 'expo-router';




export default function Medication() {

  const router = useRouter();
  
  const [medlist, setmedlist] = useState();
  const [DateRange, setDateRange] = useState();
  const [Selectdate, setSelectdate] = useState(moment().format('MM/DD/YYYY'));
  //console.log(medlist)
  const [Loading,setLoading]=useState(false);
  useEffect(() => {
    GetDateRangeList();
    GetList(Selectdate)
  }, [])


  const GetDateRangeList = () => {
    const dateRange = GetDatesToDisplay();
    //console.log(dateRange)
    setDateRange(dateRange)
  }

  const GetList = async (Selectdate) => {
     setLoading(true);
    const user = await getLocalStorage('userDetail')
    
    setmedlist([]);
    try {

      const q = query(collection(db, 'Mediciation'),
        where('userEmail', '==', user?.email),
        where('dates', 'array-contains', Selectdate)
      )

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {

        //console.log("docId"+doc.id+"==hereis",doc.data())
        setmedlist(prev => [...prev, doc.data()])

      })
      setLoading(false);
    }
    catch (e) {
      console.log(e);
      setLoading(false);

    }
  }


  return (
    <View
      style={{ marginTop: 10 }}
    >

      <Image

        style={{ width: 240, height: 240, left: 25 }}
        source={require('../assets/images/medical-tools.png')}
      />



      <FlatList

        data={DateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={[styles.datefield, { backgroundColor: item.formatedDate == Selectdate ? 'blue' : '#FF69B4' }]}
            onPress={() => {setSelectdate(item.formatedDate);
              GetList(item.formatedDate)
            }}
          >
            <Text style={[{ fontSize: 26, color: 'yellow', fontWeight: 'bold' }, { color: item.formatedDate == Selectdate ? 'white' : 'yellow' }]}>{item.day}</Text>
            <Text style={[{ fontSize: 20, color: 'yellow', fontWeight: '600' }, { color: item.formatedDate == Selectdate ? 'white' : 'yellow' }]}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />


{medlist?.length>0? <FlatList
      
      data={medlist}
      onRefresh={()=>GetList(Selectdate)}
      refreshing={Loading}
      renderItem={({item,index})=>(
              <TouchableOpacity
              onPress={()=>router.push({
                pathname:'/Action-Model/Notifiaction',
                params:{
                  ...item,
                  Selectdate:Selectdate
                }
              })}
              
              >
                     <MedicationData medicine={item} index={index} Selectdate={Selectdate} />
        
              </TouchableOpacity>
          
        


      )}   />:<Empty/>}  
 
 
 
           {/* {medlist?.length>0?<TouchableOpacity
              onPress={()=>router.push({
                pathname:'/Action-Model/Notifiaction',
                params:{
                  ...item
                }
              })}
           >
        {medlist?.map((item, index) => (
          <MedicationData medicine={item} key={index} />
        ))}
       
      </TouchableOpacity>:<Empty/>} */}
      

  





    </View>
  )
}

const styles = StyleSheet.create({
  datefield: {
    padding: 10,
    backgroundColor: '#FF69B4',
    marginRight: 20,
    borderRadius: 10
  }
})