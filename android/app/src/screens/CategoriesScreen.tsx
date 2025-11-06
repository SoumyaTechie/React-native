import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import categoriesData from '../assets/data/categories.json';
const { width } = Dimensions.get('window');

export default function CategoriesScreen({ navigation }: any) {
  const categories = categoriesData.categories;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop by Category</Text>
            <View style={styles.grid}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryCard}
                  onPress={() =>
                    navigation.navigate('Products', { category: cat.name })
                  }
                >
                  <View style={styles.categoryImageWrapper}>
                    <Image source={{ uri: cat.image }} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryText}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff9d6',
    borderRadius: 14,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 10 },
  name: { marginTop: 8, fontSize: 14, fontWeight: '600', textAlign: 'center' },
    grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingBottom: 10,
  },
  categoryCard: {
    width: width / 3.5,
    alignItems: 'center',
    marginVertical: 12,
  },
  categoryImageWrapper: {
    backgroundColor: '#fff9d6',
    borderRadius: 16,
    padding: 10,
    elevation: 2,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
    marginTop: 8,
    fontWeight: '500',
  },
});
