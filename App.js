// // import { useState, useEffect } from "react";
// import { View, ActivityIndicator, Image } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import { onAuthStateChanged } from "firebase/auth";
// // import { auth } from "./firebaseConfig";

// // Screens
// import HomeScreen from "./Pages/Home";
// import ProductDetailScreen from "./Pages/ProductDetails";
// import ProductListingScreen from "./Pages/ProductListing";
// import CartScreen from "./Pages/Cart";
// import CheckoutScreen from "./Pages/Checkout";
// import OrderConfirmationScreen from "./Pages/OrderConfirmation";
// import OrdersScreen from "./Pages/TrackOrder";
// import { CartProvider } from "./context/CartContext";
// import ProfileScreen from "./Pages/Profile";
// import CategoryScreen from "./Pages/CategoryScreen";
// // import LoginScreen from "./Pages/Login";
// // import RegisterScreen from "./Pages/Register";
// import CartIconWithBadge from "./components/CartIconWithBadge";
// import PhoneSignInScreen from "./Pages/SignInWithPhoneNumber";
// import useAuth from "./utils/useAuth";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   const { user, loading } = useAuth();

//   // const [user, setUser] = useState(null);
//   // const [checkingAuth, setCheckingAuth] = useState(true);

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//   //     setUser(currentUser);
//   //     setCheckingAuth(false);
//   //   });
//   //   return unsubscribe;
//   // }, []);

//   if (loading)
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#483D8B" />
//       </View>
//     );
//   return (
//     <CartProvider>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName={user ? "Home" : "Login"}
//           screenOptions={() => ({
//             headerTitle: "Green Grocery",
//             headerTitlejustifyContent: "center",
//             headerTitleAlign: "center",
//             headerTitleStyle: {
//               fontWeight: "bold",
//             },
//             headerStyle: {
//               backgroundColor: "#f9f9f9",
//               shadowColor: "transparent", // Removes shadow for a clean look
//               elevation: 0,
//             },
//             headerRight: () => (user ? <CartIconWithBadge /> : null),
//           })}
//         >
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//               headerLeft: () => (
//                 <View style={{ marginRight: 16 }}>
//                   <Image
//                     source={require("./assets/Logo.png")}
//                     style={{ width: 60, height: 60, resizeMode: "contain" }}
//                   />
//                 </View>
//               ),
//             }}
//           />
//           <Stack.Screen
//             name="Login"
//             component={PhoneSignInScreen}
//             options={{ headerShown: false }}
//           />
//           {/* <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{ headerShown: false }}
//           /> */}
//           <Stack.Screen name="Products" component={ProductListingScreen} />
//           <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
//           <Stack.Screen
//             name="Cart"
//             component={CartScreen}
//             options={{ title: "My Cart" }}
//           />
//           <Stack.Screen
//             name="Checkout"
//             component={CheckoutScreen}
//             options={{ headerRight: () => null }}
//           />
//           <Stack.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{ title: "Profile" }}
//           />
//           <Stack.Screen
//             name="OrderConfirmation"
//             component={OrderConfirmationScreen}
//           />
//           <Stack.Screen name="Orders" component={OrdersScreen} />
//           <Stack.Screen name="Category" component={CategoryScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </CartProvider>
//   );
// }

// // <View style={{ marginRight: 16 }}>
// //   <Icon
// //     name="cart-outline"
// //     size={24}
// //     color="#483D8B"
// //     onPress={() => navigation.navigate("Cart")}
// //   />
// // </View>

import { View, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Pages/Home";
import ProductDetailScreen from "./Pages/ProductDetails";
import ProductListingScreen from "./Pages/ProductListing";
import CartScreen from "./Pages/Cart";
import CheckoutScreen from "./Pages/Checkout";
import OrderConfirmationScreen from "./Pages/OrderConfirmation";
import OrdersScreen from "./Pages/TrackOrder";
import ProfileScreen from "./Pages/Profile";
import CategoryScreen from "./Pages/CategoryScreen";
import PhoneSignInScreen from "./Pages/SignInWithPhoneNumber";

import CartIconWithBadge from "./components/CartIconWithBadge";
import { CartProvider } from "./context/CartContext";
// import useAuth from "./utils/useAuth";

import { AuthProvider, useAuth } from "./context/AuthContext"; // <-- NEW

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
const Stack = createNativeStackNavigator();

function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#483D8B" />
      </View>
    );
  }

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: "Green Grocery",
            headerTitleAlign: "center",
            headerTitleStyle: { fontWeight: "bold" },
            headerStyle: {
              backgroundColor: "#f9f9f9",
              shadowColor: "transparent",
              elevation: 0,
            },
            headerRight: () => (user ? <CartIconWithBadge /> : null),
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerLeft: () => (
                    <View style={{ marginRight: 16 }}>
                      <Image
                        source={require("./assets/Logo.png")}
                        style={{ width: 60, height: 60, resizeMode: "contain" }}
                      />
                    </View>
                  ),
                }}
              />
              <Stack.Screen name="Products" component={ProductListingScreen} />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailScreen}
              />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: "My Cart" }}
              />
              <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ headerRight: () => null }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
              />
              <Stack.Screen
                name="OrderConfirmation"
                component={OrderConfirmationScreen}
              />
              <Stack.Screen name="Orders" component={OrdersScreen} />
              <Stack.Screen name="Category" component={CategoryScreen} />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={PhoneSignInScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
