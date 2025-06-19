import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

export default function PaymentMethod({
  setPaymentSelectionVisible,
  paymentSelectionVisible,
  paymentMethod,
  setPaymentMethod,
  setShowQR,
  placeOrder,
  userInfo,
}) {
  return (
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
