import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  item: any;
  onPress?: () => void;
}

export default function ProductCard({ item, onPress }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(item);
    if (Platform.OS === 'android') {
      ToastAndroid.show('✅ Added to cart', ToastAndroid.SHORT);
    } else {
      Alert.alert('✅ Product added to cart');
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    margin: 6,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  image: { width: 100, height: 100, borderRadius: 10, resizeMode: 'contain' },
  name: {
    fontSize: 13,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34c759',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    marginTop: 6,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  addButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 13,
  },
});
