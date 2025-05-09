// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDocs,
//   startAfter,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

// const ProductListingScreen = ({ navigation }) => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [lastVisible, setLastVisible] = useState(null);
//   const [hasMore, setHasMore] = useState(true);

//   // Filter and sort options
//   const [filters, setFilters] = useState({
//     category: null,
//     minPrice: null,
//     maxPrice: null,
//     inStock: true,
//   });

//   const [sortOption, setSortOption] = useState("popularity");

//   // Fetch initial products
//   useEffect(() => {
//     fetchProducts(true);
//   }, [filters, sortOption]);

//   const fetchProducts = async (initialLoad = false) => {
//     if (initialLoad) {
//       setLoading(true);
//       setProducts([]);
//     } else {
//       if (!hasMore || loadingMore) return;
//       setLoadingMore(true);
//     }

//     try {
//       // Base query
//       let q = query(collection(db, "products"));

//       // Apply filters
//       if (filters.category) {
//         q = query(q, where("category", "==", filters.category));
//       }
//       if (filters.minPrice) {
//         q = query(q, where("price", ">=", Number(filters.minPrice)));
//       }
//       if (filters.maxPrice) {
//         q = query(q, where("price", "<=", Number(filters.maxPrice)));
//       }
//       if (filters.inStock) {
//         q = query(q, where("stock", ">", 0));
//       }

//       // Apply sorting
//       switch (sortOption) {
//         case "price-low":
//           q = query(q, orderBy("price", "asc"));
//           break;
//         case "price-high":
//           q = query(q, orderBy("price", "desc"));
//           break;
//         case "name":
//           q = query(q, orderBy("name", "asc"));
//           break;
//         case "popularity":
//         default:
//           q = query(q, orderBy("sales", "desc"));
//       }

//       // Pagination
//       q = query(q, limit(10));
//       if (!initialLoad && lastVisible) {
//         q = query(q, startAfter(lastVisible));
//       }

//       const querySnapshot = await getDocs(q);

//       if (querySnapshot.empty) {
//         setHasMore(false);
//         return;
//       }

//       const newProducts = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setProducts((prev) =>
//         initialLoad ? newProducts : [...prev, ...newProducts]
//       );
//       setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
//       setHasMore(querySnapshot.docs.length === 10);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       if (initialLoad) {
//         setLoading(false);
//       } else {
//         setLoadingMore(false);
//       }
//     }
//   };

//   const handleLoadMore = () => {
//     if (!loadingMore && hasMore) {
//       fetchProducts();
//     }
//   };

//   const renderFooter = () => {
//     if (!loadingMore) return null;
//     return (
//       <View style={styles.loadingFooter}>
//         <ActivityIndicator size="small" color="#9DC462" />
//       </View>
//     );
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.productCard}
//       onPress={() =>
//         navigation.navigate("ProductDetail", { productId: item.id })
//       }
//     >
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
//       {item.stock > 0 ? (
//         <Text style={styles.inStock}>In Stock ({item.stock})</Text>
//       ) : (
//         <Text style={styles.outOfStock}>Out of Stock</Text>
//       )}
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#9DC462" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Filter and Sort Controls */}
//       <View style={styles.controlsContainer}>
//         <TouchableOpacity
//           style={styles.controlButton}
//           onPress={() => {
//             /* Implement filter modal */
//           }}
//         >
//           <Text>Filters</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.controlButton}
//           onPress={() => {
//             /* Implement sort modal */
//           }}
//         >
//           <Text>Sort: {sortOption}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Product List */}
//       <FlatList
//         data={products}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContent}
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={renderFooter}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   controlsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   controlButton: {
//     padding: 10,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 5,
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   productCard: {
//     padding: 15,
//     marginVertical: 5,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   productPrice: {
//     fontSize: 14,
//     color: "#9DC462",
//     marginVertical: 5,
//   },
//   inStock: {
//     color: "green",
//   },
//   outOfStock: {
//     color: "red",
//   },
//   loadingFooter: {
//     paddingVertical: 20,
//   },
// });

// export default ProductListingScreen;

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProductListScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(
        collection(db, "fruits"),
        where("categoryId", "==", categoryId)
      );
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", { product: item })
          }
        >
          <Text>
            {item.name} - ₹{item.price}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
