import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../styles/theme';

interface BidCalculatorModalProps {
  task: {
    currentBid: number;
  };
  onClose: () => void;
  onSubmit: (bid: number) => void;
  onBidConfirmed: () => void; // Add this prop
}

const CalculatorButton = ({ value, onPress }: { value: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.calcButton} onPress={onPress}>
    <Text style={styles.calcButtonText}>{value}</Text>
  </TouchableOpacity>
);

export default function BidCalculatorModal({
  task,
  onClose,
  onSubmit,
  onBidConfirmed, // Add this prop
}: BidCalculatorModalProps) {
  const [bid, setBid] = useState(String(task.currentBid));
  const [isBidConfirmed, setIsBidConfirmed] = useState(false);

  const handlePress = (value: string) => {
    if (value === '⌫') {
      setBid((prev) => prev.slice(0, -1) || '0');
    } else {
      setBid((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const handleSubmit = () => {
    onSubmit(parseFloat(bid));
    setIsBidConfirmed(true);
    onBidConfirmed(); // Trigger message modal immediately
    setTimeout(() => {
      onClose(); // Close after 1 second
    }, 1000);
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Enter Your Bid</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Bid Display */}
        <View style={styles.bidDisplay}>
          <Text style={styles.bidText}>${bid || '0'}</Text>
          {isBidConfirmed && (
            <Text style={styles.confirmationText}>Bid confirmed! 💰</Text>
          )}
        </View>

        {/* Calculator */}
        <View style={styles.calculator}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✓'].map((value) => (
            <CalculatorButton
              key={value}
              value={value}
              onPress={() => (value === '✓' ? handleSubmit() : handlePress(value))}
            />
          ))}
        </View>
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
  bidDisplay: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  bidText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  confirmationText: {
    textAlign: 'center',
    color: theme.colors.green,
    fontSize: 16,
    marginVertical: theme.spacing.sm,
  },
  calculator: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calcButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 8,
    marginVertical: theme.spacing.xs,
  },
  calcButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});