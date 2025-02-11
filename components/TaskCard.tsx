// TaskCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface TaskCardProps {
  title: string;
  taskerName: string;
  tags: string[];
  description: string;
  currentBid: number;
}

export default function TaskCard({
  title,
  taskerName,
  tags,
  description,
  currentBid,
}: TaskCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Task Name */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Tasker Name */}
      <Text style={styles.taskerName}>{taskerName}</Text>
      
      {/* Tags as Bubbles */}
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagBubble}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      {/* Description */}
      <Text style={styles.description}>{description}</Text>
      
      {/* Current Bid with Fun Tag */}
      <View style={styles.bidContainer}>
        <Text style={styles.currentBid}>${currentBid}</Text>
        <View style={styles.funTag}>
          <Text style={styles.funTagText}>🔥</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    // Set backgroundColor to transparent so that the innerContainer's white background remains visible.
    backgroundColor: 'transparent',
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.sm,
  },
  taskerName: {
    fontSize: 20,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.sm,
  },
  tagBubble: {
    backgroundColor: theme.colors.orange,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  tagText: {
    color: theme.colors.white,
    fontSize: 14,
  },
  description: {
    fontSize: 18,
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
    flex: 1,
  },
  bidContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  currentBid: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.green,
    marginRight: theme.spacing.xs,
  },
  funTag: {
    backgroundColor: theme.colors.orange,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  funTagText: {
    color: theme.colors.white,
    fontSize: 14,
  },
});
