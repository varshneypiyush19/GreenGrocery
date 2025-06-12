import { Text, Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddToCartButton from "./AddToCartButton";

export default function ItemCard({ product }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { product })}
    >
      <Image source={{ uri: product.imageUrls[0] }} style={styles.image} />

      <Text style={styles.name}>{product.productName}</Text>
      <Text style={styles.price}>₹{product.price}/per Kg</Text>
      <AddToCartButton product={product} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 5,
  },
});
