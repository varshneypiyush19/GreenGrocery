// import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// export default function Footer() {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const currentRoute = route.name;
//   return (
//     <View style={[styles.bottomNav]}>
//       <NavButton
//         icon="home"
//         label="Home"
//         onPress={() => navigation.navigate("Home")}
//         active={currentRoute === "Home"}
//       />
//       <NavButton
//         icon="cart"
//         label="Cart"
//         onPress={() => navigation.navigate("Cart")}
//         active={currentRoute === "Cart"}
//       />
//       <NavButton
//         icon="list"
//         label="Orders"
//         onPress={() => navigation.navigate("Orders")}
//         active={currentRoute === "Orders"}
//       />
//       <NavButton
//         icon="person"
//         label="Profile"
//         onPress={() => navigation.navigate("Profile")}
//         active={currentRoute === "Profile"}
//       />
//     </View>
//   );
// }
// const NavButton = ({ icon, label, onPress = () => {}, active = false }) => (
//   <TouchableOpacity style={styles.navButton} onPress={onPress}>
//     <Icon name={icon} size={24} color={active ? "#1e90ff" : "#888"} />
//     <Text style={{ color: active ? "#1e90ff" : "#888", fontSize: 12 }}>
//       {label}
//     </Text>
//   </TouchableOpacity>
// );
// const styles = StyleSheet.create({
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingTop: 10,
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     elevation: 10,
//     paddingBottom: 20,
//   },
//   navButton: {
//     alignItems: "center",
//   },
// });

// // navigation/BottomTabs.js

// // import Icon from "react-native-vector-icons/Ionicons";
// // import HomeScreen from "../Pages/Home";
// // import CartScreen from "../Pages/Cart";
// // import OrdersScreen from "../Pages/TrackOrder";
// // import ProfileScreen from "../Pages/Profile";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// // const Tab = createBottomTabNavigator();

// // export default function Footer() {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={({ route }) => ({
// //         headerShown: false,
// //         tabBarShowLabel: true,
// //         tabBarActiveTintColor: "#1e90ff",
// //         tabBarInactiveTintColor: "#888",
// //         tabBarStyle: {
// //           backgroundColor: "#fff",
// //           height: 70,
// //           paddingBottom: 10,
// //           paddingTop: 10,
// //         },
// //         tabBarIcon: ({ color, size }) => {
// //           let iconName;
// //           switch (route.name) {
// //             case "Home":
// //               iconName = "home";
// //               break;
// //             case "Cart":
// //               iconName = "cart";
// //               break;
// //             case "Orders":
// //               iconName = "list";
// //               break;
// //             case "Profile":
// //               iconName = "person";
// //               break;
// //           }
// //           return <Icon name={iconName} size={24} color={color} />;
// //         },
// //       })}
// //     >
// //       <Tab.Screen name="Home" component={HomeScreen} />
// //       <Tab.Screen name="Cart" component={CartScreen} />
// //       <Tab.Screen name="Orders" component={OrdersScreen} />
// //       <Tab.Screen name="Profile" component={ProfileScreen} />
// //     </Tab.Navigator>
// //   );
// // }
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur"; // Optional, for iOS-style blur
import CartIconWithBadge from "./CartIconWithBadge";

const TABS = [
  { name: "Home", icon: "home" },
  { name: "Cart", icon: "cart" },
  { name: "Orders", icon: "list" },
  { name: "Profile", icon: "person" },
];

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  const Content = (
    <View style={styles.tabContainer}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => navigation.navigate(tab.name)}
          style={styles.tabButton}
        >
          {tab.name === "Cart" ? (
            <CartIconWithBadge />
          ) : (
            <Icon
              name={tab.icon}
              size={26}
              color={isActive(tab.name) ? "#1e90ff" : "#888"}
            />
          )}
          <Text
            style={[styles.tabLabel, isActive(tab.name) && styles.activeText]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // On iOS, wrap in BlurView
  return Platform.OS === "ios" ? (
    <BlurView intensity={70} tint="light" style={styles.footerWrapper}>
      {Content}
    </BlurView>
  ) : (
    <View style={[styles.footerWrapper, { backgroundColor: "#fff" }]}>
      {Content}
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    elevation: 20,
    zIndex: 100,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabButton: {
    alignItems: "center",
    gap: 2,
  },
  tabLabel: {
    fontSize: 12,
    color: "#888",
  },
  activeText: {
    color: "#1e90ff",
  },
});
