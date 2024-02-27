// ./src/modules/Category/components/AddExpenseModal.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Alert } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAddExpense: () => Promise<void>;
  onAddExpenseSuccess: (newExpense: ExpenseHistoryItem) => void;
  newExpense: string;
  setNewExpense: Dispatch<SetStateAction<string>>;
}

const AddExpenseModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onAddExpense,
  onAddExpenseSuccess,
  newExpense,
  setNewExpense,
}) => {
  const handleAddExpenseInternal = async () => {
    if (newExpense.trim() === '' || isNaN(Number(newExpense))) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    try {
      await onAddExpense(); 
      const expenseItem: ExpenseHistoryItem = {
        id: Math.random().toString(),
        amount: newExpense,
        date: new Date(),
      };
      onAddExpenseSuccess(expenseItem); 
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Expense</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewExpense}
                value={newExpense}
                placeholder="Enter expense amount"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={handleAddExpenseInternal}
                accessibilityLabel="Expense Amount"
              />
              <Button title="Submit" onPress={handleAddExpenseInternal} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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

export default React.memo(AddExpenseModal);