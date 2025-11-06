// src/components/FloatingCartBar.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useCart } from '../context/CartContext';


export default function FloatingCartBar({ navigation }: any) {
  const { state } = useCart();
  const itemCount = state.cart.length;
  const subtotal = state.cart.reduce((sum:any, i:any) => sum + i.price * i.quantity, 0);

  if (itemCount === 0) return null; // 🟢 Hide if no items in cart

  return (
    <Animated.View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.cartCount}>🛒 {itemCount} item{itemCount > 1 ? 's' : ''}</Text>
        <Text style={styles.subtotal}>Subtotal: ₹{subtotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: '#16944fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 6,
  },
  left: { flexDirection: 'column' },
  cartCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  subtotal: {
    color: '#ddd',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#f8d64e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 13,
  },
});
