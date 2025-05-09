import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";
import Layout from "../components/Layout";

// import { format } from "date-fns";

const db = getFirestore(app);

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const fetchedOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
        };
      });
      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.dateText}>📅 {formatDate(item.createdAt)}</Text>
      {item.items.map((orderItem, idx) => (
        <View key={idx} style={styles.itemRow}>
          <Text style={styles.itemName}>{orderItem.product.name}</Text>
          <Text style={styles.itemQty}>
            {orderItem.quantity} × ₹{orderItem.product.price} = ₹
            {orderItem.quantity * orderItem.product.price}
          </Text>
        </View>
      ))}
      <Text style={styles.total}>Total: ₹{item.total}</Text>
      <Text style={styles.payment}>Payment: {item.paymentMethod}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Layout>
      <View
        style={{
          paddingBottom: 50,
        }}
      >
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#444",
  },
  itemRow: {
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemQty: {
    color: "#555",
  },
  total: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  payment: {
    color: "#444",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
