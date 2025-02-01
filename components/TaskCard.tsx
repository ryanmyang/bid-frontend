import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface TaskCardProps {
  title: string;
  taskerName: string;
  tags?: string[];
  currentBid: number;
}

export default function TaskCard({ title, taskerName, tags = [], currentBid }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtext}>{taskerName}</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.bidText}>${currentBid.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: theme.spacing.md,
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    elevation: 2,
  },
  leftSection: {
    flex: 3,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontWeight: theme.fonts.boldFontWeight,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  subtext: {
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
  tagText: {
    fontSize: 12,
  },
  bidText: {
    fontSize: 18,
    fontWeight: theme.fonts.boldFontWeight,
  },
});
