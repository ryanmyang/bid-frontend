// screens/YourTasksScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../styles/theme';

interface TaskItem {
  id: string;
  date: string;
  title: string;
  currentBid: string;
  numBidders: number;
}

const tasksCurrent: TaskItem[] = [
  {
    id: '1',
    date: '12/10/2024',
    title: 'Task name',
    currentBid: '$20.00',
    numBidders: 4,
  },
  {
    id: '2',
    date: '12/10/2024',
    title: 'Task name',
    currentBid: '$20.00',
    numBidders: 4,
  },
];

const tasksExpired: TaskItem[] = [
  {
    id: '1',
    date: '10/01/2024',
    title: 'Expired Task',
    currentBid: '$10.00',
    numBidders: 2,
  },
];

export default function YourTasksScreen() {
  const [activeTab, setActiveTab] = useState<'Current' | 'Expired'>('Current');

  const data = activeTab === 'Current' ? tasksCurrent : tasksExpired;

  const renderItem = ({ item }: { item: TaskItem }) => (
    <View style={styles.taskCard}>
      <View style={styles.cardRow}>
        <Text style={styles.date}>{item.date}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.bidRow}>
        <Text style={styles.bidLabel}>CURRENT BID</Text>
        <Text style={styles.bid}>{item.currentBid}</Text>
        <View style={styles.biddersContainer}>
          <Text style={styles.biddersText}>{item.numBidders} BIDDERS</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Your tasks</Text>
      <Text style={styles.subtext}>
        Brief blurb about what the task is and like what you have to do can go here.
      </Text>

      {/* Toggle */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Current' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Current')}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 'Current' && styles.tabButtonTextActive]}
          >
            Current
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Expired' && styles.tabButtonActive]}
          onPress={() => setActiveTab('Expired')}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 'Expired' && styles.tabButtonTextActive]}
          >
            Expired
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fabButton}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDECC1', // Light green from Figma
    paddingTop: 50,
    paddingHorizontal: theme.spacing.md,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  subtext: {
    fontSize: 14,
    marginBottom: theme.spacing.md,
    width: '90%',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  tabButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  tabButtonActive: {
    backgroundColor: '#000',
  },
  tabButtonText: {
    color: '#000',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  date: {
    color: '#555',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: theme.spacing.sm,
  },
  bidRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  bid: {
    fontWeight: 'bold',
    marginRight: 16,
  },
  biddersContainer: {
    backgroundColor: '#EEE',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  biddersText: {
    fontSize: 12,
    color: '#666',
  },
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
