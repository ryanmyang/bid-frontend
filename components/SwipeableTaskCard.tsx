// SwipeableTaskCard.tsx
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
  interpolateColor,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import TaskCard from './TaskCard';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.95;      // Fixed card width (95% of screen width)
const CARD_HEIGHT = height * 0.7;       // Fixed card height (70% of screen height)

interface Task {
  id: string;
  title: string;
  taskerName: string;
  tags: string[];
  currentBid: number;
  description: string;
}

interface SwipeableTaskCardProps {
  task: Task;
  onDismiss: (id: string) => void;
  onSwipeRight: (swipedTask: Task) => void;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeableTaskCard({
  task,
  onDismiss,
  onSwipeRight,
}: SwipeableTaskCardProps) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const triggerDismiss = (taskId: string, isSwipedRight: boolean) => {
    if (isSwipedRight) {
      onSwipeRight(task);
    }
    onDismiss(taskId);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: { startX: number }) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const isSwipedRight = translateX.value > 0;
        translateX.value = withSpring(isSwipedRight ? 1000 : -1000, {
          velocity: event.velocityX,
        });
        opacity.value = withTiming(0);
        runOnJS(triggerDismiss)(task.id, isSwipedRight);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: interpolateColor(
      translateX.value,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [
        theme.colors.redLight,    // swiping left
        theme.colors.white,       // default
        theme.colors.greenLight,  // swiping right
      ]
    ),
    opacity: opacity.value,
    borderRadius: 12,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.animatedContainer, animatedCard]}>
        {/* Pass the task id along with the other properties */}
        <TaskCard
          id={task.id}
          title={task.title}
          taskerName={task.taskerName}
          tags={task.tags}
          description={task.description}
          currentBid={task.currentBid}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: theme.spacing.md,
    borderRadius: 12,
    padding: 5, // Allows the animated background color to be visible as a border.
  },
});
