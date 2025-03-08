// YourTasksScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../styles/theme';
import CreateTaskModal from '../modals/CreateTaskModal';
import { JobsAPI } from '@/scripts/jobsClient';

interface TaskItem {
  id: string;
  date: string;       // e.g. '02/07/2025'
  title: string;      // e.g. 'Take my suit to the dry cleaners'
  currentBid: string; // e.g. '$15.00'
  numBidders: number;
}

export default function YourTasksScreen() {
  const [activeTab, setActiveTab] = useState<'Current' | 'Expired'>('Current');
  const [isCreationModalVisible, setIsCreationModalVisible] = useState(false);

  // Replace hard-coded tasks with stateful arrays
  const [tasksCurrent, setTasksCurrent] = useState<TaskItem[]>([]);
  const [tasksExpired, setTasksExpired] = useState<TaskItem[]>([]);

  async function refreshTasks() {
    try {
      // 1) Grab current (unexpired) jobs
      const currentResponse = await JobsAPI.getMyJobs(); 
      // 2) Grab expired jobs
      const expiredResponse = await JobsAPI.getMyExpiredJobs();

      // Transform the incoming job data into TaskItem shape
      const transformedCurrent = currentResponse.jobs.map((job) => {
        return {
          id: job._id ?? 'N/A',
          date: job.timestamp
            ? new Date(job.timestamp).toLocaleDateString()
            : 'N/A',
          title: job.description,
          // We'll just use the job's starting price here or you could
          // compute the top bid from job.bids if you store them
          currentBid: `$${(job.starting_price ?? 0).toFixed(2)}`,
          // If you track bids in your job object, you can get the count:
          numBidders: job.bids ? job.bids.length : 0,
        } as TaskItem;
      });

      const transformedExpired = expiredResponse.jobs.map((job) => {
        return {
          id: job._id ?? 'N/A',
          date: job.timestamp
            ? new Date(job.timestamp).toLocaleDateString()
            : 'N/A',
          title: job.description,
          currentBid: `$${(job.starting_price ?? 0).toFixed(2)}`,
          numBidders: job.bids ? job.bids.length : 0,
        } as TaskItem;
      });

      // Update state
      setTasksCurrent(transformedCurrent);
      setTasksExpired(transformedExpired);

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  // Fetch tasks on mount
  useEffect(() => {
    refreshTasks();
  }, []); // Empty dependency array => runs once on component mount

  // Decide which data set to display based on the active tab
  const data = activeTab === 'Current' ? tasksCurrent : tasksExpired;

  // Renders a single row item in the FlatList
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
        <Text style={styles.bidLabel}>TOP BID</Text>
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
      <Text style={styles.heading}>Your Requests</Text>
      <Text style={styles.subtext}>
        See all your current outgoing tasks!
        Click on the task card for info on bidders and to accept bids!
      </Text>

      {/* Toggle Tabs */}
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
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => setIsCreationModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Create Task Modal */}
      <CreateTaskModal
        visible={isCreationModalVisible}
        onClose={() => setIsCreationModalVisible(false)}
        onSubmit={async (newTask) => {
          try {
            // Build a new "Job" object from modal data
            await JobsAPI.createJob({
              job_name: newTask.name,
              description: newTask.detailedDescription,
              starting_price: newTask.price,       // e.g. user-chosen
              expires_in: 86400,                   // e.g. 24 hours in seconds (customize as needed)
              media: [],                           // or handle user attachments if you have them
              tags: {
                category: 'Custom',                // use or parse from newTask.categories if you prefer
                location: 'N/A',                   // or fetch from user input
                tags: newTask.categories           // store array of categories in 'tags'
              },
            });
      
            // Now re-fetch tasks from server so "Current" shows the newly created task
            await refreshTasks();
          } catch (err) {
            console.error('Error creating job:', err);
          } finally {
            // Close the modal no matter what
            setIsCreationModalVisible(false);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDECC1',
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
