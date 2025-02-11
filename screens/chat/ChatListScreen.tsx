// screens/Chat/ChatListScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'; // or any icon library
import { theme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';

interface ChatPreview {
  id: string;
  name: string;
  latestMessage: string;
  avatar: any; // or string if remote URL
  badgeIcon?: string; // e.g. a star or sparkle
  unread?: boolean;
}

const sampleChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Mark',
    latestMessage: 'Sounds good, lets make it official?',
    avatar: require('../../assets/images/mark.jpg'),
    badgeIcon: '🛒',
    unread: true,
  },
  {
    id: '2',
    name: 'Rida',
    latestMessage: "Hey, I'm available at 6:00 pm!",
    avatar: require('../../assets/images/rida.jpg'),
    badgeIcon: '📓',
  },
  {
    id: '3',
    name: 'Jerry',
    latestMessage: 'Okay lemme check my gcal',
    avatar: require('../../assets/images/jerry.jpg'),
    badgeIcon: '🚗',
  },
  {
    id: '4',
    name: 'Valeria',
    latestMessage: 'Can you do Saturday at 3:00?',
    avatar: require('../../assets/images/valeria.jpg'),
    badgeIcon: '🧋',
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation();
  const [activeToggle, setActiveToggle] = useState<'Bidder' | 'Tasker'>('Bidder');

  const handleToggle = (option: 'Bidder' | 'Tasker') => {
    setActiveToggle(option);
    // TODO: fetch data or filter chat list accordingly
  };

  const renderChatItem = ({ item }: { item: ChatPreview }) => {
    return (
      <TouchableOpacity
        style={styles.chatRow}
        onPress={() => navigation.navigate('ChatDetail' as never, { userId: item.id } as never)}
      >
        <View style={styles.avatarWrapper}>
          <Image source={item.avatar} style={styles.avatar} />
          {item.badgeIcon && <Text style={styles.badgeIcon}>{item.badgeIcon}</Text>}
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.latestMessage, item.unread && styles.unreadText]}>{item.latestMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Chats</Text>
        <Ionicons name="search" size={24} color="#000" />
      </View>

      {/* Toggle for "Bidder" / "Tasker" */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeToggle === 'Bidder' && styles.toggleButtonActive,
          ]}
          onPress={() => handleToggle('Bidder')}
        >
          <Text
            style={[
              styles.toggleButtonText,
              activeToggle === 'Bidder' && styles.toggleButtonTextActive,
            ]}
          >
            Bidder
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeToggle === 'Tasker' && styles.toggleButtonActive,
          ]}
          onPress={() => handleToggle('Tasker')}
        >
          <Text
            style={[
              styles.toggleButtonText,
              activeToggle === 'Tasker' && styles.toggleButtonTextActive,
            ]}
          >
            Tasker
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat list */}
      <FlatList
        data={sampleChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0DAEA', // Light bluish background from Figma
    paddingTop: 50,
    paddingHorizontal: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  toggleButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  toggleButtonActive: {
    backgroundColor: '#000',
  },
  toggleButtonText: {
    color: '#000',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    paddingBottom: theme.spacing.lg,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  avatarWrapper: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  badgeIcon: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    fontSize: 16,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  latestMessage: {
    color: '#444',
  },
  unreadText: {
    fontWeight: 'bold',
  },
});
