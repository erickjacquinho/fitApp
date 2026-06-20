import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, FlatList, TextInput, Platform } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { ExerciseDictionaryService } from '../services/exercise-dictionary-service';
import ExerciseDefinition from '../../../db/models/ExerciseDefinition';
import { X, Search, Plus } from 'lucide-react-native';

interface Props {
  value: string;
  onChange: (name: string) => void;
}

export function ExerciseSelect({ value, onChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [exercises, setExercises] = useState<ExerciseDefinition[]>([]);
  const [search, setSearch] = useState('');

  const loadExercises = async () => {
    const data = await ExerciseDictionaryService.getExercises();
    setExercises(data);
  };

  useEffect(() => {
    if (modalVisible) {
      loadExercises();
      setSearch('');
    }
  }, [modalVisible]);

  const handleCreate = async () => {
    if (!search.trim()) return;
    try {
      const newEx = await ExerciseDictionaryService.createExercise(search);
      onChange(newEx.name);
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = exercises.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));
  const exactMatch = exercises.find(e => e.name.toLowerCase() === search.trim().toLowerCase());

  return (
    <>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        className="flex-1 rounded border border-soft bg-white-pure px-3 py-1.5 justify-center"
      >
        <Typography variant="text" className={value ? 'font-bold text-black-main text-sm' : 'text-gray-400 text-sm'}>
          {value || 'Select Exercise'}
        </Typography>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-surface-app h-[80%] rounded-t-3xl p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Typography variant="title">Select Exercise</Typography>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="p-2">
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center border border-soft rounded-lg px-3 py-2 bg-white-pure mb-4">
              <Search size={20} color="#999" />
              <TextInput 
                value={search}
                onChangeText={setSearch}
                placeholder="Search or create new..."
                className="flex-1 ml-2 text-black-main"
                autoFocus={Platform.OS === 'ios'}
              />
            </View>

            <FlatList 
              data={filtered}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  className="py-3 border-b border-soft"
                  onPress={() => {
                    onChange(item.name);
                    setModalVisible(false);
                  }}
                >
                  <Typography variant="text" className="font-bold text-black-main">{item.name}</Typography>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View className="py-8 items-center">
                  <Typography variant="text" color="muted">No exercises found.</Typography>
                </View>
              )}
            />

            {search.trim().length > 0 && !exactMatch && (
              <TouchableOpacity 
                className="mt-4 bg-primary-main rounded-lg py-3 flex-row justify-center items-center gap-2"
                onPress={handleCreate}
              >
                <Plus size={20} color="#fff" />
                <Typography variant="text" className="text-white-pure font-bold">
                  Create "{search.trim()}"
                </Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
