import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Listed, Daylist } from './Options';
import { Colors } from '../constants/Colors'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RNFDateTimePicker from '@react-native-community/datetimepicker';
import { FormalDate, FormalDateinText, FormalTime, getDateRange } from '../Service/ConvertDate'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '@/configs/Firebaseconfigs';
import { getLocalStorage } from '@/Service/Storage';
import { useRouter } from 'expo-router';

const AddMediciationForm = () => {

  const route=useRouter();
  const a = Daylist;
  //console.log(a);
  const [FormData, setFormData] = useState();
  const [Loading,setLoading] = useState(false);
  const [ShowendDate, setShowendDate] = useState(false);
  const [ShowDate, setShowDate] = useState(false);
  const [ShowTime,setShowTime] = useState(false);
  const InputChange = (field, Value) => {
    setFormData(prev => ({
      ...prev,
      [field]: Value
    }))
  }
  //console.log(FormData)


  //Data to be store Firebase Db
  const SaveData=async()=>{
    const docId=Date.now().toString();
    const user=await getLocalStorage('userDetail');
    const dates=getDateRange(FormData?.startDate,FormData.endDate);


    if(!(FormData?.name||FormData?.Type||FormData?.dose||
        FormData?.startDate||FormData?.endDate||FormData?.reminder))
        {
          
           Alert.alert('Enter all The field')
         
         } 
         setLoading(true);

        try{
                await setDoc(doc(db,'Mediciation',docId),{
                  ...FormData,
                  userEmail:user?.email,
                  docId:docId,
                  dates:dates,
                })
                console.log("Data Save in the firebase")
                setLoading(false);
                Alert.alert('Great','Your New Medication Add SuccessFully!',[
                  {
                    text:'Ok',
                    onPress:()=>route.back('/')
                  }
                ])
        }
       
       
        catch(e){
          console.log(e);
          setLoading(false);
        }
  }

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: 'Poppins' }}>New Mediciation</Text>

      <View style={styles.heder} >
        <AntDesign style={styles.icon} name="medicinebox" size={24} color="green" />
        <TextInput style={styles.TextInput} placeholder='Medicine Name'
          onChangeText={(Value) => InputChange('name', Value)}
        />

      </View>

      {/* List of items */}

      <FlatList
        data={Listed}
        showsHorizontalScrollIndicator={false}
        horizontal

        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => InputChange('Type', item)}
            style={[styles.grpdata, { backgroundColor: item.name == FormData?.Type?.name ? Colors.super : 'white' }]} >

            <Text style={[styles.TextInput, { color: item.name == FormData?.Type?.name ? 'white' : 'black' }]}>{item?.name}</Text>
          </TouchableOpacity >
        )}
      />

      {/* Dose Data */}
      <View style={styles.dose} >
        <Fontisto style={styles.icon} name="injection-syringe" size={24} color="blue" />
        <TextInput style={styles.TextInput} placeholder='Dose Ex.10 ml of insulin'
          onChangeText={(Value) => InputChange('Dose', Value)} />

      </View>


      {/* To take when */}
      <View style={styles.dose} >
        <Ionicons style={styles.icon} name="timer" size={24} color="black" />
        <Picker
          selectedValue={FormData?.when}
          onValueChange={(itemValue, itemIndex) =>
            InputChange('when', itemValue)


          }
          style={{ width: '80%', color: 'grey' }}
        >
          {a.map((item, index) => (
            //console.log(item);

            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>


      {/* Date */}
      <View style={styles.date1}>
        {/* Start date */}
        <TouchableOpacity
          onPress={() => setShowDate(true)}

          style={styles.dose} >
          <AntDesign style={styles.icon} name="calendar" size={24} color="red" />
          <Text style={styles.text} >{FormalDateinText(FormData?.startDate) ?? 'Start Date'}</Text>

        </TouchableOpacity>
        {ShowDate  && <RNFDateTimePicker
          minimumDate={new Date()}
          onChange={(event) => {
            InputChange('startDate', FormalDate(event.nativeEvent.timestamp));
            setShowDate(false)

          }}
          value={new Date(FormData?.startDate) ??new Date()}

        />}



        {/* End Date */}

        <TouchableOpacity style={styles.dose}
          onPress={() => setShowendDate(true)}
        >
          <AntDesign style={styles.icon} name="calendar" size={24} color="red" />
          <Text style={styles.text} >{FormalDateinText(FormData?.endDate) ?? 'EndDate'}</Text>

        </TouchableOpacity>
        {ShowendDate && <RNFDateTimePicker
          minimumDate={new Date()}
          onChange={(event) => {
            InputChange('endDate', FormalDate(event.nativeEvent.timestamp));
            setShowendDate(false)

          }}
          value={new Date(FormData?.endDate) ?? new Date()}

        />}


      </View>
    
    
      {/* Remainder */}
      <View >
        <TouchableOpacity
          onPress={() => setShowTime(true)}

          style={styles.dose} >
          <MaterialCommunityIcons style={styles.icon} name="timer" size={24} color="black" />
          <Text style={styles.text} >{FormData?.reminder??'Remind Mee!!! Quick '}</Text>

        </TouchableOpacity>


      </View>
      {ShowTime&& <RNFDateTimePicker
            mode='time'
             onChange={(event) => {
               InputChange('reminder',FormalTime(event.nativeEvent.timestamp))
              setShowTime(false)
  
            }}
            // value={FormData?.reminder??new Date()}
            value={new Date(FormData?.reminder) ?? new Date()}
      />}

         <TouchableOpacity
             onPress={()=>SaveData()}
             style={styles.Button}
         >
          {Loading?<ActivityIndicator size={'large'} color={'white'} />:
          <Text style={{color:'white',fontFamily:'Montserrat-Black'}}>Add New Mediciation</Text>}
         </TouchableOpacity>


    </View>
  )
}

export default AddMediciationForm

const styles = StyleSheet.create({
  heder: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0C0',
    padding: 2,
    borderRadius: 12,
    backgroundColor: 'white'

  },
  TextInput: {
    marginLeft: 3,
    fontSize: 16
  },
  icon: {
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: 'C0C0C0',
    marginLeft: 10,
  },
  grpdata: {
    borderWidth: 1,
    padding: 10,
    marginLeft: 13,
    marginTop: 5,
    borderColor: '#C0C0C0',
    borderRadius: 12

  },
  dose: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0C0',
    padding: 2,
    borderRadius: 12,
    marginTop: 5,
    backgroundColor: 'white'

  },
  text: {
    fontSize: 16,
    padding: 10
  },
  date1: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Button:{
    alignItems:'center',
    backgroundColor:'red',
    padding:10,
    borderRadius:13,
    marginTop:15,
    width:250,
    marginLeft:50

  }


})