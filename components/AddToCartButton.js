import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
export default function AddToCartButton({ product }) {
  const { addToCart, getQuantity, updateQuantity, removeFromCart } = useCart();
  const quantity = getQuantity(product.id);

  const increment = () => updateQuantity(product.id, quantity + 1);
  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  return (
    <View style={{ width: "100%" }}>
      {quantity === 0 ? (
        <TouchableOpacity
          onPress={() => addToCart(product, 1)}
          style={styles.addBtn}
        >
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
      )}
    </View>
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
    width: "100%",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 13,
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
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  qBtn: {
    paddingHorizontal: 8,
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
