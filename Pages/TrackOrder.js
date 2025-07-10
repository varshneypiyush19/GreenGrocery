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
  onSnapshot,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
// import useAuth from "../utils/useAuth";
// import { getAuth } from "firebase/auth";
// const auth = getAuth(app);
const db = getFirestore(app);

export default function OrdersScreen() {
  const { user } = useAuth();
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
  const statusConfig = {
    Pending: {
      displayName: "Approval Pending",
      color: "#FF6B35",
      bgColor: "#FFF4F2",
      icon: "⏳",
    },
    Approved: {
      displayName: "Approved",
      color: "#FF6B35",
      bgColor: "#F0F7FF",
      icon: "📦",
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
    Cancelled: {
      displayName: "Cancelled",
      color: "#D0021B",
      bgColor: "#FFF0F0",
      icon: "❌",
    },
    Dispatch: {
      displayName: "Dispatched",
      color: "#FFB800",
      bgColor: "#FFFBEA",
      icon: "🚚",
    },

    dispatch: {
      displayName: "Dispatched",
      color: "#FFB800",
      bgColor: "#FFFBEA",
      icon: "🚚",
    },
    rejected: {
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
    delivered: {
      displayName: "Delivered",
      color: "#7ED321",
      bgColor: "#F4FFF0",
      icon: "✅",
    },
    received: {
      displayName: "Order Received",
      color: "#4A90E2",
      bgColor: "#F0F7FF",
      icon: "📦",
    },
    approved: {
      displayName: "Approved",
      color: "#FF6B35",
      bgColor: "#F0F7FF",
      icon: "📦",
    },
    pending: {
      displayName: "Approval Pending",
      color: "#FF6B35",
      bgColor: "#FFF4F2",
      icon: "⏳",
    },
  };

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "orders"), where("user_id", "==", user.id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.created_at?.toDate?.(),
          normalizedStatus: data.status || data.orderStatus,
        };
      });
      const groupedOrders = groupOrdersByStatus(fetchedOrders);
      setOrders(groupedOrders);
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, [user]);

  const groupOrdersByStatus = (orders) => {
    if (!orders || orders.length === 0) return [];

    const recentOrders = [...orders]
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      })
      .slice(0, 3);
    const grouped = orders.reduce((acc, order) => {
      const status = order.normalizedStatus?.toLowerCase();
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

    const flatArray = [];
    if (recentOrders.length > 0) {
      flatArray.push({
        type: "header",
        status: "recent",
        id: "header-recent",
      });
      recentOrders.forEach((order) => {
        flatArray.push({
          ...order,
          type: "order",
        });
      });
    }
    // Convert to flat array with headers in correct order
    // const statusPriority = [
    //   "Pending",
    //   "approval pending",
    //   "Received",
    //   "Dispatched",
    //   "Delivered",
    //   "Rejected",
    //   "cancelled",
    // ];
    const knownStatuses = [
      "pending",
      // "approval pending",
      "approved",
      "received",
      "dispatch",
      "delivered",
      "rejected",
      "cancelled",
    ];
    const statusPriority = [
      ...knownStatuses,
      // add any unknown statuses dynamically:
      ...Object.keys(grouped).filter(
        (status) => !knownStatuses.includes(status)
      ),
    ];

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

  const renderItem = ({ item }) => {
    if (item.type === "header") {
      const config =
        statusConfig[item.status] ||
        (item.status === "recent"
          ? {
              displayName: "Recent Orders",
              color: "#000",
              bgColor: "#EEE",
              icon: "🕒",
            }
          : statusConfig["Pending"]);
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
          <Text style={styles.dateText}>📅 {formatDate(item.created_at)}</Text>
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
          <Text style={styles.payment}>Payment: {item.payment_method}</Text>
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
          keyExtractor={(item, index) =>
            item.type === "header"
              ? item.id
              : `${item.id}-${item.type}-${index}`
          }
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
