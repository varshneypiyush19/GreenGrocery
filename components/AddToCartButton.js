import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { isStoreOpen } from "../utils/timeUtils";
import { db } from "../firebaseConfig";

export default function AddToCartButton({ product }) {
  const { addToCart, getQuantity, updateQuantity, removeFromCart } = useCart();
  const quantity = getQuantity(product.id);

  const [storeTiming, setStoreTiming] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const isOutOfStock = product?.Qty <= 0 || product?.outOfStock === true;

  useEffect(() => {
    const fetchTiming = async () => {
      try {
        const docRef = doc(db, "timings", "current");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { from, to } = docSnap.data();
          setStoreTiming({ from, to });
          setIsOpen(isStoreOpen(from, to));
        }
      } catch (error) {
        console.error("Failed to fetch timing:", error);
      }
    };
    fetchTiming();
  }, []);

  const increment = () => {
    if (quantity >= product.Qty) {
      Alert.alert("Limit Reached", "Cannot add more than available stock.");
      return;
    }
    updateQuantity(product.id, quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleAddPress = () => {
    if (isOutOfStock) return;
    if (!isOpen) {
      Alert.alert(
        "Store Closed",
        `Store is closed now. We'll open at ${
          storeTiming?.from || "the scheduled time"
        }.`
      );
      return;
    }
    addToCart(product, 1);
  };

  return (
    <View style={{ width: "100%" }}>
      {quantity === 0 ? (
        <TouchableOpacity
          onPress={handleAddPress}
          style={[
            styles.addBtn,
            { backgroundColor: !isOpen || isOutOfStock ? "#ccc" : "#4CAF50" },
          ]}
          disabled={isOutOfStock || !isOpen}
        >
          {/* <Text style={styles.addText}>
            {isOpen ? "Add to Cart" : "Store Closed"}
          </Text> */}
          <Text style={styles.addText}>
            {!isOpen
              ? "Store Closed"
              : isOutOfStock
              ? "Out of Stock"
              : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={decrement} style={styles.qBtn}>
            <Text style={styles.qText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity
            onPress={increment}
            style={[styles.qBtn, quantity >= product.Qty && { opacity: 0.5 }]}
            // disabled={quantity >= product.Qty || isOutOfStock}
          >
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
    paddingVertical: 8,
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
    paddingVertical: 6,
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
