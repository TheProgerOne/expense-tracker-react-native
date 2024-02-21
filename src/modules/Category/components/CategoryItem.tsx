// ./src/modules/Category/components/CategoryItem.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CategoryItem as CategoryItemType } from '../types/CategoryItem';

interface Props {
  item: CategoryItemType;
  onPress: () => void;
}

const CategoryItem: React.FC<Props> = ({ item, onPress }) => {
  const { svg, category, amount } = item;

  return (
    <TouchableOpacity onPress={onPress} style={styles.category} accessibilityRole="button" accessibilityLabel={`Category ${category}`}>
      <View style={[styles.icon, { backgroundColor: svg.fill }]} />
      <Text style={styles.categoryLabel}>{category}</Text>
      <Text style={styles.categoryAmount}>{`${amount} T`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 16,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryAmount: {
    fontSize: 14,
  },
});

export default CategoryItem;
