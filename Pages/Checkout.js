// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   StyleSheet,
//   Alert,
//   Image,
//   Modal,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";
// import { useCart } from "../context/CartContext";
// import { useNavigation } from "@react-navigation/native";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   Timestamp,
//   setDoc,
//   doc,
// } from "firebase/firestore";
// import { app } from "../firebaseConfig";
// import { useState } from "react";
// import LayoutNoFooter from "../components/LayoutNoFooter";
// import { getAuth } from "firebase/auth"; // Add this import
// const db = getFirestore(app);

// export default function CheckoutScreen() {
//   const { cartItems, getTotal, clearCart } = useCart();
//   const navigation = useNavigation();
//   const [paymentSelectionVisible, setPaymentSelectionVisible] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("Cash");
//   const [showQR, setShowQR] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(false);
//   const [addressInput, setAddressInput] = useState("");
//   const auth = getAuth(app); // Initialize auth

//   const placeOrder = async () => {
//     try {
//       const user = auth.currentUser;

//       const order = {
//         userId: user.uid, // ✅ Add this line
//         items: cartItems,
//         total: getTotal(),
//         paymentMethod,
//         status: paymentMethod === "Cash" ? "Received" : "Pending",
//         createdAt: Timestamp.now(),
//       };
//       await addDoc(collection(db, "orders"), order);
//       clearCart();
//       setShowQR(false);
//       setPaymentSelectionVisible(false);
//       navigation.navigate("OrderConfirmation");
//     } catch (error) {
//       Alert.alert("Error", "Failed to place order. Please try again.");
//       console.error("Firebase Order Error:", error);
//     }
//   };

//   const handlePlaceOrder = () => {
//     setPaymentSelectionVisible(true);
//   };

//   const handleEditPress = () => {
//     setEditingAddress(true);
//     setAddressInput(userInfo?.address || "");
//   };

//   const handleSaveAddress = async () => {
//     if (!user) return;
//     try {
//       await setDoc(doc(db, "users", user.uid), {
//         ...userInfo,
//         address: addressInput,
//       });
//       setUserInfo((prev) => ({ ...prev, address: addressInput }));
//       setEditingAddress(false);
//       Alert.alert("Success", "Address updated!");
//     } catch (error) {
//       console.error("Error updating address:", error);
//       Alert.alert("Error", "Failed to update address.");
//     }
//   };

//   return (
//     <LayoutNoFooter>
//       <View style={styles.container}>
//         <Text style={styles.title}>Checkout</Text>

//         <FlatList
//           data={cartItems}
//           keyExtractor={(item) => item.product.id}
//           renderItem={({ item }) => (
//             <View style={styles.itemRow}>
//               <Image
//                 source={{ uri: item.product.imageUrls[0] }}
//                 style={styles.image}
//               />
//               <View style={{ flex: 1 }}>
//                 <Text>{item.product.productName}</Text>
//                 <Text>Qty: {item.quantity}</Text>
//                 <Text>Price: ₹{item.product.price * item.quantity}</Text>
//               </View>
//             </View>
//           )}
//           ListFooterComponent={
//             <View key="footer" style={{ marginTop: 10, width: "100%" }}>
//               <Text style={{ fontSize: 18, marginVertical: 10 }}>
//                 Total: ₹{getTotal()}
//               </Text>
//               <Button title="Place Order" onPress={handlePlaceOrder} />
//             </View>
//           }
//         />
//       </View>

//       {/* Payment Method Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={paymentSelectionVisible}
//         onRequestClose={() => setPaymentSelectionVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Confirm Your Details </Text>

//             <View style={styles.addressRow}>
//               {editingAddress ? (
//                 <>
//                   <TextInput
//                     value={addressInput}
//                     onChangeText={setAddressInput}
//                     placeholder="Enter new address"
//                     style={[styles.cardText, { borderBottomWidth: 1, flex: 1 }]}
//                   />
//                   <TouchableOpacity onPress={handleSaveAddress}>
//                     <Ionicons name="checkmark" size={22} color="green" />
//                   </TouchableOpacity>
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.cardText}>
//                     Address: {userInfo?.address || "Set your address now"}
//                   </Text>
//                   <TouchableOpacity onPress={handleEditPress}>
//                     <Ionicons name="pencil" size={20} color="#4B0082" />
//                   </TouchableOpacity>
//                 </>
//               )}
//             </View>
//             <Text style={styles.modalText}>How would you like to pay?</Text>

//             <TouchableOpacity
//               style={styles.radioOption}
//               onPress={() => setPaymentMethod("Cash")}
//             >
//               <View
//                 style={[
//                   styles.radioCircle,
//                   paymentMethod === "Cash" && styles.selected,
//                 ]}
//               />
//               <Text style={styles.radioText}>Cash</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.radioOption}
//               onPress={() => setPaymentMethod("UPI")}
//             >
//               <View
//                 style={[
//                   styles.radioCircle,
//                   paymentMethod === "UPI" && styles.selected,
//                 ]}
//               />
//               <Text style={styles.radioText}>UPI</Text>
//             </TouchableOpacity>

//             <Pressable
//               style={[styles.modalButton, { backgroundColor: "#4CAF50" }]}
//               onPress={() => {
//                 if (paymentMethod === "Cash") {
//                   placeOrder();
//                 } else {
//                   setPaymentSelectionVisible(false);
//                   setShowQR(true);
//                 }
//               }}
//             >
//               <Text style={styles.modalButtonText}>Confirm Order</Text>
//             </Pressable>

//             <Pressable
//               onPress={() => setPaymentSelectionVisible(false)}
//               style={[styles.modalButton, { backgroundColor: "#ccc" }]}
//             >
//               <Text style={{ fontWeight: "bold" }}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       {/* UPI QR Code Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showQR}
//         onRequestClose={() => setShowQR(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Pay via UPI</Text>
//             <Image
//               source={require("../assets/upi-qr.png")} // Replace with your QR
//               style={styles.qrImage}
//             />
//             <Text style={{ textAlign: "center", marginBottom: 10 }}>
//               Scan and pay. Tap below once payment is done.
//             </Text>
//             <Pressable
//               style={[styles.modalButton, { backgroundColor: "#4CAF50" }]}
//               onPress={() => placeOrder()}
//             >
//               <Text style={styles.modalButtonText}>I have paid</Text>
//             </Pressable>
//             <Pressable
//               onPress={() => setShowQR(false)}
//               style={[styles.modalButton, { backgroundColor: "#ccc" }]}
//             >
//               <Text style={{ fontWeight: "bold" }}>Cancel</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </LayoutNoFooter>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   itemRow: {
//     marginBottom: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     width: "100%",
//   },
//   image: {
//     width: 50,
//     height: 50,
//     resizeMode: "contain",
//     marginRight: 12,
//   },
//   // Modal + Radio styles
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.4)",
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     padding: 24,
//     borderRadius: 12,
//     width: "80%",
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   modalText: {
//     fontSize: 17,
//     marginBottom: 10,
//   },
//   radioOption: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   radioCircle: {
//     height: 20,
//     width: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#333",
//     marginRight: 10,
//   },
//   selected: {
//     backgroundColor: "#333",
//   },
//   radioText: {
//     fontSize: 16,
//   },
//   modalButton: {
//     padding: 12,
//     marginTop: 10,
//     width: "100%",
//     alignItems: "center",
//     borderRadius: 6,
//   },
//   modalButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   qrImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 16,
//   },
// });
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput, // ✅ Added missing import
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ✅ Added missing import
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  getDoc, // ✅ Added for fetching user data
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { useState, useEffect } from "react"; // ✅ Added useEffect
import LayoutNoFooter from "../components/LayoutNoFooter";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);

export default function CheckoutScreen() {
  const { cartItems, getTotal, clearCart } = useCart();
  const navigation = useNavigation();
  const [paymentSelectionVisible, setPaymentSelectionVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showQR, setShowQR] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  // ✅ Added missing state variables
  const [userInfo, setUserInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  // ✅ Added useEffect to fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);

          // Fetch user info from Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
            setAddressInput(userDoc.data().address || "");
          } else {
            // Create default user info if doesn't exist
            const defaultUserInfo = {
              email: currentUser.email,
              address: "",
              name: currentUser.displayName || "",
            };
            setUserInfo(defaultUserInfo);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const placeOrder = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "Please login first");
        return;
      }

      const order = {
        userId: currentUser.uid,
        items: cartItems,
        total: getTotal(),
        paymentMethod,
        deliveryAddress: userInfo?.address || "", // ✅ Added delivery address
        status: paymentMethod === "Cash" ? "Received" : "Pending",
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "orders"), order);
      clearCart();
      setShowQR(false);
      setPaymentSelectionVisible(false);
      navigation.navigate("OrderConfirmation");
    } catch (error) {
      Alert.alert("Error", "Failed to place order. Please try again.");
      console.error("Firebase Order Error:", error);
    }
  };

  const handlePlaceOrder = () => {
    // ✅ Check if address is set before allowing order
    if (!userInfo?.address || userInfo.address.trim() === "") {
      Alert.alert(
        "Address Required",
        "Please set your delivery address before placing the order."
      );
      return;
    }
    setPaymentSelectionVisible(true);
  };

  const handleEditPress = () => {
    setEditingAddress(true);
    setAddressInput(userInfo?.address || "");
  };

  const handleSaveAddress = async () => {
    if (!user) return;

    if (addressInput.trim() === "") {
      Alert.alert("Error", "Address cannot be empty");
      return;
    }

    try {
      const updatedUserInfo = {
        ...userInfo,
        address: addressInput.trim(),
      };

      await setDoc(doc(db, "users", user.uid), updatedUserInfo);
      setUserInfo(updatedUserInfo);
      setEditingAddress(false);
      Alert.alert("Success", "Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      Alert.alert("Error", "Failed to update address.");
    }
  };

  const handleCancelEdit = () => {
    setEditingAddress(false);
    setAddressInput(userInfo?.address || "");
  };

  if (loading) {
    return (
      <LayoutNoFooter>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text>Loading...</Text>
        </View>
      </LayoutNoFooter>
    );
  }

  return (
    <LayoutNoFooter>
      <View style={styles.container}>
        <Text style={styles.title}>Checkout</Text>

        {/* ✅ Address section on main screen */}
        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressRow}>
            {editingAddress ? (
              <View style={styles.editAddressContainer}>
                <TextInput
                  value={addressInput}
                  onChangeText={setAddressInput}
                  placeholder="Enter your delivery address"
                  style={styles.addressInput}
                  multiline
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity
                    onPress={handleSaveAddress}
                    style={styles.saveButton}
                  >
                    <Ionicons name="checkmark" size={22} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCancelEdit}
                    style={styles.cancelButton}
                  >
                    <Ionicons name="close" size={22} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.addressText}>
                  {userInfo?.address || "Please set your delivery address"}
                </Text>
                <TouchableOpacity
                  onPress={handleEditPress}
                  style={styles.editIcon}
                >
                  <Ionicons name="pencil" size={20} color="#4B0082" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Image
                source={{ uri: item.product.imageUrls[0] }}
                style={styles.image}
              />
              <View style={{ flex: 1 }}>
                <Text>{item.product.productName}</Text>
                <Text>Qty: {item.quantity}</Text>
                <Text>Price: ₹{item.product.price * item.quantity}</Text>
              </View>
            </View>
          )}
          ListFooterComponent={
            <View key="footer" style={{ marginTop: 10, width: "100%" }}>
              <Text style={{ fontSize: 18, marginVertical: 10 }}>
                Total: ₹{getTotal()}
              </Text>
              <Button title="Place Order" onPress={handlePlaceOrder} />
            </View>
          }
        />
      </View>

      {/* Payment Method Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentSelectionVisible}
        onRequestClose={() => setPaymentSelectionVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Your Details</Text>

            {/* ✅ Show address in modal for confirmation */}
            <View style={styles.confirmationSection}>
              <Text style={styles.confirmationLabel}>Delivery Address:</Text>
              <Text style={styles.confirmationText}>{userInfo?.address}</Text>
            </View>

            <Text style={styles.modalText}>How would you like to pay?</Text>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setPaymentMethod("Cash")}
            >
              <View
                style={[
                  styles.radioCircle,
                  paymentMethod === "Cash" && styles.selected,
                ]}
              />
              <Text style={styles.radioText}>Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setPaymentMethod("UPI")}
            >
              <View
                style={[
                  styles.radioCircle,
                  paymentMethod === "UPI" && styles.selected,
                ]}
              />
              <Text style={styles.radioText}>UPI</Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.modalButton, { backgroundColor: "#4CAF50" }]}
              onPress={() => {
                if (paymentMethod === "Cash") {
                  placeOrder();
                } else {
                  setPaymentSelectionVisible(false);
                  setShowQR(true);
                }
              }}
            >
              <Text style={styles.modalButtonText}>Confirm Order</Text>
            </Pressable>

            <Pressable
              onPress={() => setPaymentSelectionVisible(false)}
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            >
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* UPI QR Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQR}
        onRequestClose={() => setShowQR(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Pay via UPI</Text>
            <Image
              source={require("../assets/upi-qr.png")}
              style={styles.qrImage}
            />
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              Scan and pay. Tap below once payment is done.
            </Text>
            <Pressable
              style={[styles.modalButton, { backgroundColor: "#4CAF50" }]}
              onPress={() => placeOrder()}
            >
              <Text style={styles.modalButtonText}>I have paid</Text>
            </Pressable>
            <Pressable
              onPress={() => setShowQR(false)}
              style={[styles.modalButton, { backgroundColor: "#ccc" }]}
            >
              <Text style={{ fontWeight: "bold" }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LayoutNoFooter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  // ✅ Added styles for address section
  addressSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: "#666",
    marginRight: 10,
  },
  editIcon: {
    padding: 8,
  },
  editAddressContainer: {
    flex: 1,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 6,
  },

  // ✅ Added styles for confirmation section
  confirmationSection: {
    width: "100%",
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  confirmationLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  confirmationText: {
    fontSize: 16,
    color: "#666",
  },

  itemRow: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 12,
  },
  // Modal + Radio styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 17,
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#333",
  },
  radioText: {
    fontSize: 16,
  },
  modalButton: {
    padding: 12,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 6,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});
