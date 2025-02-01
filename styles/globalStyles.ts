// styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  // A generic container used across screens
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },

  // Headings
  heading: {
    fontSize: theme.fonts.headingSize,
    fontWeight: theme.fonts.boldFontWeight,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },

  // Subtext for descriptions
  subtext: {
    fontSize: theme.fonts.subtextSize,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },

  // Reusable progress bar container
  progressBarContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginVertical: theme.spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.green, // default fill color
    borderRadius: 2,
  },

  // A row layout for nav bars, etc.
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // A style for a back button (positioned top-left)
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
