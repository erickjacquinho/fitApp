import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function StyleGuide() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface-app">
      <Stack.Screen options={{ title: 'Design System' }} />
      
      <View className="p-screen-y-comfortable gap-page-gap">
        {/* Seção de Tipografia */}
        <View>
          <Text variant="label" className="mb-4">01. Tipografia (Helvetica Now)</Text>
          
          <View className="gap-4 bg-surface-muted p-6 rounded-md border border-soft">
            <View>
              <Text variant="caption" className="mb-1">Destaque</Text>
              <Text variant="display">99.5</Text>
            </View>

            <View>
              <Text variant="caption" className="mb-1">Título</Text>
              <Text variant="title">Building the Future</Text>
            </View>

            <View>
              <Text variant="caption" className="mb-1">Subtítulo</Text>
              <Text variant="subtitle">A minimalist approach to fitness tracking.</Text>
            </View>

            <View>
              <Text variant="caption" className="mb-1">Texto</Text>
              <Text variant="text">
                O FitApp utiliza neutros quentes como base para evitar o contraste agressivo do preto absoluto, 
                garantindo uma experiência visual premium e confortável.
              </Text>
            </View>

            <View>
              <Text variant="caption" className="mb-1">Realce</Text>
              <Text variant="highlight">Destaque oliva</Text>
            </View>

            <View>
              <Text variant="caption" className="mb-1">Rótulo</Text>
              <Text variant="label">Treino de força</Text>
            </View>
          </View>
        </View>

        {/* Seção de Cores */}
        <View>
          <Text variant="label" color="default" className="mb-4">02. Paleta de Cores</Text>
          
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
          <Text variant="label" color="default" className="mb-4">03. Componentes de Ação</Text>
          
          <View className="gap-4">
            <Button variant="default"><Text>PRIMARY</Text></Button>
            <Button variant="outline"><Text>OUTLINE BUTTON</Text></Button>
            <Button variant="ghost"><Text>GHOST ACTION</Text></Button>
            <Button variant="destructive"><Text>DESTRUCTIVE</Text></Button>
            <View className="flex-row gap-4">
              <Button variant="default" size="sm" className="flex-1"><Text>PEQUENO</Text></Button>
              <Button variant="default" disabled className="flex-1"><Text>DESATIVADO</Text></Button>
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
      <View className={`mb-2 h-color-swatch rounded-md ${className}`} />
      <Text variant="caption" color="default">{name}</Text>
    </View>
  );
}
