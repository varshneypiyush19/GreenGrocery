// // // // import { useEffect, useState } from "react";
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   Button,
// // // //   ActivityIndicator,
// // // //   Image,
// // // // } from "react-native";
// // // // import { onAuthStateChanged, signOut } from "firebase/auth";

// // // // import { auth } from "../firebaseConfig"; // or "firebase/auth" if you're using web SDK
// // // // import Layout from "../components/Layout";

// // // // export default function ProfileScreen({ navigation }) {
// // // //   const [user, setUser] = useState(null);
// // // //   const [checkingAuth, setCheckingAuth] = useState(true);
// // // //   useEffect(() => {
// // // //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// // // //       setUser(currentUser);
// // // //       setCheckingAuth(false);
// // // //     });
// // // //     return unsubscribe;
// // // //   }, []);

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       await signOut(auth);
// // // //       navigation.reset({
// // // //         index: 0,
// // // //         routes: [{ name: "Login" }], // redirect to Login screen
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Logout Error:", error);
// // // //     }
// // // //   };
// // // //   if (checkingAuth)
// // // //     return (
// // // //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// // // //         <ActivityIndicator size="large" color="#483D8B" />
// // // //       </View>
// // // //     );
// // // //   return (
// // // //     <Layout>
// // // //       <View style={styles.container}>
// // // //         <Image
// // // //           source={{
// // // //             uri: user?.photoURL || "https://i.pravatar.cc/150?img=12", // default avatar
// // // //           }}
// // // //           style={styles.avatar}
// // // //         />
// // // //         <Text style={styles.name}>{user?.displayName || user?.email}</Text>
// // // //         <View style={styles.buttonContainer}>
// // // //           <Button title="Logout" color="#ff3b30" onPress={handleLogout} />
// // // //         </View>
// // // //       </View>
// // // //     </Layout>
// // // //   );
// // // // }
// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#9DC462",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     padding: 20,
// // // //   },
// // // //   avatar: {
// // // //     width: 100,
// // // //     height: 100,
// // // //     borderRadius: 50,
// // // //     marginBottom: 15,
// // // //   },
// // // //   email: {
// // // //     fontSize: 16,
// // // //     color: "#666",
// // // //     marginBottom: 10,
// // // //   },
// // // //   title: {
// // // //     fontSize: 20,
// // // //     color: "#444",
// // // //   },
// // // //   name: {
// // // //     fontSize: 24,
// // // //     fontWeight: "bold",
// // // //     marginVertical: 10,
// // // //     color: "black",
// // // //   },
// // // //   buttonContainer: {
// // // //     marginTop: 30,
// // // //     width: "80%",
// // // //   },
// // // //   centered: {
// // // //     flex: 1,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
// // // // });
// // // import { useEffect, useState } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   ActivityIndicator,
// // //   Image,
// // //   TouchableOpacity,
// // // } from "react-native";
// // // import { onAuthStateChanged, signOut } from "firebase/auth";
// // // import { auth } from "../firebaseConfig";
// // // import Layout from "../components/Layout";

// // // export default function ProfileScreen({ navigation }) {
// // //   const [user, setUser] = useState(null);
// // //   const [checkingAuth, setCheckingAuth] = useState(true);

// // //   useEffect(() => {
// // //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// // //       setUser(currentUser);
// // //       setCheckingAuth(false);
// // //     });
// // //     return unsubscribe;
// // //   }, []);

// // //   const handleLogout = async () => {
// // //     try {
// // //       await signOut(auth);
// // //       navigation.reset({
// // //         index: 0,
// // //         routes: [{ name: "Login" }],
// // //       });
// // //     } catch (error) {
// // //       console.error("Logout Error:", error);
// // //     }
// // //   };

// // //   if (checkingAuth) {
// // //     return (
// // //       <View style={styles.centered}>
// // //         <ActivityIndicator size="large" color="#4B0082" />
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <Layout>
// // //       <View style={styles.container}>
// // //         <Image
// // //           source={{
// // //             uri: user?.photoURL || "https://i.pravatar.cc/150?img=12",
// // //           }}
// // //           style={styles.avatar}
// // //         />
// // //         <Text style={styles.name}>{user?.displayName || "User"}</Text>
// // //         <Text style={styles.email}>{user?.email}</Text>

// // //         <View style={styles.card}>
// // //           <Text style={styles.cardTitle}>Account Info</Text>

// // //           <Text style={styles.cardText}>
// // //             Name: {user?.displayName || "User"}
// // //           </Text>
// // //           <Text style={styles.cardText}>Email: {user?.email}</Text>
// // //           {/* <Text style={styles.cardText}>UID: {user?.uid}</Text> */}
// // //         </View>

// // //         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
// // //           <Text style={styles.logoutText}>Log Out</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </Layout>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#f5f6fa",
// // //     alignItems: "center",
// // //     paddingVertical: 40,
// // //     paddingHorizontal: 20,
// // //   },
// // //   avatar: {
// // //     width: 110,
// // //     height: 110,
// // //     borderRadius: 55,
// // //     borderWidth: 3,
// // //     borderColor: "#4B0082",
// // //     marginBottom: 16,
// // //   },
// // //   name: {
// // //     fontSize: 24,
// // //     fontWeight: "700",
// // //     color: "#333",
// // //   },
// // //   email: {
// // //     fontSize: 16,
// // //     color: "#666",
// // //     marginBottom: 25,
// // //   },
// // //   card: {
// // //     width: "100%",
// // //     backgroundColor: "white",
// // //     borderRadius: 12,
// // //     padding: 20,
// // //     elevation: 3,
// // //     shadowColor: "#000",
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 8,
// // //     shadowOffset: { width: 0, height: 4 },
// // //     marginBottom: 30,
// // //   },
// // //   cardTitle: {
// // //     fontSize: 18,
// // //     fontWeight: "600",
// // //     marginBottom: 12,
// // //     color: "#4B0082",
// // //   },
// // //   cardText: {
// // //     fontSize: 15,
// // //     color: "#444",
// // //     marginBottom: 6,
// // //   },
// // //   logoutButton: {
// // //     backgroundColor: "#ff3b30",
// // //     paddingVertical: 14,
// // //     paddingHorizontal: 30,
// // //     borderRadius: 10,
// // //     elevation: 2,
// // //   },
// // //   logoutText: {
// // //     color: "white",
// // //     fontWeight: "600",
// // //     fontSize: 16,
// // //   },
// // //   centered: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // // });
// // import { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ActivityIndicator,
// //   Image,
// //   TouchableOpacity,
// //   TextInput,
// //   Alert,
// // } from "react-native";
// // import { onAuthStateChanged, signOut } from "firebase/auth";
// // import { doc, getDoc, setDoc } from "firebase/firestore";
// // import { auth, db } from "../firebaseConfig"; // Ensure `db` is exported from firebaseConfig
// // import Layout from "../components/Layout";

// // export default function ProfileScreen({ navigation }) {
// //   const [user, setUser] = useState(null);
// //   const [checkingAuth, setCheckingAuth] = useState(true);
// //   const [userData, setUserData] = useState(null);
// //   const [address, setAddress] = useState("");
// //   const [saving, setSaving] = useState(false);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
// //       setUser(currentUser);
// //       setCheckingAuth(false);
// //       if (currentUser) {
// //         const userRef = doc(db, "users", currentUser.uid);
// //         const docSnap = await getDoc(userRef);
// //         if (docSnap.exists()) {
// //           const data = docSnap.data();
// //           setUserData(data);
// //           setAddress(data.address || "");
// //         } else {
// //           // If user doesn't exist, create basic info
// //           const basicData = {
// //             name: currentUser.displayName || "User",
// //             email: currentUser.email,
// //             phone: currentUser.phoneNumber || "",
// //             address: "",
// //           };
// //           await setDoc(userRef, basicData);
// //           setUserData(basicData);
// //         }
// //       }
// //     });
// //     return unsubscribe;
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(auth);
// //       navigation.reset({ index: 0, routes: [{ name: "Login" }] });
// //     } catch (error) {
// //       console.error("Logout Error:", error);
// //     }
// //   };

// //   const handleSaveAddress = async () => {
// //     if (!user) return;
// //     try {
// //       setSaving(true);
// //       const userRef = doc(db, "users", user.uid);
// //       await setDoc(
// //         userRef,
// //         {
// //           name: user.displayName || "User",
// //           email: user.email,
// //           phone: user.phoneNumber || "",
// //           address,
// //         },
// //         { merge: true }
// //       );
// //       Alert.alert("Success", "Address updated");
// //       setSaving(false);
// //     } catch (error) {
// //       console.error("Error saving address:", error);
// //       Alert.alert("Error", "Failed to save address");
// //       setSaving(false);
// //     }
// //   };

// //   if (checkingAuth || !user) {
// //     return (
// //       <View style={styles.centered}>
// //         <ActivityIndicator size="large" color="#4B0082" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <Layout>
// //       <View style={styles.container}>
// //         <Image
// //           source={{
// //             uri: user.photoURL || "https://i.pravatar.cc/150?img=12",
// //           }}
// //           style={styles.avatar}
// //         />
// //         <Text style={styles.name}>{user.displayName || "User"}</Text>
// //         <Text style={styles.email}>{user.email}</Text>

// //         <View style={styles.card}>
// //           <Text style={styles.cardTitle}>Account Info</Text>
// //           <Text style={styles.cardText}>
// //             Name: {user.displayName || "User"}
// //           </Text>
// //           <Text style={styles.cardText}>Email: {user.email}</Text>
// //           <Text style={styles.cardText}>
// //             Phone: {user.phoneNumber || userData?.phone || "N/A"}
// //           </Text>

// //           <Text style={[styles.cardText, { marginTop: 12 }]}>Address:</Text>
// //           <TextInput
// //             value={address}
// //             onChangeText={setAddress}
// //             style={styles.input}
// //             placeholder="Enter your address"
// //             multiline
// //           />
// //           <TouchableOpacity
// //             onPress={handleSaveAddress}
// //             style={[styles.saveButton, saving && { backgroundColor: "#ccc" }]}
// //             disabled={saving}
// //           >
// //             <Text style={styles.saveText}>
// //               {saving ? "Saving..." : "Save Address"}
// //             </Text>
// //           </TouchableOpacity>
// //         </View>

// //         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
// //           <Text style={styles.logoutText}>Log Out</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </Layout>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#f5f6fa",
// //     alignItems: "center",
// //     paddingVertical: 40,
// //     paddingHorizontal: 20,
// //   },
// //   avatar: {
// //     width: 110,
// //     height: 110,
// //     borderRadius: 55,
// //     borderWidth: 3,
// //     borderColor: "#4B0082",
// //     marginBottom: 16,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: "700",
// //     color: "#333",
// //   },
// //   email: {
// //     fontSize: 16,
// //     color: "#666",
// //     marginBottom: 25,
// //   },
// //   card: {
// //     width: "100%",
// //     backgroundColor: "white",
// //     borderRadius: 12,
// //     padding: 20,
// //     elevation: 3,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     shadowOffset: { width: 0, height: 4 },
// //     marginBottom: 30,
// //   },
// //   cardTitle: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //     marginBottom: 12,
// //     color: "#4B0082",
// //   },
// //   cardText: {
// //     fontSize: 15,
// //     color: "#444",
// //     marginBottom: 6,
// //   },
// //   input: {
// //     backgroundColor: "#f0f0f0",
// //     borderRadius: 8,
// //     padding: 10,
// //     marginTop: 4,
// //     minHeight: 50,
// //     textAlignVertical: "top",
// //     color: "#333",
// //   },
// //   saveButton: {
// //     marginTop: 14,
// //     backgroundColor: "#4B0082",
// //     paddingVertical: 10,
// //     borderRadius: 8,
// //     alignItems: "center",
// //   },
// //   saveText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// //   logoutButton: {
// //     backgroundColor: "#ff3b30",
// //     paddingVertical: 14,
// //     paddingHorizontal: 30,
// //     borderRadius: 10,
// //     elevation: 2,
// //   },
// //   logoutText: {
// //     color: "white",
// //     fontWeight: "600",
// //     fontSize: 16,
// //   },
// //   centered: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// // });
// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   TextInput,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebaseConfig";
// import Layout from "../components/Layout";
// import { Ionicons } from "@expo/vector-icons"; // for edit icon

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [userInfo, setUserInfo] = useState(null);
//   const [editingAddress, setEditingAddress] = useState(false);
//   const [addressInput, setAddressInput] = useState("");

//   const handleEditPress = () => {
//     setEditingAddress(true);
//     setAddressInput(userInfo?.address || "");
//   };

//   const handleSaveAddress = async () => {
//     if (!user) return;
//     try {
//       await setDoc(doc(db, "users", user.uid), {
//         ...userInfo,
//         address: addressInput,
//       });
//       setUserInfo((prev) => ({ ...prev, address: addressInput }));
//       setEditingAddress(false);
//       Alert.alert("Success", "Address updated!");
//     } catch (error) {
//       console.error("Error updating address:", error);
//       Alert.alert("Error", "Failed to update address.");
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       setCheckingAuth(false);

//       if (currentUser) {
//         const userRef = doc(db, "users", currentUser.uid);
//         const userSnap = await getDoc(userRef);
//         if (userSnap.exists()) {
//           setUserInfo(userSnap.data());
//         }
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   if (checkingAuth) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#4B0082" />
//       </View>
//     );
//   }

//   return (
//     <Layout>
//       <View style={styles.container}>
//         <Image
//           source={{
//             uri: user?.photoURL || "https://i.pravatar.cc/150?img=12",
//           }}
//           style={styles.avatar}
//         />

//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Account Info</Text>

//           <Text style={styles.cardText}>Name: {userInfo?.name || "User"}</Text>

//           <Text style={styles.cardText}>
//             Phone: {user.phoneNumber || userInfo?.phoneNumber || "N/A"}
//           </Text>

//           <View style={styles.addressRow}>
//             {editingAddress ? (
//               <>
//                 <TextInput
//                   value={addressInput}
//                   onChangeText={setAddressInput}
//                   placeholder="Enter new address"
//                   style={[styles.cardText, { borderBottomWidth: 1, flex: 1 }]}
//                 />
//                 <TouchableOpacity onPress={handleSaveAddress}>
//                   <Ionicons name="checkmark" size={22} color="green" />
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <>
//                 <Text style={styles.cardText}>
//                   Address: {userInfo?.address || "Set your address now"}
//                 </Text>
//                 <TouchableOpacity onPress={handleEditPress}>
//                   <Ionicons name="pencil" size={20} color="#4B0082" />
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </View>

//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <Text style={styles.logoutText}>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     </Layout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f6fa",
//     alignItems: "center",
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//   },
//   avatar: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     borderWidth: 3,
//     borderColor: "#4B0082",
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#333",
//   },
//   email: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 25,
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 20,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     marginBottom: 30,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 12,
//     color: "#4B0082",
//   },
//   cardText: {
//     fontSize: 15,
//     color: "#444",
//     marginBottom: 6,
//   },
//   addressRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   logoutButton: {
//     backgroundColor: "#ff3b30",
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   logoutText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
// import useAuth from "../utils/useAuth";

export default function ProfileScreen({ navigation }) {
  const { user, loading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  useEffect(() => {
    if (user?.id) {
      fetchUserData(user.id);
    }
  }, [user]);
  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("User fetch error:", error.message);
    } else {
      // console.log("User fetched from Supabase:", data);

      setUserInfo(data);
      // console.log("UserInfo from DB:", data);
    }
  };
  const handleEditPress = () => {
    setEditingAddress(true);
    setAddressInput(userInfo?.address || "");
  };

  const handleSaveAddress = async () => {
    if (!user) return;

    const trimmed = addressInput.trim();
    if (!trimmed) {
      Alert.alert("Error", "Address cannot be empty");
      return;
    }

    if (trimmed === userInfo?.address) {
      setEditingAddress(false);
      return;
    }
    const { error } = await supabase
      .from("User")
      .update({ address: trimmed })
      .eq("id", user.id)
      .select(); // 🔁 Make sure to select the updated row back

    if (error) {
      console.error("Update error:", error.message);
      Alert.alert("Error", "Failed to update address.");
    } else {
      setUserInfo((prev) => ({ ...prev, address: addressInput }));
      setEditingAddress(false);
      Alert.alert("Success", "Address updated!");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4B0082" />
      </View>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Info</Text>
          <Text style={styles.cardText}>Name: {userInfo?.name || "User"}</Text>
          <Text style={styles.cardText}>Phone: {userInfo?.phone || "N/A"}</Text>

          <View style={styles.addressRow}>
            {editingAddress ? (
              <>
                <TextInput
                  value={addressInput}
                  onChangeText={setAddressInput}
                  placeholder="Enter new address"
                  style={[styles.cardText, { borderBottomWidth: 1, flex: 1 }]}
                />
                <TouchableOpacity onPress={handleSaveAddress}>
                  <Ionicons name="checkmark" size={22} color="green" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.cardText}>
                  Address: {userInfo?.address || "Set your address now"}
                </Text>
                <TouchableOpacity onPress={handleEditPress}>
                  <Ionicons name="pencil" size={20} color="#4B0082" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#4B0082",
    marginBottom: 16,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#4B0082",
  },
  cardText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 2,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
