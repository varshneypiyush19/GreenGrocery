// screens/CategoryScreen.js
import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function CategoryScreen({ route }) {
  const { category } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.category === category.name); // Adjust if your product category key differs

      setProducts(filtered);
    };

    fetchCategoryProducts();
  }, []);

  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>{category.name} Products</Text>
        <View style={styles.productGrid}>
          {products.map((item) => (
            <View key={item.id} style={styles.productWrapper}>
              <ItemCard product={item} />
            </View>
          ))}
        </View>
        {/* {products.map((item) => (
          <ItemCard key={item.id} product={item} />
        ))} */}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16, // backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productWrapper: {
    width: "50%",
    marginBottom: 12,
  },
});
