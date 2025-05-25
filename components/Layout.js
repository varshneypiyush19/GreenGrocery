import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Footer from "./Footer";

export default function Layout({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, paddingBottom: 70, backgroundColor: "#9DC462" }}
      >
        {children}
      </KeyboardAvoidingView>
      <Footer />
    </SafeAreaView>
  );
}
