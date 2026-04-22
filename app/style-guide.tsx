import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Typography } from '../src/components/atoms/Typography';
import { Button } from '../src/components/atoms/Button';

export default function StyleGuide() {
  return (
    <ScrollView className="flex-1 bg-white-base">
      <Stack.Screen options={{ title: 'Design System Matrix' }} />
      
      <View className="p-6">
        {/* Seção de Tipografia */}
        <View className="mb-10">
          <Typography variant="label" className="mb-4">01. Tipografia (Helvetica Now)</Typography>
          
          <View className="bg-white-soft p-6 rounded-2xl border border-gray-300">
            <View>
              <Typography variant="caption" className="mb-1">Display</Typography>
              <Typography variant="display">99.5</Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Title</Typography>
              <Typography variant="title">Building the Future</Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Subtitle</Typography>
              <Typography variant="subtitle">A minimalist approach to fitness tracking.</Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Body Text</Typography>
              <Typography variant="text">
                O FitApp utiliza Zinc 900 como base para evitar o contraste agressivo do preto absoluto, 
                garantindo uma experiência visual premium e confortável.
              </Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Highlight</Typography>
              <Typography variant="highlight">Destaque Neon Lime</Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Label / Tag</Typography>
              <Typography variant="label">Strength Training</Typography>
            </View>
          </View>
        </View>

        {/* Seção de Cores */}
        <View className="mb-10">
          <Typography variant="label" color="default" className="mb-4">02. Paleta de Cores (Zinc + Lime)</Typography>
          
          <View className="flex-row flex-wrap">
            <ColorCard name="White Base" className="bg-white-base border border-gray-300" />
            <ColorCard name="White Soft" className="bg-white-soft border border-gray-300" />
            <ColorCard name="Primary" className="bg-primary-main" />
            <ColorCard name="Secondary" className="bg-secondary-main" />
            <ColorCard name="Gray 300" className="bg-gray-300" />
            <ColorCard name="Gray 500" className="bg-gray-500" />
          </View>
        </View>

        {/* Seção de Botões */}
        <View className="mb-10">
          <Typography variant="label" color="default" className="mb-4">03. Componentes de Ação</Typography>
          
          <View className="space-y-4">
            <Button title="PRIMARY" variant="primary" />
            <Button title="OUTLINE BUTTON" variant="outline" />
            <Button title="GHOST ACTION" variant="ghost" />
            <Button title="DESTRUCTIVE" variant="danger" />
            <View className="flex-row space-x-4">
              <Button title="SMALL" variant="primary" size="sm" className="flex-1" />
              <Button title="DISABLED" variant="primary" disabled className="flex-1" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ColorCard({ name, className }: { name: string, className: string }) {
  return (
    <View className="w-[47%] mb-2 mr-2">
      <View className={`h-20 rounded-xl mb-2 ${className}`} />
      <Typography variant="caption" color="default">{name}</Typography>
    </View>
  );
}
