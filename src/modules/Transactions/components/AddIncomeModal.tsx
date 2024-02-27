// AddIncomeModal.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Alert } from 'react-native';

interface AddIncomeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddIncome: () => Promise<void>;
  onAddIncomeSuccess: (newIncomeItem: IncomeHistoryItem) => void;
  newIncome: string;
  setNewIncome: React.Dispatch<React.SetStateAction<string>>;
}

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({
  isVisible,
  onClose,
  onAddIncome,
  onAddIncomeSuccess,
  newIncome,
  setNewIncome,
}) => {
  const handleAddIncomeInternal = async () => {
    if (newIncome.trim() === '' || isNaN(Number(newIncome))) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
      return;
    }

    try {
      await onAddIncome();
      const incomeItem: IncomeHistoryItem = {
        id: Math.random().toString(),
        category: '',
        amount: parseFloat(newIncome),
        date: new Date(),
      };
      onAddIncomeSuccess(incomeItem);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to add income.');
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
              <Text style={styles.modalText}>Add Income</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewIncome}
                value={newIncome}
                placeholder="Enter income amount"
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={handleAddIncomeInternal}
              />
              <Button title="Submit" onPress={handleAddIncomeInternal} />
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

export default React.memo(AddIncomeModal);
