import React from 'react';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const FOOTER_ENTER = FadeIn.duration(200).easing(Easing.ease);
const FOOTER_EXIT = FadeOut.duration(200).easing(Easing.ease);

interface MenuReorderFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function MenuReorderFooter({ onCancel, onConfirm }: MenuReorderFooterProps) {
  return (
    <Animated.View 
      entering={FOOTER_ENTER}
      exiting={FOOTER_EXIT}
      className="flex-row items-center justify-between px-screen-x py-4"
    >
      <Button variant="outline" className="flex-1 mr-2" onPress={onCancel}>
        <Text>Cancelar</Text>
      </Button>
      <Button className="flex-1 ml-2" onPress={onConfirm}>
        <Text>Confirmar</Text>
      </Button>
    </Animated.View>
  );
}
