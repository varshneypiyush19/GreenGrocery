import { View, Text, Modal, Pressable, StyleSheet, Image } from "react-native";

export default function UpiQr({ setShowQR, showQR, placeOrder }) {
  return (
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
    height: 300,
    marginBottom: 16,
  },
});
