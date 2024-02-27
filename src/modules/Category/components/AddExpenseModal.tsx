// ./src/modules/Category/components/AddExpenseModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onAddExpense: () => Promise<void>;
  onAddExpenseSuccess: (newExpense: ExpenseHistoryItem) => void;
  newExpense: string;
  setNewExpense: React.Dispatch<React.SetStateAction<string>>;
}

const AddExpenseModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onAddExpense,
  onAddExpenseSuccess,
  newExpense,
  setNewExpense,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddExpenseInternal = async () => {
    if (newExpense.trim() === '' || isNaN(Number(newExpense))) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddExpense();
      const expenseItem: ExpenseHistoryItem = {
        id: Math.random().toString(),
        category: '',
        amount: parseFloat(newExpense),
        date: new Date(),
      };
      onAddExpenseSuccess(expenseItem);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.centeredView} onPress={onClose} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add New Expense</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewExpense}
                value={newExpense}
                placeholder="Amount"
                keyboardType="numeric"
                returnKeyType="done"
                editable={!isSubmitting}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onClose} style={[styles.button, styles.buttonClose]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddExpenseInternal} style={[styles.button, styles.buttonSubmit]} disabled={isSubmitting}>
                  <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  keyboardAvoidingView: {
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
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
    fontSize: 20,
  },
  input: {
    height: 50,
    width: 250,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#cccccc',
  },
  buttonSubmit: {
    backgroundColor: '#2196F3', // Or any other color
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default React.memo(AddExpenseModal);
