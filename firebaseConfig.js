import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.APIKEY,
  authDomain: Constants.expoConfig.extra.AUTHDOMAIN,
  projectId: Constants.expoConfig.extra.PROJECTID,
  storageBucket: Constants.expoConfig.extra.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig.extra.MESSAGINGSENDERID,
  appId: Constants.expoConfig.extra.APPID,
  measurementId: Constants.expoConfig.extra.MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { db, collection, getDocs };
