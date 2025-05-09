// import React, { useEffect, useState } from "react";
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

// export default function HomeScreen() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
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

//       const uniqueCategories = Array.from(
//         new Set(allProducts.map((product) => product.category))
//       );
//       console.log("Unique Categories List:", uniqueCategories);
//       setCategories(uniqueCategories);
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(
//     (p) =>
//       (!selectedCategory || p.category === selectedCategory) &&
//       p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Icon name="search-outline" size={20} color="#888" />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search groceries..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       {/* Categories */}

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoryScroll}
//       >
//         {categories.map((cat) => (
//           <TouchableOpacity
//             key={cat}
//             style={[
//               styles.categoryButton,
//               selectedCategory === cat && styles.selectedCategory,
//             ]}
//             onPress={() =>
//               setSelectedCategory(selectedCategory === cat ? null : cat)
//             }
//           >
//             <Text style={{ color: selectedCategory === cat ? "#fff" : "#333" }}>
//               {cat}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       {/* Product Grid */}
//       <FlatList
//         data={filteredProducts}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <ItemCard product={item} />}
//       />

//       {/* Bottom Nav */}
//       <Footer />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#fff",
//     elevation: 4,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   searchContainer: {
//     margin: 16,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     height: 40,
//   },
//   categoryScroll: {
//     marginHorizontal: 8,
//     marginBottom: 10,
//   },
//   categoryButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     backgroundColor: "#eaeaea",
//     borderRadius: 20,
//     height: 40,
//     marginRight: 8,
//   },
//   selectedCategory: {
//     backgroundColor: "#1e90ff",
//   },
//   productCard: {
//     backgroundColor: "#fff",
//     flex: 1,
//     margin: 8,
//     borderRadius: 8,
//     padding: 10,
//     alignItems: "center",
//     elevation: 2,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     resizeMode: "contain",
//   },
//   productName: {
//     fontSize: 16,
//     marginTop: 8,
//     fontWeight: "600",
//   },
//   productPrice: {
//     fontSize: 14,
//     color: "#555",
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingTop: 10,
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     elevation: 10,
//   },
//   navButton: {
//     alignItems: "center",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";
import Layout from "../components/Layout";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productSnap = await getDocs(collection(db, "products"));
      const allProducts = productSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(allProducts);

      const uniqueCategories = Array.from(
        new Set(allProducts.map((product) => product.category))
      );
      console.log("Unique Categories List:", uniqueCategories);
      setCategories(uniqueCategories);
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (!selectedCategory || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search groceries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.selectedCategory,
              ]}
              onPress={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
            >
              <Text
                style={{
                  color: selectedCategory === cat ? "#fff" : "#333",
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Grid */}
        <FlatList
          data={filteredProducts}
          contentContainerStyle={styles.productListContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard product={item} />}
        />

        {/* Footer (Bottom Nav) */}
        <Footer />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    fontSize: 14,
  },
  categoryScroll: {
    marginHorizontal: 8,
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#eaeaea",
    borderRadius: 20,
    height: 40,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#1e90ff",
  },
  productListContainer: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 10,
  },
});
