// ./src/modules/Category/components/AddCategoryModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ColorPicker = ({ selectedColor, onSelect }) => (
  <FlatList
    data={['#600080', '#990099', '#009900', '#000099','#CD5C5C','#ADFF2F','#FFC0CB','#4682B4','#FFF8DC']}
    horizontal
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item)} style={[styles.colorCircle, { backgroundColor: item }, item === selectedColor ? styles.selectedColorCircle : null,]} />
    )}
  />
);

const IconGridPicker = ({ selectedIcon, onSelect }) => (
  <FlatList
    data={['airplane-outline', 'alert-circle-outline', 'american-football-outline', 'bag-handle-outline', 
           'balloon-outline','basket-outline', 'bandage-outline','barbell-outline','baseball-outline',
            'book-outline', 'briefcase-outline', 'brush-outline', 'build-outline', 'bulb-outline',
            'bus-outline', 'business-outline', 'cafe-outline', 'car-outline', 'card-outline', 'cash-outline',
            'flame-outline', 'football-outline','game-controller-outline','gift-outline'
          ]}
    numColumns={4}
    keyExtractor={(item) => item}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <Ionicons name={item as any} size={30} style={selectedIcon === item ? styles.selectedIcon : styles.icon} />
      </TouchableOpacity>
    )}
  />
);

const AddCategoryModal = ({ isVisible, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#600080');
  const [iconName, setIconName] = useState('ios-alarm');

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert('Please enter a valid category name.');
      return;
    }
    onSave({ name: categoryName, color: categoryColor, iconName });
    setCategoryName('');
    setCategoryColor('#600080');
    setIconName('ios-alarm');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Category</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCategoryName}
            value={categoryName}
            placeholder="Category Name"
            placeholderTextColor="#999"
          />
          <Text style={styles.pickerLabel}>Select Color</Text>
          <ColorPicker selectedColor={categoryColor} onSelect={setCategoryColor} />
          <Text style={styles.pickerLabel1}>Select Icon</Text>
          <IconGridPicker selectedIcon={iconName} onSelect={setIconName} />
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  selectedColorCircle: {
    borderColor: '#000',
    borderWidth: 3, 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'80%'
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    width: 200,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  pickerLabel: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerLabel1: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingTop: 13,
    elevation: 2,
    marginTop: 20,
    height: 50,
    width: 100,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#5555',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  icon: {
    margin: 10,
    color: '#000',
  },
  selectedIcon: {
    margin: 10,
    color: '#4CAF50',
    borderColor: '#4CAF50',
    borderRadius: 5,
  },
});

export default AddCategoryModal;