// // RegisterScreen.js
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
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";

// // const logo = require('./assets/your-logo-filename.png'); // Uncomment and set your logo path

// const PRIMARY_GREEN = "#9DC462";
// const DARK_TEXT = "#333333";
// const INPUT_BORDER_COLOR = "#CCCCCC";
// const BUTTON_TEXT_COLOR = "#FFFFFF";

// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!email || !password || !confirmPassword) {
//       Alert.alert("Missing Fields", "Please fill in all fields.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Password Mismatch", "Passwords do not match.");
//       return;
//     }
//     if (password.length < 6) {
//       Alert.alert("Weak Password", "Password should be at least 6 characters.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       Alert.alert(
//         "Registration Successful!",
//         "You can now log in with your new account.",
//         [{ text: "OK", onPress: () => navigation.navigate("Login") }]
//       );
//       // Optionally, sign them in automatically or navigate to a profile setup
//     } catch (error) {
//       console.error("Registration Error:", error);
//       let errorMessage = "An error occurred. Please try again.";
//       if (error.code === "auth/email-already-in-use") {
//         errorMessage = "This email address is already in use.";
//       } else if (error.code === "auth/invalid-email") {
//         errorMessage = "Please enter a valid email address.";
//       } else if (error.code === "auth/weak-password") {
//         errorMessage =
//           "The password is too weak. Please choose a stronger one.";
//       }
//       Alert.alert("Registration Failed", errorMessage);
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
//         {/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>Join Green Grocery today!</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email (e.g., pear@green.com)"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password (min. 6 characters)"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           placeholderTextColor="#999"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />
//         <TouchableOpacity
//           style={[styles.button, loading && styles.buttonDisabled]}
//           onPress={handleRegister}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? "Registering..." : "Register"}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//           <Text style={styles.linkText}>
//             Already have an account?{" "}
//             <Text style={styles.linkHighlight}>Login</Text>
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
//     width: 120,
//     height: 120,
//     marginBottom: 20,
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
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//   },
//   buttonDisabled: {
//     backgroundColor: "#BDBDBD",
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

// export default RegisterScreen;
import { useState } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { StatusBar } from "expo-status-bar";

// Color constants
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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert(
        "Registration Successful!",
        "Your account has been created successfully.",
        [
          {
            text: "Continue",
            onPress: () => navigation.replace("Home"), // Or navigate to profile setup
          },
        ]
      );
    } catch (error) {
      console.error("Registration Error:", error);
      handleRegistrationError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationError = (error) => {
    let errorMessage =
      "An error occurred during registration. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "This email is already registered. Please log in or use a different email.";
        setEmailError("Email already in use");
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        setEmailError("Invalid email format");
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters.";
        setPasswordError("Password too weak");
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Email/password accounts are not enabled.";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    Alert.alert("Registration Failed", errorMessage);
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
        <StatusBar style="dark" />
        {/* Logo placeholder */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo.png")} // Update with your logo path
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create Account</Text>

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
            placeholder="Password (min 6 characters)"
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

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              confirmPasswordError ? styles.inputError : null,
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.placeholder}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
            }}
            secureTextEntry
            editable={!loading}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.button,
            loading || !email || !password || !confirmPassword
              ? styles.buttonDisabled
              : null,
          ]}
          onPress={handleRegister}
          disabled={loading || !email || !password || !confirmPassword}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.light} />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        {/* <View style={styles.loginPhoneContainer}>
          <Text style={styles.loginText}>
            Continue with Phone Number Instead ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.loginLink}> Phone Number</Text>
          </TouchableOpacity>
        </View> */}
        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            disabled={loading}
          >
            <Text style={styles.loginLink}>Log In</Text>
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
  loginPhoneContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: COLORS.dark,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
