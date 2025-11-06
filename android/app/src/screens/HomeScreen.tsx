import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import FloatingCartBar from '../components/FloatingCartBar';
import productsData from '../assets/data/products.json';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { state } = useAuth();
  const [cartCount] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  // All products
  const products = productsData.products.sort(() => 0.5 - Math.random());

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, -100],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.logo}>grabit</Text>
      </Animated.View>

      {/* Location */}
      <View style={styles.locationBar}>
        <Text style={styles.deliveryText}>Delivery in 10 minutes</Text>
        <Text style={styles.addressText}>
          Home - 608 Sector 21B, NIT, Faridabad
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="🔍  Search for atta, dal, coke and more"
            placeholderTextColor="#777"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greetingBox}>
        <Text style={styles.greeting}>
          Hello, {state.user?.name || 'User'} 👋
        </Text>
      </View>

      {/* Product Grid */}
   <Animated.FlatList
  data={products}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  renderItem={({ item }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    />
  )}
  contentContainerStyle={styles.productGrid}
  showsVerticalScrollIndicator={false}
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  )}
/>

      {/* Floating Cart Bar */}
      <FloatingCartBar navigation={navigation} cartCount={cartCount} />

      {/* Floating Bottom Nav */}
      <Animated.View
        style={[
          styles.bottomNav,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {['Home', 'Categories', 'Offers', 'Profile'].map((tab, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate(tab)}
            style={styles.navButton}
          >
            <View style={styles.iconWrapper}>
              <Text style={styles.navItem}>
                {tab === 'Home' && '🏠'}
                {tab === 'Categories' && '🛒'}
                {tab === 'Offers' && '💸'}
                {tab === 'Profile' && '👤'}
              </Text>
              {tab === 'Categories' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.navLabel}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  logo: { fontSize: 26, fontWeight: 'bold', color: '#111' },

  locationBar: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deliveryText: { fontSize: 14, fontWeight: '600', color: '#333' },
  addressText: { fontSize: 13, color: '#777', marginTop: 2 },

  searchWrapper: { paddingHorizontal: 15, marginTop: 10 },
  searchBar: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    elevation: 2,
  },
  searchInput: {
    padding: 10,
    fontSize: 14,
  },

  greetingBox: { marginTop: 10, paddingHorizontal: 15 },
  greeting: { fontSize: 18, fontWeight: '600', color: '#333' },

  productGrid: {
    paddingBottom: 100,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    margin: 6,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: { width: 100, height: 100, borderRadius: 10 },
  productName: {
    fontSize: 13,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
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

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 35,
    marginHorizontal: 35,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 35,
    width: width - 70,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  navButton: { alignItems: 'center', justifyContent: 'center' },
  iconWrapper: { position: 'relative' },
  navItem: { fontSize: 22, color: '#777' },
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  navLabel: { fontSize: 12, color: '#666', marginTop: 2 },
});

