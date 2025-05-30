// import React from "react";
// import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
// import { useCart } from "../context/CartContext";
// import { useNavigation } from "@react-navigation/native";

// export default function CheckoutScreen() {
//   const { cartItems, getTotal, clearCart } = useCart();
//   const navigation = useNavigation();

//   const handleOrder = () => {
//     Alert.alert("Payment Successful", "You chose to pay by cash.", [
//       {
//         text: "OK",
//         onPress: () => {
//           clearCart();
//           navigation.navigate("Home");
//         },
//       },
//     ]);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemText}>{item.product.name}</Text>
//       <Text style={styles.itemText}>
//         ₹{item.product.price} × {item.quantity} = ₹
//         {item.product.price * item.quantity}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Checkout</Text>

//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.product.id.toString()}
//         renderItem={renderItem}
//         ListFooterComponent={
//           <View>
//             <Text style={styles.total}>Total: ₹{getTotal()}</Text>
//             <Button title="Place Order" onPress={handleOrder} />
//           </View>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   itemContainer: {
//     marginBottom: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingBottom: 8,
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   total: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 24,
//     textAlign: "center",
//   },
// });
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { app } from "../firebaseConfig"; // update path to your firebase config

const db = getFirestore(app);

export default function CheckoutScreen() {
  const { cartItems, getTotal, clearCart } = useCart();
  const navigation = useNavigation();

  const confirmOrder = () => {
    Alert.alert(
      "Confirm order?",
      "Payment method: Cash",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Order",
          onPress: async () => {
            try {
              const order = {
                items: cartItems,
                total: getTotal(),
                paymentMethod: "Cash",
                createdAt: Timestamp.now(),
              };
              await addDoc(collection(db, "orders"), order);
              clearCart();
              // Alert.alert("Success", "Order placed successfully.");
              navigation.navigate("OrderConfirmation");
            } catch (error) {
              Alert.alert("Error", "Failed to place order. Please try again.");
              console.error("Firebase Order Error:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.product.name}</Text>
      <Text style={styles.itemText}>
        ₹{item.product.price} × {item.quantity} = ₹
        {item.product.price * item.quantity}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Image
              source={{ uri: item.product.imageUrl }}
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 12,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text>{item.product.title}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text>Price: ₹{item.product.price * item.quantity}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View key="footer" style={{ marginTop: 10, width: "100%" }}>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>
              Total: ₹{getTotal()}
            </Text>
            <Button title="Place Order" onPress={confirmOrder} />
          </View>
        }
      />

      {/* <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={
          <View>
            <Text style={styles.total}>Total: ₹{getTotal()}</Text>
            <Button title="Place Order" onPress={confirmOrder} />
          </View>
        }
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    textAlign: "center",
  },
});
