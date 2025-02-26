// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import SwipeableTaskCard from '../components/SwipeableTaskCard';
import BidCalculatorModal from '../modals/BidCalculatorModal';
import MessageModal from '../modals/MessageModal';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { JobsAPI, Bid } from '@/scripts/jobsClient'; // <-- Import your Jobs API
import { login } from '@/scripts/authApi';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface Task {
  id: string;
  title: string;
  taskerName: string;
  tags: string[];
  currentBid: number;
  description: string;
}

export default function HomeScreen() {
  const navigation = useNavigation();

  // We start off with an empty array here
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  // Fetch tasks from backend on component mount
  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        // This returns { jobs: Job[], metadata: { ... } }
        const { jobs } = await JobsAPI.getJobs();

        // Transform each job into the Task shape your UI needs
        const transformedTasks: Task[] = jobs.map((job: any) => {
          // Merge category, location, and any tags into a single string[] if you like
          const combinedTags: string[] = [];
          if (job.tags?.category) combinedTags.push(job.tags.category);
          if (job.tags?.location) combinedTags.push(job.tags.location);
          if (job.tags?.tags) combinedTags.push(...job.tags.tags);

          return {
            id: job._id ?? '',  // Fallback if _id is undefined
            title: job.description?.slice(0, 60) || 'Untitled Task',
            taskerName: 'Unknown User', // You don't currently have real names from the endpoint
            tags: combinedTags,
            currentBid: job.starting_price,
            description: job.description,
          };
        });

        setTasks(transformedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // LOGIN FOR TESTING PURPOSES ONLY
    login('ryanmyangspam@gmail.com', '12345');
    fetchTasks();
  }, []);

  // Remove a task from the array after user swipes left (dismiss)
  const handleDismiss = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const addBid = (taskId: string, bidAmt:Float) => {
    const bid: Bid = {amount: bidAmt}
    JobsAPI.addBid(taskId, bid);
    console.log('Bid submitted:', taskId, bidAmt);

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
            onSubmit={(bid) => addBid(selectedTask.id, bid)}
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
