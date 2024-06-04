import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyDTETlCetLThB_xkGSi-cPzctRqZGG_G2E",
  authDomain: "shopsavvy1-470e8.firebaseapp.com",
  projectId: "shopsavvy1-470e8",
  storageBucket: "shopsavvy1-470e8.appspot.com",
  messagingSenderId: "8106289071",
  appId: "1:8106289071:web:161f3664d9ff673512b15a",
  measurementId: "G-Y0GXMF37CK"
};

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchProductDetails = async () => {
      const productDoc = doc(db, 'Products', productId);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct(productSnapshot.data());
      } else {
        console.error("No product found with the given ID.");
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.Image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.Nom}</Text>
      <Text style={styles.productPrice}>{product.Prix}DH</Text>
      <Text style={styles.productConstituents}>Constituents: {product.Constituants}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    marginTop:35,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 10,
  },
  productConstituants: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetails;
