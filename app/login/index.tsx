import { StyleSheet ,View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Login() {

  const route = useRouter();
  return (
    <View>
      <Image
        style={{ width: '100%', height: 450 }}
        source={require('../../assets/images/login.jpeg')}
      />
      <View style={styles.container}>
      <Text style={{fontFamily:'Poppins',textAlign:'center',fontSize:25,color:'#8DA399'}}>Take Control of Your Health</Text>  
       <Text style={{fontFamily:'Poppins',textAlign:'center',fontSize:15,color:'grey'}}>Medical tracker Empower yourself to make informed decisions about your well-being</Text>
      
       <TouchableOpacity 
           onPress={()=>route.push('/auth/sign-in/Signin')}
          
         >
      
         
        <View style={styles.container2}>

          <Text style={{color:'black',textAlign:'center',fontFamily:'Montserrat-Black'}}> Continue</Text>
    
        </View>
        </TouchableOpacity>
      
      
      
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#002147',
      marginTop: -29,
      padding: 15,
      borderTopLeftRadius: 25,
      borderTopRightRadius:25,
      height: '700%',
      
    },
    container2:{
      backgroundColor:'white',
      marginTop:'10%',
      borderRadius:99,
      padding:12,
      width:'80%', 
      marginLeft:30,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      gap:'5'

  }
})