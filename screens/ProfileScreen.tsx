// screens/ProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../styles/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Go Back */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={{ fontSize: 16 }}>Go back</Text>
      </TouchableOpacity>

      {/* Top info */}
      <View style={styles.topWrapper}>
        <View style={styles.avatarCircle}>
          {/* Replace with user’s actual image */}
          <Image
            source={require('../assets/images/placeholder-user.png')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.userName}>Bidder X</Text>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>Unread message</Text>
        </View>

        <Text style={styles.description}>
          Brief blurb about what the task is and like what you have to do can go here.
          Brief blurb about what the task is and like what you have to do can go here.
        </Text>

        {/* Extra info row */}
        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>GRAD DATE</Text>
            <Text style={styles.infoValue}>2027</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>LOCATION</Text>
            <Text style={styles.infoValue}>123 Street Address</Text>
          </View>
        </View>
      </View>

      {/* Statistics */}
      <Text style={styles.statsHeading}>Statistics</Text>
      <View style={styles.chartPlaceholder}>
        <Text style={{ color: '#888' }}>[Chart placeholder]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FFF0', // a very light background
    paddingTop: 50,
    paddingHorizontal: theme.spacing.md,
  },
  backButton: {
    marginBottom: theme.spacing.sm,
  },
  topWrapper: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#CDECC1',
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  unreadBadge: {
    backgroundColor: '#A0BCEB',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: theme.spacing.sm,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  infoBlock: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
