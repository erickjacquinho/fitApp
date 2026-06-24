import { Text } from '@/components/ui/text';
import React, { useState, useEffect } from 'react';
import { View, Modal, Pressable, FlatList, Platform } from 'react-native';
import { ExerciseDictionaryService } from '../services/exercise-dictionary-service';
import ExerciseDefinition from '../../../db/models/ExerciseDefinition';
import { X, Plus } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SearchBar } from '@/components/molecules/SearchBar';
import { PopupModal } from '@/components/organisms/PopupModal';

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
      <Button
        variant="outline"
        onPress={() => setModalVisible(true)}
        className="flex-1 justify-start"
      >
        <Text variant="text" className={value ? 'text-text-primary' : 'text-text-secondary'}>
          {value || 'Selecionar exercício'}
        </Text>
      </Button>

      <PopupModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Selecionar exercício"
      >
        <View className="h-selection-sheet pt-2">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            onClear={() => setSearch('')}
            placeholder="Buscar ou criar exercício..."
            autoFocus={Platform.OS === 'ios'}
            containerClassName="mb-4"
          />

          <FlatList 
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Selecionar ${item.name}`}
                className="py-3 border-b border-border-subtle"
                onPress={() => {
                  onChange(item.name);
                  setModalVisible(false);
                }}
              >
                <Text variant="text" className="font-bold text-text-main">{item.name}</Text>
              </Pressable>
            )}
            ListEmptyComponent={() => (
              <View className="py-8 items-center">
                <Text variant="text" className="text-text-secondary">Nenhum exercício encontrado.</Text>
              </View>
            )}
          />

          {search.trim().length > 0 && !exactMatch && (
            <Button
              className="mt-4"
              onPress={handleCreate}
            >
              <Icon as={Plus} className="text-text-inverse" />
              <Text>
                Criar &quot;{search.trim()}&quot;
              </Text>
            </Button>
          )}
        </View>
      </PopupModal>
    </>
  );
}
