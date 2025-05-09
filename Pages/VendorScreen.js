import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function VendorScreen() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const handleAddProduct = async () => {
    if (!category || !name || !price || !weight || !description || !stock) {
      Alert.alert("All fields are required.");
      return;
    }

    const productData = {
      category,
      name,
      price: parseFloat(price),
      weight,
      description,
      stock: parseInt(stock),
      createdAt: new Date(),
    };

    try {
      // 1. Save in global 'products' collection
      const docRef = await addDoc(collection(db, "products"), productData);

      // 2. Save under category-wise collection: categories/{category}/items
      const categoryRef = doc(db, "categories", category);
      await setDoc(doc(collection(categoryRef, "items")), {
        ...productData,
        productId: docRef.id,
      });

      Alert.alert("Product added successfully!");
      clearForm();
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error saving product.", "Retry Adding the product");
    }
  };

  const clearForm = () => {
    setCategory("");
    setName("");
    setPrice("");
    setWeight("");
    setDescription("");
    setStock("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Grocery Item</Text>

      <TextInput
        placeholder="Category (e.g. Fruits, Vegetables)"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Product Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Price (₹)"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        placeholder="Weight/Quantity (e.g. 1kg, 500ml)"
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        placeholder="Stock Amount"
        style={styles.input}
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />

      <Button title="Add Product" onPress={handleAddProduct} color="#4CAF50" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 50,
    paddingBottom: 100,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});
