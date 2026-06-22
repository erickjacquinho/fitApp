import React from 'react';
import { View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Button } from '@/components/ui/button';
import { Card, CardProps } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { Pencil, Trash2 } from 'lucide-react-native';

export interface SwipeableCardProps extends CardProps {
  onDelete?: () => void;
  onEdit?: () => void;
  children?: React.ReactNode;
}

export function SwipeableCard({ onDelete, onEdit, children, ...props }: SwipeableCardProps) {
  const renderRightActions = () => {
    // We use styling to match the card layout.
    // The inner buttons fill the height. If the Card has mb-2, we need to handle the bottom margin
    // so the buttons don't stretch into the margin. The easiest way is to apply a padding or margin to match.
    // We'll wrap the buttons in a view that has pb-2 if the parent uses mb-2, but we can't easily detect it.
    // However, it's generally cleaner to just let the buttons align with the card's rounded-md.
    return (
      <View className="flex-row items-stretch pl-2">
        {onEdit && (
          <Button
            accessibilityLabel="Editar"
            variant="secondary"
            size="icon"
            onPress={onEdit}
            className="h-full w-16 bg-info-soft mr-2"
          >
            <Icon as={Pencil} className="text-info-main" />
          </Button>
        )}
        {onDelete && (
          <Button
            accessibilityLabel="Excluir"
            variant="destructive"
            size="icon"
            onPress={onDelete}
            className="h-full w-16 bg-tomato-soft"
          >
            <Icon as={Trash2} className="text-tomato-main" />
          </Button>
        )}
      </View>
    );
  };

  // Extract standard margin classes so they can be applied outside the Swipeable
  const classNameStr = props.className || '';
  const marginClasses: string[] = classNameStr.match(/m[b|t|l|r|x|y]?-\d+/g) || [];
  const otherClasses = classNameStr.split(' ').filter((c: string) => !marginClasses.includes(c)).join(' ');

  return (
    <View className={marginClasses.join(' ')}>
      <Swipeable renderRightActions={renderRightActions}>
        <Card {...props} className={otherClasses}>
          {children}
        </Card>
      </Swipeable>
    </View>
  );
}
