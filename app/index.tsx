import { View, ScrollView } from 'react-native';
import { Typography } from '../src/components/atoms/Typography';

export default function Page() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
    >
      <View className="items-center mb-12">
        <Typography variant="label" className="mb-2">
          Fitness Management
        </Typography>
        <Typography variant="title" className="text-center italic">
          FITAPP CORE
        </Typography>
        <Typography variant="subtitle" className="text-center mt-2 px-8">
          Acompanhe sua evolução com precisão e minimalismo.
        </Typography>
      </View>

      <View className="mt-12 items-center">
        <Typography variant="caption" className="uppercase tracking-widest text-center">
          Helvetica Now Premium
        </Typography>
      </View>
    </ScrollView>
  );
}
