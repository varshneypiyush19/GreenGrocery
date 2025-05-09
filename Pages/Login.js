// // LoginScreen.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../FirebaseConfig";

// // Assuming your logo image is in an 'assets' folder
// const logo = require("../assets/Logo.jpg"); // Uncomment and set your logo path

// const PRIMARY_GREEN = "#9DC462"; // From your logo's "GREEN" text
// const DARK_TEXT = "#333333";
// const INPUT_BORDER_COLOR = "#CCCCCC";
// const BUTTON_TEXT_COLOR = "#FFFFFF";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Missing Fields", "Please enter both email and password.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       // Navigate to your main app screen upon successful login
//       // Example: navigation.replace('HomeScreen');
//       Alert.alert("Login Successful", "Welcome back!");
//       // You'll likely navigate to a different screen here, e.g., Home
//     } catch (error) {
//       console.error("Login Error:", error);
//       Alert.alert(
//         "Login Failed",
//         error.message.includes("auth/invalid-credential") ||
//           error.message.includes("auth/user-not-found") ||
//           error.message.includes("auth/wrong-password")
//           ? "Invalid email or password. Please try again."
//           : "An error occurred. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Image source={logo} style={styles.logo} resizeMode="contain" />
//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={styles.subtitle}>Log in to Green Grocery</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email (e.g., apple@green.com)"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <TouchableOpacity
//           style={[styles.button, loading && styles.buttonDisabled]}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? "Logging In..." : "Login"}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//           <Text style={styles.linkText}>
//             Don't have an account?{" "}
//             <Text style={styles.linkHighlight}>Register</Text>
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 20,
//   },
//   logo: {
//     // Uncomment if you add a logo
//     width: 150,
//     height: 150,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: PRIMARY_GREEN,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: DARK_TEXT,
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     height: 50,
//     backgroundColor: "#F7F7F7",
//     borderColor: INPUT_BORDER_COLOR,
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     color: DARK_TEXT,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: PRIMARY_GREEN,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 2, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//   },
//   buttonDisabled: {
//     backgroundColor: "#BDBDBD", // A muted color for disabled state
//   },
//   buttonText: {
//     color: BUTTON_TEXT_COLOR,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   linkText: {
//     fontSize: 14,
//     color: DARK_TEXT,
//     textAlign: "center",
//   },
//   linkHighlight: {
//     color: PRIMARY_GREEN,
//     fontWeight: "bold",
//   },
// });

// export default LoginScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Custom colors
const COLORS = {
  primary: "#9DC462",
  dark: "#333333",
  light: "#FFFFFF",
  inputBorder: "#CCCCCC",
  inputBg: "#F7F7F7",
  placeholder: "#999999",
  error: "#FF3B30",
  disabled: "#BDBDBD",
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login - navigate to main app screen
      navigation.replace("Home");
    } catch (error) {
      console.error("Login Error:", error);
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        Alert.alert(
          "Login Failed",
          "Invalid email or password. Please try again."
        );
        break;
      case "auth/too-many-requests":
        Alert.alert(
          "Access Temporarily Disabled",
          "Too many failed attempts. Please try again later or reset your password."
        );
        break;
      case "auth/user-disabled":
        Alert.alert(
          "Account Disabled",
          "This account has been disabled. Please contact support."
        );
        break;
      default:
        Alert.alert(
          "Login Error",
          error.message || "An unexpected error occurred. Please try again."
        );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo placeholder - replace with your actual logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo.jpg")} // Update path to your logo
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Email address"
            placeholderTextColor={COLORS.placeholder}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Password"
            placeholderTextColor={COLORS.placeholder}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
            secureTextEntry
            editable={!loading}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
          disabled={loading}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.button,
            loading || !email || !password ? styles.buttonDisabled : null,
          ]}
          onPress={handleLogin}
          disabled={loading || !email || !password}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.light} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            disabled={loading}
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.dark,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signUpText: {
    color: COLORS.dark,
    fontSize: 14,
  },
  signUpLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginScreen;
