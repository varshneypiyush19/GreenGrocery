import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PHONE_NUMBER = "01244375324";

export default function FloatingHelpButton() {
  const handlePress = () => {
    const phoneURL = Platform.select({
      ios: `telprompt:${PHONE_NUMBER}`,
      android: `tel:${PHONE_NUMBER}`,
    });

    Linking.openURL(phoneURL);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <MaterialIcons name="support-agent" size={24} color="#fff" />
      <Text style={styles.label}>Help</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
