import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';
// import { Header } from '@/components/molecules/Header'; // Assuming we have this, but I should check

export interface ScreenProps {
  children: ReactNode;

  // Layout Options
  scrollable?: boolean; // default: true
  withPadding?: boolean; // default: true

  // Safe Area
  safeAreaEdges?: Edge[]; // default: [] if header present, ['top'] if header absent

  // Header Options (Optional)
  headerTitle?: string;
  headerShowBackButton?: boolean;
  headerRightContent?: ReactNode;
  
  // You can pass the whole Header component directly if you want
  header?: ReactNode;

  // Styling overrides
  className?: string;
  contentClassName?: string;

  // Overlay
  overlayActive?: boolean;

  // ScrollView Specific
  scrollViewProps?: Omit<ScrollViewProps, 'children'>;
}

export function Screen({
  children,
  scrollable = true,
  withPadding = true,
  safeAreaEdges,
  header,
  className,
  contentClassName,
  scrollViewProps,
  overlayActive = false,
}: ScreenProps) {
  // Resolve the safe area edges dynamically
  const resolvedEdges = safeAreaEdges ?? (header ? [] : ['top']);

  // If there are no safe area edges requested, we can just use a normal View.
  // SafeAreaView handles edges automatically based on its props.
  const Wrapper = resolvedEdges.length > 0 ? SafeAreaView : View;
  
  const content = (
    <View
      className={cn(
        'flex-1',
        withPadding && 'px-screen-x',
        contentClassName
      )}
    >
      {children}
    </View>
  );

  return (
    <Wrapper
      edges={resolvedEdges.length > 0 ? resolvedEdges : undefined}
      className={cn('flex-1 bg-background', className)}
    >
      <KeyboardAvoidingView
        className="flex-1 bg-background"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {header && <View className="z-10">{header}</View>}
        
        {scrollable ? (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            {...scrollViewProps}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}

        {overlayActive && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            className="absolute inset-0 bg-scrim z-40"
            pointerEvents="none"
          />
        )}
      </KeyboardAvoidingView>
    </Wrapper>
  );
}
