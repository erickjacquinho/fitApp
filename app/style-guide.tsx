import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Typography } from '../src/components/atoms/Typography';
import { Button } from '../src/components/atoms/Button';

export default function StyleGuide() {
  return (
    <ScrollView className="flex-1 bg-background-main">
      <Stack.Screen options={{ title: 'Design System Matrix', headerStyle: { backgroundColor: '#18181b' }, headerTintColor: '#bef264' }} />
      
      <View className="p-6">
        {/* Seção de Tipografia */}
        <View className="mb-10">
          <Typography variant="label" className="mb-4">01. Tipografia (Helvetica Now)</Typography>
          
          <View className="gap-y-6 bg-background-card p-6 rounded-2xl border border-border-subtle">
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
          
          <View className="flex-row flex-wrap gap-4">
            <ColorCard name="Main BG" hex="#18181b" className="bg-background-main border border-border-subtle" />
            <ColorCard name="Card BG" hex="#27272a" className="bg-background-card" />
            <ColorCard name="Primary" hex="#bef264" className="bg-brand-primary" darkText />
            <ColorCard name="Accent" hex="#a3e635" className="bg-brand-accent" darkText />
            <ColorCard name="Success" hex="#22c55e" className="bg-status-success" />
            <ColorCard name="Error" hex="#ef4444" className="bg-status-error" />
          </View>
        </View>

        {/* Seção de Botões */}
        <View className="mb-10">
          <Typography variant="label" color="default" className="mb-4">03. Componentes de Ação</Typography>
          
          <View className="gap-y-4">
            <Button title="PRIMARY NEON" variant="primary" />
            <Button title="OUTLINE BUTTON" variant="outline" />
            <Button title="GHOST ACTION" variant="ghost" />
            <Button title="DESTRUCTIVE" variant="danger" />
            <View className="flex-row gap-x-4">
              <Button title="SMALL" variant="primary" size="sm" className="flex-1" />
              <Button title="LOADING" variant="primary" disabled className="flex-1" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ColorCard({ name, hex, className, darkText = false }: { name: string, hex: string, className: string, darkText?: boolean }) {
  return (
    <View className="w-[47%] mb-2">
      <View className={`h-20 rounded-xl mb-2 items-center justify-center ${className}`}>
        {darkText && <Typography variant="caption" className="text-zinc-900">PREVIEW</Typography>}
      </View>
      <Typography variant="caption" color="default">{name}</Typography>
      <Typography variant="caption" className="uppercase opacity-60">{hex}</Typography>
    </View>
  );
}
