import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../styles/theme';

interface PlaceBidModalProps {
  task: {
    id: string;
    title: string;
    taskerName: string;
    tags: string[];
    currentBid: number;
  };
  onClose: () => void;
}

export default function PlaceBidModal({ task, onClose }: PlaceBidModalProps) {
  const [bid, setBid] = useState(task.currentBid);

  const handleIncrease = () => setBid((prev) => prev + 1);
  const handleDecrease = () => setBid((prev) => (prev > 0 ? prev - 1 : 0));

  const handleSendBid = () => {
    // Submit the bid to your API, then close
    onClose();
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Place a Bid</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Bid History Placeholder */}
        <View style={styles.bidHistoryContainer}>
          <Text style={styles.bidHistoryTitle}>Recent Bids</Text>
          <Text>$23.00 - 25 min ago</Text>
          <Text>$22.00 - 1 hour ago</Text>
        </View>

        {/* Adjust Bid */}
        <View style={styles.bidRow}>
          <IconButton symbol="-" onPress={handleDecrease} />
          <Text style={styles.bidValue}>{`$${bid.toFixed(2)}`}</Text>
          <IconButton symbol="+" onPress={handleIncrease} />
        </View>

        <PrimaryButton title="Send" onPress={handleSendBid} />
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
    marginBottom: theme.spacing.sm,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    color: 'red',
  },
  bidHistoryContainer: {
    backgroundColor: '#F5F5DC',
    padding: theme.spacing.md,
    borderRadius: 8,
    marginBottom: theme.spacing.md,
  },
  bidHistoryTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  bidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  bidValue: {
    fontSize: 24,
    marginHorizontal: theme.spacing.md,
  },
});
