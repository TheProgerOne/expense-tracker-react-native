// src/components/CategoryItem.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CategoryItem as CategoryItemType } from '../types';

type Props = {
  item: CategoryItemType;
  onPress: () => void;
};

const CategoryItem: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.category}>
    <View style={[styles.icon, { backgroundColor: item.svg.fill }]} />
    <Text style={styles.categoryLabel}>{item.category}</Text>
    <Text style={styles.categoryAmount}>{`${item.amount} T`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryAmount: {
    fontSize: 14,
    marginLeft: 'auto',
  },
});

export default CategoryItem;
