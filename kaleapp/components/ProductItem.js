import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ item, onAddToCart }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity onPress={() => onAddToCart(item)}>
        <Image source={require('../assets/add_circle.png')} style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'light',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 10,
  },
  addIcon:{
  bottom:10,
},
});
