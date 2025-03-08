import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider'; // Updated import
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../styles/theme';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

export default function CreateTaskModal({ visible, onClose, onSubmit }: CreateTaskModalProps) {
  const [taskData, setTaskData] = useState({
    // name: '',
    detailedDescription: '',
    categories: [] as string[],
    price: 10,
    expirationHours: 24, // added expiration in hours (default value: 24)
    media: null as any,
  });

  const toggleCategory = (category: string) => {
    setTaskData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...taskData,
      expires_in: taskData.expirationHours * 3600, // convert hours to seconds
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Add new task</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* <Text style={styles.label}>Task name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Request anything!"
              value={taskData.name}
              onChangeText={text => setTaskData({ ...taskData, name: text })}
            /> */}


            <Text style={styles.label}>Description*</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="What else might bidders need to know?"
              value={taskData.detailedDescription}
              onChangeText={text => setTaskData({ ...taskData, detailedDescription: text })}
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Categories</Text>
            <View style={styles.categoryContainer}>
              {['Delivery', 'Homework', 'Cleaning', 'Tech Help', , "Food", "Other"].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    taskData.categories.includes(category) && styles.selectedCategory
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Set price*</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceValue}>${taskData.price.toFixed(0)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={5}
                maximumValue={50}
                step={1}
                value={taskData.price}
                onValueChange={(value: number) => setTaskData({ ...taskData, price: value })}
                minimumTrackTintColor={theme.colors.green}
                maximumTrackTintColor={theme.colors.grayLight}
              />
            </View>

            <Text style={styles.label}>Expiration (hours)*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter expiration in hours"
              value={taskData.expirationHours.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                const hours = parseInt(text, 10);
                setTaskData({ ...taskData, expirationHours: isNaN(hours) ? 24 : hours });
              }}
            />

            <Text style={styles.label}>Add media (optional)</Text>
            <TouchableOpacity style={styles.mediaButton}>
              <Ionicons name="attach" size={24} color={theme.colors.gray} />
              <Text style={styles.mediaText}>Attach files</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: theme.spacing.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: 8,
    padding: theme.spacing.sm,
    fontSize: 14,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    backgroundColor: theme.colors.white,
  },
  selectedCategory: {
    backgroundColor: theme.colors.greenLight,
    borderColor: theme.colors.green,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.black,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 50,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: 8,
  },
  mediaText: {
    color: theme.colors.gray,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: theme.colors.green,
    borderRadius: 8,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});