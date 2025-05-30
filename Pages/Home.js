// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   FlatList,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// // } from "react-native";
// // import { getDocs, collection } from "firebase/firestore";
// // import { db } from "../firebaseConfig";
// // import Icon from "react-native-vector-icons/Ionicons";
// // import ItemCard from "../components/ItemCard";
// // import Footer from "../components/Footer";

// // export default function HomeScreen() {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const productSnap = await getDocs(collection(db, "products"));
// //       const allProducts = productSnap.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));

// //       setProducts(allProducts);

// //       const uniqueCategories = Array.from(
// //         new Set(allProducts.map((product) => product.category))
// //       );
// //       console.log("Unique Categories List:", uniqueCategories);
// //       setCategories(uniqueCategories);
// //     };

// //     fetchData();
// //   }, []);

// //   const filteredProducts = products.filter(
// //     (p) =>
// //       (!selectedCategory || p.category === selectedCategory) &&
// //       p.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   return (
// //     <View style={{ flex: 1 }}>
// //       {/* Search Bar */}
// //       <View style={styles.searchContainer}>
// //         <Icon name="search-outline" size={20} color="#888" />
// //         <TextInput
// //           style={styles.searchInput}
// //           placeholder="Search groceries..."
// //           value={searchQuery}
// //           onChangeText={setSearchQuery}
// //         />
// //       </View>

// //       {/* Categories */}

// //       <ScrollView
// //         horizontal
// //         showsHorizontalScrollIndicator={false}
// //         style={styles.categoryScroll}
// //       >
// //         {categories.map((cat) => (
// //           <TouchableOpacity
// //             key={cat}
// //             style={[
// //               styles.categoryButton,
// //               selectedCategory === cat && styles.selectedCategory,
// //             ]}
// //             onPress={() =>
// //               setSelectedCategory(selectedCategory === cat ? null : cat)
// //             }
// //           >
// //             <Text style={{ color: selectedCategory === cat ? "#fff" : "#333" }}>
// //               {cat}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </ScrollView>
// //       {/* Product Grid */}
// //       <FlatList
// //         data={filteredProducts}
// //         contentContainerStyle={{ paddingBottom: 100 }}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => <ItemCard product={item} />}
// //       />

// //       {/* Bottom Nav */}
// //       <Footer />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   header: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 12,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     backgroundColor: "#fff",
// //     elevation: 4,
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //   },
// //   searchContainer: {
// //     margin: 16,
// //     backgroundColor: "#fff",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     paddingHorizontal: 12,
// //     borderRadius: 8,
// //     elevation: 2,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     marginLeft: 8,
// //     height: 40,
// //   },
// //   categoryScroll: {
// //     marginHorizontal: 8,
// //     marginBottom: 10,
// //   },
// //   categoryButton: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     backgroundColor: "#eaeaea",
// //     borderRadius: 20,
// //     height: 40,
// //     marginRight: 8,
// //   },
// //   selectedCategory: {
// //     backgroundColor: "#1e90ff",
// //   },
// //   productCard: {
// //     backgroundColor: "#fff",
// //     flex: 1,
// //     margin: 8,
// //     borderRadius: 8,
// //     padding: 10,
// //     alignItems: "center",
// //     elevation: 2,
// //   },
// //   productImage: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 8,
// //     resizeMode: "contain",
// //   },
// //   productName: {
// //     fontSize: 16,
// //     marginTop: 8,
// //     fontWeight: "600",
// //   },
// //   productPrice: {
// //     fontSize: 14,
// //     color: "#555",
// //   },
// //   bottomNav: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //     backgroundColor: "#fff",
// //     paddingTop: 10,
// //     position: "absolute",
// //     bottom: 0,
// //     width: "100%",
// //     elevation: 10,
// //   },
// //   navButton: {
// //     alignItems: "center",
// //   },
// // });
// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import Icon from "react-native-vector-icons/Ionicons";
// import ItemCard from "../components/ItemCard";
// import Footer from "../components/Footer";
// import Layout from "../components/Layout";

// export default function HomeScreen() {
//   const [products, setProducts] = useState([]);
//   // const [categories, setCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const productSnap = await getDocs(collection(db, "products"));
//       const allProducts = productSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setProducts(allProducts);

//       // const uniqueCategories = Array.from(
//       //   new Set(allProducts.map((product) => product.category))
//       // );
//       // console.log("Unique Categories List:", uniqueCategories);
//       // setCategories(uniqueCategories);
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(
//     (p) =>
//       (!selectedCategory || p.category === selectedCategory) &&
//       p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const categories = [];
//   return (
//     <Layout>
//       <View style={styles.container}>
//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <Icon name="search-outline" size={20} color="#888" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search your groceries here"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         {/* Categories */}
//         <View
//           // horizontal
//           // showsHorizontalScrollIndicator={false}
//           style={styles.categoryScroll}
//         >
//           <Text style={{ fontWeight: 800, marginBottom: 10, marginLeft: 10 }}>
//             Fresh & Diary
//           </Text>
//           {categories.map((cat) => (
//             <TouchableOpacity
//               key={cat}
//               style={[
//                 styles.categoryButton,
//                 selectedCategory === cat && styles.selectedCategory,
//               ]}
//               onPress={() =>
//                 setSelectedCategory(selectedCategory === cat ? null : cat)
//               }
//             >
//               <Text
//                 style={{
//                   color: selectedCategory === cat ? "#fff" : "#333",
//                 }}
//               >
//                 {cat}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Product Grid */}
//         <FlatList
//           data={filteredProducts}
//           contentContainerStyle={styles.productListContainer}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <ItemCard product={item} />}
//         />

//         {/* Footer (Bottom Nav) */}
//         <Footer />
//       </View>
//     </Layout>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingBottom: 50,
//     backgroundColor: "#9DC462",
//     // backgroundColor: "#f4f4f4",
//   },
//   searchContainer: {
//     marginHorizontal: 16,
//     marginVertical: 10,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     borderRadius: 50,
//     elevation: 3,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     height: 45,
//     fontSize: 15,
//   },
//   categoryScroll: {
//     marginHorizontal: 16,
//     paddingBottom: 10,
//   },
//   categoryButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     backgroundColor: "#eaeaea",
//     borderRadius: 20,
//     height: 40,
//     marginRight: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   selectedCategory: {
//     backgroundColor: "#1e90ff",
//   },
//   productListContainer: {
//     paddingHorizontal: 8,
//     paddingBottom: 100,
//   },
// });
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import ItemCard from "../components/ItemCard";
import Layout from "../components/Layout";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const fetchedCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const productSnap = await getDocs(collection(db, "products"));
      const allProducts = productSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allProducts);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <ScrollView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your Grocery here"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Fresh & Dairy Section */}
        <Text style={styles.sectionTitle}>Fresh & Dairy</Text>
        <View style={styles.categoryGrid}>
          {loading ? (
            <Text style={{ marginLeft: 16 }}>Loading categories...</Text>
          ) : (
            categories.map((cat, index) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                onPress={() =>
                  navigation.navigate("Category", { category: cat })
                }
              >
                {/* {console.log(cat)} */}
                <View style={[styles.iconWrapper]}>
                  {cat.imageUrl ? (
                    <Image
                      source={{
                        uri: cat.imageUrl,
                      }}
                      // source={{ uri: cat.imageUrl }}
                      alt={cat.name}
                      style={styles.icon}
                      onError={() =>
                        console.log("Error loading image:", cat.imageUrl)
                      }
                    />
                  ) : (
                    <Text>No Image</Text>
                  )}

                  {/* <Image
                    source={{
                      uri: cat.imageUrl,
                    }}
                    // alt={cat.name}
                    style={styles.icon}
                  /> */}
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.name &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <Text style={styles.sectionTitle}>Monthly Grocery</Text>
        <View style={styles.productGrid}>
          {products.map((item) => (
            <View key={item.id} style={styles.productWrapper}>
              <ItemCard product={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#9DC462",
  },
  searchContainer: {
    marginHorizontal: 16,
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
    marginVertical: 10,
    // marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "50%",
    alignItems: "center",
    marginBottom: 30,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#E0F3D9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  selectedIconWrapper: {
    backgroundColor: "#4CAF50",
  },
  icon: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  categoryText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginTop: 5,
    fontWeight: "bold",
  },
  selectedCategoryText: {
    // color: "#fff",
  },
  monthlyContainer: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 240,
  },
  productListContainer: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16, // Add this
  },

  productWrapper: {
    width: "48%",
    marginBottom: 12,
  },
});
