import React from 'react';
import {Modal, View, Text, Button, StyleSheet, Platform} from 'react-native';

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

const ErrorPopup: React.FC<Props> = ({visible, message, onClose}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.errorText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Close"
              onPress={onClose}
              color={Platform.OS === 'ios' ? '#007AFF' : '#2196F3'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2}, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default ErrorPopup;
