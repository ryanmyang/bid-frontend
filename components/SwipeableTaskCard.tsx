// SwipeableTaskCard.tsx
import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
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

  // Called on the JS thread when the swipe is complete.
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
      // Update position so the card follows your finger.
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const isSwipedRight = translateX.value > 0;
        // Animate off-screen.
        translateX.value = withSpring(isSwipedRight ? 1000 : -1000, {
          velocity: event.velocityX,
        });
        opacity.value = withTiming(0);
        runOnJS(triggerDismiss)(task.id, isSwipedRight);
      } else {
        // Snap back if not swiped far enough.
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    // The background color will change based on how far you've swiped.
    backgroundColor: interpolateColor(
      translateX.value,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [
        theme.colors.redLight,    // When swiping left
        theme.colors.white,       // Default (resting) state
        theme.colors.greenLight,  // When swiping right
      ]
    ),
    opacity: opacity.value,
    borderRadius: 12,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      {/* The outer animated container now has fixed dimensions and padding so that its background (the color indicator) shows as a border */}
      <Animated.View style={[styles.animatedContainer, animatedCard]}>
        {/* Inner container: a white background holds the actual card content */}
        <View style={styles.innerContainer}>
          <TaskCard
            title={task.title}
            taskerName={task.taskerName}
            tags={task.tags}
            description={task.description}
            currentBid={task.currentBid}
          />
        </View>
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
    padding: 5, // This padding makes a border visible that will show the dynamic (red/green) background.
  },
  innerContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
