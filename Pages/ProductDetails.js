import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AddToCartButton from "../components/AddToCartButton";
import Layout from "../components/Layout";

const { width } = Dimensions.get("window");

export default function ProductDetailsScreen() {
  const route = useRoute();
  const { product } = route.params;

  if (!product)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {/* Image Carousel */}
          <View style={styles.imageCarousel}>
            <FlatList
              data={product.imageUrls}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.image} />
              )}
            />
          </View>

          {/* Product Info */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{product.productName}</Text>
            <Text style={styles.price}>₹{product.price}</Text>

            {product.description ? (
              <Text style={styles.description}>
                Description : {product.description}
              </Text>
            ) : null}

            {!product.outOfStock || product.qtyDescription ? (
              <View>
                <Text style={styles.stock}>Qty: {product.Qty} (In Stock)</Text>

                <Text style={styles.stock}>{product.qtyDescription}</Text>
              </View>
            ) : (
              <Text style={[styles.stock, { color: "red" }]}>Out of Stock</Text>
            )}

            <AddToCartButton product={product} disabled={product.outofStock} />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  detailsContainer: {
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 12,
  },
  stock: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  imageCarousel: {
    width: "100%",
    height: 350,
  },

  image: {
    width: width,
    height: 400,
    resizeMode: "contain",
  },
});
