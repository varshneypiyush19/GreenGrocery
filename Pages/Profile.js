// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import { onAuthStateChanged, signOut } from "firebase/auth";

// import { auth } from "../firebaseConfig"; // or "firebase/auth" if you're using web SDK
// import Layout from "../components/Layout";

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setCheckingAuth(false);
//     });
//     return unsubscribe;
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }], // redirect to Login screen
//       });
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };
//   if (checkingAuth)
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#483D8B" />
//       </View>
//     );
//   return (
//     <Layout>
//       <View style={styles.container}>
//         <Image
//           source={{
//             uri: user?.photoURL || "https://i.pravatar.cc/150?img=12", // default avatar
//           }}
//           style={styles.avatar}
//         />
//         <Text style={styles.name}>{user?.displayName || user?.email}</Text>
//         <View style={styles.buttonContainer}>
//           <Button title="Logout" color="#ff3b30" onPress={handleLogout} />
//         </View>
//       </View>
//     </Layout>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#9DC462",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   email: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 20,
//     color: "#444",
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginVertical: 10,
//     color: "black",
//   },
//   buttonContainer: {
//     marginTop: 30,
//     width: "80%",
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
  TouchableOpacity,
} from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Layout from "../components/Layout";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (checkingAuth) {
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
            uri: user?.photoURL || "https://i.pravatar.cc/150?img=12",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.displayName || "User"}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Info</Text>

          <Text style={styles.cardText}>
            Name: {user?.displayName || "User"}
          </Text>
          <Text style={styles.cardText}>Email: {user?.email}</Text>
          {/* <Text style={styles.cardText}>UID: {user?.uid}</Text> */}
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
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
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
