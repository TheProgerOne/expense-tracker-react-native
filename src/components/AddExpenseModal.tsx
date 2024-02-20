// src/components/AddExpenseModal.tsx

import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button } from 'react-native';

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  newExpense: string;
  setNewExpense: (expense: string) => void;
  handleAddExpense: () => void;
};

const AddExpenseModal: React.FC<Props> = ({ modalVisible, setModalVisible, newExpense, setNewExpense, handleAddExpense }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Add Expense</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNewExpense}
          value={newExpense}
          placeholder="Enter expense amount"
          keyboardType="numeric"
        />
        <Button title="Submit" onPress={handleAddExpense} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddExpenseModal;
