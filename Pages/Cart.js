// // // import React from "react";
// // // import { View, Text, Button, FlatList } from "react-native";
// // // import { useCart } from "../context/CartContext";

// // // export default function CartScreen({ navigation }) {
// // //   const { cartItems, getTotal, removeFromCart } = useCart();

// // //   return (
// // //     <View>
// // //       <FlatList
// // //         data={cartItems}
// // //         keyExtractor={(item) => item.product.id}
// // //         renderItem={({ item }) => (
// // //           <View>
// // //             <Text>
// // //               {item.product.name} x {item.quantity}
// // //             </Text>
// // //             <Text>₹{item.product.price * item.quantity}</Text>
// // //             <Button
// // //               title="Remove"
// // //               onPress={() => removeFromCart(item.product.id)}
// // //             />
// // //           </View>
// // //         )}
// // //       />
// // //       <Text>Total: ₹{getTotal()}</Text>
// // //       <Button
// // //         title="Proceed to Checkout"
// // //         onPress={() => navigation.navigate("Checkout")}
// // //       />
// // //     </View>
// // //   );
// // // }
// // import React from "react";
// // import { View, Text, FlatList, StyleSheet } from "react-native";
// // import { useCart } from "../context/CartContext";

// // export default function CartScreen() {
// //   const { cartItems } = useCart();

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Your Cart</Text>
// //       {cartItems.length === 0 ? (
// //         <Text>Your cart is empty.</Text>
// //       ) : (
// //         <FlatList
// //           data={cartItems}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => (
// //             <View style={styles.item}>
// //               <Text style={styles.name}>{item.name}</Text>
// //               <Text>Qty: {item.quantity}</Text>
// //               <Text>Total: ₹{item.quantity * item.price}</Text>
// //             </View>
// //           )}
// //         />
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { padding: 20 },
// //   header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
// //   item: {
// //     padding: 12,
// //     borderBottomWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //   },
// // });
// import { View, Text, FlatList, Button, Image } from "react-native";
// import { useCart } from "../context/CartContext"; // update path as needed
// import { useNavigation } from "@react-navigation/native";
// import Layout from "../components/Layout";
// export default function CartScreen() {
//   const { cartItems, removeFromCart, getTotal } = useCart();
//   const navigation = useNavigation();
//   return (
//     <Layout>
//       <View
//         style={{
//           flex: 1,
//           padding: 16,
//           marginBottom: 50,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {cartItems.length === 0 ? (
//           <Text style={{ fontWeight: "bold" }}>Your cart is empty.</Text>
//         ) : (
//           <FlatList
//             data={cartItems}
//             keyExtractor={(item) => item.product.id}
//             renderItem={({ item }) => (
//               <View
//                 style={{
//                   marginBottom: 16,
//                   flex: 1,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <View>
//                   <Image
//                     source={{ uri: item.product.imageUrl }}
//                     style={{ width: 50, height: 50, resizeMode: "contain" }}
//                   />
//                 </View>
//                 <View>
//                   <Text>{item.product.title}</Text>
//                   <Text>Qty: {item.quantity}</Text>
//                   <Text>Price: ₹{item.product.price * item.quantity}</Text>
//                 </View>
//                 <Button
//                   title="Remove"
//                   onPress={() => removeFromCart(item.product.id)}
//                 />
//               </View>
//             )}
//             ListFooterComponent={
//               <View>
//                 <Text style={{ fontSize: 18, marginVertical: 10 }}>
//                   Total: ₹{getTotal()}
//                 </Text>
//                 <Button
//                   title="CheckOut"
//                   onPress={() => navigation.navigate("Checkout")}
//                 />
//               </View>
//             }
//           />
//         )}
//       </View>
//     </Layout>
//   );
// }
import {
  View,
  Text,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";

export default function CartScreen() {
  const { cartItems, removeFromCart, getTotal } = useCart();
  const navigation = useNavigation();

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          padding: 16,
          marginBottom: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cartItems.length === 0 ? (
          <Text style={{ fontWeight: "bold" }}>Your cart is empty.</Text>
        ) : (
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
                <TouchableOpacity
                  onPress={() => removeFromCart(item.product.id)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ color: "white" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={
              <View key="footer" style={{ marginTop: 10, width: "100%" }}>
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
