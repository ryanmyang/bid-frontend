// HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import SwipeableTaskCard from '../components/SwipeableTaskCard';
import BidCalculatorModal from '../modals/BidCalculatorModal';
import MessageModal from '../modals/MessageModal';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

interface Task {
  id: string;
  title: string;
  taskerName: string;
  tags: string[];
  currentBid: number;
  description: string; // New field for the description
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Wait in BruinAI merch line',
      taskerName: 'Emily',
      tags: ['< 30 min', 'High Demand'],
      currentBid: 15,
      description: 'Please wait in line and collect the merchandise.',
    },
    {
      id: '2',
      title: 'Pick up groceries from Trader Joe’s',
      taskerName: 'Jake',
      tags: ['< 30 min'],
      currentBid: 18,
      description: 'Get fresh groceries and deliver them quickly.',
    },
    {
      id: '3',
      title: 'Deliver documents to Murphy Hall',
      taskerName: 'Rida',
      tags: ['Urgent'],
      currentBid: 16,
      description: 'Ensure documents are delivered on time.',
    },
    {
      id: '4',
      title: 'Hold a spot at Powell Library during finals week',
      taskerName: 'Daniel',
      tags: ['< 1 hour', 'Urgent'],
      currentBid: 10,
      description: 'Reserve a seat for finals week.',
    },
    // {
    //   id: '5',
    //   title: 'Pick up a package from Amazon Locker',
    //   taskerName: 'Mia',
    //   tags: ['< 30 min'],
    //   currentBid: 15,
    //   description: 'Retrieve a package from the Amazon Locker.',
    // },
  ]);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const handleDismiss = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Swipe</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search' as never)}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Card Deck: show only the top card */}
      <View style={styles.cardWrapper}>
        {tasks.length > 0 ? (
          // Add key based on the task id so React remounts the component for each new task
          <SwipeableTaskCard
            key={tasks[0].id}
            task={tasks[0]}
            onDismiss={handleDismiss}
            onSwipeRight={(swipedTask) => {
              setSelectedTask(swipedTask);
              setIsModalVisible(true);
            }}
          />
        ) : (
          <View style={styles.noMoreTasks}>
            <Text>No more tasks!</Text>
          </View>
        )}
      </View>

      {/* Bid Calculator Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        {selectedTask && (
          <BidCalculatorModal
            task={selectedTask}
            onClose={() => setIsModalVisible(false)}
            onSubmit={(bid) => console.log('Bid submitted:', selectedTask.id, bid)}
            onBidConfirmed={() => {
              setIsMessageModalVisible(true);
              setIsModalVisible(false); // Close bid modal first
            }}
          />
        )}
      </Modal>

      {/* Message Modal */}
      <Modal visible={isMessageModalVisible} animationType="slide" transparent>
        <MessageModal
          onClose={() => setIsMessageModalVisible(false)}
          onSend={(message) => {
            console.log('Message sent:', message);
            setIsMessageModalVisible(false);
          }}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.orangeLight,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchIcon: {
    fontSize: 20,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreTasks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});