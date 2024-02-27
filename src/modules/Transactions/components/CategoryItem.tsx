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
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12, 
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, 
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryLabel: {
    fontSize: 17, 
    fontWeight: '600',
    flex: 1,
    letterSpacing: 0.5,
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
  },
});


export default CategoryItem;