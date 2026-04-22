import { View, FlatList } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Workout from '../../../db/models/Workout';
import { Typography } from '../../../components/atoms/Typography';

interface WorkoutListProps {
  workouts: Workout[];
}

const WorkoutList = ({ workouts }: WorkoutListProps) => {
  return (
    <View>
      <Typography variant="title" className="mb-4">My Workouts</Typography>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-2 p-4 bg-white-soft rounded-sm">
            <Typography variant="subtitle">Date: {item.date?.toLocaleDateString() ?? 'N/A'}</Typography>
            {item.notes ? <Typography variant="text" color="muted">Notes: {item.notes}</Typography> : null}
          </View>
        )}
      />
    </View>
  );
};

const enhance = withObservables([], () => ({
  workouts: database.get<Workout>('workouts').query().observe(),
}));

export default enhance(WorkoutList);
