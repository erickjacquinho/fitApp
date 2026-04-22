import React from 'react';
import { View, Text, FlatList } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Workout from '../../../db/models/Workout';

interface WorkoutListProps {
  workouts: Workout[];
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  return (
    <View>
      <Text className="text-lg font-bold mb-4">Meus Treinos</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-2 p-4 bg-gray-100 rounded">
            <Text className="font-semibold">Date: {item.date?.toLocaleDateString() ?? 'N/A'}</Text>
            {item.notes ? <Text>Notas: {item.notes}</Text> : null}
          </View>
        )}
      />
    </View>
  );
};

// Observa a coleção de 'workouts' e injeta a prop 'workouts' para o componente reagir a mudanças no banco de dados.
const enhance = withObservables([], () => ({
  workouts: database.get<Workout>('workouts').query().observe(),
}));

export default enhance(WorkoutList);
