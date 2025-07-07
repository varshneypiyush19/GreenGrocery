// // screens/CategoryScreen.js
// import { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import ItemCard from "../components/ItemCard";
// import Layout from "../components/Layout";

// export default function CategoryScreen({ route }) {
//   const { category } = route.params;
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       const snapshot = await getDocs(collection(db, "products"));
//       const filtered = snapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((item) => item.category === category.name); // Adjust if your product category key differs

//       setProducts(filtered);
//     };

//     fetchCategoryProducts();
//   }, []);

//   return (
//     <Layout>
//       <ScrollView style={styles.container}>
//         <Text style={styles.heading}>{category.name} Products</Text>
//         <View style={styles.productGrid}>
//           {products.map((item) => (
//             <View key={item.id} style={styles.productWrapper}>
//               <ItemCard product={item} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </Layout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16, // backgroundColor: "#fff",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   productGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   productWrapper: {
//     width: "48%",
//     marginBottom: 12,
//   },
// });
// screens/CategoryScreen.js
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ItemCard from "../components/ItemCard";
import Layout from "../components/Layout";
import { FlashList } from "@shopify/flash-list";
import Icon from "react-native-vector-icons/Ionicons";

export default function CategoryScreen({ route }) {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [loading, setLoading] = useState(true);

  // const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.category === category.name);
      // setAllProducts(filtered);

      setProducts(filtered);
    };

    fetchCategoryProducts();
  }, []);

  const filteredProducts = products.filter(
    (item) =>
      item.productName &&
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     setProducts(allProducts);
  //   } else {
  //     const filtered = allProducts.filter((item) =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setProducts(filtered);
  //   }
  // }, [searchQuery, allProducts]);

  const renderItem = ({ item }) => (
    <View style={styles.productWrapper}>
      <ItemCard product={item} />
    </View>
  );

  return (
    <Layout>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your Grocery here"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Icon
              name="close-outline"
              size={20}
              color="#888"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {searchQuery.trim().length > 0 && (
        <>
          <Text style={styles.sectionTitle}>"Search Results"</Text>
          <ScrollView style={styles.container1}>
            <View style={styles.productGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <View key={item.id} style={styles.productWrapper1}>
                    <ItemCard product={item} />
                  </View>
                ))
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingTop: 100,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 16,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    No products found.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
      {searchQuery.length == 0 && (
        <View style={styles.container}>
          <Text style={styles.heading}>{category.name} Products</Text>
          <FlashList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={200}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  container1: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#9DC462",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 16,
  },
  productWrapper: {
    flex: 1,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  searchContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 0,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 45,
    fontSize: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 25,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  productWrapper1: {
    width: "48%",
    marginBottom: 12,
  },
});
