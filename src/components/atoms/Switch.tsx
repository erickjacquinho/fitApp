import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps } from 'react-native';
import { COLORS } from './colors';

export interface SwitchProps extends RNSwitchProps {}

export function Switch(props: SwitchProps) {
  return (
    <RNSwitch
      trackColor={{ false: COLORS.borderSoft, true: COLORS.primary }}
      thumbColor="#FFFFFF"
      ios_backgroundColor={COLORS.borderSoft}
      {...props}
    />
  );
}
