import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getCurrentUserId } from './Signup'; 

const Cart = ({ navigation, route }) => {
  const { cartItems } = route.params ?? { cartItems: [] };
  const [items, setItems] = useState(cartItems);
  
  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  };

  const decreaseQuantity = (index) => {
    if (items[index].quantity > 1) {
      const updatedItems = [...items];
      updatedItems[index].quantity -= 1;
      setItems(updatedItems);
    }
  };

  useEffect(() => {
    const saveCartToFirestore = async () => {
      const userId = getCurrentUserId();
      const db = getFirestore();

      try {
        const userCartRef = doc(db, 'Cart', userId);
        await setDoc(userCartRef, { items: items });
        console.log('Cart saved to Firestore successfully.');
      } catch (error) {
        console.error('Error saving cart to Firestore:', error);
      }
    };

    saveCartToFirestore();
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.Image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.Nom}</Text>
            <Text style={styles.itemPrice}>{item.Prix}DH</Text>
            <TouchableOpacity style={styles.button} onPress={() => decreaseQuantity(index)}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={() => increaseQuantity(index)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout', { items })}
      >
        <Text style={styles.checkoutButtonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:148,
    marginTop:23,
    color:'#04920D',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingVertical: 2,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 2,
    width: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  quantity: {
    fontSize: 16,
  },
  checkoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});




export default Cart;