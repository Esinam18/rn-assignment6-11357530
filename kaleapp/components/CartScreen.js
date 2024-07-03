import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('shoppingCart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    await AsyncStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerSection}>
        <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
        <TouchableOpacity>
          <Image source={require('../assets/Search.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
              <Image source={require('../assets/remove.png')} style={styles.removeButton} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footerSection}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>EST. TOTAL</Text>
          <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutLabel}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 150,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#888',
  },
  itemPrice: {
    fontSize: 16,
    color: 'orange',
    marginVertical: 10,
  },
  removeButton: {
    width: 24,
    height: 24,
    tintColor: 'red',
  },
  footerSection: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: '#888',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
  },
  checkoutLabel: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CartScreen;
