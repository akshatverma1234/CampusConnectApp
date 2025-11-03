// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAm_Pmo-rQfPvcB7DGnx8l4dqcIyndHt0Q",
  authDomain: "campusconnectapp-97a99.firebaseapp.com",
  projectId: "campusconnectapp-97a99",
  storageBucket: "campusconnectapp-97a99.firebasestorage.app",
  messagingSenderId: "861141740365",
  appId: "1:861141740365:web:b6dec5cbac2a3c71d72504",
  measurementId: "G-R7FX36DVVM",
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export const db = getFirestore(app);
export { app, auth };
