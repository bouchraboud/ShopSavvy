import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image ,TextInput} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser } from '../../config/firebase';
import Header from './Header'; 
const firebaseConfig = {

  apiKey: "AIzaSyDTETlCetLThB_xkGSi-cPzctRqZGG_G2E",
  authDomain: "shopsavvy1-470e8.firebaseapp.com",
  projectId: "shopsavvy1-470e8",
  storageBucket: "shopsavvy1-470e8.appspot.com",
  messagingSenderId: "8106289071",
  appId: "1:8106289071:web:161f3664d9ff673512b15a",
  measurementId: "G-Y0GXMF37CK"
};

const ProductsPage = ({ navigation }) => {

  const [products, setProducts] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [db, setDb] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {

    const app = initializeApp(firebaseConfig);

    // Obtenir l'instance Firestore
    const firestoreDb = getFirestore(app);
    setDb(firestoreDb);
    const fetchCartItems = async () => {
      const user = getCurrentUser(); 
      console.log('Fetching cart items for user:', user);
      if (user && db) {
        const userId = user.uid;
        const userCartRef = doc(db, 'Cart', userId);
        const cartSnapshot = await getDoc(userCartRef);
        if (cartSnapshot.exists()) {
          console.log('Cart items found:', cartSnapshot.data().items);

          setCartItems(cartSnapshot.data().items);
          setCartItemCount(cartSnapshot.data().items.length);

        } else {
          console.log('No cart items found for this user.');
        }
      }
    };
    const fetchFavoriteItems = async () => {
      const user = getCurrentUser();
      if (user && db) {
        const userId = user.uid;
        const userFavoriteRef = doc(db, 'Favorites', userId);
        const favoriteSnapshot = await getDoc(userFavoriteRef);
        if (favoriteSnapshot.exists()) {
          setFavoriteItems(favoriteSnapshot.data().items);
        }
      }
    };

    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestoreDb, 'Products');

        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchCartItems();
    fetchFavoriteItems();
    return () => {
    };
  }, [db]); 

  const addToCart = async (item) => {
    const user = getCurrentUser(); 
    if (user && db) {
      try {
        const userId = user.uid;
        const userCartRef = doc(db, 'Cart', userId);
        const cartSnapshot = await getDoc(userCartRef);
        let updatedCartItems = [];
        if (cartSnapshot.exists()) {
          const existingCartItems = cartSnapshot.data().items || [];
          console.log('Existing cart items:', existingCartItems);
          const existingItemIndex = existingCartItems.findIndex((cartItem) => cartItem.id === item.id);
          if (existingItemIndex !== -1) {
            updatedCartItems = existingCartItems.map((cartItem, index) => {
              if (index === existingItemIndex) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
            });
          } else {
            updatedCartItems = [...existingCartItems, { ...item, quantity: 1 }];
          }
        } else {
          updatedCartItems = [{ ...item, quantity: 1 }];
        }
        console.log('Updated cart items before saving:', updatedCartItems);
        await setDoc(userCartRef, { items: updatedCartItems });
        console.log('Cart saved to Firestore successfully.');
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    } else {
      console.error("User is not logged in or db is not initialized.");
    }
  };
  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.Nom.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  const handleProductPress = (productId) => {
    console.log('product pressed');
    navigation.navigate('ProductDetails', { productId });
  };
  const toggleFavorite = async (item) => {
    const user = getCurrentUser();
    if (user && db) {
      try {
        const userId = user.uid;
        const userFavoriteRef = doc(db, 'Favorites', userId);
        const favoriteSnapshot = await getDoc(userFavoriteRef);
        let updatedFavoriteItems = [];
        if (favoriteSnapshot.exists()) {
          const existingFavoriteItems = favoriteSnapshot.data().items || [];
          const existingItemIndex = existingFavoriteItems.findIndex((favoriteItem) => favoriteItem.id === item.id);
          if (existingItemIndex !== -1) {
            updatedFavoriteItems = existingFavoriteItems.filter((favoriteItem) => favoriteItem.id !== item.id);
          } else {
            updatedFavoriteItems = [...existingFavoriteItems, item];
          }
        } else {
          updatedFavoriteItems = [item];
        }
        await setDoc(userFavoriteRef, { items: updatedFavoriteItems });
        setFavoriteItems(updatedFavoriteItems);
      } catch (error) {
        console.error('Error toggling favorite item:', error);
      }
    } else {
      console.error("User is not logged in or db is not initialized.");
    }
  };

  const isFavorite = (item) => {
    return favoriteItems.some(favoriteItem => favoriteItem.id === item.id);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <Header navigation={navigation} favoriteItems={favoriteItems} onSearch={handleSearch}/>

      <FlatList
      data={filteredProducts}
      
        renderItem={({ item }) => (
          
          <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item.id)} >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.Image }} style={styles.productImage} />
              <TouchableOpacity style={styles.favoriteIcon} onPress={() => toggleFavorite(item)}>
                <Image
                  source={isFavorite(item) ? require('../assets/heart-red.png') : require('../assets/heart - white.png')}
                  style={styles.favoriteIconImage}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.productName}>{item.Nom}</Text>
            <Text style={styles.productPrice}>{item.Prix}DH</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContentContainer}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart', { cartItems })}
        style={styles.cartButton}
      >
        <Image source={require('../assets/Capture d’écran_13-5-2024_21285_www.bing.com.jpeg')} style={styles.cartImage} />
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
     
    </SafeAreaView>
  

  );
};

const styles = StyleSheet.create({
  
  headerContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex:10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
  },
  heartButton: {
    marginLeft: 10,
    
  },
  heartImage: {
    width: 30,
    height: 30,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cartImage: {
    width: 30,
    height: 30,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#706f9d',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  flatListContentContainer: {
    paddingVertical: 10,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  favoriteIconImage: {
    width: 25,
    height: 25,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
});

export default ProductsPage;