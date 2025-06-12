import { useState, useRef, useEffect } from "react";
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
import { auth, db } from "../firebaseConfig";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import LayoutNoFooter from "../components/LayoutNoFooter";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

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
  const [verificationId, setVerificationId] = useState(null);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [name, setName] = useState("");

  const recaptchaVerifier = useRef(null);

  const handleSendCode = async () => {
    setErrorMsg("");
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg("Enter a valid phone number");
      return;
    }
    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }

    setLoading(true);
    try {
      const phoneProvider = await signInWithPhoneNumber(
        auth,
        "+91" + phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(phoneProvider.verificationId);
      // const confirmation = await signInWithPhoneNumber(
      //   auth,
      //   "+91" + phoneNumber
      // );
      // setVerificationId(confirmation.verificationId);
      setResendTimer(60);
      setCanResend(false);
      Alert.alert("OTP Sent", "Check your phone for the verification code.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    handleSendCode();
  };

  const handleVerifyCode = async () => {
    setErrorMsg("");
    if (!otp) {
      setErrorMsg("Enter the verification code");
      return;
    }

    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      const user = auth.currentUser;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        phone: user.phoneNumber,
        address: "",
        createdAt: new Date(),
      });

      Alert.alert("Login Successful", "You are now logged in", [
        {
          text: "Continue",
          onPress: () => navigation.replace("Home"),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Verification Failed", error.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval = null;
    if (verificationId && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [verificationId, resendTimer]);

  return (
    <LayoutNoFooter>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={auth.app.options}
          attemptInvisibleVerification={true} // 👈 makes it invisible
        />

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
            editable={!verificationId && !loading}
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
            editable={!verificationId && !loading}
          />
        </View>

        {verificationId && (
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

        {!verificationId ? (
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

        {verificationId && (
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              {canResend
                ? "Didn't get the OTP?"
                : `Resend OTP in ${resendTimer}s`}
            </Text>
            {canResend && (
              <Text style={styles.resendText} onPress={handleResendCode}>
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
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: "center",
    // marginRight: 30,
    marginBottom: 80,
  },
  logo: {
    width: 150,
    height: 150,
  },
  titleval: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
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
