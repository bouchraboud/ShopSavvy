import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getCurrentUserId } from './Signup'; // Function to get the current user ID

const Favorite = ({ navigation, route }) => {
  const { favoriteItems = [] } = route.params;
  
  const db = getFirestore();

  useEffect(() => {
    const saveFavoriteToFirestore = async () => {
      const userId = getCurrentUserId();
      if (!userId) return;

      try {
        const userFavoriteRef = doc(db, 'Favorites', userId);
        await setDoc(userFavoriteRef, { items: favoriteItems });
        console.log('Favorite saved to Firestore successfully.');
      } catch (error) {
        console.error('Error saving Favorite to Firestore:', error);
      }
    };

    saveFavoriteToFirestore();
  }, [favoriteItems]);

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

export default Favorite;
