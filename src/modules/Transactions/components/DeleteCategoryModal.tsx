// DeleteCategoryModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DeleteCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDeleteCategory: () => Promise<void>;
  categoryName: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ isVisible, onClose, onDeleteCategory, categoryName }) => {
  const handleDelete = async () => {
    await onDeleteCategory();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to delete the "{categoryName}" category and all its associated expenses?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.buttonDelete]}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.buttonCancel]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#ff4444',
  },
  buttonCancel: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeleteCategoryModal;
