// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm_Pmo-rQfPvcB7DGnx8l4dqcIyndHt0Q",
  authDomain: "campusconnectapp-97a99.firebaseapp.com",
  projectId: "campusconnectapp-97a99",
  storageBucket: "campusconnectapp-97a99.firebasestorage.app",
  messagingSenderId: "861141740365",
  appId: "1:861141740365:web:b6dec5cbac2a3c71d72504",
  measurementId: "G-R7FX36DVVM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
