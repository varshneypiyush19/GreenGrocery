import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import ItemCard from "../components/ItemCard";
import Layout from "../components/Layout";
import Carousel from "react-native-reanimated-carousel";
import CarouselItemCard from "../components/CarouselItemCard";

const { width } = Dimensions.get("window");
// const ITEM_WIDTH = (width - 32) / 2; // 2 items with total 32px horizontal padding (16 + 16)
const ITEM_WIDTH = (width - 16 * 2 - 8) / 2;

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProducts = products.filter(
    (item) =>
      item.productName &&
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const dealsOfTheDayProducts = filteredProducts.filter(
    (item) => item.dealsoftheday === true
  );
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedDeals = chunkArray(dealsOfTheDayProducts, 2);
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
        {/* Fresh & Dairy Section (Only if no search) */}
        {searchQuery.trim().length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Farm Fresh</Text>
            <View style={styles.categoryGrid}>
              {loading ? (
                <Text style={{ marginLeft: 16 }}>Loading categories...</Text>
              ) : (
                categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.categoryItem}
                    onPress={() =>
                      navigation.navigate("Category", {
                        category: cat,
                      })
                    }
                  >
                    <View style={styles.iconWrapper}>
                      {cat.imageUrl ? (
                        <Image
                          source={{ uri: cat.imageUrl }}
                          style={styles.icon}
                          onError={() =>
                            console.log("Error loading image:", cat.imageUrl)
                          }
                        />
                      ) : (
                        <Text>No Image</Text>
                      )}
                    </View>
                    <Text style={styles.categoryText}>{cat.name}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </>
        )}
        {/* <View>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Deals of the Day
          </Text>
          <MixedCarousel />
        </View> */}
        {searchQuery.length == 0 && (
          <View style={{ marginBottom: 40 }}>
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Deals of the Day
            </Text>
            <Carousel
              loop
              width={width}
              height={300}
              data={groupedDeals}
              autoPlay
              autoPlayInterval={1000}
              scrollAnimationDuration={800}
              mode="horizontal" // ✅ This ensures smooth horizontal animation
              renderItem={({ item }) => (
                <View style={styles.slide}>
                  {item.map((product) => (
                    <View key={product.id} style={styles.CarouselProduct}>
                      <CarouselItemCard product={product} />
                    </View>
                  ))}
                </View>
              )}
            />
          </View>
        )}
        {/* <FlatList
          horizontal
          data={dealsOfTheDayProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productWrapper}>
              <ItemCard product={item} />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        /> */}
        {/* Product Section */}
        {searchQuery.trim().length > 0 && (
          <>
            <Text style={styles.sectionTitle}>"Search Results"</Text>
            <View style={styles.productGrid}>
              {loading ? (
                <Text style={{ marginLeft: 16 }}>Loading products...</Text>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <View key={item.id} style={styles.productWrapper}>
                    <ItemCard product={item} />
                  </View>
                ))
              ) : (
                <Text style={{ marginLeft: 16, fontStyle: "italic" }}>
                  No products found.
                </Text>
              )}
            </View>
          </>
        )}
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
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    // paddingVertical: 30,
    paddingTop: 20,
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
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  productWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  slide: {
    flexDirection: "row",
  },
  CarouselProduct: {
    width: (width - 20) / 2, // 2 items with padding/margin
    marginHorizontal: 4,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
