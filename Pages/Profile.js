import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebaseConfig"; // or "firebase/auth" if you're using web SDK
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
        routes: [{ name: "Login" }], // redirect to Login screen
      });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  if (checkingAuth)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#483D8B" />
      </View>
    );
  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={{
            uri: user?.photoURL || "https://i.pravatar.cc/150?img=12", // default avatar
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.displayName || user?.email}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Logout" color="#ff3b30" onPress={handleLogout} />
        </View>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9DC462",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#444",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "black",
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
