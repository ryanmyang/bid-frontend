import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import TaskCard from './TaskCard';
import { theme } from '../styles/theme';

interface SwipeableTaskCardProps {
  task: {
    id: string;
    title: string;
    taskerName: string;
    tags: string[];
    currentBid: number;
  };
  onDismiss: (id: string) => void;
  onSwipeRight: () => void;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeableTaskCard({
  task,
  onDismiss,
  onSwipeRight,
}: SwipeableTaskCardProps) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [
        '#FFCCCB', // Light red for left swipe
        theme.colors.white, // Default white
        theme.colors.greenLight, // Light green for right swipe
      ]
    ),
    opacity: opacity.value,
    borderRadius: 12,
  }));

  const handleGesture = (event: { translationX: number; velocityX: number }) => {
    if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
      translateX.value = withSpring(event.translationX * 2, {
        velocity: event.velocityX,
      });
      opacity.value = withTiming(0);

      setTimeout(() => {
        onDismiss(task.id);
        if (event.translationX > 0) onSwipeRight();
      }, 200);
    } else {
      translateX.value = withSpring(0);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={(evt) => {
        handleGesture({
          translationX: evt.nativeEvent.translationX,
          velocityX: evt.nativeEvent.velocityX,
        });
      }}
    >
      <Animated.View style={[styles.animatedContainer, animatedCard]}>
        <TaskCard
          title={task.title}
          taskerName={task.taskerName}
          tags={task.tags}
          currentBid={task.currentBid}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    marginBottom: theme.spacing.sm,
    borderRadius: 12,
  },
});