import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import TaskCard from '../components/TaskCard';
import { useNavigation } from '@react-navigation/native';
import PlaceBidModal from '../modals/PlaceBidModal';
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Pick up groceries',
      taskerName: 'Alice',
      tags: ['< 30 min'],
      currentBid: 20,
    },
    {
      id: '2',
      title: 'Deliver documents',
      taskerName: 'Bob',
      tags: ['Verified'],
      currentBid: 15,
    },
    // More tasks...
  ];

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search' as never); // type cast as needed
          }}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <TaskCard
              title={item.title}
              taskerName={item.taskerName}
              tags={item.tags}
              currentBid={item.currentBid}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContentContainer}
      />

      {/* Place Bid Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        {selectedTask && (
          <PlaceBidModal task={selectedTask} onClose={() => setIsModalVisible(false)} />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.orangeLight, // Instead of globalStyles.container
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50, // Some top padding for safe area / spacing
    paddingBottom: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchIcon: {
    fontSize: 20,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
