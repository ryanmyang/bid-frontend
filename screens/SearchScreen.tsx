// screens/SearchScreen.tsx

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DistanceSlider from '../components/DistanceSlider';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/theme';

export default function SearchScreen() {
  const navigation = useNavigation(); // Access navigation object

  
  const [searchText, setSearchText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['groceries', 'books', 'car wash']);
  const [distance, setDistance] = useState(8); // miles
  const [categories, setCategories] = useState([
    { name: 'Food run', icon: '🍔', selected: false },
    { name: 'Cleaning', icon: '🧹', selected: false },
    { name: 'Delivery', icon: '📦', selected: false },
  ]);

  const handleSearch = () => {
    if (searchText) {
      setRecentSearches((prev) => [searchText, ...prev]);
      setSearchText('');
    }
  };

  const clearSearchItem = (item: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== item));
  };

  const toggleCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((cat, i) => (i === index ? { ...cat, selected: !cat.selected } : cat))
    );
  };

  return (
    <ScrollView style={[styles.background]}>
      {/* Top Bar with Back Button */}
      <View style={[globalStyles.rowCenter, styles.topBar]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20 }}>←</Text>
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.searchAction}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Searches */}
      <Text style={styles.sectionTitle}>Recent Searches</Text>
      {recentSearches.map((item, idx) => (
        <View key={idx} style={styles.recentItem}>
          <Text style={{ flex: 1 }}>{item}</Text>
          <TouchableOpacity onPress={() => clearSearchItem(item)}>
            <Text style={{ color: 'red' }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Distance Slider */}
      <Text style={styles.sectionTitle}>Distance</Text>
      <View style={styles.sliderRow}>
        <DistanceSlider value={distance} onChange={setDistance} />
        <Text style={{ marginLeft: 10 }}>{`< ${distance} mi`}</Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesRow}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.categoryTag,
              cat.selected && { borderWidth: 2, borderColor: theme.colors.black },
            ]}
            onPress={() => toggleCategory(index)}
          >
            <Text>{`${cat.icon} ${cat.name}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.orangeLight,
    paddingTop: 50,
  },
  topBar: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  backButton: {
    marginRight: theme.spacing.sm,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.xs,
  },
  searchAction: {
    color: theme.colors.orange,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: theme.spacing.sm,
    marginLeft: theme.spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.md,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: theme.spacing.md,
  },
  categoryTag: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: theme.spacing.sm,
    margin: theme.spacing.xs,
  },
});
