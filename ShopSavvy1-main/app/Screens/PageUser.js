import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';



function PageUser({ navigation }) {
  const handleLogout = async () => {
    console.log('Attempting to log out...');
    try {
      await signOut(auth);
      console.log('Logged out successfully');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.UserInterface1}>
        <Text style={styles.Shop}>ShopSavvy</Text>
      </View>
      <View style={styles.UserInterface2}>
        <Text style={styles.text}>Hello !</Text>
        <Text style={styles.textT}>Discover shopping!</Text>
      </View>
      <Text style={styles.title}>Options de Reconnaissance</Text>
      <View style={styles.buttonGrid}>
       <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../assets/user.png')} style={styles.icon} />  
              <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('TakeImage')}>
          <Image source={require('../assets/barcode.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Scan Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Add')}>
          <Image source={require('../assets/add.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('ProductsPage')}>
          <Image source={require('../assets/Panier.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Panier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Favorite1')}>
          <Image source={require('../assets/favorite.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.squareButton} onPress={handleLogout}>
          <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  
);}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  UserInterface1: {
    width: '100%',
    padding: 40,
    backgroundColor: '#8080c0',
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  Shop: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  UserInterface2: {
    width: '90%',
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  textT: {
    fontSize: 20,
    color: '#666666',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    alignSelf: 'center',
    color: '#666666',
    fontWeight: 'bold',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 34,
  },
  squareButton: {
    width: 100,
    height: 100,
    backgroundColor: '#ae9acd',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#89558a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});
export default PageUser;