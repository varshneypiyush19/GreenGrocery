import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;
  return (
    <View style={[styles.bottomNav]}>
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
    paddingBottom: 20,
  },
  navButton: {
    alignItems: "center",
  },
});
