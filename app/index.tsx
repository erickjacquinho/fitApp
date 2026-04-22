import { View, ScrollView } from 'react-native';
import useCounterStore from '../src/store';
import { Typography } from '../src/components/atoms/Typography';
import { Button } from '../src/components/atoms/Button';

export default function Page() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <ScrollView 
      className="flex-1 bg-background-main" 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
    >
      <View className="items-center mb-12">
        <Typography variant="label" color="primary" className="mb-2">
          Fitness Management
        </Typography>
        <Typography variant="title" className="text-center italic">
          FITAPP CORE
        </Typography>
        <Typography variant="subtitle" className="text-center mt-2 px-8">
          Acompanhe sua evolução com precisão e minimalismo.
        </Typography>
      </View>
      
      <View className="w-full p-8 bg-background-card rounded-2xl border border-border-subtle shadow-2xl">
        <View className="items-center mb-8">
          <Typography variant="highlight" color="primary" className="mb-1">
            Total Repetitions
          </Typography>
          <Typography variant="display" className="leading-none">
            {count}
          </Typography>
        </View>
        
        <View className="mb-8">
          <Typography variant="text" color="muted" className="text-center">
            Este contador demonstra a integração entre <Typography color="primary" weight="bold">Zustand</Typography> e o sistema de design <Typography color="heading" weight="semibold">Dark Zinc</Typography>.
          </Typography>
        </View>
        
        <View className="flex-row gap-4">
          <Button 
            title="INCREMENT" 
            onPress={increment} 
            className="flex-1"
            variant="primary"
          />
          <Button 
            title="DECREMENT" 
            onPress={decrement} 
            className="flex-1"
            variant="outline"
          />
        </View>
      </View>

      <View className="mt-12 items-center">
        <Typography variant="caption" className="uppercase tracking-widest text-center">
          Helvetica Now Premium • Zinc 900 • Neon Lime
        </Typography>
        <View className="h-[1px] w-12 bg-border-subtle mt-4" />
      </View>
    </ScrollView>
  );
}
