import "react-native-url-polyfill/auto"; // important for RN env
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
// const ExpoAsyncStorageAdapter = {
//   getItem: (key) => AsyncStorage.getItem(key),
//   setItem: (key, value) => AsyncStorage.setItem(key, value),
//   removeItem: (key) => AsyncStorage.removeItem(key),
// };
const supabaseUrl = Constants.expoConfig.extra.SUPABASEURL;
const supabaseAnonKey = Constants.expoConfig.extra.SUPABASEANONKEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // storage: ExpoAsyncStorageAdapter,
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
console.log("✅ Supabase client initialized with AsyncStorage");

// import "react-native-url-polyfill/auto";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://xmikunzmoqsrybnogxom.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtaWt1bnptb3Fzcnlibm9neG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MDYwMzAsImV4cCI6MjA2NjE4MjAzMH0.7qHnAbXdA3rN2jLoWcJd362twebZTMFoQvuN5pZT0bI";
// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

// utils/supabase.js
