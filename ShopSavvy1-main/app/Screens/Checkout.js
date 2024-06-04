import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Checkout = ({ navigation, route }) => {
  const { items } = route.params ?? { items: [] };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.Prix * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.Nom} (x{item.quantity})</Text>
          <Text style={styles.itemPrice}>{item.Prix * item.quantity}DH</Text>
        </View>
      ))}
      <Text style={styles.total}>Total: {getTotalPrice()}DH</Text>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => alert('Order placed!')}
      >
        <Text style={styles.checkoutButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
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

export default Checkout;
