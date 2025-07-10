// // import React from "react";
// // import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// // import { useNavigation } from "@react-navigation/native";
// // import { useCart } from "../context/CartContext";

// // export default function FloatingCartButton() {
// //   const { cartItems } = useCart();
// //   const navigation = useNavigation();

// //   if (cartItems.length === 0) return null; // no items, no button

// //   return (
// //     <TouchableOpacity
// //       style={styles.button}
// //       onPress={() => navigation.navigate("Cart")}
// //     >
// //       <Text style={styles.text}>🛒 View Cart ({cartItems.length} items)</Text>
// //     </TouchableOpacity>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   button: {
// //     position: "absolute",
// //     bottom: 80, // adjust to stay above bottom tab bar
// //     alignSelf: "center",
// //     backgroundColor: "#4A90E2",
// //     paddingVertical: 12,
// //     paddingHorizontal: 24,
// //     borderRadius: 30,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 4,
// //     elevation: 5,
// //     zIndex: 999,
// //   },
// //   text: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// // });

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { useCart } from "../context/CartContext";
// import { useNavigation, useNavigationState } from "@react-navigation/native";
// import CartIconWithBadge from "./CartIconWithBadge";

// export default function FloatingCartButton() {
//   const { cartItems } = useCart();
//   const navigation = useNavigation();

//   // get current route name
//   const routes = useNavigationState((state) => state.routes);
//   const currentRoute = routes[routes.length - 1]?.name;

//   // hide button on CartScreen
//   if (cartItems.length === 0 || currentRoute === "Cart") return null;

//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => navigation.navigate("Cart")}
//       activeOpacity={0.85}
//     >
//       {/* <CartIconWithBadge /> */}
//       <Text style={styles.text}>View Cart</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     position: "absolute",
//     bottom: 100, // above your bottom tab bar
//     alignSelf: "center",
//     backgroundColor: "#4CAF50",
//     paddingVertical: 14,
//     paddingHorizontal: 26,
//     borderRadius: 30,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//     elevation: 6,
//     zIndex: 999,
//   },
//   text: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import CartIconWithBadge from "./CartIconWithBadge";

export default function FloatingCartButton() {
  const { cartItems } = useCart();
  const navigation = useNavigation();

  // get current route name from react-navigation
  const routes = useNavigationState((state) => state.routes);
  const currentRoute = routes[routes.length - 1]?.name;

  // hide if empty cart or inside Cart screen
  if (cartItems.length === 0 || currentRoute === "Cart") return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("Cart")}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <CartIconWithBadge color={true} />
        <Text style={styles.text}>View Cart</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 80, // place above your bottom tabs
    alignSelf: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
