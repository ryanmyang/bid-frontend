import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Wait in BruinAI merch line',
      taskerName: 'Emily',
      tags: ['< 30 min', 'High Demand'],
      currentBid: 25,
    },
    {
      id: '2',
      title: 'Pick up groceries from Trader Joe’s',
      taskerName: 'Jake',
      tags: ['< 30 min'],
      currentBid: 20,
    },
    {
      id: '3',
      title: 'Deliver documents to Murphy Hall',
      taskerName: 'Rida',
      tags: ['Urgent'],
      currentBid: 15,
    },
    {
      id: '4',
      title: 'Hold a spot at Powell Library during finals week',
      taskerName: 'Daniel',
      tags: ['< 1 hour', 'Urgent'],
      currentBid: 30,
    },
    {
      id: '5',
      title: 'Pick up a package from Amazon Locker',
      taskerName: 'Mia',
      tags: ['< 30 min'],
      currentBid: 10,
    },
    {
      id: '6',
      title: 'Find and rent iClicker for midterms',
      taskerName: 'Ethan',
      tags: ['Verified', 'Urgent'],
      currentBid: 18,
    },
    {
      id: '7',
      title: 'Wait in line for Diddy Riese cookies',
      taskerName: 'Liam',
      tags: ['< 1 hour'],
      currentBid: 15,
    },
    {
      id: '8',
      title: 'Pick up a late-night meal from In-N-Out',
      taskerName: 'Olivia',
      tags: ['< 30 min'],
      currentBid: 22,
    },
    {
      id: '9',
      title: 'Print and drop off notes at Hedrick Hall',
      taskerName: 'Noah',
      tags: ['Verified'],
      currentBid: 12,
    },
    {
      id: '10',
      title: 'Buy Scantrons from Ackerman Student Store',
      taskerName: 'Ava',
      tags: ['< 30 min', 'Urgent'],
      currentBid: 8,
    },
    {
      id: '11',
      title: 'Find and return a library book before late fees',
      taskerName: 'Lucas',
      tags: ['Verified'],
      currentBid: 14,
    },
    {
      id: '12',
      title: 'Set up a table for club fair on Bruin Walk',
      taskerName: 'Emma',
      tags: ['< 1 hour'],
      currentBid: 28,
    },
    {
      id: '13',
      title: 'Pick up a Blue Bottle Coffee before class',
      taskerName: 'Benjamin',
      tags: ['< 30 min'],
      currentBid: 18,
    },
    {
      id: '14',
      title: 'Walk someone’s bike from dorms to campus',
      taskerName: 'Ella',
      tags: ['< 30 min'],
      currentBid: 12,
    },
    {
      id: '15',
      title: 'Help move dorm furniture for a room swap',
      taskerName: 'Michael',
      tags: ['Verified'],
      currentBid: 40,
    },
  ]);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const handleDismiss = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSubmitBid = (taskId: string, bidAmount: number) => {
    console.log('Bid submitted:', taskId, bidAmount);
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

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SwipeableTaskCard
            task={item}
            onDismiss={handleDismiss}
            onSwipeRight={() => {
              setSelectedTask(item);
              setIsModalVisible(true);
            }}
          />
        )}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer} // Added for scrolling
      />

      {/* Bid Calculator Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        {selectedTask && (
          <BidCalculatorModal
            task={selectedTask}
            onClose={() => setIsModalVisible(false)}
            onSubmit={(bid) => handleSubmitBid(selectedTask.id, bid)}
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
  listContainer: { // New style for scrolling
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});