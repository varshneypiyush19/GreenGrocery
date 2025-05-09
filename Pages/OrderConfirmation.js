// import React from "react";
// import { View, Text, Button } from "react-native";

// export default function OrderConfirmationScreen({ navigation }) {
//   return (
//     <View>
//       <Text>Order Placed Successfully!</Text>
//       <Button
//         title="Track Order"
//         onPress={() => navigation.navigate("Orders")}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//     </View>
//   );
// }
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function OrderConfirmationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle" size={100} color="#4BB543" />
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>
        Your order has been placed successfully.
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.trackButton]}
        onPress={() => navigation.navigate("Orders")}
      >
        <Icon name="navigate" size={20} color="#fff" />
        <Text style={styles.buttonText}>Check Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={20} color="#1e90ff" />
        <Text style={[styles.buttonText, { color: "#1e90ff" }]}>
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  trackButton: {
    backgroundColor: "#1e90ff",
  },
  homeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1e90ff",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
