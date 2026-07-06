import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/text';
import { GripVertical, Play } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { BaseCardList } from '../../../components/molecules/BaseCardList';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/use-theme-colors';

import { BlockWithSets } from '../hooks/useProgramSummary';

interface WorkoutListItemProps {
  item: BlockWithSets;
  isReordering: boolean;
  drag?: () => void;
  isActive?: boolean;
  onPress?: () => void;
  onStartSession?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

interface LeftActionProps {
  dragAnim: SharedValue<number>;
  primaryColor: string;
  textInverseColor: string;
  isFirst: boolean;
  isLast: boolean;
}

const LeftAction = ({ dragAnim, primaryColor, textInverseColor, isFirst, isLast }: LeftActionProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(dragAnim.value, [0, 50, 100], [0, 1, 1.2], Extrapolation.CLAMP);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View 
      style={[
        styles.leftAction, 
        { 
          backgroundColor: primaryColor,
          borderTopLeftRadius: isFirst ? 12 : 0,
          borderBottomLeftRadius: isLast ? 12 : 0,
        }
      ]}
    >
      <Reanimated.View style={animatedStyle}>
        <Icon as={Play} size={24} color={textInverseColor} />
      </Reanimated.View>
      <Text variant="label" className="text-text-inverse font-bold ml-2">Iniciar</Text>
    </View>
  );
};

export const WorkoutListItem = ({
  item,
  isReordering,
  drag,
  isActive,
  onPress,
  onStartSession,
  isFirst = false,
  isLast = false,
}: WorkoutListItemProps) => {
  const { block, validSets, totalSets } = item;
  const colors = useThemeColors();
  const swipeableRef = React.useRef<any>(null);

  const renderLeftActions = (
    prog: SharedValue<number>,
    dragAnim: SharedValue<number>
  ) => {
    return (
      <LeftAction
        dragAnim={dragAnim}
        primaryColor={colors.primary}
        textInverseColor={colors.textInverse}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  };

  const handleSwipeableOpen = () => {
    swipeableRef.current?.close();
    if (onStartSession) {
      setTimeout(() => {
        onStartSession();
      }, 200);
    }
  };

  const content = (
    <BaseCardList
      onPress={onPress}
      onLongPress={isReordering ? drag : undefined}
      disabled={isReordering && !drag}
      isFirst={isFirst}
      isLast={isLast}
      isActive={isActive}
    >
      <View className="flex-row items-center flex-1">
        {isReordering && (
          <Pressable onPressIn={drag} className="p-1 mr-2">
            <Icon as={GripVertical} size={20} className="text-text-secondary" /> 
          </Pressable>
        )}
        <View className="flex-1 mr-3 justify-center gap-1">
          <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>
            {block.name}
          </Text>
          <Text variant="caption" className="text-text-secondary" numberOfLines={1}>
            {validSets} séries válidas / {totalSets} séries totais
          </Text>
        </View>
      </View>
    </BaseCardList>
  );

  if (isReordering) {
    return content;
  }

  return (
    <View className={`overflow-hidden ${isFirst ? 'rounded-t-xl' : ''} ${isLast ? 'rounded-b-xl' : ''}`}>
      <ReanimatedSwipeable
        ref={swipeableRef}
        renderLeftActions={renderLeftActions}
        leftThreshold={60}
        onSwipeableOpen={handleSwipeableOpen}
        friction={2}
      >
        {content}
      </ReanimatedSwipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    marginTop: 1,
    marginBottom: 1,
  },
});
