import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";

export default function CartScreen() {
  const { cartItems, removeFromCart, getTotal } = useCart();
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>🛒 Your cart is empty.</Text>
        ) : (
          <>
            <FlatList
              contentContainerStyle={{ paddingBottom: 120 }}
              data={cartItems}
              keyExtractor={(item) => item.product.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.product.imageUrls[0] }}
                    style={styles.image}
                  />
                  <View style={styles.details}>
                    <Text style={styles.title}>{item.product.productName}</Text>
                    <Text style={styles.text}>
                      Qty: {item.quantity} x{" "}
                      {item.product.qtyDescription || "unit"}
                    </Text>
                    <Text style={styles.text}>
                      Price: ₹{item.product.price * item.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.product.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <View style={styles.footer}>
              <Text style={styles.totalText}>Total: ₹{getTotal()}</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f7f7f7",
  },
  emptyText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "right",
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
