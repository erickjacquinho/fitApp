import { View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function StyleGuide() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface">
      <Stack.Screen options={{ title: 'Design System - Mineral Warm' }} />
      
      <View className="p-screen-y-comfortable gap-page-gap px-4 pb-10">
        {/* Section: Typography */}
        <View>
          <Text variant="label" className="mb-4 text-text-secondary">01. Typography & Tokens</Text>
          <View className="gap-4 bg-surface-elevated p-6 rounded-md border border-border-subtle">
            <View>
              <Text variant="caption" className="mb-1 text-text-secondary">Display</Text>
              <Text variant="display">99.5</Text>
            </View>
            <View>
              <Text variant="caption" className="mb-1 text-text-secondary">Title</Text>
              <Text variant="title">Mineral Warm System</Text>
            </View>
            <View>
              <Text variant="caption" className="mb-1 text-text-secondary">Subtitle</Text>
              <Text variant="subtitle">A minimalist approach to fitness tracking.</Text>
            </View>
            <View>
              <Text variant="caption" className="mb-1 text-text-secondary">Body Text</Text>
              <Text variant="text">
                FitApp uses warm neutrals as a base to avoid absolute black contrast, 
                guaranteeing a premium and comfortable visual experience.
              </Text>
            </View>
            <View>
              <Text variant="caption" className="mb-1 text-text-secondary">Highlight</Text>
              <Text variant="highlight">Olive highlight</Text>
            </View>
          </View>
        </View>

        {/* Section: Colors */}
        <View>
          <Text variant="label" className="mb-4 text-text-secondary">02. Semantic Colors</Text>
          <View className="flex-row flex-wrap gap-2">
            <ColorCard name="Surface" className="bg-surface border border-border-subtle" />
            <ColorCard name="Surface Elevated" className="bg-surface-elevated border border-border-subtle" />
            <ColorCard name="Primary" className="bg-primary" />
            <ColorCard name="Error" className="bg-error" />
            <ColorCard name="Success" className="bg-success" />
            <ColorCard name="Warning" className="bg-warning" />
          </View>
        </View>

        {/* Section: Buttons */}
        <View>
          <Text variant="label" className="mb-4 text-text-secondary">03. Buttons (Variants & States)</Text>
          <View className="gap-4">
            <Button variant="default"><Text>PRIMARY ACTION</Text></Button>
            <Button variant="outline"><Text>OUTLINE ACTION</Text></Button>
            <Button variant="ghost"><Text>GHOST ACTION</Text></Button>
            <Button variant="destructive"><Text>DESTRUCTIVE</Text></Button>
            <View className="flex-row gap-4">
              <Button variant="default" size="sm" className="flex-1"><Text>SMALL</Text></Button>
              <Button variant="default" disabled className="flex-1"><Text>DISABLED</Text></Button>
            </View>
            {/* Prohibited Example Documentation */}
            <Text variant="caption" className="text-error mt-2">PROHIBITED: Using raw text colors inside buttons or overriding border widths directly.</Text>
          </View>
        </View>

        {/* Section: Data Display */}
        <View>
          <Text variant="label" className="mb-4 text-text-secondary">04. Data Display (Card, Badge, Progress)</Text>
          <View className="gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Summary</CardTitle>
                <CardDescription>Your latest statistics</CardDescription>
              </CardHeader>
              <CardContent className="gap-4">
                <View className="flex-row gap-2">
                  <Badge variant="default"><Text>NEW</Text></Badge>
                  <Badge variant="secondary"><Text>PRO</Text></Badge>
                  <Badge variant="destructive"><Text>MISSED</Text></Badge>
                </View>
                <Separator />
                <Progress value={60} />
              </CardContent>
            </Card>
          </View>
        </View>

        {/* Section: Form Elements */}
        <View>
          <Text variant="label" className="mb-4 text-text-secondary">05. Form & Interaction</Text>
          <View className="gap-4 bg-surface-elevated p-6 rounded-md border border-border-subtle">
            <View className="gap-2">
              <Label nativeID="name-label">Full Name</Label>
              <Input aria-labelledby="name-label" placeholder="e.g. John Doe" />
            </View>
            <View className="gap-2">
              <Label nativeID="error-label" className="text-error">Error State</Label>
              <Input aria-labelledby="error-label" hasError value="Invalid email" />
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Label nativeID="notifications-label">Enable Notifications</Label>
              <Switch checked={true} onCheckedChange={() => {}} />
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
      <View className={`mb-2 h-12 rounded-md ${className}`} />
      <Text variant="caption">{name}</Text>
    </View>
  );
}
