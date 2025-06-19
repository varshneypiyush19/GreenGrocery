import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import Layout from "../components/Layout";

const db = getFirestore(app);
const auth = getAuth(app);

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

  // Updated status order with proper mapping
  const statusOrder = {
    Pending: 0,
    "approval pending": 0,
    Received: 1,
    Delivered: 2,
    Rejected: 3,
    cancelled: 3,
    dispatched: 1.5,
  };

  // Status display configuration
  const statusConfig = {
    Pending: {
      displayName: "Approval Pending",
      color: "#FF6B35",
      bgColor: "#FFF4F2",
      icon: "⏳",
    },
    "approval pending": {
      displayName: "Approval Pending",
      color: "#FF6B35",
      bgColor: "#FFF4F2",
      icon: "⏳",
    },
    Received: {
      displayName: "Order Received",
      color: "#4A90E2",
      bgColor: "#F0F7FF",
      icon: "📦",
    },
    Delivered: {
      displayName: "Delivered",
      color: "#7ED321",
      bgColor: "#F4FFF0",
      icon: "✅",
    },
    Rejected: {
      displayName: "Cancelled",
      color: "#D0021B",
      bgColor: "#FFF0F0",
      icon: "❌",
    },
    cancelled: {
      displayName: "Cancelled",
      color: "#D0021B",
      bgColor: "#FFF0F0",
      icon: "❌",
    },
    dispatched: {
      displayName: "Dispatched",
      color: "#FFB800",
      bgColor: "#FFFBEA",
      icon: "🚚",
    },
  };

  const fetchOrders = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.(),
          // Normalize status field - check both 'status' and 'orderStatus'
          normalizedStatus: data.status || data.orderStatus || "Pending",
        };
      });

      // Group orders by status
      const groupedOrders = groupOrdersByStatus(fetchedOrders);
      setOrders(groupedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const groupOrdersByStatus = (orders) => {
    // Group orders by status
    const grouped = orders.reduce((acc, order) => {
      const status = order.normalizedStatus;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(order);
      return acc;
    }, {});

    // Sort orders within each group by date (newest first)
    Object.keys(grouped).forEach((status) => {
      grouped[status].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
    });

    // Convert to flat array with headers in correct order
    const statusPriority = [
      "Pending",
      "approval pending",
      "Received",
      "dispatched",
      "Delivered",
      "Rejected",
      "cancelled",
    ];
    const flatArray = [];

    statusPriority.forEach((status) => {
      if (grouped[status] && grouped[status].length > 0) {
        // Add status header
        flatArray.push({
          type: "header",
          status: status,
          id: `header-${status}`,
        });
        // Add orders for this status
        grouped[status].forEach((order) => {
          flatArray.push({
            ...order,
            type: "order",
          });
        });
      }
    });

    return flatArray;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderItem = ({ item }) => {
    if (item.type === "header") {
      const config = statusConfig[item.status] || statusConfig["Pending"];
      return (
        <View
          style={[styles.statusHeader, { backgroundColor: config.bgColor }]}
        >
          <Text style={[styles.statusHeaderText, { color: config.color }]}>
            {config.icon} {config.displayName}
          </Text>
        </View>
      );
    }

    // Render order item
    const config =
      statusConfig[item.normalizedStatus] || statusConfig["Pending"];

    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <Text style={styles.dateText}>📅 {formatDate(item.createdAt)}</Text>
          <View
            style={[styles.statusBadge, { backgroundColor: config.bgColor }]}
          >
            <Text style={[styles.statusBadgeText, { color: config.color }]}>
              {config.displayName}
            </Text>
          </View>
        </View>

        <View style={styles.itemsContainer}>
          {item.items?.map((orderItem, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {orderItem.title || orderItem.product?.productName}
              </Text>
              <Text style={styles.itemQty}>
                {orderItem.quantity} × ₹
                {orderItem.price || orderItem.product?.price} = ₹
                {orderItem.quantity *
                  (parseInt(orderItem.price) || orderItem.product?.price || 0)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.total}>Total: ₹{item.total}</Text>
          <Text style={styles.payment}>Payment: {item.paymentMethod}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>No Orders Found</Text>
          <Text style={styles.emptySubtitle}>
            Your order history will appear here
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  statusHeader: {
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 1,
    // borderWidth: 1,

    borderColor: "#E1E8ED",
  },
  statusHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  orderContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#657786",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemRow: {
    marginBottom: 6,
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#14171A",
    marginBottom: 2,
  },
  itemQty: {
    fontSize: 14,
    color: "#657786",
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    color: "#14171A",
  },
  payment: {
    fontSize: 14,
    color: "#657786",
    fontWeight: "500",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#657786",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#14171A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#657786",
    textAlign: "center",
  },
});
