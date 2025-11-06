import React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { APP, COLORS } from '../constants/GlobalConstants';

export default function CartScreen() {
  const { state, removeFromCart, subtotal, clearCart } = useCart();

  if (state.cart.length === 0) {
    return <View style={styles.empty}><Text>🛍️ Your cart is empty</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>
                {APP.currency}{item.price} × {item.quantity}
              </Text>
            </View>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Subtotal: {APP.currency}{subtotal}</Text>
        <Button title="Clear Cart" onPress={clearCart} color={COLORS.secondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { flexDirection: 'row', marginVertical: 5, alignItems: 'center' ,  backgroundColor: 'white', padding: 10},
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  name: { fontWeight: '600' },
  footer: { borderTopWidth: 1, borderColor: COLORS.border, paddingTop: 10 },
  subtotal: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
});
