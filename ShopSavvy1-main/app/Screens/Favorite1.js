import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image ,TextInput} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser } from '../../config/firebase';

const firebaseConfig = {

  apiKey: "AIzaSyDTETlCetLThB_xkGSi-cPzctRqZGG_G2E",
  authDomain: "shopsavvy1-470e8.firebaseapp.com",
  projectId: "shopsavvy1-470e8",
  storageBucket: "shopsavvy1-470e8.appspot.com",
  messagingSenderId: "8106289071",
  appId: "1:8106289071:web:161f3664d9ff673512b15a",
  measurementId: "G-Y0GXMF37CK"
};

const Favorite1 = ({ navigation }) => {

 
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [db, setDb] = useState(null);
 

  useEffect(() => {

    const app = initializeApp(firebaseConfig);

    // Obtenir l'instance Firestore
    const firestoreDb = getFirestore(app);
    setDb(firestoreDb);
   
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

   
    

    fetchFavoriteItems();
    return () => {
    };
  }, [db]); 

 
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.Image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.Nom}</Text>
        <Text style={styles.itemPrice}>{item.Prix}DH</Text>
      </View>
    </View>
  );


 
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Favorite</Text>
    {favoriteItems.length === 0 ? (
      <Text style={styles.emptyMessage}>No favorite items available.</Text>
    ) : (
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming item has an id property
      />
    )}
  </View>
  

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    emptyMessage: {
      fontSize: 18,
      color: '#888',
      textAlign: 'center',
      marginTop: 50,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
    },
    itemDetails: {
      flex: 1,
      marginLeft: 10,
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 16,
      color: '#888',
    },
    itemImage: {
      width: 65,
      height: 65,
      resizeMode: 'cover',
      borderRadius: 10,
    },
  });
  export default Favorite1;