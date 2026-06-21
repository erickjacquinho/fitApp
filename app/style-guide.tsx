import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Typography } from '../src/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function StyleGuide() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface-app">
      <Stack.Screen options={{ title: 'Design System' }} />
      
      <View className="p-screen-y-comfortable gap-page-gap">
        {/* Seção de Tipografia */}
        <View>
          <Typography variant="label" className="mb-4">01. Tipografia (Helvetica Now)</Typography>
          
          <View className="gap-4 bg-surface-muted p-6 rounded-md border border-soft">
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
                O FitApp utiliza neutros quentes como base para evitar o contraste agressivo do preto absoluto, 
                garantindo uma experiência visual premium e confortável.
              </Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Highlight</Typography>
              <Typography variant="highlight">Destaque oliva</Typography>
            </View>

            <View>
              <Typography variant="caption" className="mb-1">Label / Tag</Typography>
              <Typography variant="label">Strength Training</Typography>
            </View>
          </View>
        </View>

        {/* Seção de Cores */}
        <View>
          <Typography variant="label" color="default" className="mb-4">02. Paleta de Cores</Typography>
          
          <View className="flex-row flex-wrap gap-2">
            <ColorCard name="Surface App" className="bg-surface-app border border-soft" />
            <ColorCard name="Surface Muted" className="bg-surface-muted border border-soft" />
            <ColorCard name="Accent" className="bg-accent-main" />
            <ColorCard name="Tomato" className="bg-tomato-main" />
            <ColorCard name="Success" className="bg-success-main" />
            <ColorCard name="Warning" className="bg-warning-main" />
          </View>
        </View>

        {/* Seção de Botões */}
        <View>
          <Typography variant="label" color="default" className="mb-4">03. Componentes de Ação</Typography>
          
          <View className="gap-4">
            <Button variant="default"><Text>PRIMARY</Text></Button>
            <Button variant="outline"><Text>OUTLINE BUTTON</Text></Button>
            <Button variant="ghost"><Text>GHOST ACTION</Text></Button>
            <Button variant="destructive"><Text>DESTRUCTIVE</Text></Button>
            <View className="flex-row gap-4">
              <Button variant="default" size="sm" className="flex-1"><Text>SMALL</Text></Button>
              <Button variant="default" disabled className="flex-1"><Text>DISABLED</Text></Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ColorCard({ name, className }: { name: string, className: string }) {
  return (
    <View className="w-5/12 mb-2">
      <View className={`h-20 rounded-md mb-2 ${className}`} />
      <Typography variant="caption" color="default">{name}</Typography>
    </View>
  );
}
