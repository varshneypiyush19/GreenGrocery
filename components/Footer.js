// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { BlurView } from "expo-blur"; // Optional, for iOS-style blur
// import CartIconWithBadge from "./CartIconWithBadge";

// const TABS = [
//   { name: "Home", icon: "home" },
//   { name: "Cart", icon: "cart" },
//   { name: "Orders", icon: "list" },
//   { name: "Profile", icon: "person" },
// ];

// export default function Footer() {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const isActive = (routeName) => route.name === routeName;

//   const Content = (
//     <View style={styles.tabContainer}>
//       {TABS.map((tab) => (
//         <TouchableOpacity
//           key={tab.name}
//           onPress={() => navigation.navigate(tab.name)}
//           style={styles.tabButton}
//         >
//           {tab.name === "Cart" ? (
//             <CartIconWithBadge />
//           ) : (
//             <Icon
//               name={tab.icon}
//               size={26}
//               color={isActive(tab.name) ? "#1e90ff" : "#888"}
//             />
//           )}
//           <Text
//             style={[styles.tabLabel, isActive(tab.name) && styles.activeText]}
//           >
//             {tab.name}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   // On iOS, wrap in BlurView
//   return Platform.OS === "ios" ? (
//     <BlurView intensity={70} tint="light" style={styles.footerWrapper}>
//       {Content}
//     </BlurView>
//   ) : (
//     <View style={[styles.footerWrapper, { backgroundColor: "#fff" }]}>
//       {Content}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   footerWrapper: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     paddingTop: 10,
//     paddingBottom: 20,
//     borderTopWidth: 0.5,
//     borderTopColor: "#ccc",
//     elevation: 20,
//     zIndex: 100,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
//   tabButton: {
//     alignItems: "center",
//     gap: 2,
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: "#888",
//   },
//   activeText: {
//     color: "#1e90ff",
//   },
// });

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Linking from "expo-linking"; // required to open dialer
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";

const TABS = [
  { name: "Home", icon: "home" },
  // { name: "Cart", icon: "cart" },
  { name: "Orders", icon: "list" },
  { name: "Help", icon: "help-circle-outline" },
  { name: "Profile", icon: "person" },
];

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;
  const PHONE_NUMBER = "01244375324";
  const handlePress = (name) => {
    if (name == "Help") {
      const phoneURL = Platform.select({
        ios: `telprompt:${PHONE_NUMBER}`,
        android: `tel:${PHONE_NUMBER}`,
      });

      Linking.openURL(phoneURL);
    } else {
      navigation.navigate(name);
    }
  };
  const Content = (
    <View style={styles.tabContainer}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handlePress(tab.name)}
          style={styles.tabButton}
        >
          {/* {tab.name === "Cart" ? (
            <CartIconWithBadge />
          ) : (
            )} */}
          <Icon
            name={tab.icon}
            size={30}
            color={isActive(tab.name) ? "#1e90ff" : "#888"}
          />
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
