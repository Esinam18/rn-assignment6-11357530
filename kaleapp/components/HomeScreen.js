import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from './ProductItem'; 

const products = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerel', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress4.png') },
  { id: '5', name: '2WNW', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress6.png') },
  { id: '7', name: '2WNW', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress7.png') },
  { id: '8', name: 'Lame', description: 'reversible angora cardigan', price: 120, image: require('../assets/dress1.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  const handleAddToCart = async (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    await AsyncStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerSection}>
        <TouchableOpacity>
          <Image source={require('../assets/Menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Image source={require('../assets/Search.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subHeaderSection}>
        <Text style={styles.title}>OUR STORY</Text>
        <View style={styles.subHeaderActions}>
          <TouchableOpacity>
            <Image source={require('../assets/Listview.png')} style={styles.smallIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/Filter.png')} style={styles.smallIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        key={numColumns}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard item={item} onAddToCart={handleAddToCart} />
        )}
        numColumns={numColumns}
        columnWrapperStyle={styles.rowLayout}
      />
    </View>
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
  },
  logoImage: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  headerActions: {
    flexDirection: 'row',
  },
  subHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeaderActions: {
    flexDirection: 'row',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  smallIcon: {
    width: 21,
    height: 20,
    marginHorizontal: 10,
  },
  rowLayout: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
