import React from 'react';
import { StyleProp, ViewStyle, LayoutAnimation } from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

export interface DraggableListProps<T> {
  data: T[];
  onReorder: (data: T[]) => void;
  keyExtractor: (item: T, index: number) => string;
  renderItem: (item: T, isActive: boolean, drag: () => void, index?: number) => React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
}

export function DraggableList<T>({
  data,
  onReorder,
  keyExtractor,
  renderItem,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}: DraggableListProps<T>) {

  const handleDragEnd = ({ data }: { data: T[] }) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onReorder(data);
  };

  const handleDragBegin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const _renderItem = ({ item, getIndex, drag, isActive }: RenderItemParams<T>) => {
    return (
      <ScaleDecorator activeScale={1.03}>
        {renderItem(item, isActive, drag, getIndex())}
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={handleDragEnd}
      onDragBegin={handleDragBegin}
      keyExtractor={keyExtractor}
      renderItem={_renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      activationDistance={10}
      animationConfig={{ damping: 20, mass: 0.1, stiffness: 100, overshootClamping: false }}
    />
  );
}
