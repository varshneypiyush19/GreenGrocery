import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import demoImage from "../assets/Logo.png"; //

import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native"; // Assuming you have a context for cart management
import AddToCartButton from "./AddToCartButton";
export default function ItemCard({ product }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { product })} // Navigate to product details screen
    >
      <Image
        source={{ uri: product.imageUrl, priority: FastImage.priority.normal }}
        style={styles.image}
      />
      {/* <Image source={{ uri: product.image }} style={styles.image} /> */}
      {/* <Text style={styles.name}>{product.weight}</Text> */}
      <Text style={styles.name}>{product.title}</Text>
      <Text style={styles.name}>₹{product.price}</Text>
      <AddToCartButton product={product} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
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
