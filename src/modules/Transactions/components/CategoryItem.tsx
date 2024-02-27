// CategoryItem.tsx
import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CategoryItem as CategoryItemType } from '../types/CategoryItem';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  item: CategoryItemType;
  onPress: () => void;
}

const CategoryItem = forwardRef<TouchableOpacity, Props>(({ item, onPress }, ref) => {
  const { svg, category, amount, iconName } = item; 

  const backgroundColor = svg?.fill || '#999'; 

  return (
    <TouchableOpacity ref={ref} onPress={onPress} style={styles.category} accessibilityRole="button" accessibilityLabel={`Category ${category}`}>
      <View style={[styles.iconCircle, { backgroundColor }]}>
        <Ionicons name={iconName} size={24} color="#ffffff" />
      </View>
      <Text style={styles.categoryLabel}>{category}</Text>
      <Text style={styles.categoryAmount}>{`${amount} T`}</Text>
    </TouchableOpacity>
  );
});


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
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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