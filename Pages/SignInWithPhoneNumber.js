// // // // import { useState, useRef, useEffect } from "react";
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   Alert,
// // // //   Image,
// // // //   ScrollView,
// // // //   ActivityIndicator,
// // // // } from "react-native";
// // // // import { auth, db } from "../firebaseConfig";
// // // // import {
// // // //   signInWithPhoneNumber,
// // // //   PhoneAuthProvider,
// // // //   signInWithCredential,
// // // // } from "firebase/auth";
// // // // import { doc, setDoc } from "firebase/firestore";
// // // // import LayoutNoFooter from "../components/LayoutNoFooter";
// // // // import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// // // // import { Platform } from "react-native"; // 📍 at the top of file

// // // // const COLORS = {
// // // //   primary: "#9DC462",
// // // //   dark: "#333333",
// // // //   light: "#FFFFFF",
// // // //   inputBorder: "#CCCCCC",
// // // //   inputBg: "#F7F7F7",
// // // //   placeholder: "#999999",
// // // //   error: "#FF3B30",
// // // //   disabled: "#BDBDBD",
// // // // };

// // // // const PhoneSignInScreen = ({ navigation }) => {
// // // //   const [phoneNumber, setPhoneNumber] = useState("");
// // // //   const [otp, setOtp] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [errorMsg, setErrorMsg] = useState("");
// // // //   const [verificationId, setVerificationId] = useState(null);
// // // //   const [resendTimer, setResendTimer] = useState(60);
// // // //   const [canResend, setCanResend] = useState(false);
// // // //   const [name, setName] = useState("");

// // // //   const recaptchaVerifier = useRef(null);

// // // //   const handleSendCode = async () => {
// // // //     setErrorMsg("");
// // // //     const trimmedPhone = phoneNumber.trim();
// // // //     if (!trimmedPhone || trimmedPhone.length !== 10) {
// // // //       setErrorMsg("Enter a valid 10-digit phone number");
// // // //       return;
// // // //     }

// // // //     if (!name.trim()) {
// // // //       setErrorMsg("Name is required");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       const phoneProvider = await signInWithPhoneNumber(
// // // //         auth,
// // // //         "+91" + trimmedPhone,
// // // //         recaptchaVerifier.current
// // // //       );
// // // //       setVerificationId(phoneProvider.verificationId);
// // // //       // const confirmation = await signInWithPhoneNumber(
// // // //       //   auth,
// // // //       //   "+91" + phoneNumber
// // // //       // );
// // // //       // setVerificationId(confirmation.verificationId);
// // // //       setResendTimer(60);
// // // //       setCanResend(false);
// // // //       Alert.alert("OTP Sent", "Check your phone for the verification code.");
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       Alert.alert("Error", err.message || "Failed to send OTP");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleResendCode = async () => {
// // // //     if (!canResend) return;
// // // //     handleSendCode();
// // // //   };

// // // //   const handleVerifyCode = async () => {
// // // //     setErrorMsg("");
// // // //     if (!verificationId) {
// // // //       setErrorMsg("OTP not requested. Please try again.");
// // // //       return;
// // // //     }

// // // //     if (!otp) {
// // // //       setErrorMsg("Enter the verification code");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       const credential = PhoneAuthProvider.credential(verificationId, otp);
// // // //       await signInWithCredential(auth, credential);
// // // //       const user = auth.currentUser;

// // // //       await setDoc(doc(db, "users", user.uid), {
// // // //         uid: user.uid,
// // // //         name: name.trim(),
// // // //         phone: user.phoneNumber,
// // // //         address: "",
// // // //         createdAt: new Date(),
// // // //       });

// // // //       Alert.alert("Login Successful", "You are now logged in", [
// // // //         {
// // // //           text: "Continue",
// // // //           onPress: () => navigation.replace("Home"),
// // // //         },
// // // //       ]);
// // // //     } catch (error) {
// // // //       let message = error.message;
// // // //       if (error.code === "auth/invalid-verification-code") {
// // // //         message = "The verification code is incorrect.";
// // // //       } else if (error.code === "auth/code-expired") {
// // // //         message = "The verification code has expired.";
// // // //       }
// // // //       Alert.alert("Verification Failed", message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     let interval = null;
// // // //     if (verificationId && resendTimer > 0) {
// // // //       interval = setInterval(() => {
// // // //         setResendTimer((prev) => prev - 1);
// // // //       }, 1000);
// // // //     } else if (resendTimer === 0) {
// // // //       setCanResend(true);
// // // //       clearInterval(interval);
// // // //     }

// // // //     return () => clearInterval(interval);
// // // //   }, [verificationId, resendTimer]);

// // // //   return (
// // // //     <LayoutNoFooter>
// // // //       <ScrollView contentContainerStyle={styles.scrollContent}>
// // // //         <FirebaseRecaptchaVerifierModal
// // // //           ref={recaptchaVerifier}
// // // //           firebaseConfig={auth.app.options}
// // // //           attemptInvisibleVerification={Platform.OS !== "android"} // 👈 safer for Android

// // // //           // attemptInvisibleVerification={
// // // //           //   Platform.OS === "android" ? false : true
// // // //           // } // 👈 makes it invisible
// // // //         />

// // // //         <View style={styles.logoContainer}>
// // // //           <Image
// // // //             source={require("../assets/Logo.png")}
// // // //             style={styles.logo}
// // // //             resizeMode="contain"
// // // //           />
// // // //         </View>
// // // //         <View style={styles.inputContainer}>
// // // //           <Text style={styles.name}>Enter Your Name</Text>
// // // //           <TextInput
// // // //             style={[styles.input, errorMsg ? styles.inputError : null]}
// // // //             placeholder="Full Name"
// // // //             placeholderTextColor={COLORS.placeholder}
// // // //             value={name}
// // // //             onChangeText={(text) => {
// // // //               setName(text);
// // // //               setErrorMsg("");
// // // //             }}
// // // //             editable={!verificationId && !loading}
// // // //           />
// // // //         </View>

// // // //         <View style={styles.inputContainer}>
// // // //           <Text style={styles.name}>Enter Your Mobile Number</Text>
// // // //           <TextInput
// // // //             style={[styles.input, errorMsg ? styles.inputError : null]}
// // // //             placeholder="Phone Number (10 digits)"
// // // //             placeholderTextColor={COLORS.placeholder}
// // // //             keyboardType="phone-pad"
// // // //             value={phoneNumber}
// // // //             onChangeText={(text) => {
// // // //               setPhoneNumber(text);
// // // //               setErrorMsg("");
// // // //             }}
// // // //             editable={!verificationId && !loading}
// // // //           />
// // // //         </View>

// // // //         {verificationId && (
// // // //           <View style={styles.inputContainer}>
// // // //             <Text style={styles.name}>Enter OTP</Text>
// // // //             <TextInput
// // // //               style={[styles.input, errorMsg ? styles.inputError : null]}
// // // //               placeholder="Enter OTP"
// // // //               placeholderTextColor={COLORS.placeholder}
// // // //               keyboardType="number-pad"
// // // //               value={otp}
// // // //               onChangeText={(text) => {
// // // //                 setOtp(text);
// // // //                 setErrorMsg("");
// // // //               }}
// // // //             />
// // // //           </View>
// // // //         )}

// // // //         {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

// // // //         {!verificationId ? (
// // // //           <TouchableOpacity
// // // //             style={[
// // // //               styles.button,
// // // //               !phoneNumber || loading ? styles.buttonDisabled : null,
// // // //             ]}
// // // //             onPress={handleSendCode}
// // // //             disabled={loading || !phoneNumber}
// // // //           >
// // // //             {loading ? (
// // // //               <ActivityIndicator color={COLORS.light} />
// // // //             ) : (
// // // //               <Text style={styles.buttonText}>Send OTP</Text>
// // // //             )}
// // // //           </TouchableOpacity>
// // // //         ) : (
// // // //           <TouchableOpacity
// // // //             style={[
// // // //               styles.button,
// // // //               !otp || loading ? styles.buttonDisabled : null,
// // // //             ]}
// // // //             onPress={handleVerifyCode}
// // // //             disabled={loading || !otp}
// // // //           >
// // // //             {loading ? (
// // // //               <ActivityIndicator color={COLORS.light} />
// // // //             ) : (
// // // //               <Text style={styles.buttonText}>Verify OTP</Text>
// // // //             )}
// // // //           </TouchableOpacity>
// // // //         )}

// // // //         {verificationId && (
// // // //           <View style={{ alignItems: "center", flex: 1 }}>
// // // //             <Text style={{ textAlign: "center", marginBottom: 10 }}>
// // // //               {canResend
// // // //                 ? "Didn't get the OTP?"
// // // //                 : `Resend OTP in ${resendTimer}s`}
// // // //             </Text>
// // // //             {canResend && (
// // // //               <Text style={styles.resendText} onPress={handleResendCode}>
// // // //                 Resend OTP
// // // //               </Text>
// // // //             )}
// // // //           </View>
// // // //         )}
// // // //       </ScrollView>
// // // //     </LayoutNoFooter>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   safeArea: { flex: 1, backgroundColor: COLORS.light },
// // // //   container: { flex: 1 },
// // // //   scrollContent: {
// // // //     paddingHorizontal: 30,
// // // //     paddingBottom: 40,
// // // //     paddingTop: 50,
// // // //   },
// // // //   logoContainer: {
// // // //     alignItems: "center",
// // // //     // marginRight: 30,
// // // //     marginBottom: 80,
// // // //   },
// // // //   logo: {
// // // //     width: 150,
// // // //     height: 150,
// // // //   },
// // // //   titleval: {
// // // //     fontSize: 28,
// // // //     fontWeight: "bold",
// // // //     textAlign: "center",
// // // //   },
// // // //   name: {
// // // //     color: COLORS.primary,
// // // //     fontWeight: "bold",
// // // //     fontSize: 16,
// // // //     marginBottom: 10,
// // // //     marginLeft: 5,
// // // //   },
// // // //   inputContainer: { marginBottom: 15, width: "100%" },
// // // //   input: {
// // // //     width: "100%",
// // // //     height: 50,
// // // //     backgroundColor: COLORS.inputBg,
// // // //     borderWidth: 1,
// // // //     borderColor: COLORS.inputBorder,
// // // //     borderRadius: 8,
// // // //     paddingHorizontal: 15,
// // // //     fontSize: 16,
// // // //     color: COLORS.dark,
// // // //   },
// // // //   inputError: { borderColor: COLORS.error },
// // // //   errorText: {
// // // //     color: COLORS.error,
// // // //     fontSize: 12,
// // // //     marginTop: 5,
// // // //     marginLeft: 5,
// // // //   },
// // // //   button: {
// // // //     width: "100%",
// // // //     backgroundColor: COLORS.primary,
// // // //     paddingVertical: 15,
// // // //     borderRadius: 8,
// // // //     alignItems: "center",
// // // //     justifyContent: "center",
// // // //     marginBottom: 20,
// // // //   },
// // // //   buttonDisabled: { backgroundColor: COLORS.disabled },
// // // //   buttonText: {
// // // //     color: COLORS.light,
// // // //     fontSize: 18,
// // // //     fontWeight: "bold",
// // // //   },
// // // //   resendText: {
// // // //     color: COLORS.primary,
// // // //     fontSize: 16,
// // // //     fontWeight: "bold",
// // // //     marginLeft: 5,
// // // //   },
// // // // });

// // // // export default PhoneSignInScreen;

// // // // // import React, { useState } from "react";
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   TextInput,
// // // // //   TouchableOpacity,
// // // // //   StyleSheet,
// // // // //   Alert,
// // // // // } from "react-native";
// // // // // import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// // // // // import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// // // // // import Constants from "expo-constants";
// // // // // import { auth } from "../firebaseConfig";

// // // // // export default function SignInWithPhoneNumber() {
// // // // //   const [phoneNumber, setPhoneNumber] = useState("");
// // // // //   const [verificationId, setVerificationId] = useState(null);
// // // // //   const [code, setCode] = useState("");
// // // // //   const recaptchaVerifier = React.useRef(null);

// // // // //   const sendVerification = async () => {
// // // // //     try {
// // // // //       const provider = new PhoneAuthProvider(auth);
// // // // //       const id = await provider.verifyPhoneNumber(
// // // // //         phoneNumber,
// // // // //         recaptchaVerifier.current
// // // // //       );
// // // // //       setVerificationId(id);
// // // // //       Alert.alert("Code Sent", "Please check your phone.");
// // // // //     } catch (err) {
// // // // //       console.log(err);
// // // // //       Alert.alert("Error", err.message);
// // // // //     }
// // // // //   };

// // // // //   const confirmCode = async () => {
// // // // //     try {
// // // // //       const credential = PhoneAuthProvider.credential(verificationId, code);
// // // // //       await signInWithCredential(auth, credential);
// // // // //       Alert.alert("Success ✅", "Phone number verified and user signed in!");
// // // // //     } catch (err) {
// // // // //       console.log(err);
// // // // //       Alert.alert("Error", err.message);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       <FirebaseRecaptchaVerifierModal
// // // // //         ref={recaptchaVerifier}
// // // // //         firebaseConfig={{
// // // // //           apiKey: Constants.expoConfig.extra.APIKEY,
// // // // //           authDomain: Constants.expoConfig.extra.AUTHDOMAIN,
// // // // //           projectId: Constants.expoConfig.extra.PROJECTID,
// // // // //           storageBucket: Constants.expoConfig.extra.STORAGEBUCKET,
// // // // //           messagingSenderId: Constants.expoConfig.extra.MESSAGINGSENDERID,
// // // // //           appId: Constants.expoConfig.extra.APPID,
// // // // //         }}
// // // // //       />

// // // // //       <Text style={styles.title}>Phone Auth</Text>

// // // // //       <TextInput
// // // // //         placeholder="+91XXXXXXXXXX"
// // // // //         value={phoneNumber}
// // // // //         onChangeText={setPhoneNumber}
// // // // //         keyboardType="phone-pad"
// // // // //         style={styles.input}
// // // // //       />

// // // // //       <TouchableOpacity style={styles.button} onPress={sendVerification}>
// // // // //         <Text style={styles.buttonText}>Send Code</Text>
// // // // //       </TouchableOpacity>

// // // // //       {verificationId && (
// // // // //         <>
// // // // //           <TextInput
// // // // //             placeholder="Verification Code"
// // // // //             value={code}
// // // // //             onChangeText={setCode}
// // // // //             keyboardType="number-pad"
// // // // //             style={styles.input}
// // // // //           />
// // // // //           <TouchableOpacity style={styles.button} onPress={confirmCode}>
// // // // //             <Text style={styles.buttonText}>Verify Code</Text>
// // // // //           </TouchableOpacity>
// // // // //         </>
// // // // //       )}
// // // // //     </View>
// // // // //   );
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   container: { padding: 20, flex: 1, justifyContent: "center" },
// // // // //   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
// // // // //   input: {
// // // // //     borderWidth: 1,
// // // // //     borderColor: "#ccc",
// // // // //     padding: 12,
// // // // //     borderRadius: 8,
// // // // //     marginBottom: 15,
// // // // //   },
// // // // //   button: {
// // // // //     backgroundColor: "#007AFF",
// // // // //     padding: 15,
// // // // //     borderRadius: 8,
// // // // //     alignItems: "center",
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   buttonText: { color: "#fff", fontWeight: "bold" },
// // // // // });

// // // import { useState, useRef, useEffect } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Alert,
// // //   Image,
// // //   ScrollView,
// // //   ActivityIndicator,
// // // } from "react-native";
// // // import { supabase } from "../utils/supabase"; // Make sure this is set up
// // // import LayoutNoFooter from "../components/LayoutNoFooter";

// // // const COLORS = {
// // //   primary: "#9DC462",
// // //   dark: "#333333",
// // //   light: "#FFFFFF",
// // //   inputBorder: "#CCCCCC",
// // //   inputBg: "#F7F7F7",
// // //   placeholder: "#999999",
// // //   error: "#FF3B30",
// // //   disabled: "#BDBDBD",
// // // };

// // // const PhoneSignInScreen = ({ navigation }) => {
// // //   const [phoneNumber, setPhoneNumber] = useState("");
// // //   const [otp, setOtp] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [errorMsg, setErrorMsg] = useState("");
// // //   const [verificationSent, setVerificationSent] = useState(false);
// // //   const [resendTimer, setResendTimer] = useState(60);
// // //   const [canResend, setCanResend] = useState(false);
// // //   const [name, setName] = useState("");

// // //   const handleSendCode = async () => {
// // //     setErrorMsg("");
// // //     const trimmedPhone = phoneNumber.trim();
// // //     if (!trimmedPhone || trimmedPhone.length !== 10) {
// // //       setErrorMsg("Enter a valid 10-digit phone number");
// // //       return;
// // //     }

// // //     if (!name.trim()) {
// // //       setErrorMsg("Name is required");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const { data, error } = await fetch(
// // //         "https://xmikunzmoqsrybnogxom.functions.supabase.co/send-otp",
// // //         {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify({ phone: "+91" + trimmedPhone }),
// // //         }
// // //       ).then((res) => res.json());

// // //       if (error) throw new Error(error.message || "Failed to send OTP");

// // //       setVerificationSent(true);
// // //       setResendTimer(60);
// // //       setCanResend(false);
// // //       Alert.alert("OTP Sent", "Check your phone for the verification code.");
// // //     } catch (err) {
// // //       console.error(err);
// // //       Alert.alert("Error", err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleResendCode = async () => {
// // //     if (!canResend) return;
// // //     handleSendCode();
// // //   };

// // //   const handleVerifyCode = async () => {
// // //     setErrorMsg("");
// // //     if (!otp) {
// // //       setErrorMsg("Enter the verification code");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const response = await fetch(
// // //         "https://xmikunzmoqsrybnogxom.functions.supabase.co/verify-otp",
// // //         {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify({ phone: "+91" + phoneNumber, otp }),
// // //         }
// // //       );

// // //       const result = await response.json();
// // //       if (!response.ok || !result.token?.session?.access_token) {
// // //         throw new Error(result.error || "OTP verification failed");
// // //       }

// // //       await supabase.auth.setSession({
// // //         access_token: result.token.session.access_token,
// // //         refresh_token: result.token.session.refresh_token,
// // //       });

// // //       Alert.alert("Login Successful", "You are now logged in", [
// // //         { text: "Continue", onPress: () => navigation.replace("Home") },
// // //       ]);
// // //     } catch (error) {
// // //       Alert.alert("Verification Failed", error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     let interval = null;
// // //     if (verificationSent && resendTimer > 0) {
// // //       interval = setInterval(() => {
// // //         setResendTimer((prev) => prev - 1);
// // //       }, 1000);
// // //     } else if (resendTimer === 0) {
// // //       setCanResend(true);
// // //       clearInterval(interval);
// // //     }

// // //     return () => clearInterval(interval);
// // //   }, [verificationSent, resendTimer]);

// // //   return (
// // //     <LayoutNoFooter>
// // //       <ScrollView contentContainerStyle={styles.scrollContent}>
// // //         <View style={styles.logoContainer}>
// // //           <Image
// // //             source={require("../assets/Logo.png")}
// // //             style={styles.logo}
// // //             resizeMode="contain"
// // //           />
// // //         </View>

// // //         <View style={styles.inputContainer}>
// // //           <Text style={styles.name}>Enter Your Name</Text>
// // //           <TextInput
// // //             style={[styles.input, errorMsg ? styles.inputError : null]}
// // //             placeholder="Full Name"
// // //             placeholderTextColor={COLORS.placeholder}
// // //             value={name}
// // //             onChangeText={(text) => {
// // //               setName(text);
// // //               setErrorMsg("");
// // //             }}
// // //             editable={!verificationSent && !loading}
// // //           />
// // //         </View>

// // //         <View style={styles.inputContainer}>
// // //           <Text style={styles.name}>Enter Your Mobile Number</Text>
// // //           <TextInput
// // //             style={[styles.input, errorMsg ? styles.inputError : null]}
// // //             placeholder="Phone Number (10 digits)"
// // //             placeholderTextColor={COLORS.placeholder}
// // //             keyboardType="phone-pad"
// // //             value={phoneNumber}
// // //             onChangeText={(text) => {
// // //               setPhoneNumber(text);
// // //               setErrorMsg("");
// // //             }}
// // //             editable={!verificationSent && !loading}
// // //           />
// // //         </View>

// // //         {verificationSent && (
// // //           <View style={styles.inputContainer}>
// // //             <Text style={styles.name}>Enter OTP</Text>
// // //             <TextInput
// // //               style={[styles.input, errorMsg ? styles.inputError : null]}
// // //               placeholder="Enter OTP"
// // //               placeholderTextColor={COLORS.placeholder}
// // //               keyboardType="number-pad"
// // //               value={otp}
// // //               onChangeText={(text) => {
// // //                 setOtp(text);
// // //                 setErrorMsg("");
// // //               }}
// // //             />
// // //           </View>
// // //         )}

// // //         {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

// // //         {!verificationSent ? (
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.button,
// // //               !phoneNumber || loading ? styles.buttonDisabled : null,
// // //             ]}
// // //             onPress={handleSendCode}
// // //             disabled={loading || !phoneNumber}
// // //           >
// // //             {loading ? (
// // //               <ActivityIndicator color={COLORS.light} />
// // //             ) : (
// // //               <Text style={styles.buttonText}>Send OTP</Text>
// // //             )}
// // //           </TouchableOpacity>
// // //         ) : (
// // //           <TouchableOpacity
// // //             style={[
// // //               styles.button,
// // //               !otp || loading ? styles.buttonDisabled : null,
// // //             ]}
// // //             onPress={handleVerifyCode}
// // //             disabled={loading || !otp}
// // //           >
// // //             {loading ? (
// // //               <ActivityIndicator color={COLORS.light} />
// // //             ) : (
// // //               <Text style={styles.buttonText}>Verify OTP</Text>
// // //             )}
// // //           </TouchableOpacity>
// // //         )}

// // //         {verificationSent && (
// // //           <View style={{ alignItems: "center", flex: 1 }}>
// // //             <Text style={{ textAlign: "center", marginBottom: 10 }}>
// // //               {canResend
// // //                 ? "Didn't get the OTP?"
// // //                 : `Resend OTP in ${resendTimer}s`}
// // //             </Text>
// // //             {canResend && (
// // //               <Text style={styles.resendText} onPress={handleResendCode}>
// // //                 Resend OTP
// // //               </Text>
// // //             )}
// // //           </View>
// // //         )}
// // //       </ScrollView>
// // //     </LayoutNoFooter>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   safeArea: { flex: 1, backgroundColor: COLORS.light },
// // //   container: { flex: 1 },
// // //   scrollContent: {
// // //     paddingHorizontal: 30,
// // //     paddingBottom: 40,
// // //     paddingTop: 100,
// // //   },
// // //   logoContainer: {
// // //     alignItems: "center",
// // //     marginBottom: 80,
// // //   },
// // //   logo: {
// // //     width: 150,
// // //     height: 150,
// // //   },
// // //   name: {
// // //     color: COLORS.primary,
// // //     fontWeight: "bold",
// // //     fontSize: 16,
// // //     marginBottom: 10,
// // //     marginLeft: 5,
// // //   },
// // //   inputContainer: { marginBottom: 15, width: "100%" },
// // //   input: {
// // //     width: "100%",
// // //     height: 50,
// // //     backgroundColor: COLORS.inputBg,
// // //     borderWidth: 1,
// // //     borderColor: COLORS.inputBorder,
// // //     borderRadius: 8,
// // //     paddingHorizontal: 15,
// // //     fontSize: 16,
// // //     color: COLORS.dark,
// // //   },
// // //   inputError: { borderColor: COLORS.error },
// // //   errorText: {
// // //     color: COLORS.error,
// // //     fontSize: 12,
// // //     marginTop: 5,
// // //     marginLeft: 5,
// // //   },
// // //   button: {
// // //     width: "100%",
// // //     backgroundColor: COLORS.primary,
// // //     paddingVertical: 15,
// // //     borderRadius: 8,
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     marginBottom: 20,
// // //   },
// // //   buttonDisabled: { backgroundColor: COLORS.disabled },
// // //   buttonText: {
// // //     color: COLORS.light,
// // //     fontSize: 18,
// // //     fontWeight: "bold",
// // //   },
// // //   resendText: {
// // //     color: COLORS.primary,
// // //     fontSize: 16,
// // //     fontWeight: "bold",
// // //     marginLeft: 5,
// // //   },
// // // });

// // // export default PhoneSignInScreen;

// // import { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   Image,
// //   ScrollView,
// //   ActivityIndicator,
// // } from "react-native";
// // import { supabase } from "../utils/supabase";
// // import LayoutNoFooter from "../components/LayoutNoFooter";

// // const COLORS = {
// //   primary: "#9DC462",
// //   dark: "#333333",
// //   light: "#FFFFFF",
// //   inputBorder: "#CCCCCC",
// //   inputBg: "#F7F7F7",
// //   placeholder: "#999999",
// //   error: "#FF3B30",
// //   disabled: "#BDBDBD",
// // };

// // const PhoneSignInScreen = ({ navigation }) => {
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [errorMsg, setErrorMsg] = useState("");
// //   const [verificationSent, setVerificationSent] = useState(false);
// //   const [resendTimer, setResendTimer] = useState(60);
// //   const [canResend, setCanResend] = useState(false);
// //   const [name, setName] = useState("");

// //   const handleSendCode = async () => {
// //     setErrorMsg("");
// //     const trimmedPhone = phoneNumber.trim();
// //     if (!trimmedPhone || trimmedPhone.length !== 10) {
// //       setErrorMsg("Enter a valid 10-digit phone number");
// //       return;
// //     }

// //     if (!name.trim()) {
// //       setErrorMsg("Name is required");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const { error } = await supabase.auth.signInWithOtp({
// //         phone: "+91" + trimmedPhone,
// //       });

// //       if (error) throw error;

// //       setVerificationSent(true);
// //       setResendTimer(60);
// //       setCanResend(false);
// //       Alert.alert("OTP Sent", "Check your phone for the verification code.");
// //     } catch (err) {
// //       console.error("Send OTP Error", err.message);
// //       Alert.alert("Error", err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResendCode = () => {
// //     if (!canResend) return;
// //     handleSendCode();
// //   };

// //   const handleVerifyCode = async () => {
// //     setErrorMsg("");
// //     if (!otp) {
// //       setErrorMsg("Enter the verification code");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const { data, error } = await supabase.auth.verifyOtp({
// //         phone: "+91" + phoneNumber.trim(),
// //         token: otp,
// //         type: "sms",
// //       });

// //       if (error || !data.session)
// //         throw error || new Error("Verification failed");

// //       Alert.alert("Login Successful", "You are now logged in", [
// //         { text: "Continue", onPress: () => navigation.replace("Home") },
// //       ]);
// //     } catch (err) {
// //       console.error("Verify OTP Error", err.message);
// //       Alert.alert("Verification Failed", err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     let interval = null;
// //     if (verificationSent && resendTimer > 0) {
// //       interval = setInterval(() => {
// //         setResendTimer((prev) => prev - 1);
// //       }, 1000);
// //     } else if (resendTimer === 0) {
// //       setCanResend(true);
// //       clearInterval(interval);
// //     }

// //     return () => clearInterval(interval);
// //   }, [verificationSent, resendTimer]);

// //   return (
// //     <LayoutNoFooter>
// //       <ScrollView contentContainerStyle={styles.scrollContent}>
// //         <View style={styles.logoContainer}>
// //           <Image
// //             source={require("../assets/Logo.png")}
// //             style={styles.logo}
// //             resizeMode="contain"
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={styles.name}>Enter Your Name</Text>
// //           <TextInput
// //             style={[styles.input, errorMsg ? styles.inputError : null]}
// //             placeholder="Full Name"
// //             placeholderTextColor={COLORS.placeholder}
// //             value={name}
// //             onChangeText={(text) => {
// //               setName(text);
// //               setErrorMsg("");
// //             }}
// //             editable={!verificationSent && !loading}
// //           />
// //         </View>

// //         <View style={styles.inputContainer}>
// //           <Text style={styles.name}>Enter Your Mobile Number</Text>
// //           <TextInput
// //             style={[styles.input, errorMsg ? styles.inputError : null]}
// //             placeholder="Phone Number (10 digits)"
// //             placeholderTextColor={COLORS.placeholder}
// //             keyboardType="phone-pad"
// //             value={phoneNumber}
// //             onChangeText={(text) => {
// //               setPhoneNumber(text);
// //               setErrorMsg("");
// //             }}
// //             editable={!verificationSent && !loading}
// //           />
// //         </View>

// //         {verificationSent && (
// //           <View style={styles.inputContainer}>
// //             <Text style={styles.name}>Enter OTP</Text>
// //             <TextInput
// //               style={[styles.input, errorMsg ? styles.inputError : null]}
// //               placeholder="Enter OTP"
// //               placeholderTextColor={COLORS.placeholder}
// //               keyboardType="number-pad"
// //               value={otp}
// //               onChangeText={(text) => {
// //                 setOtp(text);
// //                 setErrorMsg("");
// //               }}
// //             />
// //           </View>
// //         )}

// //         {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

// //         {!verificationSent ? (
// //           <TouchableOpacity
// //             style={[
// //               styles.button,
// //               !phoneNumber || loading ? styles.buttonDisabled : null,
// //             ]}
// //             onPress={handleSendCode}
// //             disabled={loading || !phoneNumber}
// //           >
// //             {loading ? (
// //               <ActivityIndicator color={COLORS.light} />
// //             ) : (
// //               <Text style={styles.buttonText}>Send OTP</Text>
// //             )}
// //           </TouchableOpacity>
// //         ) : (
// //           <TouchableOpacity
// //             style={[
// //               styles.button,
// //               !otp || loading ? styles.buttonDisabled : null,
// //             ]}
// //             onPress={handleVerifyCode}
// //             disabled={loading || !otp}
// //           >
// //             {loading ? (
// //               <ActivityIndicator color={COLORS.light} />
// //             ) : (
// //               <Text style={styles.buttonText}>Verify OTP</Text>
// //             )}
// //           </TouchableOpacity>
// //         )}

// //         {verificationSent && (
// //           <View style={{ alignItems: "center", flex: 1 }}>
// //             <Text style={{ textAlign: "center", marginBottom: 10 }}>
// //               {canResend
// //                 ? "Didn't get the OTP?"
// //                 : `Resend OTP in ${resendTimer}s`}
// //             </Text>
// //             {canResend && (
// //               <Text style={styles.resendText} onPress={handleResendCode}>
// //                 Resend OTP
// //               </Text>
// //             )}
// //           </View>
// //         )}
// //       </ScrollView>
// //     </LayoutNoFooter>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   safeArea: { flex: 1, backgroundColor: COLORS.light },
// //   container: { flex: 1 },
// //   scrollContent: {
// //     paddingHorizontal: 30,
// //     paddingBottom: 40,
// //     paddingTop: 100,
// //   },
// //   logoContainer: {
// //     alignItems: "center",
// //     marginBottom: 80,
// //   },
// //   logo: {
// //     width: 150,
// //     height: 150,
// //   },
// //   name: {
// //     color: COLORS.primary,
// //     fontWeight: "bold",
// //     fontSize: 16,
// //     marginBottom: 10,
// //     marginLeft: 5,
// //   },
// //   inputContainer: { marginBottom: 15, width: "100%" },
// //   input: {
// //     width: "100%",
// //     height: 50,
// //     backgroundColor: COLORS.inputBg,
// //     borderWidth: 1,
// //     borderColor: COLORS.inputBorder,
// //     borderRadius: 8,
// //     paddingHorizontal: 15,
// //     fontSize: 16,
// //     color: COLORS.dark,
// //   },
// //   inputError: { borderColor: COLORS.error },
// //   errorText: {
// //     color: COLORS.error,
// //     fontSize: 12,
// //     marginTop: 5,
// //     marginLeft: 5,
// //   },
// //   button: {
// //     width: "100%",
// //     backgroundColor: COLORS.primary,
// //     paddingVertical: 15,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginBottom: 20,
// //   },
// //   buttonDisabled: { backgroundColor: COLORS.disabled },
// //   buttonText: {
// //     color: COLORS.light,
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   resendText: {
// //     color: COLORS.primary,
// //     fontSize: 16,
// //     fontWeight: "bold",
// //     marginLeft: 5,
// //   },
// // });

// // export default PhoneSignInScreen;

// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import { supabase } from "../utils/supabase";
// import LayoutNoFooter from "../components/LayoutNoFooter";

// const COLORS = {
//   primary: "#9DC462",
//   dark: "#333333",
//   light: "#FFFFFF",
//   inputBorder: "#CCCCCC",
//   inputBg: "#F7F7F7",
//   placeholder: "#999999",
//   error: "#FF3B30",
//   disabled: "#BDBDBD",
// };

// const PhoneSignInScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [verificationSent, setVerificationSent] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const [name, setName] = useState("");

//   const handleSendCode = async () => {
//     setErrorMsg("");
//     const trimmedPhone = phoneNumber.trim();
//     if (!trimmedPhone || trimmedPhone.length !== 10) {
//       setErrorMsg("Enter a valid 10-digit phone number");
//       return;
//     }

//     if (!name.trim()) {
//       setErrorMsg("Name is required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         phone: "+91" + trimmedPhone,
//       });

//       if (error) throw error;

//       setVerificationSent(true);
//       setResendTimer(60);
//       setCanResend(false);
//       Alert.alert("OTP Sent", "Check your phone for the verification code.");
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendCode = async () => {
//     if (!canResend) return;
//     handleSendCode();
//   };

//   const handleVerifyCode = async () => {
//     setErrorMsg("");
//     if (!otp) {
//       setErrorMsg("Enter the verification code");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data, error } = await supabase.auth.verifyOtp({
//         phone: "+91" + phoneNumber,
//         token: otp,
//         type: "sms",
//       });

//       if (error || !data.session) {
//         throw new Error(error?.message || "OTP verification failed");
//       }

//       const userId = data.session.user.id;

//       // Insert into User Info table
//       await supabase.from("User Info").upsert({
//         id: userId,
//         name: name.trim(),
//         phone: "+91" + phoneNumber.trim(),
//       });

//       Alert.alert("Login Successful", "You are now logged in", [
//         { text: "Continue", onPress: () => navigation.replace("Home") },
//       ]);
//     } catch (error) {
//       Alert.alert("Verification Failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let interval = null;
//     if (verificationSent && resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (resendTimer === 0) {
//       setCanResend(true);
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [verificationSent, resendTimer]);

//   return (
//     <LayoutNoFooter>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.logoContainer}>
//           <Image
//             source={require("../assets/Logo.png")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.name}>Enter Your Name</Text>
//           <TextInput
//             style={[styles.input, errorMsg ? styles.inputError : null]}
//             placeholder="Full Name"
//             placeholderTextColor={COLORS.placeholder}
//             value={name}
//             onChangeText={(text) => {
//               setName(text);
//               setErrorMsg("");
//             }}
//             editable={!verificationSent && !loading}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.name}>Enter Your Mobile Number</Text>
//           <TextInput
//             style={[styles.input, errorMsg ? styles.inputError : null]}
//             placeholder="Phone Number (10 digits)"
//             placeholderTextColor={COLORS.placeholder}
//             keyboardType="phone-pad"
//             value={phoneNumber}
//             onChangeText={(text) => {
//               setPhoneNumber(text);
//               setErrorMsg("");
//             }}
//             editable={!verificationSent && !loading}
//           />
//         </View>

//         {verificationSent && (
//           <View style={styles.inputContainer}>
//             <Text style={styles.name}>Enter OTP</Text>
//             <TextInput
//               style={[styles.input, errorMsg ? styles.inputError : null]}
//               placeholder="Enter OTP"
//               placeholderTextColor={COLORS.placeholder}
//               keyboardType="number-pad"
//               value={otp}
//               onChangeText={(text) => {
//                 setOtp(text);
//                 setErrorMsg("");
//               }}
//             />
//           </View>
//         )}

//         {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

//         {!verificationSent ? (
//           <TouchableOpacity
//             style={[
//               styles.button,
//               !phoneNumber || loading ? styles.buttonDisabled : null,
//             ]}
//             onPress={handleSendCode}
//             disabled={loading || !phoneNumber}
//           >
//             {loading ? (
//               <ActivityIndicator color={COLORS.light} />
//             ) : (
//               <Text style={styles.buttonText}>Send OTP</Text>
//             )}
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={[
//               styles.button,
//               !otp || loading ? styles.buttonDisabled : null,
//             ]}
//             onPress={handleVerifyCode}
//             disabled={loading || !otp}
//           >
//             {loading ? (
//               <ActivityIndicator color={COLORS.light} />
//             ) : (
//               <Text style={styles.buttonText}>Verify OTP</Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {verificationSent && (
//           <View style={{ alignItems: "center", flex: 1 }}>
//             <Text style={{ textAlign: "center", marginBottom: 10 }}>
//               {canResend
//                 ? "Didn't get the OTP?"
//                 : `Resend OTP in ${resendTimer}s`}
//             </Text>
//             {canResend && (
//               <Text style={styles.resendText} onPress={handleResendCode}>
//                 Resend OTP
//               </Text>
//             )}
//           </View>
//         )}
//       </ScrollView>
//     </LayoutNoFooter>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: COLORS.light },
//   container: { flex: 1 },
//   scrollContent: {
//     paddingHorizontal: 30,
//     paddingBottom: 40,
//     paddingTop: 100,
//   },
//   logoContainer: {
//     alignItems: "center",
//     marginBottom: 80,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//   },
//   name: {
//     color: COLORS.primary,
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 10,
//     marginLeft: 5,
//   },
//   inputContainer: { marginBottom: 15, width: "100%" },
//   input: {
//     width: "100%",
//     height: 50,
//     backgroundColor: COLORS.inputBg,
//     borderWidth: 1,
//     borderColor: COLORS.inputBorder,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     color: COLORS.dark,
//   },
//   inputError: { borderColor: COLORS.error },
//   errorText: {
//     color: COLORS.error,
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   button: {
//     width: "100%",
//     backgroundColor: COLORS.primary,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   buttonDisabled: { backgroundColor: COLORS.disabled },
//   buttonText: {
//     color: COLORS.light,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   resendText: {
//     color: COLORS.primary,
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 5,
//   },
// });

// export default PhoneSignInScreen;

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../utils/supabase";
import LayoutNoFooter from "../components/LayoutNoFooter";

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

const PhoneSignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [name, setName] = useState("");

  const handleSendCode = async () => {
    setErrorMsg("");
    const trimmedPhone = phoneNumber.trim();
    if (!trimmedPhone || trimmedPhone.length !== 10) {
      setErrorMsg("Enter a valid 10-digit phone number");
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: "+91" + trimmedPhone,
      });

      if (error) throw error;

      setVerificationSent(true);
      setResendTimer(60);
      setCanResend(false);
      Alert.alert("OTP Sent", "Check your phone for the verification code.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setErrorMsg("");
    if (!otp) {
      setErrorMsg("Enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: "+91" + phoneNumber,
        token: otp,
        type: "sms",
      });

      if (error || !data.session)
        throw error || new Error("OTP verification failed");

      const user = data.user;
      const { data: existingUser, error: fetchError } = await supabase
        .from("User")
        .select("id")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError; // Some unexpected fetch error
      }

      // If user doesn't exist, insert
      if (!existingUser) {
        const { error: insertError } = await supabase.from("User").insert([
          {
            id: user.id,
            name,
            phone: "+91" + phoneNumber,
            address: "",
          },
        ]);
        if (insertError) throw insertError;
      }

      Alert.alert("Login Successful", "You are now logged in", [
        { text: "Continue", onPress: () => navigation.replace("Home") },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Verification Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval = null;
    if (verificationSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [verificationSent, resendTimer]);

  return (
    <LayoutNoFooter>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.name}>Enter Your Name</Text>
          <TextInput
            style={[styles.input, errorMsg ? styles.inputError : null]}
            placeholder="Full Name"
            placeholderTextColor={COLORS.placeholder}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrorMsg("");
            }}
            editable={!verificationSent && !loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.name}>Enter Your Mobile Number</Text>
          <TextInput
            style={[styles.input, errorMsg ? styles.inputError : null]}
            placeholder="Phone Number (10 digits)"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setErrorMsg("");
            }}
            editable={!verificationSent && !loading}
          />
        </View>

        {verificationSent && (
          <View style={styles.inputContainer}>
            <Text style={styles.name}>Enter OTP</Text>
            <TextInput
              style={[styles.input, errorMsg ? styles.inputError : null]}
              placeholder="Enter OTP"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="number-pad"
              value={otp}
              onChangeText={(text) => {
                setOtp(text);
                setErrorMsg("");
              }}
            />
          </View>
        )}

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

        {!verificationSent ? (
          <TouchableOpacity
            style={[
              styles.button,
              !phoneNumber || loading ? styles.buttonDisabled : null,
            ]}
            onPress={handleSendCode}
            disabled={loading || !phoneNumber}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.light} />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              !otp || loading ? styles.buttonDisabled : null,
            ]}
            onPress={handleVerifyCode}
            disabled={loading || !otp}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.light} />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>
        )}

        {verificationSent && (
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              {canResend
                ? "Didn't get the OTP?"
                : `Resend OTP in ${resendTimer}s`}
            </Text>
            {canResend && (
              <Text style={styles.resendText} onPress={handleSendCode}>
                Resend OTP
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </LayoutNoFooter>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.light },
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  logo: {
    width: 150,
    height: 150,
  },
  name: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 5,
  },
  inputContainer: { marginBottom: 15, width: "100%" },
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
  inputError: { borderColor: COLORS.error },
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
  },
  buttonDisabled: { backgroundColor: COLORS.disabled },
  buttonText: {
    color: COLORS.light,
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default PhoneSignInScreen;
