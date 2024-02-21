// CategoryItemComponent.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CategoryItem } from '../types/CategoryItem';

interface Props {
  item: CategoryItem;
  onPress: () => void;
}

const CategoryItemComponent: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.category, { backgroundColor: item.svg.fill }]}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={item.iconName} size={24} color="white" /> 
      </View>
      <Text style={styles.categoryLabel}>{item.category}</Text>
      <Text style={styles.categoryAmount}>{`${item.amount} T`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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

export default CategoryItemComponent;
