import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../styles/theme';

interface MessageModalProps {
  onClose: () => void;
  onSend: (message: string) => void;
}

export default function MessageModal({ onClose, onSend }: MessageModalProps) {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Send a message</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Message Input */}
        <TextInput
          style={styles.messageInput}
          multiline
          placeholder="Provide additional details to tasker..."
          placeholderTextColor={theme.colors.gray}
          value={message}
          onChangeText={setMessage}
        />

        {/* Send Button */}
        <PrimaryButton title="Send" onPress={() => onSend(message)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: theme.colors.gray,
  },
  messageInput: {
    height: 100,
    borderColor: theme.colors.grayLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: 16,
  },
});