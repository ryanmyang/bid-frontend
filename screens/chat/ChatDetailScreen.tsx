// screens/Chat/ChatDetailScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../../styles/theme';

interface Message {
  id: string;
  text: string;
  fromSelf: boolean;
  special?: boolean; // e.g. an "Accept Task" bubble
}

const sampleMessages: Message[] = [
  {
    id: '1',
    text: 'I can drop it off at 3:00 pm?',
    fromSelf: true,
  },
  {
    id: '2',
    text: 'How about 4:00?',
    fromSelf: false,
  },
  {
    id: '3',
    text: "4 pm works for me, I'll get to Ralph's at like 3:45",
    fromSelf: true,
  },
  {
    id: '4',
    text: "Sounds good, lets make it official?",
    fromSelf: false,
    special: true, // e.g. "Accept task"
  },
];

export default function ChatDetailScreen() {
  const [textValue, setTextValue] = useState('');
  const navigation = useNavigation();
  const route = useRoute<any>();
  const userId = route.params?.userId; // if passed from ChatListScreen

  const handleSend = () => {
    // TODO: send the message
    setTextValue('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.userName}>Mark: Pick up from Ralph's</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
      </View>

      {/* Message list */}
      <ScrollView style={styles.messagesContainer}>
        {sampleMessages.map((msg) => {
          const isSelf = msg.fromSelf;
          const bubbleStyle = isSelf ? styles.selfBubble : styles.otherBubble;
          const textStyle = isSelf ? styles.selfText : styles.otherText;

          // If special bubble e.g. "Accept Task"
          if (msg.special) {
            return (
              <View key={msg.id} style={styles.specialBubbleContainer}>
                <Text style={styles.specialBubbleText}>{msg.text}</Text>
                <TouchableOpacity style={styles.specialButton}>
                  <Text style={styles.specialButtonText}>Accept task</Text>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <View
              key={msg.id}
              style={[styles.bubble, bubbleStyle, isSelf ? { alignSelf: 'flex-end' } : {}]}
            >
              <Text style={[styles.bubbleText, textStyle]}>{msg.text}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Input Row */}
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.plusButton}>
          <Text style={{ fontSize: 24 }}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Chat message that they..."
          value={textValue}
          onChangeText={setTextValue}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color={theme.colors.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0DAEA',
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  bubble: {
    maxWidth: '70%',
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: 8,
  },
  selfBubble: {
    backgroundColor: '#4285F4',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  bubbleText: {
    fontSize: 14,
  },
  selfText: {
    color: '#fff',
  },
  otherText: {
    color: '#000',
  },
  specialBubbleContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: 8,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  specialBubbleText: {
    fontSize: 14,
    marginBottom: theme.spacing.sm,
  },
  specialButton: {
    backgroundColor: '#4285F4',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  specialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
  },
});
