import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  StyleSheet,
} from "react-native";
import Footer from "./Footer";
import FloatingHelpButton from "./HelpButton";
export default function Layout({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          {children}
        </KeyboardAvoidingView>

        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </View>
      <FloatingHelpButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#9DC462", // or remove if you want the parent color
    paddingBottom: 70, // gives space if Footer is not absolute
  },
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff", // Optional, to make footer stand out
    elevation: 10, // For shadow on Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
