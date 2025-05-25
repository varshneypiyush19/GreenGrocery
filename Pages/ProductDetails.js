// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Dimensions,
// // } from "react-native";
// // import { doc, getDoc } from "firebase/firestore";
// // import { db, auth } from "../firebaseConfig";
// // import Icon from "react-native-vector-icons/MaterialIcons";
// // import { addToCart, toggleFavorite } from "../services/productService"; // Your service functions

// // const { width } = Dimensions.get("window");

// // const ProductDetailScreen = ({ route, navigation }) => {
// //   const { productId } = route.params;
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [quantity, setQuantity] = useState(1);
// //   const [isFavorite, setIsFavorite] = useState(false);
// //   const [imageIndex, setImageIndex] = useState(0);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const docRef = doc(db, "products", productId);
// //         const docSnap = await getDoc(docRef);

// //         if (docSnap.exists()) {
// //           setProduct({
// //             id: docSnap.id,
// //             ...docSnap.data(),
// //           });
// //           // Check if favorite (you'll need to implement this)
// //           // const favStatus = await checkFavoriteStatus(productId);
// //           // setIsFavorite(favStatus);
// //         } else {
// //           console.log("No such product!");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching product:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [productId]);

// //   const handleAddToCart = async () => {
// //     try {
// //       await addToCart(productId, quantity);
// //       alert(`${quantity} ${product.name} added to cart!`);
// //     } catch (error) {
// //       alert("Failed to add to cart: " + error.message);
// //     }
// //   };

// //   const handleToggleFavorite = async () => {
// //     try {
// //       await toggleFavorite(productId, !isFavorite);
// //       setIsFavorite(!isFavorite);
// //     } catch (error) {
// //       console.error("Error toggling favorite:", error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color="#9DC462" />
// //       </View>
// //     );
// //   }

// //   if (!product) {
// //     return (
// //       <View style={styles.errorContainer}>
// //         <Text>Product not found</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView style={styles.container}>
// //       {/* Image Gallery */}
// //       <View style={styles.imageContainer}>
// //         <Image
// //           source={{ uri: product.images[imageIndex] }}
// //           style={styles.mainImage}
// //           resizeMode="contain"
// //         />
// //         <View style={styles.imageThumbnails}>
// //           {product.images.map((img, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               onPress={() => setImageIndex(index)}
// //               style={[
// //                 styles.thumbnail,
// //                 index === imageIndex && styles.selectedThumbnail,
// //               ]}
// //             >
// //               <Image
// //                 source={{ uri: img }}
// //                 style={styles.thumbnailImage}
// //                 resizeMode="cover"
// //               />
// //             </TouchableOpacity>
// //           ))}
// //         </View>
// //       </View>

// //       {/* Product Info */}
// //       <View style={styles.infoContainer}>
// //         <View style={styles.titleRow}>
// //           <Text style={styles.productName}>{product.name}</Text>
// //           <TouchableOpacity onPress={handleToggleFavorite}>
// //             <Icon
// //               name={isFavorite ? "favorite" : "favorite-border"}
// //               size={28}
// //               color={isFavorite ? "#FF3B30" : "#333"}
// //             />
// //           </TouchableOpacity>
// //         </View>

// //         <Text style={styles.price}>${product.price.toFixed(2)}</Text>

// //         {/* Quantity Selector */}
// //         <View style={styles.quantityContainer}>
// //           <Text style={styles.quantityLabel}>Quantity:</Text>
// //           <View style={styles.quantityControls}>
// //             <TouchableOpacity
// //               style={styles.quantityButton}
// //               onPress={() => setQuantity(Math.max(1, quantity - 1))}
// //               disabled={quantity <= 1}
// //             >
// //               <Icon name="remove" size={20} color="#333" />
// //             </TouchableOpacity>
// //             <Text style={styles.quantityText}>{quantity}</Text>
// //             <TouchableOpacity
// //               style={styles.quantityButton}
// //               onPress={() => setQuantity(quantity + 1)}
// //               disabled={quantity >= product.stock}
// //             >
// //               <Icon name="add" size={20} color="#333" />
// //             </TouchableOpacity>
// //           </View>
// //           <Text style={styles.stockText}>
// //             {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
// //           </Text>
// //         </View>

// //         {/* Add to Cart Button */}
// //         <TouchableOpacity
// //           style={[
// //             styles.addToCartButton,
// //             product.stock <= 0 && styles.disabledButton,
// //           ]}
// //           onPress={handleAddToCart}
// //           disabled={product.stock <= 0}
// //         >
// //           <Text style={styles.addToCartText}>
// //             {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
// //           </Text>
// //         </TouchableOpacity>

// //         {/* Description */}
// //         <View style={styles.section}>
// //           <Text style={styles.sectionTitle}>Description</Text>
// //           <Text style={styles.descriptionText}>{product.description}</Text>
// //         </View>

// //         {/* Nutrition Info */}
// //         {product.nutrition && (
// //           <View style={styles.section}>
// //             <Text style={styles.sectionTitle}>Nutrition Information</Text>
// //             <View style={styles.nutritionGrid}>
// //               {Object.entries(product.nutrition).map(([key, value]) => (
// //                 <View key={key} style={styles.nutritionRow}>
// //                   <Text style={styles.nutritionKey}>{key}:</Text>
// //                   <Text style={styles.nutritionValue}>{value}</Text>
// //                 </View>
// //               ))}
// //             </View>
// //           </View>
// //         )}
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   errorContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   imageContainer: {
// //     width: "100%",
// //     height: width * 0.8,
// //     backgroundColor: "#f9f9f9",
// //   },
// //   mainImage: {
// //     width: "100%",
// //     height: "80%",
// //   },
// //   imageThumbnails: {
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     paddingVertical: 10,
// //   },
// //   thumbnail: {
// //     width: 50,
// //     height: 50,
// //     marginHorizontal: 5,
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //     borderRadius: 5,
// //     overflow: "hidden",
// //   },
// //   selectedThumbnail: {
// //     borderColor: "#9DC462",
// //     borderWidth: 2,
// //   },
// //   thumbnailImage: {
// //     width: "100%",
// //     height: "100%",
// //   },
// //   infoContainer: {
// //     padding: 20,
// //   },
// //   titleRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 10,
// //   },
// //   productName: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     flex: 1,
// //   },
// //   price: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     color: "#9DC462",
// //     marginBottom: 20,
// //   },
// //   quantityContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginVertical: 15,
// //   },
// //   quantityLabel: {
// //     marginRight: 15,
// //     fontSize: 16,
// //   },
// //   quantityControls: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //     borderRadius: 5,
// //     marginRight: 15,
// //   },
// //   quantityButton: {
// //     padding: 10,
// //   },
// //   quantityText: {
// //     paddingHorizontal: 15,
// //     fontSize: 16,
// //   },
// //   stockText: {
// //     color: "#666",
// //   },
// //   addToCartButton: {
// //     backgroundColor: "#9DC462",
// //     padding: 15,
// //     borderRadius: 5,
// //     alignItems: "center",
// //     marginVertical: 15,
// //   },
// //   disabledButton: {
// //     backgroundColor: "#ccc",
// //   },
// //   addToCartText: {
// //     color: "white",
// //     fontWeight: "bold",
// //     fontSize: 16,
// //   },
// //   section: {
// //     marginVertical: 15,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     marginBottom: 10,
// //   },
// //   descriptionText: {
// //     fontSize: 16,
// //     lineHeight: 24,
// //     color: "#333",
// //   },
// //   nutritionGrid: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //   },
// //   nutritionRow: {
// //     flexDirection: "row",
// //     width: "50%",
// //     paddingVertical: 5,
// //   },
// //   nutritionKey: {
// //     fontWeight: "bold",
// //     marginRight: 5,
// //   },
// //   nutritionValue: {
// //     color: "#666",
// //   },
// // });

// // export default ProductDetailScreen;

// import React, { useState } from "react";
// import { View, Text, Button } from "react-native";
// import { useCart } from "../context/CartContext";

// export default function ProductDetailScreen({ route }) {
//   const { product } = route.params;
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();

//   return (
//     <View>
//       <Text>{product.name}</Text>
//       <Text>{product.description}</Text>
//       <Text>₹{product.price} per unit</Text>
//       <Button
//         title="-"
//         onPress={() => setQuantity(Math.max(1, quantity - 1))}
//       />
//       <Text>{quantity}</Text>
//       <Button title="+" onPress={() => setQuantity(quantity + 1)} />
//       <Button
//         title="Add to Cart"
//         onPress={() => addToCart(product, quantity)}
//       />
//     </View>
//   );
// // }
// import React from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useRoute } from "@react-navigation/native"; // For getting route params
// import demoImage from "../assets/Logo.jpg"; //

// export default function ProductDetailsScreen() {
//   const route = useRoute(); // Get the params passed from HomeScreen
//   const { product } = route.params;
//   // console.log(product);

//   if (!product)
//     return (
//       <View style={{ flex: 1 }}>
//         <ActivityIndicator size={"large"} />
//       </View>
//     ); // Loading state

//   return (
//     <View style={styles.container}>
//       <Image
//         source={product.image ? { uri: product.image } : demoImage}
//         style={styles.image}
//       />
//       {/* <Image source={{ uri: product.imageUrl }} style={styles.image} /> */}
//       <Text style={styles.name}>{product.name}</Text>
//       <Text style={styles.price}>${product.price}</Text>
//       <Text style={styles.description}>{product.description}</Text>

//       <View style={styles.cartSection}>
//         <Button
//           title="Add to Cart"
//           onPress={() => console.log("Added to Cart")}
//         />
//         <View style={styles.quantityControl}>
//           <Button title="-" onPress={() => console.log("Decrease quantity")} />
//           <Text>1</Text>
//           <Button title="+" onPress={() => console.log("Increase quantity")} />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     padding: 16,
//     flex: 1,
//     alignItems: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 20,
//     color: "green",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   cartSection: {
//     width: "100%",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   quantityControl: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
// });
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import demoImage from "../assets/Logo1.png";
import AddToCartButton from "../components/AddToCartButton";
import Layout from "../components/Layout";

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
      <View style={styles.container}>
        <Image
          source={product.image ? { uri: product.image } : demoImage}
          style={styles.image}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <AddToCartButton product={product} />
        </View>
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  detailsContainer: {
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  qtyButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  addToCartButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 2,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addText: {
    color: "white",
    fontWeight: "600",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  qBtn: {
    padding: 8,
  },
  qText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  qty: {
    fontSize: 16,
    marginHorizontal: 12,
  },
});
