// ./src/modules/Category/components/AddCategoryModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (category: { name: string; color: string; iconName: string }) => void;
}

const colors = ['#600080', '#990099', '#009900', '#000099'];
const iconNames = ['assessment', 'assessment', 'restaurant', 'local-grocery-store'];

const AddCategoryModal: React.FC<Props> = ({ isVisible, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState(colors[0]);
  const [iconName, setIconName] = useState(iconNames[0]);

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert('Please enter a valid category name.');
      return;
    }
    onSave({ name: categoryName, color: categoryColor, iconName });
    setCategoryName(''); 
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
          />
          <Picker
            selectedValue={categoryColor}
            onValueChange={(itemValue: string) => setCategoryColor(itemValue)}
            style={styles.picker}
          >
            {colors.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
            ))}
          </Picker>
          <Picker
            selectedValue={iconName}
            onValueChange={(itemValue: string) => setIconName(itemValue)}
            style={styles.picker}
          >
            {iconNames.map((name) => (
              <Picker.Item key={name} label={name} value={name} />
            ))}
          </Picker>
          <Button title="Save" onPress={handleSave} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default AddCategoryModal;
