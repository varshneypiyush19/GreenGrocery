// // import React from "react";
// // import { View, Text, Button, FlatList } from "react-native";
// // import { useCart } from "../context/CartContext";

// // export default function CartScreen({ navigation }) {
// //   const { cartItems, getTotal, removeFromCart } = useCart();

// //   return (
// //     <View>
// //       <FlatList
// //         data={cartItems}
// //         keyExtractor={(item) => item.product.id}
// //         renderItem={({ item }) => (
// //           <View>
// //             <Text>
// //               {item.product.name} x {item.quantity}
// //             </Text>
// //             <Text>₹{item.product.price * item.quantity}</Text>
// //             <Button
// //               title="Remove"
// //               onPress={() => removeFromCart(item.product.id)}
// //             />
// //           </View>
// //         )}
// //       />
// //       <Text>Total: ₹{getTotal()}</Text>
// //       <Button
// //         title="Proceed to Checkout"
// //         onPress={() => navigation.navigate("Checkout")}
// //       />
// //     </View>
// //   );
// // }
// import React from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { useCart } from "../context/CartContext";

// export default function CartScreen() {
//   const { cartItems } = useCart();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Cart</Text>
//       {cartItems.length === 0 ? (
//         <Text>Your cart is empty.</Text>
//       ) : (
//         <FlatList
//           data={cartItems}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.item}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text>Qty: {item.quantity}</Text>
//               <Text>Total: ₹{item.quantity * item.price}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
//   item: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });
import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useCart } from "../context/CartContext"; // update path as needed
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();
  const navigation = useNavigation();
  return (
    <Layout>
      <View style={{ flex: 1, padding: 16, marginBottom: 50 }}>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 16 }}>
                <Text>{item.product.name}</Text>
                <Text>Qty: {item.quantity}</Text>
                <Text>Price: ₹{item.product.price * item.quantity}</Text>
                <Button
                  title="Remove"
                  onPress={() => removeFromCart(item.product.id)}
                />
              </View>
            )}
            ListFooterComponent={
              <View>
                <Text style={{ fontSize: 18, marginVertical: 10 }}>
                  Total: ₹{getTotal()}
                </Text>
                <Button
                  title="CheckOut"
                  onPress={() => navigation.navigate("Checkout")}
                />
              </View>
            }
          />
        )}
      </View>
    </Layout>
  );
}
