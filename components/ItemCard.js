import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import demoImage from "../assets/Logo.jpg"; //
import { useNavigation } from "@react-navigation/native"; // Assuming you're using React Navigation
// import { useCart } from "../context/CartContext"; // Assuming you have a context for cart management
import AddToCartButton from "./AddToCartButton";
export default function ItemCard({ product }) {
  const navigation = useNavigation();
  // const { addToCart, getQuantity, removeFromCart } = useCart();
  // const [quantity, setQuantity] = useState(getQuantity(product.id) || 0); // Initialize quantity from context
  // const increment = () => {
  //   const newQty = quantity + 1;
  //   setQuantity(newQty);
  //   addToCart(product, 1);
  // };

  // const decrement = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //     addToCart(product, -1); // decrease quantity
  //   } else if (quantity === 1) {
  //     setQuantity(0);
  //     removeFromCart(product.id); // remove when count is 0
  //   }
  // }; // Assuming you have a context or function to add to cart

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { product })} // Navigate to product details screen
    >
      <Image
        source={product.image ? { uri: product.image } : demoImage}
        style={styles.image}
      />
      {/* <Image source={{ uri: product.image }} style={styles.image} /> */}
      <Text style={styles.name}>{product.weight}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.name}>₹{product.price}</Text>
      <AddToCartButton product={product} />
      {/* {quantity === 0 ? (
        <TouchableOpacity onPress={increment} style={styles.addBtn}>
          <Text style={styles.addText}>Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={decrement} style={styles.qBtn}>
            <Text style={styles.qText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity onPress={increment} style={styles.qBtn}>
            <Text style={styles.qText}>+</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addText: {
    color: "white",
    fontWeight: "600",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  qBtn: {
    padding: 8,
  },
  qText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qty: {
    fontSize: 16,
    marginHorizontal: 12,
  },
});
