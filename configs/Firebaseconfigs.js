// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from "firebase/firestore"




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtUF9_E1QjbP0O6QlSO7C-Uv_5j7zn-5c",
  authDomain: "medisafe-9cfa7.firebaseapp.com",
  projectId: "medisafe-9cfa7",
  storageBucket: "medisafe-9cfa7.firebasestorage.app",
  messagingSenderId: "188235854234",
  appId: "1:188235854234:web:01fe6f25bb0e5cba950a23",
  measurementId: "G-YZYQ7LPRW3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app,{
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db= getFirestore(app)