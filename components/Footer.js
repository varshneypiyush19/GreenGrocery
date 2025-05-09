import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const currentRoute = route.name;
  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom || 10 }]}>
      <NavButton
        icon="home"
        label="Home"
        onPress={() => navigation.navigate("Home")}
        active={currentRoute === "Home"}
      />
      <NavButton
        icon="cart"
        label="Cart"
        onPress={() => navigation.navigate("Cart")}
        active={currentRoute === "Cart"}
      />
      <NavButton
        icon="list"
        label="Orders"
        onPress={() => navigation.navigate("Orders")}
        active={currentRoute === "Orders"}
      />
      <NavButton
        icon="person"
        label="Profile"
        onPress={() => navigation.navigate("Profile")}
        active={currentRoute === "Profile"}
      />
    </View>
  );
}
const NavButton = ({ icon, label, onPress = () => {}, active = false }) => (
  <TouchableOpacity style={styles.navButton} onPress={onPress}>
    <Icon name={icon} size={24} color={active ? "#1e90ff" : "#888"} />
    <Text style={{ color: active ? "#1e90ff" : "#888", fontSize: 12 }}>
      {label}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    margin: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40,
  },
  categoryScroll: {
    marginHorizontal: 8,
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eaeaea",
    borderRadius: 20,
    height: 40,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: "#1e90ff",
  },
  productCard: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 8,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 10,
  },
  navButton: {
    alignItems: "center",
  },
});
