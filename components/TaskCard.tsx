// TaskCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../styles/theme';

interface TaskCardProps {
  id: string;
  title: string;
  taskerName: string;
  tags: string[];
  description: string;
  currentBid: number;
}

export default function TaskCard({
  id,
  title,
  taskerName,
  tags,
  description,
  currentBid,
}: TaskCardProps) {
  // Map each task id to its corresponding image file.
  const imageMapping: { [key: string]: any } = {
    '1': require('../assets/images/merch.jpg'),
    '2': require('../assets/images/traderjoes.jpg'),
    '3': require('../assets/images/murphyhall.jpg'),
    '4': require('../assets/images/powell.jpg'),
  };

  const imageSource = imageMapping[id];

  return (
    <View style={styles.cardContainer}>
      {/* Top text content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.taskerName}>{taskerName}</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagBubble}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
      {/* Image container fills the space below the description */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        {/* Bid overlay positioned above the image */}
        <View style={styles.bidOverlay}>
          <Text style={styles.currentBid}>${currentBid}</Text>
          <View style={styles.funTag}>
            <Text style={styles.funTagText}>🔥</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const IMAGE_CONTAINER_HEIGHT = 300; // Updated height (double the previous 150)

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  textContainer: {
    // Holds title, tasker name, tags, and description.
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
  },
  imageContainer: {
    height: IMAGE_CONTAINER_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  bidOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentBid: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.white,
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
