import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import data from '../../src/assets/data/categories.json';
import FloatingCartBar from '../components/FloatingCartBar';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

export default function ProductListScreen({ route, navigation }: any) {
  const { category } = route.params;
  const selectedCategory = (data.categories as any).find(
    (cat:any) => cat.name === category
  );

  const [activeSubcat, setActiveSubcat] = useState(
    selectedCategory?.subcategories?.[0]?.name
  );
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [80, 0],
    extrapolate: 'clamp',
  });

  const products =
    selectedCategory?.subcategories.find((s:any) => s.name === activeSubcat)
      ?.products || [];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f8d64e" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedCategory?.name}</Text>
      </View>

      <View style={styles.mainContent}>
        {/* Left: Subcategories */}
        <View style={styles.subcategoryList}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedCategory?.subcategories?.map((subcat:any, index:any) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.subcategoryItem,
                  activeSubcat === subcat.name && styles.activeSubcategory,
                ]}
                onPress={() => setActiveSubcat(subcat.name)}
              >
                <Text
                  style={[
                    styles.subcategoryText,
                    activeSubcat === subcat.name && styles.activeSubcategoryText,
                  ]}
                >
                  {subcat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Right: Product Grid */}
        <View style={styles.productsContainer}>
          <Animated.FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
 renderItem={({ item }) => (
  <ProductCard
    item={item}
    onPress={() => navigation.navigate('ProductDetail', { product: item })}
  />
)}


          />
        </View>
      </View>

      {/* Floating Bottom Navbar */}
      <Animated.View
        style={[
          styles.bottomNav,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {['Home', 'Products', 'Cart', 'Profile'].map((tab, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate(tab)}
          >
            <Text style={styles.navItem}>
              {tab === 'Home' && '🏠'}
              {tab === 'Products' && '🛍️'}
              {tab === 'Cart' && '🛒'}
              {tab === 'Profile' && '👤'} {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
            <FloatingCartBar navigation={navigation} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8d64e',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
  },
  backArrow: { fontSize: 22, fontWeight: 'bold', marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },

  mainContent: { flexDirection: 'row', flex: 1 },

  subcategoryList: {
    width: 110,
    backgroundColor: '#f9f9f9',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  subcategoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  subcategoryText: {
    fontSize: 13,
    color: '#555',
  },
  activeSubcategory: {
    backgroundColor: '#fff9db',
    borderLeftWidth: 4,
    borderLeftColor: '#f8d64e',
  },
  activeSubcategoryText: {
    color: '#000',
    fontWeight: '600',
  },

  productsContainer: {
    flex: 1,
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    elevation: 2,
    padding: 10,
  },
  productImage: { width: 100, height: 100, resizeMode: 'contain' },
  productName: {
    marginTop: 5,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  productPrice: {
    color: '#34c759',
    fontWeight: 'bold',
    marginTop: 3,
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 30,
    marginHorizontal: 30,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 40,
    width: width - 80,
    elevation: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  addButton: {
  backgroundColor: '#f8d64e',
  borderRadius: 8,
  marginTop: 8,
  paddingVertical: 6,
  paddingHorizontal: 10,
},
addButtonText: {
  color: '#000',
  fontWeight: '600',
  fontSize: 13,
},
  navItem: { fontSize: 14, color: '#666', fontWeight: '500' },
});
