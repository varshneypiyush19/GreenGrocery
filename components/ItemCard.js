import { Text, Image, TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddToCartButton from "./AddToCartButton";

export default function ItemCard({ product }) {
  const navigation = useNavigation();
  // const handleViewPress = () => {
  //   navigation.navigate("ProductDetails", { product });
  // };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetails", { product })}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: product.imageUrls[0] }} style={styles.image} />
      </View>
      {product.qtyDescription && (
        <Text style={styles.qtyDescription}>{product.qtyDescription}</Text>
      )}

      <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
        {product.productName}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>

      <AddToCartButton product={product} />
      {/* {console.log(view)} */}
      {/* {product.dealsoftheday ? (
        <TouchableOpacity style={styles.viewBtn} onPress={handleViewPress}>
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
      ) : (
        <AddToCartButton product={product} />
      )} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // alignItems: "center",
    width: "100%",
    // height: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    height: 40, // 2 lines × 20px lineHeight
    lineHeight: 20,
  },
  price: {
    fontSize: 13,
    color: "#4CAF50",
    fontWeight: "600",
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginBottom: 5,
  },
  qtyDescription: {
    fontSize: 11,
    color: "#888",
    marginBottom: 4,
    fontWeight: "bold",
  },
});
