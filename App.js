import { useState, useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";

// Screens
import LoginScreen from "./Pages/Login";
import RegisterScreen from "./Pages/Register";
import HomeScreen from "./Pages/Home";
import ProductDetailScreen from "./Pages/ProductDetails";
import ProductListingScreen from "./Pages/ProductListing";
import CartScreen from "./Pages/Cart";
import CheckoutScreen from "./Pages/Checkout";
import OrderConfirmationScreen from "./Pages/OrderConfirmation";
import OrdersScreen from "./Pages/TrackOrder";
import { CartProvider } from "./context/CartContext";
import ProfileScreen from "./Pages/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  if (checkingAuth)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#483D8B" />
      </View>
    );
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? "Home" : "Login"}
          screenOptions={({ navigation }) => ({
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Icon
                  name="cart-outline"
                  size={25}
                  color="#483D8B"
                  onPress={() => navigation.navigate("Cart")}
                />
              </View>
            ),
            title: "Green Grocery",

            headerTitleStyle: {
              fontWeight: "bold",
            },
          })}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerLeft: () => (
                <View>
                  <Image
                    source={require("./assets/Logo.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Products" component={ProductListingScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: "My Cart" }}
          />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
